import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreditCard from "./pages/CreditCard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (Array.isArray(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <Subscriptions cart={cart} setCart={setCart} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart cart={cart} setCart={setCart} />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout cart={cart} setCart={setCart} />
            </PrivateRoute>
          }
        />
        <Route
          path="/creditcard"
          element={
            <PrivateRoute>
              <CreditCard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;