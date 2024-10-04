import * as Yup from "yup";
//import Stripe from "stripe";
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//import 'dotenv/config'
const stripe = require("stripe")('sk_test_51Q5Ci5FbYEC7Vq59ciApq0pLBtI6RFOqujQUlKPgDDbtgA8ziVI7c5f2IY5yNj7Dqrcz4B1kNRbLhAbDiEsFyxce00nnRu0V00');




const calculateOrderAmout = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc
    }, 0)

    return total
}


class CreatePaymentIntent {
    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array()
                .required()
                .of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                        price: Yup.number().required(),

                    })
                ),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { products } = request.body

        const amount = calculateOrderAmout(products)

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "brl",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        response.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    }
}

export default new CreatePaymentIntent();
