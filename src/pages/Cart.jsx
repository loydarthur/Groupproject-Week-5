import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

const Cart = ({ cart, setCart }) => {
  // function for item deletion
  const deleteItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // function fo quantity change
  const changeQuantity = (index, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];

      // error checking for only one subscription
      if (
        updatedCart[index].id >= 1 &&
        updatedCart[index].id <= 4 &&
        newQuantity > 1
      ) {
        return prevCart;
      }

      if (newQuantity > 0) {
        updatedCart[index].quantity = newQuantity;
      } else {
        updatedCart.splice(index, 1);
      }

      return updatedCart;
    });
  };

  // total price calculation
  const total = cart
    .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty!</p>
      ) : (
        <div className="cart">
          <form>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.service}</h3>
                <p>Price: ${item.price}</p>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity || 1}
                  min="1"
                  onChange={(e) =>
                    changeQuantity(index, parseInt(e.target.value))
                  }
                />
                <button type="button" onClick={() => deleteItem(index)}>
                  Delete
                </button>
              </div>
            ))}
          </form>
          <div className="cart-total">
            <h2>Total: ${total}</h2>
          </div>
          <div className="checkout-btn-position">
            <button className="checkout-btn">
              <Link to="/creditcard" style={{ color: "#fff", textDecoration: "none" }}>
                Checkout
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;