import Payment from "./events/payment.js";
import Marketing from "./events/observers/marketing.js";
import Shipment from "./events/observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject();
const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

// Payment with both being notified
const payment = new Payment(subject);
payment.creditCard({ userName: 'leandropassos', id: Date.now() });

// Payment with only shipment being notified
subject.unsubscribe(marketing);
payment.creditCard({ userName: 'mariazinha', id: Date.now() });
