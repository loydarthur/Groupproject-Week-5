import React from "react";
import list from "../assets/data";
import "../styles/Subscriptions.css";

const Subscriptions = ({ cart, setCart }) => {
  const addToCart = (item) => {

    // error checking for only one subscription
    if (item.id >= 1 && item.id <= 4) {
      const existingSubscriptionItem = cart.find(
        (cartItem) => cartItem.id >= 1 && cartItem.id <= 4
      );
      if (existingSubscriptionItem) {
        alert("You can only have one subscription added to the cart");
        return;
      }
    }

    // check for existing item in cart and increment quantity else set quantity to 1
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      if (item.id >= 1 && item.id <= 4) return;
      const updatedCart = cart.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCart(updatedCart);
      console.log("Updated Cart:", updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
      console.log("Updated Cart:", [...cart, newItem]);
    }
  };

  return (
    <div className="subscriptions-page">
      <h1>Subscriptions</h1>
      <div className="subscription-items">
        {list.map((item) => (
          <div key={item.id} className="subscription-card">
            <div className="subscription-img">
              <img src={item.img} alt={item.service} />
            </div>
            <div className="subscription-details">
              <h2>{item.service}</h2>
              <p>{item.serviceInfo}</p>
              <p>${item.price}</p>
            </div>
            <button
              className="subscription-btn"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;