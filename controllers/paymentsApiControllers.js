const Stripe = require('stripe');

const stripe = new Stripe(process.env.CLIENT_SECRET)


const checkout = async (req, res) => {

    const {id, amount} = req.body
    try{
    const customer = await stripe.customers.create();        
    const payment = await stripe.paymentIntents.create({
        customer: customer.id,
        setup_future_usage: 'off_session',
        amount,
        currency: 'EUR',
        payment_method: id,
        confirm: true

    })


    console.log(payment);
    res.send({message: 'Successful payment'})        
    }
    catch(e){
        console.log(e);
    }



}

module.exports = {checkout}