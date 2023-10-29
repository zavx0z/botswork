import type { ColType, TableStructure } from "$lib/sqlite/types"

function getDataType(colType: ColType): string {
  switch (colType) {
    case "string":
      return "text"
    case "number":
      return "real"
    default:
      throw new Error(`Unknown column type: ${colType}`)
  }
}

export default function genTabSrc(storageId: string, structure: TableStructure) {
  let statement = `Create Table ${storageId} (`
  const atomics: string[] = []
  for (const col of structure.columns) atomics.push(`${col.name} ${getDataType(col.type)}`)
  atomics.push(`PRIMARY KEY (${structure.pkColumn})`)
  statement += `   ${atomics.join(", ")}    ) strict;`
  return statement
}
