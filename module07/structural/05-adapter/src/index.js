import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

// since all of them have the same signature 'getCharacters'
// just need the same signature and result data pattern
const data = [
    RickAndMortyBRLAdapter,
    RickAndMortyUSAAdapter
].map(integration => integration.getCharacters())

// to split successful and not successful results into different objects
const all = await Promise.allSettled(data)

// let's filter
// 'full\filed' will be mapped grabbing the value 
// reduce will merge BRL and USA data,
// we extract value 
const successes = all.filter(({ status }) => status === "fulfilled")
                    .map(({ value }) => value)
                    .reduce((prev, next) => prev.concat(next), []) // empty [] to be a default value

const errors = all.filter(({ status }) => status === 'rejected')

console.table(successes)
console.table(errors)