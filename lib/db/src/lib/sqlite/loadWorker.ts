import { WorkerMessageTypes, type WorkerMessage } from "./types"

export default function initWorker(workerImp: any) {
  const worker = new workerImp()

  const msg: WorkerMessage = { type: WorkerMessageTypes.INIT_DB }
  console.log(`Sending message to worker:`, msg)
  worker.postMessage(msg)

  worker.addEventListener("message", async ({ data }: { data: WorkerMessage }) => {
    console.log("Received message from worker:", data.type)
  })
}
