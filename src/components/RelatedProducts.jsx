import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductItems from './ProductItems'

function RelatedProducts() {
    const { latest } = useContext(ProductContext)
  return (
    <div className='mt-7'>
    <h2 className='uppercase font-bold '>Related Products</h2>
        <div className="parent grid grid-cols-4 gap-3 mt-7">
            { latest.map((items) => (
                <ProductItems key={items.id} items={items}/>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts
