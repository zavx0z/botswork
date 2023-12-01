export type InOut = {
    [key: string]: {
      title: string
      type: "Boolean" | "Text"
      default: unknown
      value: unknown
    }
  }
  export type ThingType = {
    uuid: string
    uri: string
    tag: string
    title: string
    input: InOut
    output: InOut
  }