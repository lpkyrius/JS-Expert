import mocha from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
const { expect } = chai;
import Person from '../src/person.js';

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