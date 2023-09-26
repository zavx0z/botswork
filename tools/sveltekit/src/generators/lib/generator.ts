import { addDependenciesToPackageJson, addProjectConfiguration, joinPathFragments, formatFiles, generateFiles, installPackagesTask, Tree, runTasksInSerial } from '@nx/devkit'
import * as path from 'path'
import { LibGeneratorSchema } from './schema'

const capitalizeFirstLetter = (str: string): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')

export default async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
	const projectRoot = `libs/${options.name}`
	const libraryName = options.libName ? options.libName : `@lib/${options.name}`
	// команды проекта
	let dependencies = {}
	let devDependencies = {}
	addProjectConfiguration(tree, libraryName, {
		root: projectRoot,
		projectType: 'library',
		sourceRoot: `${projectRoot}/src`,
		targets: {
			dev: {
				executor: '@zavx0z/sveltekit:dev',
				options: {
					port: options.port
				},
				configurations: {
					watch: {
						watchDepthSvelteProjects: [],
						...(options.xstate
							? {
									typegenWatch: true
							  }
							: {})
					},
					...(options.xstate
						? {
								'watch-typegen': {
									typegenWatch: true
								}
						  }
						: {})
				}
			},
			...(options.xstate ? { typegen: { executor: '@zavx0z/machine:typegen' } } : {}),
			build: {
				executor: '@zavx0z/sveltekit:build'
			}
		}
	})
	generateFiles(tree, path.join(__dirname, 'core'), projectRoot, {
		typeLib: options.type === 'ui' ? 'svelte' : 'default',
		capitalizeFirstLetter,
		name: libraryName,
		template: ''
	})

	if (options.xstate) {
		generateFiles(tree, path.join(__dirname, 'xstate'), projectRoot, {
			template: '',
			capitalizeFirstLetter,
			name: libraryName
		})
		dependencies = { ...dependencies, xstate: '^4.38.2' }
		devDependencies = { ...devDependencies, '@xstate/cli': '^0.5.2', '@xstate/inspect': '^0.8.0' }
	}
	if (options.type === 'ui') {
		generateFiles(tree, path.join(__dirname, 'ui'), projectRoot, { name: libraryName, template: '' })
		devDependencies = { ...devDependencies, '@ui/tailwind': 'workspace:*' }
	}
	// запуск действий
	await formatFiles(tree)
	return runTasksInSerial(addDependenciesToPackageJson(tree, dependencies, devDependencies, joinPathFragments(projectRoot, 'package.json')), () => installPackagesTask(tree, true, projectRoot, 'pnpm'))
}
