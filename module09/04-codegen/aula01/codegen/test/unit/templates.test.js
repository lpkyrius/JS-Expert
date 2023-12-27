import {
    expect,
    describe, 
    test,
    jest,
    beforeEach
} from '@jest/globals'

import templates from './../../src/templates/index.js'
const {
    repositoryTemplate
} = templates;

import {
    repositoryTemplateMock
} from './mocks/index.js'

describe('#Codegen 3-layers arch', () => {
    const componentName = 'product'
    const repositoryName = `${componentName}Repository`

    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    test('#should generate repository template', () => {
        const expected = {
            fileName: repositoryName,
            template: repositoryTemplateMock
        }

        const result = repositoryTemplate(componentName)
        expect(result).toStrictEqual(expected)
    })
    test.todo('#should generate service template')
    test.todo('#should generate factory template')
})