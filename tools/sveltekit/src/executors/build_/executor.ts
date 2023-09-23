import {BuildExecutorSchema} from "./schema"
import {default as runCommands} from "nx/src/executors/run-commands/run-commands.impl"
import {ExecutorContext, logger} from "@nx/devkit"

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
    const {projectName, workspace: {projects}} = context
    const result = await runCommands({
        commands: [
            "pnpm vite build",
            "pnpm svelte-kit sync",
            "pnpm svelte-package",
            "pnpm publint",
        ],
        cwd: projects[projectName].root,
        parallel: false,
        color: true,
        __unparsed__: [],
    }, context)
    result.success ? logger.info('Сборка выполнена.') : logger.error('Ошибка сборки.')
    return result
}
