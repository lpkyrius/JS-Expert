#!/usr/bin/env node
// we need the line above to create our executable file with the command:
// chmod +x cli-yargs.mjs
// and run it as:
// ./cli-yargs.mjs

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now()})
const { argv } = yargs(hideBin(process.argv))
.command('createHero', 'create a hero', (builder) => {
    return builder
            .option('name', {
                alias: 'n',
                demandOption: true,
                describe: 'hero name', 
                type: 'string'
            })
            .option('age', {
                alias: 'a',
                demandOption: true,
                describe: 'hero age', 
                type: 'number'
            })
            .option('power', {
                alias: 'p',
                demandOption: true,
                describe: 'hero power', 
                type: 'string'
            })
            .example('createHero --name Flash --age 35 --power Speed', 'create a hero')
            .example('createHero --n Batman --a 45 --p Rich', 'create a hero')
})
.epilog('copyright 2023 - Leandro Passos Corporation')

console.log(hero(argv))

// check with the command 'node cli-yargs.mjs --help'
// check with the command 'node cli-yargs.mjs createHero --help '