const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('../../src/service/carService');
const Transaction = require('./../../src/entities/transaction');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const carsDatabase = join(__dirname, './../../database', "cars.json");

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json')
};

describe('CarService Suite Tests', () => {
    let carService = {
        cars: carsDatabase
    };
    before(() => {
        carService = new CarService({
            cars: carsDatabase
        })
    })
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })
    it('should retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4];
        const result = carService.getRandomPositionFromArray(data);
        // >= (data.length) and <= 0
        expect(result).to.be.lte(data.length).and.be.gte(0) 
    })

    it('should choose the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCarCategory;
        const carIdIndex = 0;

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex);

        const result = carService.chooseRandomCar(carCategory);
        const expected = carCategory.carIds[carIdIndex];
        
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
        expect(result).to.be.equal(expected);
    })

    it('given a carCategory it should return an available car/', async () => {
        const car = mocks.validCar;
        // here we use Object.create to create an unmutable instance to not change the father
        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.carIds = [car.id];

        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name,
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name,
        )

        const result = await carService.getAvailableCar(carCategory);
        const expected = car;

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    })

    it('given a carCategory, customer and numberOfDays it should calculate the final amount in real', async () => {
        const customer = Object.create(mocks.validCustomer); // Object.create() to do not change the instance, do not change the value
        customer.age = 50;

        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.price = 37.6;

        const numberOfDays = 5;

        // age: 50 -> tax: 1.3 -> categoryPrice: 37.6
        // 37.6 * 1.3 = 48.88 * 5 days = 244.40

        // Do not lay in external data
        sandbox.stub(
            carService,
            "taxesBasedOnAge" // can't use .taxBasedOnAge. So, keep it between "" as string
        ).get(() => [{ from: 40, to: 50, then: 1.3 }])

        const expected = carService.currencyFormat.format(244.40);
        const result = carService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
        );

        expect(result).to.be.deep.equal(expected);
    });

    it('given a customer and a car category it should return a transaction receipt', async () => {
        const car = mocks.validCar;
        // now we have to change more than one property
        // so, instead of Object.Create() we use rest spread ...mocks
        // to receive all the properties already in mocks 
        // and change the ones we need
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        };

        const customer = Object.create(mocks.validCustomer);
        customer.age = 20;

        const numberOfDays = 5;
        const dueDate = "10 de novembro de 2020"

        const now = new Date(2020, 10, 5); // month=10 (november) because JS starts with 0, not 1!
        sandbox.useFakeTimers(now.getTime());
        // age: 20, tax: 1.1, price: 37.6
        // 37.6 * 1.1 = 41.36 * 5 = 206.8
        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car);
        
        const expectedAmount = carService.currencyFormat.format(206.8);
        const result = await carService.rent(
            customer, carCategory, numberOfDays
        );

        const expected = new Transaction({
            customer,
            car,
            dueDate,
            amount: expectedAmount,
        });

        expect(result).to.be.deep.equal(expected);

    })
})