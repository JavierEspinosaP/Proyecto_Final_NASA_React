import React, {useContext, useEffect} from 'react'
import {productsContext} from '../../../context/productsContext'

function Cart() {

  const {products, setProducts} = useContext(productsContext)


  let result = products.filter(
    (item, index) => index === products.findIndex(
      other => item.name === other.name
    ));

  return (
    <div className="cartContainer">
      {result.map((p, i)=>
      
      <div className="productDiv">
      <img src={p.img} className="productImg"></img>        
      <p className="productName">Nombre: {p.name}</p>  
      <p className="productMass">Masa: {p.mass} kg</p>
      <p className="productCount">Cantidad: {p.quantity}</p>
      </div>
      
      )}
    </div>
  )
}

export default Cart
