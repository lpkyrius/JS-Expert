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

function getAllFunctionsFromInstance(instance) {
    // let's return an array with all the functions within an instance, except the constructor 
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
        .filter(method => method !== 'constructor')
}

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
        const [ repositoryFile ] = generateFilePath(myConfig)
        const { default: Repository } = await import(repositoryFile)
        // test/unit/mocks/repositoryTemplate.js returns Promise.reject("method not implemented!") for every function
        // so, let's test if the created file/class will returns it to validate it is a valid JS Object
        const instance = new Repository()
        const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual("method not implemented!")

        expectNotImplemented(instance.create)
        expectNotImplemented(instance.read)
        expectNotImplemented(instance.update)
        expectNotImplemented(instance.delete)
    })
    test('Service class should have the same signature of repository and call all its methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }

        await createFiles(myConfig)
        const [ repositoryFile, serviceFile ] = generateFilePath(myConfig)

        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)

        const repository = new Repository()
        const service = new Service({ repository }) // the service needs a repository for its constructor
       
        const allRepositoryMethods = getAllFunctionsFromInstance(repository)

        allRepositoryMethods
            .forEach(method => jest.spyOn(repository, method).mockResolvedValue())
        
        // to execute every service method, .call() to execute the instance [] for no parameters
        getAllFunctionsFromInstance(service)
            .forEach(method => service[method].call(service, []))

        allRepositoryMethods
            .forEach(method => expect(repository[method]).toHaveBeenCalled())
    })
    test('Factory instance should match layers', async () => {
        const myConfig = {
            ...config
        }

        await createFiles(myConfig)

        // config > layers has a .sort(). So, we must send the parameters in alphabetic order f > r > s
        const [factoryFile, repositoryFile, serviceFile] = generateFilePath(myConfig)

        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const { default: Factory } = await import(factoryFile)

        const expectedInstance = new Service({ repository: new Repository() })
        const instance = Factory.getInstance()

        expect(instance).toMatchObject(expectedInstance)
        expect(instance).toBeInstanceOf(Service)

    })

})