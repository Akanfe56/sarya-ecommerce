import React, { useState, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { ProductContext } from "../context/ProductContext";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const { cartItems } = useContext(ProductContext);
  const cartCount = cartItems?.products?.length || 0;
  const isAuthenticated = state?.accessToken !== null;
  const navigate = useNavigate();
  // useEffect( () => {
  //   fetchCart();
  // }, [])
 
  const logout = (e) => {
    try { 
      e.preventDefault();
      localStorage.removeItem("auth-token");
      dispatch({ type: "setToken", payload: null });
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  }
  const { product, HandleSearch, featured, fetched } =
    useContext(ProductContext);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    console.log("search:", search);
  }, [search]);

  return (
    <>
      <div className="p-5 bg-[#0B0500] text-white flex justify-between items-center gap-4 relative md:hidden">
        <div className="search flex justify-center items-center gap-2 border-b border-gray-100 w-full">
          <span>
            <CiSearch size={18} />
          </span>
          <input
            type="text"
            className="outline-none border-none bg-transparent flex-1"
            onChange={(e) => {
              setSearch(e.target.value);

              setTimeout(() => {
                HandleSearch(search, product);
              }, 1000);
            }}
            placeholder="Search..."
          />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute right-5 top-6"
        >
          <FiMenu size={24} />
        </button>
        
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0B0500] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h1 className="font-serif text-xl">
            <Link to="/" onClick={() => setIsOpen(false)}>
              SaRya
            </Link>
          </h1>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-5">
          <li className="hover:border-b hover:duration-100">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="hover:border-b hover:duration-100">
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
          </li>
          <li className="hover:border-b hover:duration-100">
            <Link to="" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="hover:border-b hover:duration-100">
            <Link to="" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="hover:border-b hover:duration-100">
            <Link to="" onClick={() => setIsOpen(false)}>
              <span>
                <FaArrowRightToBracket />
               </span>
            </Link>
          </li>
        </ul> 

        {/* Cart */}
        <div className="p-5 border-t border-gray-700">
          <Link
            to="/cart"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <FaShoppingCart size={18} />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
      { isAuthenticated ? (
        <>
        <div className="p-5 border-t border-gray-700">
          <Link onClick={logout} className="text-white flex gap-3 items-center hover:text-gray-300">
          <FaArrowRightToBracket size={18} /> Logout
          </Link>
        </div>
        </>
      ) : (<>
        <div className="p-5 border-t border-gray-700">
          <Link to="/login" className="text-white flex gap-3 items-center hover:text-gray-300">
            <FaArrowRightToBracket size={18} /> Login
          </Link>
        </div>
        <div className="p-5 border-t border-gray-700">
          <Link to="/register" className="text-white flex gap-3 items-center hover:text-gray-300">
            <FaArrowRightToBracket size={18} /> Register
          </Link>
        </div>
        </>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      </div>

      <div className="hidden md:flex header p-5 bg-[#0B0500] text-white justify-around items-center gap-4">
        <div className="logo">
          <h1 className="font-serif">
            <Link to="/">SaRya</Link>
          </h1>
        </div>
        <div className="nav">
          <ul className="flex gap-4 justify-around items-center">
            <li className="hover:border-b hover:translate-x-0.5 hover:duration-100">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:border-b hover:translate-x-0.5 hover:duration-100">
              <Link to="products">Shop</Link>
            </li>
            <li className="hover:border-b hover:translate-x-0.5 hover:duration-100">
              <Link to="About">About</Link>
            </li>
            <li className="hover:border-b hover:translate-x-0.5 hover:duration-100">
              <Link to="">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="search flex justify-center items-center gap-2 border-b border-gray-100">
            <span>
              <CiSearch size={18} />
            </span>
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);

                setTimeout(() => {
                  HandleSearch(search, product);
                }, 1000);
              }}
              className="outline-none border-none"
              placeholder="Search..."
            />
          </div>
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart size={18} />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </div>

          </Link>
          {isAuthenticated ? (
            <Link onClick={logout} className="text-white px-3 hover:text-gray-300">
              Logout
            </Link>
          ) : (
            <Link to="login" className="text-white px-3 hover:text-gray-300">
              <FaArrowRightToBracket size={20}/>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
