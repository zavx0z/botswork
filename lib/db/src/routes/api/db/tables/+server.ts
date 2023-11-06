import { json, type RequestHandler } from "@sveltejs/kit"

export const GET = (() => {
  return json([
    {
      name: "stuff",
      pk: "id",
      columns: [{ name: "id", type: "string" }],
    },
    {
      name: "confusion",
      pk: "id",
      columns: [{ name: "id", type: "string" }],
    },
  ])
}) satisfies RequestHandler
