"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const stripe = require('stripe')('sk_test_51J0U0NAHIFpzuWxfoMuq1xgQ9r28fLiClDx64hzFrMqSnuxKkkt5IFE2VLFr4GvbuheTzzxe1SN9kSPNmBhMdFiF00eSa86QkO');
class ShopsController {
    async createCheckoutSession({ response, request }) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: 'seleshi17@gmail.com',
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: request.body().name,
                        },
                        currency: 'usd',
                        unit_amount: request.body().price,
                    },
                    quantity: 1,
                    description: "Class scheduled for " + request.body().when,
                },
            ],
            payment_intent_data: {
                application_fee_amount: 0,
            },
            mode: 'payment',
            success_url: 'https://thegarden614.com/success',
            cancel_url: 'https://thegarden614.com/'
        }, {
            stripeAccount: request.body().accountId,
        });
        response.json({ id: session.id });
    }
    async webhook({ request, response }) {
        const payloadString = JSON.stringify(request.body(), null, 2);
        const secret = 'whsec_OI6EYTFwXVvfQqb0tgXczcgn5Quuv67E';
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });
        let event;
        try {
            event = stripe.webhooks.constructEvent(payloadString, header, secret);
        }
        catch (err) {
            console.log(err);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }
        if (event.type === 'checkout.session.completed') {
            var str = event.data.object.amount_total;
            console.log(str);
            await Mail_1.default.send((message) => {
                message
                    .from('info@thegarden614.com')
                    .to(event.data.object.customer_details.email)
                    .subject('Payment Confirmation')
                    .htmlView('emails/payment_confirmation', { name: event.name, message: event, price: str });
            });
            console.log(payloadString);
            console.log('payment success full you can send a fulfillment mail ');
        }
        response.json({ received: true });
    }
}
exports.default = ShopsController;
//# sourceMappingURL=ShopsController.js.map