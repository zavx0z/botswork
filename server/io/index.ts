const server = Bun.serve<{ authToken: string }>({
  fetch(req, server) {
    const success = server.upgrade(req)
    if (success) return undefined
    return new Response(`Kate i love you! 💕`)
  },
  websocket: {
    async message(ws, message) {
      console.log(`Received ${message}`)
      ws.send(`You said: ${message}`)
    }
  }
})
console.log(`Тут сокет сервер http://${server.hostname}:${server.port}`)