import {DevExecutorSchema} from "./schema"
import type {ExecutorContext, ProjectGraphDependency} from '@nx/devkit'
import {logger, joinPathFragments} from '@nx/devkit'
import {default as runCommands} from 'nx/src/executors/run-commands/run-commands.impl'

export default async function runExecutor(options: DevExecutorSchema, context: ExecutorContext) {
    const {projectName, root, workspace: {projects}, projectGraph: {dependencies}} = context
    const portOptions = options.port ? `--port ${options.port}` : ''

    const localDependencies = dependencies[projectName].filter((lib) => !lib.target.startsWith('npm')).map(lib => lib.target)
    const svelteKitLibrariesName = localDependencies.filter(libName => !!dependencies[libName].find((lib: ProjectGraphDependency) => lib.target === 'npm:@sveltejs/kit'))
    const svelteKitLibraries = svelteKitLibrariesName.map(libName => projects[libName as string])
    const libCommands = svelteKitLibraries.map(lib => ({
        command: `cd ${joinPathFragments(root, lib.root)} && pnpm svelte-package --watch`,
        prefix: lib.name
    }))
    logger.info("Сервер разработки запущен. Изменения в зависимостях отслеживаются.")
    const result = await runCommands({
        commands: [...libCommands, {command: `pnpm vite dev ${portOptions}`}],
        cwd: projects[context.projectName].root,
        parallel: true,
        color: true,
        __unparsed__: [],
    }, context)
    result.success ? logger.info('Dev running...') : logger.error('Error while dev...')
    return result
}