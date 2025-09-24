import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router"; // for navigation
import { ProductContext } from "../context/ProductContext";

export default function ThankYou() {
  const { createOrder , order } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  useEffect(() => {
    if (tx_ref && transaction_id) {
      createOrder({ tx_ref, transaction_id }).finally(() => setisLoading(false));
    }
  }, [])
  console.log("Order:", order)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center transform transition-all duration-500 hover:scale-105">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
            <svg
              className="w-12 h-12 text-green-600 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>


        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Thank You!
        </h1>

        <p className="text-lg text-gray-600 mb-3">
          Your order has been placed successfully with
        </p>
        <p className="text-2xl font-semibold text-purple-700 mb-6">
          🌟 Sarya Stores 🌟
        </p>


        <p className="text-gray-500 mb-8">
          We’re processing your order and you’ll receive a confirmation email
          shortly.  
          Redirecting you to the homepage...
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Back to Home
        </Link>
        </div>
      </div>
    </div>
  );
}
