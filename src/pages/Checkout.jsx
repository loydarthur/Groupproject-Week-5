import React, { useState } from "react";
import "../styles/Checkout.css";

const Checkout = ({ cart, setCart }) => {
  const [formData, setFormData] = useState({
    creditnum: "",
    expmonth: "",
    expyear: "",
    cvv: ""
  });

  const total = cart
    .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "creditnum") {
      // Format input as "1234 5678 9012 3456"
      value = value.replace(/\D/g, "").substring(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.creditnum.replace(/\s/g, "").length !== 16) {
      alert("Please enter a valid 16-digit credit card number.");
      return;
    }
    let storedData = JSON.parse(localStorage.getItem("checkoutData")) || [];
    storedData.push(formData);
    localStorage.setItem("checkoutData", JSON.stringify(storedData));

    console.log("Form Data:", formData);
    
    // Reset the form fields
    setFormData({
      creditnum: "",
      expmonth: "",
      expyear: "",
      cvv: ""
    });
    setCart([]);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2 className="checkout-total">Your total is ${total}</h2>
        <h3>Payment Information</h3>
        <label htmlFor="creditnum">Credit Card Number:</label>
        <input
          type="text"
          id="creditnum"
          name="creditnum"
          onChange={handleChange}
          value={formData.creditnum}
          required
        />
        <label htmlFor="expmonth">Expiration Month:</label>
        <select id="expmonth" name="expmonth" onChange={handleChange} value={formData.expmonth}>
          <option value="">Select One</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <label htmlFor="expyear">Expiration Year:</label>
        <select id="expyear" name="expyear" onChange={handleChange} value={formData.expyear}>
          <option value="">Select One</option>
          <option value="2035">2035</option>
          <option value="2034">2034</option>
          <option value="2033">2033</option>
          <option value="2032">2032</option>
          <option value="2031">2031</option>
          <option value="2030">2030</option>
          <option value="2029">2029</option>
          <option value="2028">2028</option>
          <option value="2027">2027</option>
          <option value="2026">2026</option>
        </select>
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          onChange={handleChange}
          value={formData.cvv}
          required
        />
        <input type="submit" value="Place Order" className="submit-btn" />
      </form>
    </div>
  );
};

export default Checkout;