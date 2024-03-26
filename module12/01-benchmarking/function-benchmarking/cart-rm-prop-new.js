import Product from "../src/entities/product.js"

export default class Cart {
    constructor({ at, products }) {
        this.products = this.removeUndefinedProps(products)
    }

    removeUndefinedProps(products) {
        const result = []
        for (const product of products) {
            const keys = Reflect.ownKeys(product)
            if (!keys.length) continue;

            result.push(JSON.parse(JSON.stringify(new Product(product))))
        }

        return result
    }
}