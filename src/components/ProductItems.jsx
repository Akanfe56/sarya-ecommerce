import React, { useContext} from "react";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { IoMdPricetag } from "react-icons/io";

function ProductItems({ items }) {
  const { addToCart } = useContext(ProductContext);
  return (
    <div className="card bg-white w-full max-w-sm mx-auto border border-gray-300 rounded-3xl shadow-sm relative">
      <div className="absolute h-15 w-15 bg-gray-700 text-white rotate-45  shadow-2xl rounded-full text-center  items-center flex font-bold -top-3 -left-1"><IoMdPricetag /> ${items?.price}</div>
      <img
        src={items?.img || items?.image}
        className="w-full h-48 object-cover rounded-t-lg"
        alt={items?.name}
      />
      <div className="card-body px-3 py-3 space-y-3 mt-2">
        <h4 className="card-title font-semibold text-base sm:text-lg">
          {items?.name}
        </h4>
        <p className="card-text text-sm text-gray-600 line-clamp-2">
          {items?.description}
        </p>
        <p className="card-text text-sm sm:text-base font-medium">
          Price: ${items?.price}
        </p>

        <div className="flex justify-between items-center w-full gap-3">
            <Link
              to={`/details/${items?.id}`}
              className="block flex-1 text-center rounded-lg bg-[#0B0500] duration-500 hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] px-4 py-2 sm:py-3 text-sm sm:text-base"
            >
              See more..
            </Link>

            <button className="block text-center rounded-lg bg-[#0B0500] duration-500 hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] px-4 py-2 sm:py-3 text-sm sm:text-base"
              onClick={() => addToCart(items?.id, 1, items)}
            > <FaShoppingCart size={24} /></button>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;