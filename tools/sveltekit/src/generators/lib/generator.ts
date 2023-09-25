import {
    addDependenciesToPackageJson,
    addProjectConfiguration,
    joinPathFragments,
    formatFiles,
    generateFiles,
    installPackagesTask,
    Tree,
    runTasksInSerial
} from "@nx/devkit"
import * as path from "path"
import {LibGeneratorSchema} from "./schema"
import {build, dev} from "../../utils/targets"
import {machineTypegenTarget} from "@zavx0z/machine/src/utils/targets"

const capitalizeFirstLetter = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const projectRoot = `libs/${options.name}`
    const libraryName = options.libName ? options.libName : `@lib/${options.name}`
    // команды проекта
    let targets = {...dev({port: options.port, watchDepthSvelteProjects: []}), ...build({})}
    let dependencies = {}
    let devDependencies = {}

    if (options.xstate)
        targets = {...machineTypegenTarget({watch: false}), ...targets}
    addProjectConfiguration(tree, libraryName, {
        root: projectRoot,
        projectType: "library",
        sourceRoot: `${projectRoot}/src`,
        targets: targets,
    })
    generateFiles(tree, path.join(__dirname, "core"), projectRoot, {
        typeLib: options.type === 'ui' ? "svelte" : "default",
        capitalizeFirstLetter,
        name: libraryName,
        template: ''
    })

    if (options.xstate) {
        generateFiles(tree, path.join(__dirname, "xstate"), projectRoot, {template: ''})
        dependencies = {...dependencies, "xstate": "^4.38.2"}
        devDependencies = {...devDependencies, "@xstate/cli": "^0.5.2", "@xstate/inspect": "^0.8.0"}
    }
    if (options.type === 'ui') {
        generateFiles(tree, path.join(__dirname, "ui"), projectRoot, {name: libraryName, template: ''})
        devDependencies = {...devDependencies, '@ui/tailwind': "workspace:*"}
    }
    // запуск действий
    await formatFiles(tree)
    return runTasksInSerial(
        addDependenciesToPackageJson(tree, dependencies, devDependencies, joinPathFragments(projectRoot, 'package.json')),
        () => installPackagesTask(tree, true, projectRoot, 'pnpm')
    )
}

export default libGenerator