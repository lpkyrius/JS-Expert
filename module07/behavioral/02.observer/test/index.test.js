import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import PaymentSubject from '../src/subjects/paymentSubject';
import Payment from '../src/events/payment';
import Shipment from '../src/events/observers/shipment';
import Marketing from '../src/events/observers/marketing';

describe('Test Suit for Observer Pattern', () => {
    beforeAll(() => {
        // To overwrite the console.log ('a payment ocurred from ...') 
        // and hide it from our tests only, keeping it in production
        jest.spyOn(console, console.log.name).mockImplementation( () => {})
    })
    test('#PaymentSubject notify observers', () => {
        const subject = new PaymentSubject();
        const observer = {
            update: jest.fn() // mock do jest
        }
        const data = 'hello word';
        const expected = data;

        subject.subscribe(observer);
        subject.notify(data);
        
        expect(observer.update).toBeCalledWith(expected);
    })
    test('#PaymentSubject should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject();
        const observer = {
            update: jest.fn() // mock do jest
        }
        const data = 'hello word';

        subject.subscribe(observer);
        subject.unsubscribe(observer);
        subject.notify(data);
        
        expect(observer.update).not.toHaveBeenCalled();
    })
    test('#PaymentSubject should notify subject after a credit card transaction', () => {
        const subject = new PaymentSubject();
        const payment = new Payment(subject);

        const paymentSubjectNotifierSpy = jest.spyOn(
            payment.paymentSubject,
            payment.paymentSubject.notify.name,
        )
        const data = { userName: 'leandropassos', id: Date.now() }
        payment.creditCard(data);

        expect(paymentSubjectNotifierSpy).toBeCalledWith(data);
    })
    test('#All should notify subscribers after a credit card transaction', () => {
        const subject = new PaymentSubject();
        const shipment = new Shipment();
        const marketing = new Marketing();

        const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
        const marketingSpy = jest.spyOn(marketing, marketing.update.name);

        subject.subscribe(shipment);
        subject.subscribe(marketing);

        const payment = new Payment(subject);
        const data = { userName: 'leandropassos', id: Date.now() }
        payment.creditCard(data);

        expect(shipmentSpy).toBeCalledWith(data);
        expect(marketingSpy).toBeCalledWith(data);

    })
})