import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Properties");
  const [region, setRegion] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      region,
      destination,
      type,
      budget,
    });

    navigate(
      `${category === "Properties" ? "/properties" : "/stays"}?${params.toString()}`,
    );
  };

  return (
    <main className="search-page">
      <section className="search-hero">
        <div className="search-hero-content">
          <span>DISCOVER YOUR NEXT PLACE</span>
          <h1>Find a Place That Feels Like Yours.</h1>
          <p>
            Explore exceptional properties and beautiful holiday stays across
            Kenya with ELAN HOMES.
          </p>
        </div>
      </section>

      <section className="search-main">
        <div className="search-heading">
          <span>ELAN HOMES SEARCH</span>
          <h2>What Are You Looking For?</h2>
          <p>Start exploring with a few simple selections.</p>
        </div>

        <div className="search-panel">
          <div className="search-tabs">
            <button
              type="button"
              className={category === "Properties" ? "active" : ""}
              onClick={() => {
                setCategory("Properties");
                setType("");
                setBudget("");
              }}
            >
              Properties for Sale
            </button>

            <button
              type="button"
              className={category === "Stays" ? "active" : ""}
              onClick={() => {
                setCategory("Stays");
                setType("");
                setBudget("");
              }}
            >
              Holiday Stays
            </button>
          </div>

          <form onSubmit={handleSearch}>
            <div className="search-fields">
              <div className="search-field">
                <label>Region</label>
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
              </div>

              <div className="search-field">
                <label>Destination</label>
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
              </div>

              <div className="search-field">
                <label>
                  {category === "Properties" ? "Property Type" : "Stay Type"}
                </label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">All Types</option>
                  {category === "Properties" ? (
                    <>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                    </>
                  ) : (
                    <>
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Cottage">Cottage</option>
                      <option value="Lodge">Lodge</option>
                    </>
                  )}
                </select>
              </div>

              <div className="search-field">
                <label>Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Any Budget</option>
                  {category === "Properties" ? (
                    <>
                      <option value="10000000">Up to KSh 10M</option>
                      <option value="30000000">Up to KSh 30M</option>
                      <option value="50000000">Up to KSh 50M</option>
                      <option value="100000000">Up to KSh 100M</option>
                    </>
                  ) : (
                    <>
                      <option value="5000">Up to KSh 5,000/night</option>
                      <option value="10000">Up to KSh 10,000/night</option>
                      <option value="20000">Up to KSh 20,000/night</option>
                      <option value="30000">Up to KSh 30,000/night</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <button type="submit" className="search-submit">
              Search Now
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
