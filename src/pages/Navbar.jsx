import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ cart }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  // cart total quantity calculation
  const totalQuantity = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/subscriptions">Subscriptions</Link>
            </li>
            <li>
              <Link to="/cart">
                Cart
                {totalQuantity > 0 && (
                  <span className="cart-count">{totalQuantity}</span>
                )}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;