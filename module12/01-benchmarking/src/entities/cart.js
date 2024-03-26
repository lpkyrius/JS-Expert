import Product from "./product.js"
import { v4 as uuid } from 'uuid'

export default class Cart {
    constructor({ at, products }) {
        this.id = uuid()
        this.at = at
        this.products = this.removeUndefinedProps(products)
        this.total = this.getCartPrice()
    }

    removeUndefinedProps(products) {
        // length will return the quantity of {} inside the object
        // by converting to boolean it will return false when the quantity = 0, ignoring that object
        // if it's true (has 1 or more), it will return the object 
        const productsEntities = products
            .filter(product => !!Reflect.ownKeys(product).length)
            .map(product => new Product(product))

        // JSON.stringify() removes the keys with undefined values
        // JSON.parse() will return the object to a JSON
        return JSON.parse(JSON.stringify(productsEntities))
    }

    getCartPrice() {
        return this.products
            .map(product => product.price)
            .reduce((prev, next) => prev + next, 0) // 0 as default just in case
    }
}