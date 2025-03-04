import React from "react";
import filmreel from "../styles/filmreel.jpg";

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <img src={filmreel} alt="Website Logo" className="home-logo" />
        <h1>StreamList</h1>
        <p>Welcome to your one-stop platform for managing streaming subscriptions!</p>
      </header>
      <section className="home-content">
        {/* room for more home content */}
      </section>
    </div>
  );
};

export default Home;