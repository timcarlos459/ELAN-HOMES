import { useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Buy Property");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Any Type");
  const [priceRange, setPriceRange] = useState("Any Price");

  const tabOptions = {
    "Buy Property": {
      types: ["Any Type", "House", "Villa", "Apartment", "Commercial"],
      prices: [
        "Any Price",
        "Below KSh 5M",
        "KSh 5M - 15M",
        "KSh 15M - 30M",
        "KSh 30M - 50M",
        "Above KSh 50M",
      ],
      section: "#properties",
    },

    "Book a Stay": {
      types: [
        "Any Type",
        "Studio",
        "1 Bedroom",
        "2 Bedrooms",
        "3 Bedrooms",
        "Cottage",
        "B&B",
        "Holiday Home",
      ],
      prices: [
        "Any Price",
        "Below KSh 2,000",
        "KSh 2,000 - 3,500",
        "KSh 3,500 - 5,000",
        "KSh 5,000 - 10,000",
        "Above KSh 10,000",
      ],
      section: "#bnb",
    },

    "Find Land": {
      types: [
        "Any Type",
        "Residential Land",
        "Agricultural Land",
        "Commercial Land",
      ],
      prices: [
        "Any Price",
        "Below KSh 1M",
        "KSh 1M - 5M",
        "KSh 5M - 10M",
        "KSh 10M - 30M",
        "Above KSh 30M",
      ],
      section: "#land",
    },
  };

  const currentOptions = tabOptions[activeTab];

  // CHANGE TAB AND RESET FILTERS
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPropertyType("Any Type");
    setPriceRange("Any Price");
  };

  // SEARCH
  const handleSearch = (e) => {
    e.preventDefault();

    const section = currentOptions.section;

    document.querySelector(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
              {Object.keys(tabOptions).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SEARCH FORM */}
            <form className="hero-search-form" onSubmit={handleSearch}>
              {/* LOCATION */}
              <div className="search-field">
                <label>Location</label>

                <input
                  type="text"
                  placeholder="e.g. Nairobi, Mombasa..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* TYPE */}
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
                  {currentOptions.types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE */}
              <div className="search-field">
                <label>
                  {activeTab === "Book a Stay"
                    ? "Price Per Night"
                    : "Price Range"}
                </label>

                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {currentOptions.prices.map((price) => (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEARCH BUTTON */}
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

        {/* SIGNATURE */}
        <div className="hero-signature">Live the Elan Life.</div>
      </div>
    </section>
  );
}
