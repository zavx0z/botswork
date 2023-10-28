import { WorkerMessageTypes, type WorkerMessage } from "./types"

export default async function initWorker() {
  const workerImp = await import("$lib/sqlite/worker/worker.ts?worker")

  const worker = new workerImp.default()

  const msg: WorkerMessage = { type: WorkerMessageTypes.INIT_DB }
  console.log(`Sending message to worker:`, msg)
  worker.postMessage(msg)

  worker.addEventListener("message", async ({ data }: { data: WorkerMessage }) => {
    console.log("Received message from worker:", data.type)
  })
}
