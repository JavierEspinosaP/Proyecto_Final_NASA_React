import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

function ItemCart(props) {

  const [quantity, setQuantity] = useState(props.quantity)

  const styles= {
    color: 'white',
    'font-size': 16
  }

  useEffect(() => {
 console.log(quantity);
  }, [quantity])
  


  const handleDecrement = () => {
    console.log(quantity);
    console.log(props.quantity)
    if (quantity<props.quantity) {
      setQuantity(props.quantity-1)
    }
    else{
    setQuantity(quantity-1)}   
    

  }

  const handleIncrement = () => {
    console.log(quantity);
    console.log(props.quantity)
    if (quantity>props.quantity) {
      setQuantity(quantity+1)
    }
    else{
    setQuantity(props.quantity+1)      
    }

  }


  const data = props.data
  const remove = props.remove



  return (<div className="productDiv">

      <img src={data.img} className="productImg"></img>      
      <div className="itemData">
      <p className="productData">Nombre: {data.name}</p>  
      <p className="productData">Masa: {data.mass} kg</p>
      <p className="productData">Precio: {data.price} €</p>
      <div className="quantity">
      <Button onClick={handleDecrement} sx={styles}>-</Button>
      <p className="productData">{quantity>1?quantity:data.quantity}</p>
      <Button onClick={handleIncrement} sx={styles}>+</Button>        
      </div>        
      </div>  
      <Button onClick={remove}>Borrar</Button>
      </div>
  )
}

export default ItemCart
