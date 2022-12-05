const Stripe = require('stripe');

const stripe = new Stripe(process.env.CLIENT_SECRET)


const checkout = async (req, res) => {

    const {id, amount} = req.body
    try{
    const payment = await stripe.paymentIntents.create({
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