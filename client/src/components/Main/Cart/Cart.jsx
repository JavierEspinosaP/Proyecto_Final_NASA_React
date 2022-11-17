import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state=>state.Carts);
    useSelector(state=>state.numberCart);

    console.log(items);
    let TotalCart=0;
    items.forEach(item => {
        TotalCart+=item.quantity * item.price;
    });

  return (
    <table className="table">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item, i) => {
                return (
                    <tr key={i} i={i}>
                        <td><button style={{ cursor: "pointer" }} onClick={()=>{
                        dispatch({
                            type: "DELETE_CART",
                            payload: i
                        })}}>X</button></td>
                        <td>{item.title}</td>
                        <td><img src={item.image} alt={item.name} style={{ width: '100px', height: '80px' }} /></td>
                        <td>{item.price} $</td>
                        <td>
                            <button style={{ margin: '2px',cursor: "pointer" }} onClick={() => {
                            dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: i
                            })}}>-</button>
                            <span style={{ color: 'white'}}>{item.quantity}</span>
                            <button style={{ margin: '2px', cursor: "pointer" }} onClick={() =>{
                            dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: i
                            })}}>+</button>
                        </td>
                        <td><b>{parseInt(item.price * item.quantity).toFixed(2)} $</b></td>
                    </tr>
                )
            })   }
            <tr>
                <td colSpan="5">Total: </td>
                <td><b>{Number(TotalCart).toFixed(2)} $</b></td>
            </tr>
        </tbody>

    </table>
  )
}


export default Cart