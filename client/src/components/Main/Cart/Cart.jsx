import React, {useContext} from 'react'
import {productsContext} from '../../../context/productsContext'

function Cart() {

  const {products, setProducts} = useContext(productsContext)
  return (
    <div>
      {products.map((p)=>
      <p className="name">{p.name}</p>)}
    </div>
  )
}

export default Cart
