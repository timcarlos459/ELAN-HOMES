
import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import landListings from "../data/land";
import "./Land.css";

/* =================================
   ELAN HOMES LAND LOCATIONS
================================= */

const locations = {
  Central: ["Kiambu", "Limuru", "Nyahururu", "Nyandarua", "Nyeri", "Thika"],

  "Coastal Region": ["Kilifi", "Mombasa", "Lamu", "Kwale", "Taita Taveta"],

  Eastern: ["Makueni / Wote", "Embu", "Machakos", "Meru"],

  Kajiado: [
    "Isinya",
    "Kisaju",
    "Ibisil",
    "Rongai",
    "Kitengela",
    "Ngong",
    "Kiserian",
    "Kajiado Town",
    "Oloitoktok",
    "Amboseli",
  ],

  Nairobi: [
    "Gigiri",
    "Karen",
    "Kileleshwa",
    "Kilimani",
    "Langata",
    "Lavington",
    "Nairobi West",
    "Ngong Road",
    "Riverside",
    "Roysambu",
    "Runda",
    "Westlands",
    "Waiyaki Way",
    "Buruburu",
  ],

  "Nyanza & Western": [
    "Homa Bay / Rusinga Island",
    "Siaya / Bondo",
    "Kisumu",
    "Kakamega",
    "Bungoma",
  ],

  "Rift Valley": [
    "Nyanyuki / Laikipia",
    "Narok / Maasai Mara",
    "Eldoret",
    "Naivasha",
    "Nakuru",
  ],
};

/* =================================
   LAND PAGE
================================= */

export default function Land() {
  const [region, setRegion] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  /* =================================
     FILTER LAND LISTINGS
     DEMO TEMPORARILY ENABLED
  ================================= */

  const filteredLandListings = landListings.filter((land) => {
    const matchesRegion = !region || land.region === region;

    const matchesDestination =
      !destination || land.destination === destination;

    const matchesType = !type || land.type === type;

    const matchesPrice =
      !maxPrice || Number(land.price) <= Number(maxPrice);

    return (
      matchesRegion &&
      matchesDestination &&
      matchesType &&
      matchesPrice
    );
  });

  /* =================================
     SORT LAND LISTINGS
  ================================= */

  const sortedLandListings = [...filteredLandListings].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number(a.price) - Number(b.price);
    }

    if (sortBy === "price-high") {
      return Number(b.price) - Number(a.price);
    }

    return 0;
  });

  /* =================================
     CLEAR FILTERS
  ================================= */

  const clearFilters = () => {
    setRegion("");
    setDestination("");
    setType("");
    setMaxPrice("");
    setSortBy("recommended");
  };

  /* =================================
     PRICE FORMAT
  ================================= */

  const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice)) {
      return "Price on request";
    }

    return `KSh ${numericPrice.toLocaleString("en-KE")}`;
  };

  /* =================================
     SEO SETTINGS
  ================================= */

  const seoLocation = destination || region;

  const seoTitle = seoLocation
    ? `Land for Sale in ${seoLocation}, Kenya | ÉLAN HOMES`
    : "Land for Sale in Kenya | Residential, Commercial & Agricultural | ÉLAN HOMES";

  const seoDescription = seoLocation
    ? `Explore residential plots, agricultural land and commercial land opportunities in ${seoLocation}, Kenya with ÉLAN HOMES. Find land for your next home or investment.`
    : "Discover residential plots, agricultural land and commercial land opportunities across Kenya with ÉLAN HOMES. Find land for building, development and investment.";

  return (
    <main className="land-page">
      <SEO title={seoTitle} description={seoDescription} />

      {/* HERO */}

      <section className="land-hero">
        <div className="land-hero-content">
          <span>ELAN HOMES • LAND COLLECTION</span>

          <h1>Find Land. Build Your Future.</h1>

          <p>
            Explore carefully selected land opportunities across Kenya, whether
            you are building a home or investing for the future.
          </p>
        </div>
      </section>

      {/* INTRO */}

      <section className="land-intro">
        <span className="land-eyebrow">LAND & INVESTMENT</span>

        <h2>Discover Land Opportunities</h2>

        <p>
          From residential plots to agricultural and commercial investments,
          find land that matches your vision.
        </p>
      </section>

      {/* LAND FILTERS */}

      <section className="land-listings-section">
        <div className="land-filter-panel">
          <div className="land-filter-heading">
            <h3>Find Your Land</h3>

            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          </div>

          <div className="land-filters">
            {/* REGION */}

            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setDestination("");
              }}
            >
              <option value="">All Regions</option>

              {Object.keys(locations).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* DESTINATION */}

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={!region}
            >
              <option value="">All Destinations</option>

              {(region ? locations[region] : []).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* LAND TYPE */}

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Land Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Agricultural">Agricultural</option>
            </select>

            {/* MAXIMUM PRICE */}

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="">Any Budget</option>
              <option value="2000000">Up to KSh 2M</option>
              <option value="5000000">Up to KSh 5M</option>
              <option value="10000000">Up to KSh 10M</option>
              <option value="20000000">Up to KSh 20M</option>
              <option value="30000000">Up to KSh 30M</option>
              <option value="50000000">Up to KSh 50M</option>
              <option value="75000000">Up to KSh 75M</option>
              <option value="100000000">Up to KSh 100M</option>
              <option value="150000000">Up to KSh 150M</option>
              <option value="200000000">Up to KSh 200M</option>
              <option value="250000000">Up to KSh 250M</option>
            </select>

            {/* SORT BY */}

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Lowest to Highest</option>
              <option value="price-high">Price: Highest to Lowest</option>
            </select>
          </div>
        </div>
      </section>

      {/* LAND RESULTS */}

      <section className="land-results">
        {sortedLandListings.length > 0 ? (
          <div className="land-results-grid">
            {sortedLandListings.map((land) => (
              <article className="land-card" key={land.id}>
                <div className="land-card-content">
                  <span>{land.type} Land</span>

                  <h3>{land.title}</h3>

                  <p>
                    {land.destination}, {land.region}
                  </p>

                  <strong>{formatPrice(land.price)}</strong>

                  <p>{land.size}</p>

                  <Link
                    to={`/land/${land.id}`}
                    className="land-card-link"
                    aria-label={`View details for ${land.title}`}
                  >
                    View Land Details <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="land-empty">
            <span>ÉLAN HOMES LAND COLLECTION</span>

            <h2>Land Opportunities Coming Soon</h2>

            <p>
              We're preparing carefully selected land opportunities across
              Kenya. Please check back soon for available listings.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
