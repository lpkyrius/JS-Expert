import {
    expect,
    describe, 
    test,
    jest,
    beforeEach
} from '@jest/globals'

import { createLayersIfNotExists } from '../../src/templates/createLayers.js'

import fsPromises from 'fs/promises'
import fs from 'fs'

describe('#Layers - Folder Structure', () => {

    const defaultLayers = ['service', 'factory', 'repository']
    
    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    test('should create a folder if it does not exist', async () => {
        // even if there is no space in disk - since it is an external issue - 
        // our test should still pass (so, let's spyOn)
        // fsPromises.mkdir should always returns that it created the folder
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
        // fs.existsSync should always returns the folder does not exist (false)
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false) 
        // mainPath: '' because it will not call from Node, we're testing only the logic
        await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
    })
    test('should not create a folder if it exists', async () => {
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true) 

        await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
        expect(fsPromises.mkdir).not.toHaveBeenCalled()
    })

})