import { Api, TelegramClient } from "telegram"
import { StringSession } from "telegram/sessions"
// import { returnBigInt } from "telegram/Helpers"
import { NewMessage, NewMessageEvent } from "telegram/events"
// @ts-ignore
import input from "input"
import { Database } from "bun:sqlite"
// const db = new Database("db.sqlite", { create: true })

const apiId = parseInt(process.env.TELEGRAM_API_ID as string)
const apiHash = process.env.TELEGRAM_API_HASH as string
const stringSession = new StringSession(
  "1AgAOMTQ5LjE1NC4xNjcuNDEBu4+ZoWfaeT/UNfQBtEWFDT4s1zecEpzkUq7JKL3WVYphzEDYOgd3LwIzgQQ2amumC5GlAmMU5sv4+ctKYWsQv/oAzRUfBaIA8n3Wc11fQomydpXAUSiCn2AYB1sLYlWqFAA6nvAbbEL4SRVP0bsZDig8bQT/kY983rbcbHUku5gA8ypHV5eMd5szFKX40uxdmfKQfqvtQHINgXT44PEOovueZr9igMscUzIpVy1VumRal04cJBjcqWoCnuhwt9aQmp9FkQHeOqgRYOEyJh6i0Gqh0jNohbD021/pITAD4BJOgK9u9fU5bEKr8WyVtGctz5ApEwQ9KH2GsaGRVoXuK3U=",
)
//   console.log(client.session.save()) // Save this string to avoid logging in again
const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
await client.start({
  phoneNumber: async () => await input.text("Please enter your number: "),
  password: async () => await input.text("Please enter your password: "),
  phoneCode: async () => await input.text("Please enter the code you received: "),
  onError: (err) => console.log(err),
})
console.log("You should now be connected.")
const handler = async (event: NewMessageEvent) => console.log("[new message]", event.message.message)
client.addEventHandler(handler, new NewMessage({}))

// const result = await client.sendMessage("543763326", { message: "💘" })

// const me = (await client.getMe()) as Api.User
// await client.invoke(
//   new Api.messages.SendMessage({
//     peer: "543763326",
//     message: "💘",
//     noWebpage: true,
//     noforwards: true,
//   }),
// )

//   const dialogs = await client.getDialogs({})
//   console.log(dialogs)

//   const result = await client.invoke(
//     new Api.contacts.Search({
//       q: "Катя💗 Филипенко",
//       limit: 100,
//     })
//   );
//   console.log(result)

//   const r = await client.invoke(
//     new Api.users.GetFullUser({
//       id: BigInt(543763326),
//     }),
//   )
//   console.log(r)
