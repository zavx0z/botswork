export type Progress = {
  completed: number
  total: number
}
export type Complete = {
  status: "success" | "error" | "process"
  message: string
}
export interface Context {
  input?: object
  output?: object
  progress?: Progress
  complete?: Complete
}
