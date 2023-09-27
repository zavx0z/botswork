import { DevExecutorSchema } from './schema'
import type { ExecutorContext } from '@nx/devkit'
import { logger, joinPathFragments } from '@nx/devkit'
import { default as runCommands } from 'nx/src/executors/run-commands/run-commands.impl'

const cmdWithEnvironment = (context: ExecutorContext, environmentVariables: {} | undefined, command: string) => {
	if (environmentVariables === undefined || Object.keys(environmentVariables).length === 0) return command
	const crossEnv = joinPathFragments(context.root, context.projectGraph.nodes['zavx0z/sveltekit'].data.root, 'node_modules/.bin/cross-env')
	const envString = Object.entries(environmentVariables).map(([key, value]) => `${key}=${value}`).join(' ')
	logger.info(`Установлены переменные окружения:`)
	Object.keys(environmentVariables).forEach(key => logger.info(`  - ${key}=${environmentVariables[key]}`))
	return `${crossEnv} ${envString} ${command}`
}

export default async function runExecutor(options: DevExecutorSchema, context: ExecutorContext) {
	logger.info('Сервер разработки запущен.')

	let commands = [{ command: cmdWithEnvironment(context, options.env, `pnpm vite dev ${options.port ? `--port ${options.port}` : ''}`) }]

	if (options.typegenWatch) {
		logger.info(`- Генерация типов конечного автомата отслеживает изменения.`)
		commands.push({ command: `xstate typegen "src/**/*.ts?(x)" --watch` })
	}
	if (typeof options.watchDepthSvelteProjects === 'object') {
		const commandFactory = (lib: any) => ({ command: `cd ${joinPathFragments(context.root, lib.root)} && pnpm svelte-package --watch`, prefix: lib.name })

		let depLibs = context.projectGraph.dependencies[context.projectName]
			.map(depObj => depObj.target)
			.filter(depName => Object.keys(context.projectGraph.nodes).includes(depName)) // workspace lib
			.filter(depName => context.projectGraph.dependencies[depName].find(depObj => depObj.target === 'npm:@sveltejs/kit')) // lib dependencies sveltekit
			.map(depName => context.workspace.projects[depName])

		if (!options.watchDepthSvelteProjects.length && depLibs.length)
			logger.info(`- Изменения во всех зависимых библиотеках отслеживаются.`)
		else if (options.watchDepthSvelteProjects.length > 0) {
			depLibs = depLibs.filter(lib => options.watchDepthSvelteProjects.includes(lib.name))
			if (depLibs.length) logger.info(`- Изменения в зависимых библиотеках отслеживаются.`)
		}
		commands.push(...depLibs.map(commandFactory))
		depLibs.forEach((lib, idx) => logger.info(`  ${idx + 1}. ${lib.name}`))
	}
	const result = await runCommands({
		commands: commands,
		cwd: context.workspace.projects[context.projectName].root,
		parallel: true,
		color: true,
		__unparsed__: []
	}, context)
	result.success ? logger.info('Dev running...') : logger.error('Error while dev...')
	return result
}