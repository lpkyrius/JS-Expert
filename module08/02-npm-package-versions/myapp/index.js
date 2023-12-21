// to import from directory fluentsql-jest-tdd-yt use the command below in package.json:
// "start": "node --experimental-json-modules index.js",
// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt"

// But to use the npm package generated, the command should be:
// "start": "node --experimental-specifier-resolution=node index.js",
import FluentSQLBuilder from '@lpkyrius/fluentsql'

import database from './database/data.json' assert { type: "json" }

const result = FluentSQLBuilder.for(database)
    .where({ registered: /^(2020|2019)/})
    .select(['name'])
    .limit(3)
    // .groupCount('name')
    .countBy('name')
    .build()

console.log({ result })