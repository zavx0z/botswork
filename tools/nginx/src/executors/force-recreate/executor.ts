import {ForceRecreateExecutorSchema} from './schema'
import {execSync} from "child_process"
import {logger} from "@nx/devkit"

export default async function runExecutor(options: ForceRecreateExecutorSchema) {
    logger.info(`Запуск команды docker-compose up --force-recreate --no-deps -d nginx`)
    const {env} = options
    let formattedEnvironment = {}
    if (env && env.length > 0) {
        logger.info(`Переопределенные переменные:`)
        env.forEach((variable, idx) => logger.info(`${idx + 1}: ${variable}`))
        formattedEnvironment = env.reduce((acc, curr) => {
            const [key, val] = curr.split('=')
            acc[key] = val
            return acc
        }, {})
    }
    try {
        execSync('docker-compose up --force-recreate --no-deps -d nginx', {
            env: {...process.env, ...formattedEnvironment},
            stdio: 'inherit',
        })
        console.log('Сборка выполнена.')
        return {success: true}
    } catch (error) {
        console.error('Ошибка сборки.', error)
        return {success: false}
    }
}
