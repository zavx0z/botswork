import promClient from "prom-client"


const collectDefaultMetrics = promClient.collectDefaultMetrics
export const register = new promClient.Registry()
collectDefaultMetrics({register})
export const clientCounter = new promClient.Gauge({
    name: 'io_current_clients',
    help: 'Current clients socket.io'
})
register.registerMetric(clientCounter)