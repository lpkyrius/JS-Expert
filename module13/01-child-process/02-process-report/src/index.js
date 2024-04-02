import { fork } from 'child_process'
import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Writable } from 'stream'
import csvtojson from 'csvtojson'

// const database = './data/All_Pokemon2.csv'
const database = './data/All_Pokemon.csv'
const PROCESS_COUNT = 30;
const replications = []

const backgroundTaskFile = './src/backgroundTask.js'
const processes = new Map()
// first we instance every process, then we sent it forward
for(let index=0; index<PROCESS_COUNT; index++) {
    const child = fork(backgroundTaskFile, [database])
    child.on('exit', () => {
        console.log(`process ${child.pid} exited`)
        processes.delete(child.pid)
    })
    child.on('error', error => {
        console.log(`process ${child.pid} has an error`, error)
        processes.exit(1)
    })

    child.on('message', msg => {
        // work around for multiprocessing
        if(replications.includes(msg)) return ;

        console.log(`${msg} is replicated`)
        replications.push(msg)
    })
    processes.set(child.pid, child)
}

// Load Balancing using Round Robin
function roundRobin(array, index=0) {
    return function() {
        if(index >= array.length) index = 0

        return array[index++]
    }
}

// turn our processes into an array with processes.values()
// connections pool / load balancer
const getProcess = roundRobin([...processes.values()])
// for(let index = 0; index < 100; index++)
//     console.count(getProcess().pid)
console.log(`starting with ${processes.size} processes`)

await pipeline(
    createReadStream(database),
    csvtojson(),
    Writable({
        write(chunk, enc, cb) {
            const chosenProcess = getProcess()
            chosenProcess.send(JSON.parse(chunk))
            cb()
        }
    })
)