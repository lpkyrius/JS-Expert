import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Writable, Transform } from 'stream'
import csvtojson from 'csvtojson'
import { setTimeout } from 'timers/promises'

const database = process.argv[2]

async function onMessage(msg) {
    const firstTimeRan = []

    await pipeline(
        createReadStream(database),
        csvtojson(),
        Transform({
            transform(chunk, enc, cb) {
                const data = JSON.parse(chunk)
                // if not duplicated, exit
                if (data.Name !== msg.Name) return cb()

                if(firstTimeRan.includes(msg.Name)) {
                    return cb(null, msg.Name)
                }
                
                firstTimeRan.push(msg.Name)
                cb()
            }
        }),
        Writable({
            write(chunk, enc, cb) {
                // if empty chunk, return 
                if(!chunk) return cb()

                process.send(chunk.toString())
            }
        })
    )
}

// process.on('message', (msg) => console.log('msg from child', msg.Name))
process.on('message', onMessage)

// console.log(`I'm ready!!! Child Process: ${process.pid}`, database)

// to say the sub process can be killed for inactivity after 5 secs
await setTimeout(10000)
process.channel.unref()