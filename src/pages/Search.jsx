import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import "./Search.css";

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

export default function Search() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Properties");
  const [region, setRegion] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  // SEO SETTINGS
  const seoLocation = destination || region;

  const seoTitle = seoLocation
    ? `${
        category === "Properties" ? "Properties for Sale" : "Holiday Stays"
      } in ${seoLocation}, Kenya | ÉLAN HOMES`
    : category === "Properties"
      ? "Search Properties for Sale in Kenya | ÉLAN HOMES"
      : "Search Holiday Stays in Kenya | ÉLAN HOMES";

  const seoDescription =
    category === "Properties"
      ? `Search houses, villas and apartments for sale in ${
          seoLocation ? `${seoLocation}, ` : ""
        }Kenya. Explore property opportunities with ÉLAN HOMES.`
      : `Search holiday homes, furnished accommodation and beautiful short stays in ${
          seoLocation ? `${seoLocation}, ` : ""
        }Kenya with ÉLAN HOMES.`;

  // CHANGE CATEGORY
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setType("");
    setBudget("");
  };

  // CHANGE REGION
  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setDestination("");
  };

  // SEARCH LISTINGS
  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    params.set("region", region);
    params.set("destination", destination);
    params.set("type", type);
    params.set("budget", budget);

    const target = category === "Properties" ? "/properties" : "/stays";

    navigate(`${target}?${params.toString()}`);
  };

  return (
    <main className="search-page">
      <SEO title={seoTitle} description={seoDescription} />

      {/* HERO */}
      <section className="search-hero">
        <div className="search-hero-content">
          <span>DISCOVER YOUR NEXT PLACE</span>

          <h1>Find a Place That Feels Like Yours.</h1>

          <p>
            Explore exceptional properties and beautiful holiday stays across
            Kenya with ÉLAN HOMES.
          </p>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search-main">
        <div className="search-heading">
          <span>ÉLAN HOMES SEARCH</span>

          <h2>What Are You Looking For?</h2>

          <p>Start exploring with a few simple selections.</p>
        </div>

        <div className="search-panel">
          {/* CATEGORY TABS */}
          <div
            className="search-tabs"
            role="tablist"
            aria-label="Choose listing category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={category === "Properties"}
              className={category === "Properties" ? "active" : ""}
              onClick={() => handleCategoryChange("Properties")}
            >
              Properties for Sale
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={category === "Stays"}
              className={category === "Stays" ? "active" : ""}
              onClick={() => handleCategoryChange("Stays")}
            >
              Holiday Stays
            </button>
          </div>

          {/* SEARCH FORM */}
          <form onSubmit={handleSearch}>
            <div className="search-fields">
              {/* REGION */}
              <div className="search-field">
                <label htmlFor="search-region">Region</label>

                <select
                  id="search-region"
                  name="region"
                  value={region}
                  onChange={handleRegionChange}
                >
                  <option value="">All Regions</option>

                  {Object.keys(locations).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* DESTINATION */}
              <div className="search-field">
                <label htmlFor="search-destination">Destination</label>

                <select
                  id="search-destination"
                  name="destination"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  disabled={!region}
                >
                  <option value="">All Destinations</option>

                  {(region ? locations[region] || [] : []).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* PROPERTY OR STAY TYPE */}
              <div className="search-field">
                <label htmlFor="search-type">
                  {category === "Properties" ? "Property Type" : "Stay Type"}
                </label>

                <select
                  id="search-type"
                  name="type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
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

              {/* BUDGET */}
              <div className="search-field">
                <label htmlFor="search-budget">Budget</label>

                <select
                  id="search-budget"
                  name="budget"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
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
