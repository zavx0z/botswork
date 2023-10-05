const server = Bun.serve({
  fetch(req, server) {
    const success = server.upgrade(req, {
      data: {
        client: req.headers.get("user-agent"),
      },
    })
    return success ? undefined : new Response("WS server")
  },
  websocket: {
    open(ws) {
      console.log("Open")
    },
    message(ws, message) {
      ws.send(`Received ${message}`)
    },
    close(ws) {
      console.log("Close")
    },
    drain(ws) {
      console.log("Drain")
    },
  },
})
console.log(`сокет сервер http://${server.hostname}:${server.port}`)
