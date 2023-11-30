
import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://leandropassos:senha0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
// only to check if there is any error on connection:
// const result = await postgresContext.connect();
// console.log({ result });
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://leandropassos:senhaadmin@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();

const data = [{
    name: 'leandropassos',
    type: 'transaction'
},{
    name: 'mariasilva',
    type: 'activityLog'
}];

// We don't need to use 'if' blocks on our Strategy Pattern
// Let's use:
// enum:
const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
};

for(const { type, name } of data) {
    const context = contextTypes[type]
    await context.create({ name: name + Date.now()});
    console.log(type, context.dbStrategy.constructor.name);
    console.log(await context.read());
}
// above, does not matter if it is mongodb or postgres, 
// regarding the type, we execute create() then read()

