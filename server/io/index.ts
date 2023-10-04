import { Data, Cookies } from "./src/types"
import { getDecodedAccessToken, parseCookie } from "./src/utils"

const server = Bun.serve<Data>({
  fetch(req, server) {
    const userAgent = req.headers.get("user-agent")
    const cookies = parseCookie(req.headers.get("Cookie") as string) as Cookies
    const decodedToken = getDecodedAccessToken(cookies.accessToken)
    let success = server.upgrade(req, {
      data: {
        createdAt: Date.now(),
        channelId: new URL(req.url).searchParams.get("channelId"),
        uuid: decodedToken ? decodedToken.sub : null,
        client: userAgent,
      },
    })
    return success ? undefined : new Response(`Kate i love you! 💕`)
  },
  websocket: {
    open(ws) {
      if (ws.data.uuid) {
        ws.subscribe(ws.data.uuid)
        ws.subscribe("chat")
      } else setTimeout(() => ws.close(4000, "Нет токена доступа"), 100)
    },
    async message(ws, message) {
      console.log(ws.data)
      console.log(`Received ${message}`)
      ws.send(`You said: ${message}`)
      ws.publish("chat", "Chat channel")
    },
    close(ws, code, message) {
      console.log("close", code, message)
    },
    drain(ws) {
      console.log("drain")
    },
  },
})
console.log(`Тут сокет сервер http://${server.hostname}:${server.port}`)
