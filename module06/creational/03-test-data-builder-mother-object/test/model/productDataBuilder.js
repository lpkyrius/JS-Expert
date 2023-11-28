const Product = require("../../src/entities/product");

class ProductDataBuilder {
    constructor() {
        // the default is the correct data
        // the success case
        this.productData = {
            id: '000001',
            name: 'computer',
            price: 1000,
            category: 'electronic'
        }
    }

    static aProduct() {
        return new ProductDataBuilder();
    }
    
    build() {
        const product = new Product(this.productData);
        return product;
    }
}

module.exports = ProductDataBuilder;