const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response(Bun.file(import.meta.dir + "/index.html"))
  },
})

console.log(`Listening on localhost: ${server.port}`)
