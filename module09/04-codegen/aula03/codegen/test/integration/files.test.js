import {
    expect,
    describe, 
    test,
    jest,
    beforeEach,
    beforeAll,
    afterAll
} from '@jest/globals'

import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from './../../src/createLayers.js'
import { createFiles } from './../../src/createFiles.js'
import Util from '../../src/util.js'

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
    return layers.map(layer => {
        // factory
        // factory/heroesFactory.js
        const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
        // mainPath: /Documents/project/jsexpert
        // defaultMainFolder: src
        // layer: factory
        // filename: heroesFactory.js

        return join(mainPath, defaultMainFolder, layer, filename)
    })
}

describe('#Integration - Files - Files Structure', () => {

    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // let's use sort because the system returns it in alphabetic order
        layers: ['service', 'factory', 'repository'].sort(),
        componentName: 'heroes'
    }
    // as we don't have the relative path we believe the command will run 
    // from the package.json at root, so, we initialize from folder test
    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks', packageJSON)
 
    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
        await fsPromises.copyFile(
            packageJSONLocation,
            join(config.mainPath, packageJSON)
        )
        await createLayersIfNotExists(config)
    })

    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true }) // recursive to kill any child folder
    })

    test('Repository class should have create, read, update and delete methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository']
        }

        await createFiles(myConfig)

    })
    test.todo('Service class should have the same signature of repository and call all its methods')
    test.todo('Factory instance should match layers')

})