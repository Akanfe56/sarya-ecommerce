import React, { useContext } from 'react'
import ProductItems from './ProductItems'
import { ProductContext } from '../context/ProductContext'


function featured() {
  const { featured } = useContext(ProductContext)
  return (
    <div className="mt-7">
      <h2 className='uppercase font-bold lg:text-start text-center '>featured Products</h2>
      <div className="parent sm:grid  gap-3 mt-5 block md:grid-cols-2 lg:grid-cols-4">
        { featured.map((items) => (
          <ProductItems key={items.id} items={items} />
        ))}
      </div>
    </div>
  )
}

export default featured
