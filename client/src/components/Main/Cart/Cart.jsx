import React, {useContext, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { countContext } from '../../../context/countContext';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state=>state.Carts);
    useSelector(state=>state.numberCart);
    let { countProducts, setCount } = useContext(countContext)




  
  useEffect(() => {
    if (items.length > 0) {
  const numberCount = items.map(m => m.quantity)
  console.log(numberCount);
  const reduceCount = numberCount.reduce(function(a, b){ return a + b; })    
    setCount(reduceCount)     
    console.log(reduceCount); 
    }

  }, [items])
  
    // console.log(items);
    let TotalCart=0;
    items.forEach(item => {
        TotalCart+=item.quantity * item.price;
    });

  return (
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
  )
}


export default Cart