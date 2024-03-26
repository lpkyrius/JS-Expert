import Benchmark from "benchmark";
import CartIdOld from "./cart-id-old.js";
import CartIdNew from "./cart-id-new.js";

const suite = new Benchmark.Suite;

suite
    .add('Cart#cartIdUUID', function() {
        new CartIdOld()
    })
    .add('Cart#cartIdCrypto', function() {
        new CartIdNew()
    })
    // .on('cycle', (event) => console.log(event.target))
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    } )
    .run()