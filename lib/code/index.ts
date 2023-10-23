import { Window } from "happy-dom"

const window = new Window({
  url: "https://localhost:8080",
  width: 1024,
  height: 768,
})
const document = window.document

document.body.innerHTML = '<div class="container"></div>'

const container = document.querySelector(".container")
const button = document.createElement("button")

container.appendChild(button)

// Outputs "<div class="container"><button></button></div>"
console.log(document.body.innerHTML)

// const server = Bun.serve({
//   port: 3000,
//   fetch(request) {
//     return new Response(Bun.file(import.meta.dir + "/index.html"))
//   },
// })

// console.log(`Listening on localhost: ${server.port}`)
