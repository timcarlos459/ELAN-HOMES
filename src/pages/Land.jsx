import { useState } from "react";
import "./Land.css";

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

export default function Land() {
  const [region, setRegion] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <main className="land-page">
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

      <section className="land-intro">
        <span className="land-eyebrow">LAND & INVESTMENT</span>
        <h2>Discover Land Opportunities</h2>
        <p>
          From residential plots to agricultural and commercial investments,
          find land that matches your vision.
        </p>
      </section>

      <section className="land-listings-section">
        <div className="land-filter-panel">
          <div className="land-filter-heading">
            <h3>Find Your Land</h3>

            <button
              onClick={() => {
                setRegion("");
                setDestination("");
                setType("");
                setMaxPrice("");
              }}
            >
              Clear filters
            </button>
          </div>

          <div className="land-filters">
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

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Land Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Agricultural">Agricultural</option>
            </select>

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="">Any Budget</option>
              <option value="2000000">Up to KSh 2M</option>
              <option value="5000000">Up to KSh 5M</option>
              <option value="10000000">Up to KSh 10M</option>
              <option value="20000000">Up to KSh 20M</option>
            </select>
          </div>
        </div>
      </section>
    </main>
  );
}
