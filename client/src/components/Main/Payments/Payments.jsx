import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const stripePromise = loadStripe('pk_test_51M9UayJ9f9xA7vNuNxTvPlcfD1EqRYHPnhVotfjz2BSF5poyfW5EhCAwsp46Q7Z1fRSy1MSJOVoybGR5HPqY1bG700sru9rKtQ');

function Payments() {


const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const items = useSelector(state=>state.Carts);
  useSelector(state=>state.numberCart);

  let TotalCart=0;

  items.forEach(item => {
      TotalCart+=item.quantity * item.price;
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      // receipt_email: document.getElementById('email').value,  LINEA PARA MANDAR MAIL DE CONFIRMACION AL COMPRADOR
      type: 'card',
      card: elements.getElement(CardElement)
    }
    )
    if(!error){
      const {id} = paymentMethod

      const {data} = await axios.post('https://nasa-app-fzbq.onrender.com/api/checkout', {
        id,
        amount: TotalCart * 100
      })
      console.log(data);

      elements.getElement(CardElement).clear();
    }

  }



  return <form onSubmit={handleSubmit} className="checkoutForm">
    <div className="cardContainer">
    <CardContent>
    {items.map((item, i)=>{
      return (
        <Typography gutterBottom variant="p" color="black" fontFamily="Helvetica" component="div">{item.name} x{item.quantity}</Typography>
      )
    })}
    <Typography gutterBottom variant="p" color="black" fontFamily="Helvetica" component="div">Total: {TotalCart}€</Typography>
    </CardContent>
    <CardElement />
    <Button>Buy</Button>         
    </div>
   


  </form>
}

  return (
    <div className="payment">
      <div className="checkoutFormContainer" >
      <div className="infoContainer">
      <p>Para la prueba, introduce la tarjeta X</p>
      <Elements stripe={stripePromise} >
        <CheckoutForm />
      </Elements>               
      </div>
 
      </div>

    </div>
  )
}

export default Payments
