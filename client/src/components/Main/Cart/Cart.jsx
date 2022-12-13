import React, { useContext, useEffect } from 'react';
import ReactDOM from "react-dom"
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { countContext } from '../../../context/countContext';
import { Link } from "react-router-dom";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.Carts);
    useSelector(state => state.numberCart);


    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);
    }


    let TotalCart = 0;



    items.forEach(item => {
        TotalCart += item.quantity * item.price;
    });
    
    // This values are the props in the UI
    const amount = String(TotalCart.toFixed(2))
    const currency = "USD";
    const style = { "layout": "vertical", "maxWidth": "200px", "minHeight": "200px" };

    return (
        <div className="Cart">
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
                                <td><Button style={{ cursor: "pointer" }} onClick={() => {
                                    dispatch({
                                        type: "DELETE_CART",
                                        payload: i
                                    })
                                }}>X</Button></td>
                                <td className="td">{item.name}</td>
                                <td className="td"><img src={item.image} alt={item.name} style={{ width: '100px', height: '80px' }} /></td>
                                <td className="td">{item.price} $</td>
                                <td className="tdQuantity">
                                    <Button style={{ margin: '2px', cursor: "pointer" }} onClick={() => {
                                        dispatch({
                                            type: "DECREASE_QUANTITY",
                                            payload: i
                                        })
                                    }}>-</Button>
                                    <span className="quantityNumber">{item.quantity}</span>
                                    <Button style={{ margin: '2px', cursor: "pointer" }} onClick={() => {
                                        dispatch({
                                            type: "INCREASE_QUANTITY",
                                            payload: i
                                        })
                                    }}>+</Button>
                                </td>
                                <td className="td"><b>{(item.price * item.quantity).toFixed(2)} $</b></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan="5" className="td">Total: </td>
                        <td className="td"><b>{Number(TotalCart).toFixed(2)} $</b></td>
                    </tr>
                </tbody>

            </table>
            <div id="payContainer">
                <div style={{ maxWidth: "200px", minHeight: "200px" }}>
                    <PayPalScriptProvider>
                        <PayPalButtons
                            style={style}
                            disabled={false}
                            forceReRender={[amount, currency, style]}
                            fundingSource="paypal"
                            createOrder={(data, actions) => {
                                return actions.order
                                    .create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: currency,
                                                    value: amount,
                                                },
                                            },
                                        ],
                                    })
                                    .then((orderId) => {
                                        // Your code here after create the order
                                        return orderId;
                                    });
                            }}
                            onApprove={function (data, actions) {
                                return actions.order.capture().then(function () {
                                    // Your code here after capture the order
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>


        </div>

    )
}


export default Cart