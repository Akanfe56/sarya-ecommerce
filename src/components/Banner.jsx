import React from "react";
import { Link } from "react-router";

function Banner() {
  return (
    <div className=' w-full h-[90vh] relative bg-[url("/img/p3.jpg")] bg-cover bg-center'>
      {/* <img src="img/p3.jpg" className='w-full object-cover h-full' alt="" /> */}
      <div className="lg:flex absolute lg:md:top-1/4 top-3 md:block sm:block items-center gap-3 justify-between">
        <div className="md:w-1/2 w-full md:text-start ml-5 text-center  ">
          <h5 className=" md:text-6xl text-5xl  font-bold text-[#0B0500] mb-10">
            Welcome to <span className="text-[#D8F1A0]">Sarya’s Store</span>
          </h5>
          <p className="text-white font-bold text-center mb-5 mr-24">Welcome to Sarya’s Store! Discover a world of fragrances, wristwatches, and fashion—where quality meets style at the best value.</p>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
            <Link
            to="/products"
            className=" bg-[#0B0500] duration-500 hover:bg-[#D8F1A0] hover:text-[#0B0500]  hover:font-bold font-bold text-[#D8F1A0] px-3 py-4 w-[40%]  text-center uppercase rounded-2xl "
          >
            Shop Now
          </Link>
          <Link
            to="/products"
            className=" bg-transparent border-2 border-white  duration-500  text-white font-bold px-3 py-4 w-[40%]  text-center uppercase rounded-2xl "
          >
            See More
          </Link>
          </div>
        </div>
        <div className="bg-white/20 md:w-full sm:w-full my-3 text-black p-6 rounded-2xl shadow-xl lg:w-1/2 mx-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select className="border p-2 rounded">
            <option>Category</option>
            <Link to="/fragrances"><option>Fragrances</option></Link>
            <option>Wristwatches</option>
            <option>Clothes</option>
          </select>

          <select className="border p-2 rounded">
            <option>Brand</option>
            <option>Gucci</option>
            <option>Dior</option>
            <option>Casio</option>
            <option>Nike</option>
          </select>

          <select className="border p-2 rounded">
            <option>Price Range</option>
            <option>$20 - $50</option>
            <option>$50 - $100</option>
            <option>$100+</option>
          </select>

          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Search Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
