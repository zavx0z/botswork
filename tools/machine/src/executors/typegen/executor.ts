import {default as runCommands} from "nx/src/executors/run-commands/run-commands.impl"
import {ExecutorContext, logger} from "@nx/devkit"
import {TypegenExecutorSchema} from "./schema"

export default async function runExecutor(options: TypegenExecutorSchema, context: ExecutorContext) {
    const watch = typeof options.watch === 'boolean' && options.watch ? '--watch' : ''
    logger.info(`Генерация типов конечного автомата ${watch ? "с отслеживанием" : "без отслеживания"} изменений.`)
    const {projectName, workspace: {projects}} = context
    const result = await runCommands({
        command: `xstate typegen "src/**/*.ts?(x)" ${watch}`,
        cwd: projects[projectName].root,
        parallel: false,
        color: true,
        __unparsed__: [],
    }, context)
    result.success ? logger.info('Генерация типов выполнена.') : logger.error('Ошибка генерации типов.')
    return result
}
