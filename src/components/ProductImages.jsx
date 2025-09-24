import React from 'react'

function ProductImages() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 justify-start items-center'>
        <div>
            <img src="/img/C2.jpg" alt="" className='w-32 h-32 object-cover' />
        </div>
        <div>
            <img src="/img/C3.jpg" alt="" className='w-32 h-32 object-cover' />
        </div>
        <div>
            <img src="/img/C4.jpg" alt="" className='w-32 h-32 object-cover' />
        </div>
        <div>
            <img src="/img/c1.jpg" alt="" className='w-32 h-32 object-cover' />
        </div>
    </div>
  )
}

export default ProductImages
