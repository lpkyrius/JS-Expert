$.verbose = false // to disable the zx log

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'
await $`docker run -p "8080:80" -d nginx`
await setTimeout(500) // waiting the docker start
const req = await $`curl --silent localhost:8080`
console.log(`req\n`, req.stdout)

const containers = await $`docker ps`


// const exp = /(?<containerId>\w+)\W+(?=nginx)(x+x_)+y/ // unsafe regex to test
const exp = /(?<containerId>\w+)\W+(?=nginx)/
if(!isSafe(exp)) throw new Error('unsafe regex!!')

// console.log(containers.toString().match(exp))
const { groups: { containerId } } = containers.toString().match(exp)
console.log(containerId)

const logs = await $`docker logs ${containerId}`
console.log(`logs\n`, logs.stdout)

const rm = await $`docker rm -f ${containerId}`
console.log(`rm -f\n`, rm.stdout)

// to check the time spent for this, use the command:
// time node index.js