import { expect, describe, test, jest, beforeEach }  from '@jest/globals'
import fs from 'fs/promises'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'
import Character from '../../src/entities/character'
import axios from 'axios'

describe('#RickAndMortyBRL', () => {
    beforeEach(() => jest.clearAllMocks())
    
    test('#getCharactersJSON should return a list of Character Entity', async () => {
        const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'))
        const expected = response.results.map(char => new Character(char))
        // let's mock what axios does (returns the 'data' object and within 'response' in this case)
        // comment the line below if you prefer to test using the real URL defined in rickAndMortyBRL.js
        // but -> the test will not pass due to the new result, unlike the ./test/mocks/characters.json
        jest.spyOn(axios, "get").mockResolvedValue({ data: response })

        const result = await RickAndMortyBRL.getCharactersFromJSON()
        expect(result).toStrictEqual(expected)
        
    })
    test('#getCharactersJSON should return an empty list if the API returns nothing', async () => {
        const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'))
        const expected = response.results
        jest.spyOn(axios, "get").mockResolvedValue({ data: response })

        const result = await RickAndMortyBRL.getCharactersFromJSON()
        expect(result).toStrictEqual(expected)
        
    })
})