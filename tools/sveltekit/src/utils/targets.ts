import type {DevExecutorSchema} from "../executors/dev/schema"
import type {BuildExecutorSchema} from "../executors/build_/schema"

export const dev = (props: DevExecutorSchema) => ({
    "dev": {
        "executor": "@zavx0z/sveltekit:dev",
        "options": {
            "port": props.port,
            "watchDepthSvelteProjects": []
        }
    }
})
export const build = (props: BuildExecutorSchema) => ({
    "build": {
        "executor": "@zavx0z/sveltekit:build",
        "options": {}
    }
})