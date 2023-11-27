const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

// <it could be in another file>
const dbData = [{ name: 'Mary' }, { name: 'John' }];
class MockDatabase {
    connect = () => this;
    find = async (query) => dbData;
}
// </it could be in another file>

rewiremock(() => require('./../src/util/database')).with(MockDatabase);

;(async () => {
    {
        const expected = [{ name: 'MARY' }, { name: 'JOHN' }];
        rewiremock.enable();
        // UserFactory require must be after rewiremock.enable()
        // otherwise it will do all the dependency management before we inject rewiremock
        const UserFactory = require('../src/factory/userFactory');

        const userFactory = await UserFactory.createInstance();
        result = await userFactory.find();
        deepStrictEqual(result, expected);
        rewiremock.disable();
    }
    // {
    //     const expected = [{ name: 'LEANDROPASSOS' }];
    //     const UserFactory = require('../src/factory/userFactory');

    //     const userFactory = await UserFactory.createInstance();
    //     result = await userFactory.find();
    //     deepStrictEqual(result, expected);
    // }
})();