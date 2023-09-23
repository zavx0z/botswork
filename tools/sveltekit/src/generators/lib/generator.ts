import {addDependenciesToPackageJson, addProjectConfiguration, joinPathFragments, formatFiles, generateFiles, installPackagesTask, Tree, runTasksInSerial} from "@nx/devkit"
import * as path from "path"
import {LibGeneratorSchema} from "./schema"

const capitalizeFirstLetter = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const {name, port, type, libName} = options
    const projectRoot = `libs/${name}`
    const libraryName = libName ? libName : `@lib/${name}`
    addProjectConfiguration(tree, libraryName, {
        root: projectRoot,
        projectType: "library",
        sourceRoot: `${projectRoot}/src`,
        targets: {
            "sveltekit-dev": {
                "options": {
                    "port": port,
                    "watchDepthSvelteProjects": []
                }
            }
        },
    })
    generateFiles(tree, path.join(__dirname, "files"), projectRoot, {
        name: libraryName,
        capitalizeFirstLetter,
        template: '',
        typeLib: type === 'ui' ? "svelte" : "default"
    })

    if (type === 'ui') {
        generateFiles(tree, path.join(__dirname, "uiFiles"), projectRoot, {template: ''})
    }

    await formatFiles(tree)
    return runTasksInSerial(
        addDependenciesToPackageJson(tree, {}, type === 'ui' ? {'@ui/tailwind': "workspace:*"} : {}, joinPathFragments(projectRoot, 'package.json')),
        () => installPackagesTask(tree, true, projectRoot, 'pnpm')
    )
}

export default libGenerator