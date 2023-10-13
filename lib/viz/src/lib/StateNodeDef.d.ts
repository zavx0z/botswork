interface BaseStateNodeDef {
  key: string
  id: string
}

interface AtomicStateNodeDef extends BaseStateNodeDef {
  type: "atomic"
}
interface CompoundStateNodeDef extends BaseStateNodeDef {
  type: "compound"
  initial: string
  states?: {
    [key: string]: StateNodeDef
  }
}
interface ParallelStateNodeDef extends BaseStateNodeDef {
  type: "parallel"
  states?: {
    [key: string]: StateNodeDef
  }
}
interface FinalStateNodeDef extends BaseStateNodeDef {
  type: "final"
}
interface HistoryStateNodeDef extends BaseStateNodeDef {
  type: "history"
}

type StateNodeDef = AtomicStateNodeDef | CompoundStateNodeDef | ParallelStateNodeDef | FinalStateNodeDef | HistoryStateNodeDef
type ActionsWithType = { type: string }[]
