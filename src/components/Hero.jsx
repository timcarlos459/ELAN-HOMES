import { useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Buy Property");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Any Type");
  const [priceRange, setPriceRange] = useState("Any Price");

  const handleSearch = (e) => {
    e.preventDefault();

    const section =
      activeTab === "Buy Property"
        ? "#properties"
        : activeTab === "Book a Stay"
          ? "#bnb"
          : "#land";

    document.querySelector(section)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="elan-hero">
      <div className="hero-overlay"></div>

      <div className="hero-container">
        {/* HERO CONTENT */}
        <div className="hero-content">
          <span className="hero-eyebrow">
            KENYA'S PREMIER PROPERTY PLATFORM
          </span>

          <h1>
            Find Your
            <span> Perfect Home</span>
            in Kenya
          </h1>

          <p className="hero-description">
            Discover exceptional properties, beautiful holiday stays and prime
            investment land across Kenya. Your next destination starts here.
          </p>

          {/* FEATURES */}
          <div className="hero-features">
            <div className="hero-feature">
              <span>⌂</span>
              <p>
                Premium
                <br />
                Properties
              </p>
            </div>

            <div className="hero-feature">
              <span>▤</span>
              <p>
                Luxury
                <br />
                Holiday Stays
              </p>
            </div>

            <div className="hero-feature">
              <span>⌖</span>
              <p>
                Prime
                <br />
                Land
              </p>
            </div>
          </div>

          {/* SEARCH TABS */}
          <div className="hero-search-wrapper">
            <div className="hero-search-tabs">
              {["Buy Property", "Book a Stay", "Find Land"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SEARCH FORM */}
            <form className="hero-search-form" onSubmit={handleSearch}>
              <div className="search-field">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g. Nairobi, Mombasa..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>
                  {activeTab === "Find Land"
                    ? "Land Type"
                    : activeTab === "Book a Stay"
                      ? "Accommodation Type"
                      : "Property Type"}
                </label>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Cottage</option>
                  <option>Commercial</option>
                  <option>Residential Land</option>
                  <option>Agricultural Land</option>
                </select>
              </div>

              <div className="search-field">
                <label>Price Range</label>

                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option>Any Price</option>
                  <option>Below KSh 5M</option>
                  <option>KSh 5M - 15M</option>
                  <option>KSh 15M - 30M</option>
                  <option>KSh 30M - 50M</option>
                  <option>Above KSh 50M</option>
                </select>
              </div>

              <button type="submit" className="hero-search-button">
                Search <span>→</span>
              </button>
            </form>
          </div>

          {/* EXPLORE BUTTON */}
          <a href="#properties" className="hero-explore-button">
            Explore Properties <span>→</span>
          </a>
        </div>

        <div className="hero-signature">Live the Elan Life.</div>
      </div>
    </section>
  );
}
