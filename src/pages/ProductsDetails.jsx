import React, { useContext} from 'react'
import Container from '../components/shared/Container'
import { useParams } from 'react-router'
import { ProductContext } from '../context/ProductContext'
// import Relatad
import ProductImages from '../components/ProductImages'
import RelatedProducts from '../components/RelatedProducts'

function ProductDetails() {
    const { product, addToCart } = useContext(ProductContext)
    const { id } = useParams();
    // console.log(id)
    const showItem = product.find((item) => parseInt(item.id) === parseInt(id))
  return (
    <Container>
      {/* <h2 className='font-bold mt-5'>{ showItem?.name }</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between mt-12 gap-3">
        <div className='col-span-1'>
            <img src={showItem?.img || showItem?.image} className='w-full h-[75vh] object-cover' alt="" />
        </div>
        <div className='col-span-1 space-y-4'>
            <h1>{showItem?.name}</h1>
            <div>
                <h4 className='font-semibold'>Product Description</h4>
                <p>{showItem?.description}</p>
            </div>
            <p>Price: ${showItem?.price}</p>
            {console.log(showItem?.id, 1, showItem)}
            <button className="banner-button bg-[#0B0500] duration-500  hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] px-4 py-3 rounded-2xl"
              onClick={() => addToCart(showItem?.id, 1, showItem)}
            >Add to Cart</button>

            <div>
                <ProductImages />
            </div>
        </div>
        <div className='col-span-3'>
            <RelatedProducts />
        </div>
      </div>
    </Container>
  )
}

export default ProductDetails