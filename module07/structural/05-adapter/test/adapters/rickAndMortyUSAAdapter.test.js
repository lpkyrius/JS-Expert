import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'

describe('#RickAndMortyUSAAdapter', () => {
    beforeEach(() => jest.clearAllMocks())
    test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersJSON', async () => {
        // we know each class calls the correct data (due to the tests already created)
        // we only have to ensure the adapter is calling the correct class
        const usaIntegration = jest.spyOn(
            RickAndMortyUSA, 
            RickAndMortyUSA.getCharactersFromXML.name
        ).mockResolvedValue([]) // mockResolvedValue to be sure it will not call any API, just return an empty value after reaching the getChar... function

        const result = await RickAndMortyUSAAdapter.getCharacters()
        expect(result).toEqual([])
        
        expect(usaIntegration).toHaveBeenCalled()
    })
})