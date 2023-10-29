import initStorages from "./initStorages"
import { initMsgBus, sendMsgToWorker } from "./messageBus"
import { WorkerMessageTypes, type WorkerMessage } from "./types"

export default async function initWorker(workerImp: any) {
  const worker = new workerImp()
  initMsgBus(worker)
  const res = await sendMsgToWorker({
    storageId: "db",
    type: WorkerMessageTypes.INIT_DB,
    expectedType: WorkerMessageTypes.INIT_DB_RESPONSE,
    data: undefined,
  })

  console.log("Init worker response:", res)

  // initStorages()
}
