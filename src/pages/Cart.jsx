import React, { useContext } from "react";
import Container from "../components/shared/Container";
import { Link } from "react-router";
import { FaRegTrashAlt } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";

function Cart() {
  const {
    cartItems,
    updateCart,
    deleteCart,
    calcSubtotal,
    calcVat,
    calcTotal,
  } = useContext(ProductContext);
  return (
    <Container className={"my-12 "}>
      <div className="space-y-3">
        <h1>Your Shopping Cart</h1>
        <p>Review the items in your cart before proceeding to checkout.</p>
      </div>

      <div className="table overflow-x-auto">
        <table className="capitalize w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-3 px-4">s/n</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Edit</th>
              <th className="py-3 px-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.products?.map((items, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="py-3 px-6">{items?.id}</td>
                <td className="py-3 px-6">{items?.product?.name}</td>
                <td className="py-3 px-6">#{items?.product?.price.toFixed(2)}</td>
                <td className="py-3 px-6">{items?.quantity}</td>
                <td className="py-3 px-6">#{items?.amount.toFixed(2)}</td>
                <td className="py-3 px-6">
                  <input
                    onChange={(e) =>
                      updateCart(items?.product?.id, +e.target.value)
                    }
                    value={items?.quantity}
                    className="border outline-none border-gray-300 rounded-md p-1"
                    type="number"
                    name="qauntity"
                    id=""
                  />
                </td>
                <td className="py-3 px-6">
                  <button
                    type="submit"
                    onClick={() => deleteCart(items?.product?.id)}
                    className="text-red-500"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr className='border-b border-gray-400'>
                        <td className='py-3 px-6'>2</td>
                        <td className='py-3 px-6'>Wrist watch</td>
                        <td className='py-3 px-6'>#56.99</td>
                        <td className='py-3 px-6'>5</td>
                        <td className='py-3 px-6'>#5687.099</td>
                        <td className='py-3 px-6'><input className='border outline-none border-gray-300 rounded-md p-1' type="number" name="" id="" /></td>
                        <td className='py-3 px-6'><button type='submit' className='text-red-500'><FaRegTrashAlt /></button></td>
                    </tr>
                    <tr className='border-b border-gray-400'>
                        <td className='py-3 px-6'>3</td>
                        <td className='py-3 px-6'>Wrist watch</td>
                        <td className='py-3 px-6'>#56.99</td>
                        <td className='py-3 px-6'>8</td>
                        <td className='py-3 px-6'>#5687.099</td>
                        <td className='py-3 px-6'><input className='border outline-none border-gray-300 rounded-md p-1' type="number" name="" id="" /></td>
                        <td className='py-3 px-6'><button type='submit' className='text-red-500'><FaRegTrashAlt /></button></td>
                    </tr> */}
          </tbody>
          <tbody>
            <tr className="border-b border-gray-400">
              <td className="py-3 px-6 text-end" colSpan={6}>
                Subtotal Amount :{" "}
              </td>
              <td className="py-3 px-6 text-start" colSpan={5}>
                #{calcSubtotal().toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-400">
              <td className="py-3 px-6 text-end" colSpan={6}>
                VAT (7.5%):{" "}
              </td>
              <td className="py-3 px-6 text-start" colSpan={5}>
                #{calcVat().toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-400">
              <td className="py-3 px-6 text-end" colSpan={6}>
                Total Amount:{" "}
              </td>
              <td className="py-3 px-6 text-start" colSpan={5}>
                #{calcTotal().toFixed(2)}
              </td>
            </tr>
            <tr className="">
              <td className="py-5 px-6 text-end" colSpan={9}>
                <Link
                  to="/checkout"
                  className="bg-[#0B0500] hover:bg-[#D8F1A0] hover:text-[#0B0500] text-[#D8F1A0] py-2 md:py-4 px-3 md:px-12"
                >
                  Proceed to Checkout
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Cart;