import { createContext, useState, useEffect, useContext } from "react";
import { getProducts } from "../services/api/product";
import {
  addCartItem,
  getCartItems,
  updateCartItem,
} from "../services/api/cart";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const latest = product.filter((item) => item.latest === false);
  const trending = product.filter((item) => item.trending === false);
  const featured = product.filter((item) => item.featured);
  const [cartItems, setCartItems] = useState({ products: [] });
  const [state, dispatch] = useContext(AuthContext)
  const [order, setOrder ] = useState(null)

  const isAuthenticated = state?.accessToken !== null;
  console.log("IsAuthenticated: ", isAuthenticated);

  useEffect(() => {
    fetchCart();
  }, []);
  // }, [cartItems]);

  useEffect(() => {
    fetchProduct()
  }, []);

  console.log(cartItems); 
  const HandleSearch = (searchTerm, products) => {
    console.log(products);
    const lowerTerm = searchTerm.toLowerCase();
    const filteredProduct = products.filter((productt) => {
      const nameMatch = productt.name.toLowerCase().includes(lowerTerm);
      const descriptionMatch = productt.description
        .toLowerCase()
        .includes(lowerTerm);

      return nameMatch || descriptionMatch;
    });
    console.log("filteredProduct:", filteredProduct);
    // setter(filteredProduct);
    setFetched(filteredProduct);
    // setFiltered(filteredProduct);
    // return filteredProduct;
  };
  const fetchProduct = async () => {
    try {
      const data = await getProducts();
    //   console.log("Data:", data.data);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      if (!isAuthenticated) {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
          products: [],
        };
        if (storedCart) {
          setCartItems(storedCart);
        } else {
          toast.error("Failed to retrieve cart items");
        }
      } else {
        const data = await getCartItems();
        if (data) {
          setCartItems(data);
        } else {
          toast.error("Failed to retrieve cart items");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId, quantity, product) => {
    try {
      if (!isAuthenticated) {
        // const storedCart = JSON.parse(localStorage.getItem("cartItems" || { products: [] }));
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
          products: [],
        };
        const existingItem = storedCart?.products?.findIndex(
          (items) => items.product.id === productId
        );
        if (existingItem !== -1) {
          // console.log(storedCart.products[existingItem].quantity)
          storedCart.products[existingItem].quantity += quantity;
          storedCart.products[existingItem].amount =
            storedCart.products[existingItem].quantity *
            storedCart.products[existingItem].product.price;
        } else {
          storedCart?.products?.push({
            product,
            quantity,
            amount: product.price * quantity,
          });
        }
        if (storedCart) {
          localStorage.setItem("cartItems", JSON.stringify(storedCart));
          setCartItems(storedCart);
          toast.success("Item added to cart");
          fetchCart();
        } else {
          toast.error("Failed to add item to cart");
        }
      } else {
        const data = await addCartItem(productId, quantity);
        if (data) {
          setCartItems(data);
          toast.success("Item added to cart");
        } else {
          toast.error("Failed to add item to cart");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = async (productId, quantity, product) => {
    try {
      if (!isAuthenticated) {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
          products: [],
        };
        const existingItem = storedCart.products.findIndex(
          (items) => items.product.id === productId
        );
        if (existingItem !== -1) {
          storedCart.products[existingItem].quantity = quantity;
          // storedCart.products[existingItem].productId = productId
          storedCart.products[existingItem].amount =
            storedCart.products[existingItem].quantity *
            storedCart.products[existingItem].product.price;
        } else {
          storedCart.products.push({
            product,
            quantity,
            amount: product.price * quantity,
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(storedCart));
        setCartItems(storedCart);
        toast.success("Item updated in cart");
        fetchCart();
      } else {
        const data = await updateCartItem(productId, quantity);
        if (data) {
          setCartItems(data);
          toast.success("Item updated in cart");
        } else {
          toast.error("Failed to update item in cart");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (productId) => {
    try {
      if (
        window.confirm(
          "Are you sure you want to delete this product from your cart?"
        )
      ) {
        if (!isAuthenticated) {
          const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
            products: [],
          };
          const existingItem = storedCart.products.filter(
            (items) => items.product.id !== productId
          );
          if (existingItem) {
            const updatedCart = { products: existingItem };
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          }
          // localStorage.setItem("cartItems", JSON.stringify(storedCart))

          setCartItems(storedCart);
          toast.success("Item deleted in cart");
          fetchCart();
        } else {
          const data = await updateCartItem(productId);
          if (data) {
            setCartItems(data);
            toast.success("Item deleted in cart");
          } else {
            toast.error("Failed to delete item in cart");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calcSubtotal = () => {
    return cartItems?.products?.reduce((acc, curr) => acc + curr.amount, 0);
  };
  const calcVat = () => {
    return calcSubtotal() * 0.075;
  };
  const calcTotal = () => {
    return calcSubtotal() + calcVat();
  };
  const createOrder = async (orderData) => {
    console.log(orderData);
    try {
      const response = await verifyPayment(orderData);
      if (response) {
        setOrder(response)
        toast.success("Order created successfully");
        setCartItems([]);
      } else {
        toast.error("Order creation failed, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        latest,
        trending,
        featured,
        HandleSearch,
        addToCart,
        updateCart,
        deleteCart,
        cartItems,
        calcSubtotal,
        calcVat,
        calcTotal,
        dispatch,
        createOrder,
        order
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
