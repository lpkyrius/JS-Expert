export default class Cart {
    constructor({ at, products }) {
        this.products = products
        this.total = this.getCartPrice()
    }

    getCartPrice() {
        let price = 0
        for(const product of this.products) {
            price += product.price
        }

        return price;
    }
    //  Reduce
    // [leandropassoslpkyrius@LeandroPassos function-benchmarking (main ✗)]$ node index.js
    // Cart#calcPriceMapReduce x 1,203,875 ops/sec ±2.31% (93 runs sampled)
    // Cart#calcPriceMapFor x 3,493,396 ops/sec ±0.41% (97 runs sampled)
    // Fastest is Cart#calcPriceMapFor
}