import {DevExecutorSchema} from "./schema"
import type {ExecutorContext, ProjectGraphDependency} from '@nx/devkit'
import {logger, joinPathFragments} from '@nx/devkit'
import {default as runCommands} from 'nx/src/executors/run-commands/run-commands.impl'


export default async function runExecutor(options: DevExecutorSchema, context: ExecutorContext) {
    const {projectName, root, workspace: {projects}, projectGraph: {dependencies}} = context
    const {watchDepthSvelteProjects, port} = options
    const portOptions = port ? `--port ${port}` : ''

    let countDependencies = 0
    let dependenciesWatch: ({ command: string; forwardAllArgs?: boolean; description?: string; prefix?: string; color?: string; bgColor?: string; })[] = []
    if (typeof watchDepthSvelteProjects === "object" && watchDepthSvelteProjects.length > 0) {
        logger.info(`Сервер разработки запущен. Изменения отслеживаются.`)
        const localDependencies = dependencies[projectName].filter((lib) => !lib.target.startsWith('npm')).map(lib => lib.target)
        const svelteKitLibrariesName = localDependencies.filter(libName => !!dependencies[libName].find((lib: ProjectGraphDependency) => lib.target === 'npm:@sveltejs/kit'))
        const customDependencies = svelteKitLibrariesName.filter(lib => watchDepthSvelteProjects.includes(lib))
        const svelteKitLibraries = customDependencies.map(libName => projects[libName as string])
        dependenciesWatch = svelteKitLibraries.map(lib => ({command: `cd ${joinPathFragments(root, lib.root)} && pnpm svelte-package --watch`, prefix: lib.name}))
        svelteKitLibraries.forEach(lib => {
            countDependencies += 1
            logger.info(`${countDependencies}. ${lib.name}`)
        })
    } else if (options.watchDepthSvelteProjects === 'all') {
        logger.info(`Сервер разработки запущен. Изменения во всех зависимостях отслеживаются.`)
        const localDependencies = dependencies[projectName].filter((lib) => !lib.target.startsWith('npm')).map(lib => lib.target)
        const svelteKitLibrariesName = localDependencies.filter(libName => !!dependencies[libName].find((lib: ProjectGraphDependency) => lib.target === 'npm:@sveltejs/kit'))
        const svelteKitLibraries = svelteKitLibrariesName.map(libName => projects[libName as string])
        dependenciesWatch = svelteKitLibraries.map(lib => ({command: `cd ${joinPathFragments(root, lib.root)} && pnpm svelte-package --watch`, prefix: lib.name}))
        svelteKitLibraries.forEach(lib => {
            countDependencies += 1
            logger.info(`${countDependencies}. ${lib.name}`)
        })
    } else logger.info(`Сервер разработки запущен. Изменения в зависимостях не отслеживаются.`)

    const result = await runCommands({
        commands: [...dependenciesWatch, {command: `pnpm vite dev ${portOptions}`}],
        cwd: projects[context.projectName].root,
        parallel: true,
        color: true,
        __unparsed__: [],
    }, context)
    result.success ? logger.info('Dev running...') : logger.error('Error while dev...')
    return result
}