"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const { describe, it } = mocha;

const { expect } = chai;


describe('Person', () => {
    it ('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Car 1000000 2000-01-31 2023-02-28'
        )
        const expected = {
            from: '2000-01-31',
            to: '2023-02-28',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '1000000',
            id: '1'
        }

        expect(person).to.be.deep.equal(expected);
    })

    it('should format values', () => {
        const person = new Person({
            from: '2000-01-31',
            to: '2023-02-28',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '1000000',
            id: '1' 
        })
        const result = person.formatted('pt-BR');

        const expected = {
            id: 1,
            vehicles: 'Bike e Car',
            kmTraveled: '1.000.000 km',
            from: '31 de janeiro de 2000',
            to: '28 de fevereiro de 2023'
          }

          expect(result).to.be.deep.equal(expected);
    })
})