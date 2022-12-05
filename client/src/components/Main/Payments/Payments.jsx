import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import axios from 'axios'



const stripePromise = loadStripe('pk_test_51M9UayJ9f9xA7vNuNxTvPlcfD1EqRYHPnhVotfjz2BSF5poyfW5EhCAwsp46Q7Z1fRSy1MSJOVoybGR5HPqY1bG700sru9rKtQ');

function Payments() {


// const stripe = require('stripe')('sk_test_51M9UayJ9f9xA7vNuGpGzP415m8EHmZqzY6uBIfaeDcIzAoBu0TAoDL4Ye1UFDlt7hk4GELTX66JZEg59hoUjQfGg00tfBDQSCg');


const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    }
    )
    if(!error){
      const {id} = paymentMethod

      const {data} = await axios.post('http://localhost:3000/api/checkout', {
        id,
        amount: 10000
      })
      console.log(data);
    }

  }
  

  return <form onSubmit={handleSubmit} className="checkoutForm">
    <CardElement/>
    <button>Buy</button>
  </form>
}


  return (
    <div className="payment">
      <div className="checkoutFormContainer" >
      <Elements stripe={stripePromise} >
        <CheckoutForm />
      </Elements>        
      </div>

    </div>
  )
}

export default Payments
