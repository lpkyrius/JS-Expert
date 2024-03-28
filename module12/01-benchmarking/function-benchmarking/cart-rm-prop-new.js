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

            // result.push(JSON.parse(JSON.stringify(new Product(product))))
            // Result:
            // [leandropassoslpkyrius@LeandroPassos function-benchmarking (main ✗)]$ node index.js
            // Cart#rmEmptyPropsMapReduce x 917,113 ops/sec ±0.45% (99 runs sampled)
            // Cart#rmEmptyPropsMapFor x 835,417 ops/sec ±0.26% (98 runs sampled)
            // Fastest is Cart#rmEmptyPropsMapReduce

            // // 1o: verifies every key, if it has no content, delete that key.
            // keys.forEach(key => product[key] || delete product[key])
            // result.push(new Product(product))
            // Result:
            // [leandropassoslpkyrius@LeandroPassos function-benchmarking (main ✗)]$ node index.js
            // Cart#rmEmptyPropsMapReduce x 826,225 ops/sec ±3.58% (92 runs sampled)
            // Cart#rmEmptyPropsMapFor x 2,264,278 ops/sec ±7.40% (81 runs sampled)
            // Fastest is Cart#rmEmptyPropsMapFor
            
            // 2o: verifies every key, if it has no content, delete that key.
            keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
            result.push(new Product(product))
            // Result:
            // [leandropassoslpkyrius@LeandroPassos function-benchmarking (main ✗)]$ node index.js
            // Cart#rmEmptyPropsMapReduce x 846,901 ops/sec ±8.24% (90 runs sampled)
            // Cart#rmEmptyPropsMapFor x 2,507,170 ops/sec ±0.82% (97 runs sampled)
            // Fastest is Cart#rmEmptyPropsMapFor

            // // 3o: creating a new object
            // let newObject = {}
            // keys.forEach(key => {
            //     if(!keys[key]) return;

            //     newObject[key] = keys[key]
            // })
            // result.push(new Product(product))
            // Result:
            // [leandropassoslpkyrius@LeandroPassos function-benchmarking (main ✗)]$ node index.js
            // Cart#rmEmptyPropsMapReduce x 833,276 ops/sec ±10.88% (80 runs sampled)
            // Cart#rmEmptyPropsMapFor x 2,389,879 ops/sec ±0.31% (96 runs sampled)
            // Fastest is Cart#rmEmptyPropsMapFor
        }

        return result
    }
}