// Docker:
// docker run --name mongodbcontainer -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mong0db$P8 -e MONGO_INITDB_DATABASE=test -p 27017:27017 -d mongo
// or locally with
// brew install mongodb

// Conn
// const client = new MongoClient('mongodb://mongo_user:mong0db$P8@localhost:27017')

import { MongoClient } from 'mongodb'

async function dbConnect() {
    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect()
    console.log('mongodb is connected')
    const db = client.db('comics')
    return {
        collections: { heroes: db.collection('heroes')},
        client
    }
}

const { collections, client } = await dbConnect()

await collections.heroes.insertOne({ updatedAt: new Date().toUTCString(), name: 'Flash' })
const heroes = await collections.heroes.find().toArray()
console.log({ heroes })