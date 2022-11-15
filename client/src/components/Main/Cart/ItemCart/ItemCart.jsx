import React, {useState} from 'react';
import Button from '@mui/material/Button';

function ItemCart(props) {

  const [quantity, setQuantity] = useState(1)

  const styles= {
    color: 'white',
    'font-size': 16
  }


  const handleDecrement = () => {
    setQuantity(quantity-1)
  }

  const handleIncrement = () => {
    setQuantity(quantity+1)
  }


  const data = props.data



  return (<div className="productDiv">

      <img src={data.img} className="productImg"></img>      
      <div className="itemData">
      <p className="productData">Nombre: {data.name}</p>  
      <p className="productData">Masa: {data.mass} kg</p>
      <p className="productData">Precio: {data.price} €</p>
      <div className="quantity">
      <Button onClick={handleDecrement} sx={styles}>-</Button>
      <p className="productData">{quantity}</p>
      <Button onClick={handleIncrement} sx={styles}>+</Button>        
      </div>        
        </div>  
      </div>
  )
}

export default ItemCart
