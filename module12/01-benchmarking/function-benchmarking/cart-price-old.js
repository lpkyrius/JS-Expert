export default class Cart {
    constructor({ at, products }) {
        this.products = products
        this.total = this.getCartPrice()
    }

    getCartPrice() {
        return this.products
            .map(product => product.price)
            .reduce((prev, next) => prev + next, 0) // 0 as default just in case
    }
}