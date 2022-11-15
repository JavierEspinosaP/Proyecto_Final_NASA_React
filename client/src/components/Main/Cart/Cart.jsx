import React, {useContext, useEffect,  useState} from 'react'
import {productsContext} from '../../../context/productsContext'

import ItemCart from './ItemCart'

function Cart() {

  const {products, setProducts} = useContext(productsContext)

  let result = products.filter(
    (item, index) => index === products.findIndex(
      other => item.name === other.name
    ));

  return (
    <div className="cartContainer">
      {result.map((p, i)=>
        <ItemCart data={p}></ItemCart>
      )}
    </div>
  )
}

export default Cart
