import { sendMsgToWorker } from "./messageBus"
import {
  WorkerMessageTypes,
  type WorkerMessage,
  type TableExistsResponseData,
  type CreateTableRequestData,
  type DataRow,
  type FillStorageRequestData,
  type FillStorageResponseData,
  type TableStructure,
} from "./types"

const storages = ["customers_v1", "order_details_v1"]

async function getStructure(storage: string): Promise<TableStructure> {
  const res = await fetch(`/api/data/${storage}/structure`)
  const data = (await res.json()) as TableStructure
  return data
}

async function getData(storage: string, offset: number, limit: number) {
  const res = await fetch(`/api/data/${storage}/data?offset=${offset}&limit=${limit}`)
  const data = (await res.json()) as { data: DataRow[]; moreRows: boolean }
  return data
}

async function createStorage(storage: string, structure: TableStructure) {
  const res = (await sendMsgToWorker({
    storageId: storage,
    type: WorkerMessageTypes.CREATE_TABLE,
    expectedType: WorkerMessageTypes.CREATE_TABLE_RESPONSE,
    data: { structure } as CreateTableRequestData,
  })) as WorkerMessage<TableExistsResponseData>

  if (res.data.errorMsg) throw new Error(res.data.errorMsg)
}

async function fillStorage(storage: string, structure: TableStructure) {
  console.time(`fillStorage-${storage}`)

  const PAGE_SIZE = 100
  let currOffset = 0
  let fetchMore = false

  do {
    const { data, moreRows } = await getData(storage, currOffset, PAGE_SIZE)
    console.log(`Fetched ${data.length} rows from ${storage} at offset ${currOffset}`, data)

    const res = (await sendMsgToWorker({
      storageId: storage,
      type: WorkerMessageTypes.FILL_STORAGE,
      expectedType: WorkerMessageTypes.FILL_STORAGE_RESPONSE,
      data: { rows: data, structure: structure } as FillStorageRequestData,
    })) as WorkerMessage<FillStorageResponseData>

    if (res.data.errorMsg) {
      console.error(`Error filling storage ${storage} at offset ${currOffset}`, res.data.errorMsg)
      throw new Error(res.data.errorMsg)
    }

    currOffset += PAGE_SIZE
    fetchMore = moreRows
  } while (fetchMore)

  console.timeEnd(`fillStorage-${storage}`)
}

const readyStorages = new Set<string>()
const storageCbs = new Map<string, (() => void)[]>()

function storageIsReady(storageId: string) {
  readyStorages.add(storageId)

  if (storageCbs.has(storageId)) {
    const cbs = storageCbs.get(storageId)
    cbs?.forEach((cb) => cb())
    storageCbs.delete(storageId)
  }
}

export function waitTillStorageReady(storageId: string) {
  return new Promise<void>((resolve) => {
    if (readyStorages.has(storageId)) {
      resolve()
    } else {
      if (!storageCbs.has(storageId)) {
        storageCbs.set(storageId, [resolve])
      } else storageCbs.get(storageId)?.push(resolve)
    }
  })
}

export default async function initStorages() {
  for (const storageId of storages) {
    const res = (await sendMsgToWorker({
      storageId,
      type: WorkerMessageTypes.TABLE_EXISTS,
      expectedType: WorkerMessageTypes.TABLE_EXISTS_RESPONSE,
      data: undefined,
    })) as WorkerMessage<TableExistsResponseData>
    if (res.data.errorMsg) throw new Error(res.data.errorMsg)
    if (res.data.tableExists) {
      console.log(`Table ${storageId} exists. Has data: ${res.data.hasData}`)
      if (!res.data.hasData) {
        const structure = await getStructure(storageId)
        await fillStorage(storageId, structure)
      }
    } else {
      const structure = await getStructure(storageId)
      console.log(`Table ${storageId} does not exist. Creating...`, structure)
      await createStorage(storageId, structure)
      await fillStorage(storageId, structure)
    }
    storageIsReady(storageId)
  }
}
