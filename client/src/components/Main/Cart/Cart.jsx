import React, {useContext, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { countContext } from '../../../context/countContext';
import { Link } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51M9UayJ9f9xA7vNuNxTvPlcfD1EqRYHPnhVotfjz2BSF5poyfW5EhCAwsp46Q7Z1fRSy1MSJOVoybGR5HPqY1bG700sru9rKtQ');

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state=>state.Carts);
    useSelector(state=>state.numberCart);
    let { countProducts, setCount } = useContext(countContext)

    const options = {
        // passing the client secret obtained from the server
        clientSecret: process.env.REACT_APP_CLIENT_SECRET
      };

      console.log(options.clientSecret);
    
  let TotalCart=0;
  
    items.forEach(item => {
        TotalCart+=item.quantity * item.price;
    });

  return (
    <div>
<table className="table">
        <thead className="thead">
            <tr>
                <th></th>
                <th className="th">Name</th>
                <th className="th">Image</th>
                <th className="th">Price</th>
                <th className="th">Quantity</th>
                <th className="th">Total Price</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item, i) => {
                return (
                    <tr key={i} i={i}>
                        <td><Button style={{ cursor: "pointer" }} onClick={()=>{
                        dispatch({
                            type: "DELETE_CART",
                            payload: i
                        })}}>X</Button></td>
                        <td className="td">{item.name}</td>
                        <td className="td"><img src={item.image} alt={item.name} style={{ width: '100px', height: '80px' }} /></td>
                        <td className="td">{item.price} $</td>
                        <td className="tdQuantity">
                            <Button style={{ margin: '2px',cursor: "pointer" }} onClick={() => {
                            dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: i
                            })}}>-</Button>
                            <span className="quantityNumber">{item.quantity}</span>
                            <Button style={{ margin: '2px', cursor: "pointer" }} onClick={() =>{
                            dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: i
                            })}}>+</Button>
                        </td>
                        <td className="td"><b>{(item.price * item.quantity).toFixed(2)} $</b></td>
                    </tr>
                )
            })   }
            <tr>
                <td colSpan="5" className="td">Total: </td>
                <td className="td"><b>{Number(TotalCart).toFixed(2)} $</b></td>
            </tr>
        </tbody>

    </table>
    <div id="payContainer">
    <Link to="/payments"><button id="payButton">Pasarela de pago</button></Link>         
    </div>

    </div>
    
  )
}


export default Cart