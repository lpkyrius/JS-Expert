// Docker:

// docker run --name my-mongo -e MONGO_INITDB_ROOT_USERNAME=adm -e MONGO_INITDB_ROOT_PASSWORD=mongo123 -e MONGO_INITDB_DATABASE=test -p 27017:27017 -d mongo
// connecting via shell in mongo and execute the command ‘mongosh -u adm -p mongo123 to connect in mongodb
// docker exec -it my-mongo mongosh -u adm -p mongo123
// or locally with
// brew install mongodb

// Conn
// const client = new MongoClient('mongodb://adm:mongo123@localhost:27017')


import { MongoClient } from 'mongodb'
import { createServer } from 'http'
import { promisify } from 'util'

async function dbConnect() {
    const client = new MongoClient('mongodb://adm:mongo123@localhost:27017')
    await client.connect()
    console.log('mongodb is connected')
    const db = client.db('comics')
    return {
        collections: { heroes: db.collection('heroes')},
        client
    }
}

const { collections, client } = await dbConnect()

async function handler(request, response) {
    for await(const data of request) {
        try {
            const hero = JSON.parse(data)
            await collections.heroes.insertOne({ 
                ...hero,
                updatedAt: new Date().toISOString() 
            })
            const heroes = await collections.heroes.find().toArray()
            console.log({ heroes })
            response.writeHead(200)
            response.write(JSON.stringify({ heroes }))

        } catch (error) {
            console.log('a request error has happened')
            response.writeHead(500)
            response.write(JSON.stringify({ message: 'internal server error!' }))
        } finally {
            response.end()
        }
    }
      
}

// await client.close()

/*
    curl -i localhost:3000 -X POST --data '{"name":"Batman", "age": "80"}'
    or format the result with:
    curl localhost:3000 -X POST --data '{"name":"Batman", "age": "80"}' | jq
*/

const server = createServer(handler)
    .listen(3000, () => console.log('running at 3000', process.pid)) // so we can use kill pid number in terminal

// Let's verify if we got a CTRL+C to finish our APP
// or an orchestrator, such as docker, kills our APP process

const onStop = async (signal) => {
    console.info(`\n${signal} signal received`)
    
    console.log('closing http server')
    // promisify because server.close() uses callback, promises are better
    await promisify(server.close.bind(server))()
    console.log('Http server has closed!')

    // close(true) forces ending
    await client.close()
    console.log('Mongo connection has been closed!')

    // 0 = ok, 1 = error
    process.exit(0); // otherwise CTRL+C would not stop the app and we'd have to use kill to stop it.
}
// SIGINT -> manages CTRL+C
// SIGTERM -> manages kill command
["SIGINT", "SIGTERM"].forEach(event => process.on(event, onStop));

