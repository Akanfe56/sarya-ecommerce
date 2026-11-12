import React, { useContext } from 'react'
import ProductItems from './ProductItems'
import { ProductContext } from '../context/ProductContext'


function Featured() {
  const { featured } = useContext(ProductContext)
  return (
    <section>
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#75694f]">Chosen for you</p>
        <h2 className="text-2xl font-bold text-[#0B0500] md:text-3xl">Featured products</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        { featured.map((items) => (
          <ProductItems key={items.id} items={items} />
        ))}
      </div>
    </section>
  )
}

export default Featured
