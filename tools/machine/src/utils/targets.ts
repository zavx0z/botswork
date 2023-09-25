import type {TypegenExecutorSchema} from "../executors/typegen/schema"

export const machineTypegenTarget = (props: TypegenExecutorSchema) => ({
    "typegen": {
        "executor": "@zavx0z/machine:typegen",
        "options": {
            "watch": props.watch
        }
    }
})