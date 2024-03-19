// Docker:
// docker run --name mongodbcontainer -e MONGO_INITDB_ROOT_USERNAME=mongo_user -e MONGO_INITDB_ROOT_PASSWORD=mong0db#$P8 -e MONGO_INITDB_DATABASE=test -p 27017:27017 -d mongo
// or locally with
// brew install mongodb

// Conn
// const client = new MongoClient('mongodb://mongo_user:mong0db#$P8@localhost:27017')