// CLI for memory management:
// npm i -D climem 

// Node built-in:
// [leandropassoslpkyrius@LeandroPassos 02-memleak-events (main ✗)]$ node 
// Welcome to Node.js v21.7.1.
// Type ".help" for more information.
// > process.memoryUsage()
// {
//   rss: 41353216, (resident set site - memory main machine is using)
//   heapTotal: 6275072, (allocated)
//   heapUsed: 5097536,
//   external: 2191985,
//   arrayBuffers: 10535
// }
// > 

// For load tests
// npm i -D autocannon
// package.json
// "test": "npm autocannon -c 100 -d 30 -p 10 http://localhost:3000"
//  -c users -d time in seconds, -p pipeline in 10


// Analyse and find the line with the memory leak:
// npm i -D 0x

// even more powefull
// npm i -D clinic
// npx clinic --help

// to check if are there any process using the port:
// lsof -i :3000 

import { createServer } from 'http'
import Events from 'events'
import { randomBytes } from 'crypto'

const myEvent = new Events()

function getBytes() {
    return randomBytes(10000)
}

function onData() {
    getBytes()
    const items = []
    // setInterval(function myInterval() { items.push(Date.now()) })
}

myEvent.on('data', onData)
createServer(function handler(request, response) {
    // myEvent.on('data', onData) //  this line should be 2 lines above, before the createServer()

    myEvent.emit('data', Date.now())

    response.end('ok 👍')
}).listen(3000, () => console.log('running at 3000'))


// while everything was ok:
// [leandropassoslpkyrius@LeandroPassos 02-memleak-events (main ✗)]$ npm t

// > 02-memleak-events@1.0.0 test
// > npx autocannon -c 100 -d 30 -p 10 http://localhost:3000

// Running 30s test @ http://localhost:3000
// 100 connections with 10 pipelining factor


// ┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬────────┐
// │ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max    │
// ├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼────────┤
// │ Latency │ 3 ms │ 8 ms │ 13 ms │ 21 ms │ 7.41 ms │ 5.65 ms │ 353 ms │
// └─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴────────┘
// ┌───────────┬─────────┬─────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
// │ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg       │ Stdev     │ Min     │
// ├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
// │ Req/Sec   │ 49,535  │ 49,535  │ 135,679 │ 139,647 │ 126,932.8 │ 20,286.43 │ 49,522  │
// ├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
// │ Bytes/Sec │ 6.39 MB │ 6.39 MB │ 17.5 MB │ 18 MB   │ 16.4 MB   │ 2.62 MB   │ 6.39 MB │
// └───────────┴─────────┴─────────┴─────────┴─────────┴───────────┴───────────┴─────────┘

// Req/Bytes counts sampled once per second.
// # of samples: 30

// 3809k requests in 30.03s, 491 MB read


// When we forced the memory leak:
// [leandropassoslpkyrius@LeandroPassos 02-memleak-events (main ✗)]$ npm t

// > 02-memleak-events@1.0.0 test
// > npx autocannon -c 100 -d 30 -p 10 http://localhost:3000

// Running 30s test @ http://localhost:3000
// 100 connections with 10 pipelining factor


// ┌─────────┬──────┬────────┬─────────┬─────────┬───────────┬────────────┬─────────┐
// │ Stat    │ 2.5% │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev      │ Max     │
// ├─────────┼──────┼────────┼─────────┼─────────┼───────────┼────────────┼─────────┤
// │ Latency │ 6 ms │ 290 ms │ 4301 ms │ 4464 ms │ 747.97 ms │ 1061.87 ms │ 6088 ms │
// └─────────┴──────┴────────┴─────────┴─────────┴───────────┴────────────┴─────────┘
// ┌───────────┬─────┬──────┬─────┬────────┬─────────┬─────────┬──────┐
// │ Stat      │ 1%  │ 2.5% │ 50% │ 97.5%  │ Avg     │ Stdev   │ Min  │
// ├───────────┼─────┼──────┼─────┼────────┼─────────┼─────────┼──────┤
// │ Req/Sec   │ 0   │ 0    │ 0   │ 1,525  │ 104.17  │ 287.9   │ 31   │
// ├───────────┼─────┼──────┼─────┼────────┼─────────┼─────────┼──────┤
// │ Bytes/Sec │ 0 B │ 0 B  │ 0 B │ 197 kB │ 13.4 kB │ 37.1 kB │ 4 kB │
// └───────────┴─────┴──────┴─────┴────────┴─────────┴─────────┴──────┘

// Req/Bytes counts sampled once per second.
// # of samples: 30

// 160k requests in 30.12s, 403 kB read
// 17k errors (2k timeouts)