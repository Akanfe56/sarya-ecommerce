import React from 'react'
import { Link } from 'react-router'

function Tab() {
  return (
    <div className='grid sm:grid md:grid-cols-2 lg:grid-cols-3 border-black h-auto gap-3 lg:mb-40 mb-5'>
        <div className=' border border-black'>
           <span > <img src="/img/p6.jpg" className='w-full object-cover h-[40vh] ' alt="" /></span>
           <div className='p-3'>
            <p className='uppercase text-center font-bold text-2xl'>Fragnances</p>
           <Link to="/Tab1"> <button type="button" className='mt-5 rounded-md bg-[#0B0500] hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] py-2 md:py-4 px-3 md:px-12 w-full'>Click Here</button></Link>
           </div>
        </div>
        <div className=' border border-black'>
           <span > <img src="/img/W3.jpg" className='w-full object-cover h-[40vh] ' alt="" /></span>
           <div className='p-3'>
            <p className='uppercase text-center font-bold text-2xl'>Wristwatches</p>
           <Link to="/Tab2"> <button type="button" className='mt-5 rounded-md bg-[#0B0500] hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] py-2 md:py-4 px-3 md:px-12 w-full'>Click Here</button></Link>
           </div>
        </div>
        <div className=' border border-black'>
           <span > <img src="/img/c1.jpg" className='w-full object-cover h-[40vh] ' alt="" /></span>
           <div className='p-3'>
            <p className='uppercase text-center font-bold text-2xl'>Clothings</p>
           <Link to="/Tab3"> <button type="button" className='mt-5 rounded-md bg-[#0B0500] hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] py-2 md:py-4 px-3 md:px-12 w-full'>Click Here</button></Link>
           </div>
        </div>
       
    </div>
  )
}

export default Tab
