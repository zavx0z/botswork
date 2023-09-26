import {
	addDependenciesToPackageJson,
	addProjectConfiguration,
	joinPathFragments,
	formatFiles,
	generateFiles,
	installPackagesTask,
	Tree,
	runTasksInSerial
} from '@nx/devkit'
import * as path from 'path'
import { LibGeneratorSchema } from './schema'

const capitalizeFirstLetter = (str: string): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')

export default async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
	addProjectConfiguration(tree, options.libName, {
		root: options.directory,
		projectType: 'library',
		sourceRoot: `${options.directory}/src`,
		targets: {
			dev: {
				executor: '@zavx0z/sveltekit:dev',
				options: {
					port: options.port
				},
				configurations: {
					watch: {
						watchDepthSvelteProjects: [],
						...(options.xstate ? { typegenWatch: true } : {})
					},
					...(options.xstate ? { 'watch-typegen': { typegenWatch: true } } : {})
				}
			},
			...(options.xstate ? { typegen: { executor: '@zavx0z/machine:typegen' } } : {}),
			build: {
				executor: '@zavx0z/sveltekit:build'
			}
		}
	})
	generateFiles(tree, path.join(__dirname, 'core'), options.directory, {
		typeLib: options.type === 'ui' ? 'svelte' : 'default',
		capitalizeFirstLetter,
		name: options.libName,
		template: ''
	})
	if (options.xstate)
		generateFiles(tree, path.join(__dirname, 'xstate'), options.directory, {
			template: '',
			capitalizeFirstLetter,
			name: options.libName
		})
	await formatFiles(tree)

	return runTasksInSerial(
		addDependenciesToPackageJson(tree,
			{
				...(options.xstate ? { xstate: '^4.38.2' } : {})
			},
			{
				'@lib/ui': 'workspace:*',
				...(options.xstate ? { '@xstate/cli': '^0.5.2', '@xstate/inspect': '^0.8.0' } : {})
			},
			joinPathFragments(options.directory, 'package.json')
		),
		() => installPackagesTask(tree, true, options.directory, 'pnpm'))
}
