import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import filmreel from "../styles/filmreel.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/"); 
  };

  const handleLoginError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="login-container" style={{ padding: "2rem", textAlign: "center" }}>
      <header className="login-header" style={{ marginBottom: "1.5rem" }}>
        <img
          src={filmreel}
          alt="Website Logo"
          style={{ width: "280px", height: "180px", marginBottom: "1rem" }}
        />
        <h1>StreamList</h1>
        <p>Your one-stop platform for managing streaming subscriptions.</p>
      </header>
      <div className="login-content">
        <h2>Login with Google</h2>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </div>
    </div>
  );
};

export default Login;