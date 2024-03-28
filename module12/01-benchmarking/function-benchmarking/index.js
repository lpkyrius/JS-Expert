import Benchmark from "benchmark";
import CartIdOld from "./cart-id-old.js";
import CartIdNew from "./cart-id-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartRmPropNew from "./cart-rm-prop-new.js";

const suite = new Benchmark.Suite;

// UUID vs Crypto
// suite
//     .add('Cart#cartIdUUID', function() {
//         new CartIdOld()
//     })
//     .add('Cart#cartIdCrypto', function() {
//         new CartIdNew()
//     })
//     // .on('cycle', (event) => console.log(event.target))
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function() {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     } )
//     .run()

const data = {
    products: [
        {
            id: 'ae',
            n: undefined,
            abc: undefined,
            a: null,
            b: 123
        },
        {
            id: 'ae',
            n: undefined,
            abc: undefined,
            a: null,
            b: 123
        }
    ]
}
// Map/Reduce vs For
suite
    .add('Cart#rmEmptyPropsMapReduce', function() {
        new CartRmPropOld(data)
    })
    .add('Cart#rmEmptyPropsMapFor', function() {
        new CartRmPropNew(data)
    })
    // .on('cycle', (event) => console.log(event.target))
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    } )
    // .run()
    .run({ async: true })