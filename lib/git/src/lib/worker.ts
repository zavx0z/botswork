import { FsaNodeSyncWorker } from "memfs/lib/fsa-to-node/worker/FsaNodeSyncWorker"
//@ts-ignore
import proc from "process/browser"
import { Buffer } from "buffer"
;(window as any).process = proc
;(window as any).Buffer = Buffer
if (typeof window === "undefined") {
  const worker = new FsaNodeSyncWorker()
  worker.start()
}
