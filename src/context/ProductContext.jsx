/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from "react";
import { getProducts } from "../services/api/product";
import { toast } from "react-toastify";
import { verifyPayment } from "../services/api/order";
import productData from "../Data/ProductData";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(productData);
  const latest = product.filter((item) => item.latest === true);
  const trending = product.filter((item) => item.trending === true);
  const featured = product.filter((item) => item.featured);
  const [cartItems, setCartItems] = useState({ products: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder ] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, []);

  const HandleSearch = (searchTerm) => setSearchQuery(searchTerm);
  const fetchProduct = async () => {
    try {
      const data = await getProducts();
      const records = Array.isArray(data)
        ? data
        : data?.data ?? data?.products ?? [];
      if (records.length > 0) {
        const productsById = new Map(productData.map((item) => [String(item.id), item]));

        records.forEach((item) => {
          const id = String(item.id);
          const localProduct = productsById.get(id);
          productsById.set(id, {
            ...localProduct,
            ...item,
            id: item.id ?? localProduct?.id,
            name: localProduct?.name || item.name,
            price: localProduct?.price ?? item.price,
            description: localProduct?.description || item.description,
            category: item.category || localProduct?.category,
            img: localProduct?.img || item.img || item.image,
            featured: localProduct?.featured ?? item.featured ?? false,
            trending: localProduct?.trending ?? item.trending ?? false,
            latest: localProduct?.latest ?? item.latest ?? false,
          });
        });

        setProduct(Array.from(productsById.values()));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = useCallback(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
      setCartItems({ products: Array.isArray(storedCart.products) ? storedCart.products : [] });
    } catch {
      localStorage.removeItem("cartItems");
      setCartItems({ products: [] });
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity, product) => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
      storedCart.products ??= [];
      const existingItem = storedCart.products.findIndex(
        (item) => String(item.product.id) === String(productId)
      );
      if (existingItem !== -1) {
        storedCart.products[existingItem].quantity += quantity;
        storedCart.products[existingItem].amount =
          storedCart.products[existingItem].quantity * storedCart.products[existingItem].product.price;
      } else {
        storedCart.products.push({ product, quantity, amount: product.price * quantity });
      }
      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      setCartItems(storedCart);
      toast.success("Item added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = async (productId, quantity, product) => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
      const existingItem = storedCart.products.findIndex(
        (item) => String(item.product.id) === String(productId)
      );
      if (existingItem !== -1) {
        storedCart.products[existingItem].quantity = quantity;
        storedCart.products[existingItem].amount = quantity * storedCart.products[existingItem].product.price;
      } else {
        storedCart.products.push({ product, quantity, amount: product.price * quantity });
      }
      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      setCartItems(storedCart);
      toast.success("Item updated in cart");
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
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
        const updatedCart = {
          products: storedCart.products.filter(
            (item) => String(item.product.id) !== String(productId)
          ),
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        toast.success("Item deleted in cart");
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
        setCartItems({ products: [] });
        localStorage.removeItem("cartItems");
        return response;
      } else {
        toast.error("Order creation failed, please try again");
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.error("Order verification failed, please try again.");
      return null;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        searchQuery,
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
        createOrder,
        order
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
