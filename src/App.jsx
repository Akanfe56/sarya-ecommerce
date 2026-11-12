import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import { ProductProvider } from "./context/ProductContext";
// import ProductDetails from "./pages/ProductDetails";
import ProductDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/Tab4";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Home />
            </>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tab1" element={<Tab1 />} />
        <Route path="/tab2" element={<Tab2 />} />
        <Route path="/tab3" element={<Tab3 />} />
        <Route path="/tab4" element={<Tab4 />} />
      </Routes>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const token = localStorage.getItem("auth-token");
  const initialState = { accessToken: token ? token : null };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="body">
      {loading ? (
        <Loader />
      ) : (
        <AuthProvider defaultState={initialState}>
          <ProductProvider>
            <Router>
              <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")} />
              <ToastContainer position="top-right" autoClose={5000} />
              <AnimatedRoutes />
              <Footer />
            </Router>
          </ProductProvider>
        </AuthProvider>
      )}
    </div>
  );
}

export default App;
