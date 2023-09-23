import {addProjectConfiguration, formatFiles, generateFiles, installPackagesTask, Tree} from "@nx/devkit"
import * as path from "path"
import {LibGeneratorSchema} from "./schema"

const capitalizeFirstLetter = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const {name, port, type, libName} = options
    const projectRoot = `libs/${name}`
    const libraryName = libName ? libName : name
    addProjectConfiguration(tree, libName, {
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
        name: libName,
        capitalizeFirstLetter,
        template: '',
        typeLib: type === 'ui' ? "svelte" : "default"
    })
    await formatFiles(tree)
    return () => {
        installPackagesTask(tree)
    }
}

export default libGenerator