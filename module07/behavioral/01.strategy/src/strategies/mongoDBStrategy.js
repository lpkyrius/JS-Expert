import MongoDB from 'mongodb';

export default class MongoDBStrategy {
    #instance
    constructor(connectionString) {
        const {pathname: dbName} = new URL(connectionString);
        // the mongodb connectionString has no dbName, it comes after.
        this.connectionString = connectionString.replace(dbName, '');
        // now, replaces with '' everything unlike letters (remove special characters)
        this.db = dbName.replace(/\W/, '') 

        this.collection = 'warriors'
    }

    async connect() {
        const client = new MongoDB.MongoClient(this.connectionString
        //     , {
        //     useUnifiedTopology: true // without this we may have warnings 
        // }
        );
        await client.connect();
        const db = client.db(this.db).collection(this.collection);
        this.#instance = db;
    }

    async create(item) {
        return this.#instance.insertOne(item);
    }

    async read(item) {
        return this.#instance.find(item).toArray();
    }
}