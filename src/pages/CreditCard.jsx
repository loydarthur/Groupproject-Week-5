import React, { useState } from "react";
import "../styles/CreditCard.css";

const CreditCard = () => {
  const [cardInfo, setCardInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, "").substring(0, 16);
      newValue = newValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    setCardInfo(prev => ({ ...prev, [name]: newValue }));
    if (error) setError("");
  };

  // expiry date validation
  const isValidExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiry)) return false;
    const [monthStr, yearStr] = expiry.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);
    const now = new Date();
    const expiryDate = new Date(year, month);
    return expiryDate > now;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // cc number validation
    const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardRegex.test(cardInfo.cardNumber)) {
      setError("Card number must be in the format 1234 5678 9012 3456");
      return;
    }
    if (!isValidExpiry(cardInfo.expiry)) {
      setError("Expiry must be in MM/YY format and in the future");
      return;
    }
    // confirmation of saving to local storage
    localStorage.setItem("creditCardInfo", JSON.stringify(cardInfo));
    alert("Credit card information saved!");
    
    setCardInfo({
      cardholderName: "",
      cardNumber: "",
      expiry: "",
      cvv: ""
    });
  };

  return (
    <div className="creditcard-container">
      <header className="creditcard-header">
        <h2>Credit Card Management</h2>
        <p>Enter your payment details securely.</p>
        <p className="insecurity-note">
          Warning: This connection is not secure. Do not enter real card details.
        </p>
      </header>
      <form className="creditcard-form" onSubmit={handleSubmit}>
        {error && <div className="creditcard-error">{error}</div>}
        <label>Cardholder Name:</label>
        <input
          type="text"
          name="cardholderName"
          value={cardInfo.cardholderName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        <label>Credit Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={cardInfo.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          required
        />
        <label>Expiry Date (MM/YY):</label>
        <input
          type="text"
          name="expiry"
          value={cardInfo.expiry}
          onChange={handleChange}
          placeholder="MM/YY"
          required
        />
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={cardInfo.cvv}
          onChange={handleChange}
          placeholder="123"
          required
        />
        <button type="submit">Save Card Information</button>
      </form>
    </div>
  );
};

export default CreditCard;