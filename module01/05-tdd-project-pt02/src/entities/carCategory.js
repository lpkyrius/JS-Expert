const Base = require('./base/base')
class carCategory extends Base {
    constructor({ id, name, carIds, price }) {
        super({ id, name })

        this.carIds = carIds;
        this.price = price;
        
    }
}

module.exports = carCategory