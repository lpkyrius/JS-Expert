import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'

describe('#RickAndMortyBRLAdapter', () => {
    beforeEach(() => jest.clearAllMocks())
    test('#getCharacters should be an adapter for RickAndMortyBRL.getCharactersJSON', async () => {
        // we know each class calls the correct data (due to the tests already created)
        // we only have to ensure the adapter is calling the correct class
        const brlIntegration = jest.spyOn(
            RickAndMortyBRL, 
            RickAndMortyBRL.getCharactersFromJSON.name
        ).mockResolvedValue([]) // mockResolvedValue to be sure it will not call any API, just return an empty value after reaching the getChar... function

        const result = await RickAndMortyBRLAdapter.getCharacters()
        expect(result).toEqual([])
        
        expect(brlIntegration).toHaveBeenCalled()
    })
})