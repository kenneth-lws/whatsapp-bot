import cluster from 'cluster'
import { getEnvConfig } from '../../config/config'

const getNumberOfCluster = () => Number(getEnvConfig().NUM_OF_CLUSTER) || 1

const forkCluster = () => {
    const numberOfCluster = getNumberOfCluster()

    for (let i = 0; i < numberOfCluster; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died, start new worker`)
        cluster.fork()
    })
}

export const startCluster = async (startServer: () => Promise<void>) => {
    const numberOfCluster = getNumberOfCluster()

    if (numberOfCluster <= 1) {
        await startServer()
    } else if (cluster.isPrimary) {
        forkCluster()
    } else {
        await startServer()
    }
}
