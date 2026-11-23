import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import properties from "../data/properties";
import SEO from "../components/SEO";
import "./Properties.css";

/* ELAN HOMES LOCATIONS */

const locations = {
  Central: ["Kiambu", "Limuru", "Nyeri", "Thika", "Tigoni"],

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
    "Homa Bay",
    "Rusinga Island",
    "Siaya",
    "Kisumu",
    "Kakamega",
    "Bungoma",
  ],

  "Rift Valley": [
    "Nyanyuki",
    "Sekenani",
    "Talek",
    "Mara Triangle",
    "Eldoret",
    "Naivasha",
    "Nakuru",
  ],
};

/* NORMALIZE LOCATION NAMES */

const normalizeLocation = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

/* FORMAT DESTINATION NAME */

const formatLocationName = (value = "") =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/* CHECK LOCATION MATCH */

const matchesLocation = (property, requestedLocation) => {
  const search = normalizeLocation(requestedLocation);

  if (!search) return true;

  const destination = normalizeLocation(property.destination);
  const location = normalizeLocation(property.location);

  return (
    destination.includes(search) ||
    search.includes(destination) ||
    location.includes(search)
  );
};

/* PROPERTIES PAGE */

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedLocation = searchParams.get("location") || "";
  const requestedLocationName = formatLocationName(requestedLocation);

  /* INITIAL SEARCH VALUES */

  const initialRegion = searchParams.get("region") || "All Regions";
  const initialDestination =
    searchParams.get("destination") || "All Destinations";
  const initialType = searchParams.get("type") || "All Types";
  const initialBudget = searchParams.get("budget") || "All Prices";

  /* FILTER STATES */

  const [region, setRegion] = useState(
    locations[initialRegion] ? initialRegion : "All Regions",
  );

  const [destination, setDestination] = useState(
    locations[initialRegion]?.includes(initialDestination)
      ? initialDestination
      : "All Destinations",
  );

  const [type, setType] = useState(
    ["House", "Villa", "Apartment", "Commercial"].includes(initialType)
      ? initialType
      : "All Types",
  );

  const [maxPrice, setMaxPrice] = useState(
    /^\d+$/.test(initialBudget) ? initialBudget : "All Prices",
  );

  const [bedrooms, setBedrooms] = useState("Any");

  /* AVAILABLE DESTINATIONS */

  const availableDestinations =
    region !== "All Regions" ? locations[region] || [] : [];

  /* FILTER PROPERTIES */

  const filteredProperties = properties.filter((property) => {
    const matchesRegion =
      region === "All Regions" || property.region === region;

    const matchesDestination =
      destination === "All Destinations" ||
      normalizeLocation(property.destination) ===
        normalizeLocation(destination);

    const matchesRequestedLocation = matchesLocation(
      property,
      requestedLocation,
    );

    const matchesType = type === "All Types" || property.type === type;

    const matchesPrice =
      maxPrice === "All Prices" || Number(property.price) <= Number(maxPrice);

    const matchesBedrooms =
      bedrooms === "Any" || Number(property.bedrooms || 0) >= Number(bedrooms);

    return (
      matchesRegion &&
      matchesDestination &&
      matchesRequestedLocation &&
      matchesType &&
      matchesPrice &&
      matchesBedrooms
    );
  });

  /* FORMAT PRICE */

  const formatPrice = (price) =>
    `KSh ${(Number(price) / 1000000).toLocaleString("en-KE", {
      maximumFractionDigits: 1,
    })}M`;

  /* CLEAR FILTERS */

  const clearFilters = () => {
    setRegion("All Regions");
    setDestination("All Destinations");
    setType("All Types");
    setMaxPrice("All Prices");
    setBedrooms("Any");
    setSearchParams({});
  };

  return (
    <main className="properties-page">
      <SEO
        title={
          requestedLocationName
            ? `Properties for Sale in ${requestedLocationName}, Kenya | ÉLAN HOMES`
            : "Properties for Sale in Kenya | ÉLAN HOMES"
        }
        description={
          requestedLocationName
            ? `Explore houses, villas, apartments and residential properties for sale in ${requestedLocationName}, Kenya with ÉLAN HOMES.`
            : "Discover exceptional houses, luxury villas, modern apartments and residential properties for sale across Kenya with ÉLAN HOMES."
        }
      />

      {/* PAGE HERO */}

      <section className="properties-hero">
        <div className="properties-hero-content">
          <span>ELAN HOMES COLLECTION</span>

          <h1>
            {requestedLocationName
              ? `Properties in ${requestedLocationName}`
              : "Discover Exceptional Properties"}
          </h1>

          <p>
            Explore beautiful homes, modern apartments and exclusive residences
            across Kenya.
          </p>
        </div>
      </section>

      {/* PAGE INTRO */}

      <section className="properties-intro">
        <div>
          <span className="properties-label">FIND YOUR PLACE</span>

          <h2>Properties for Every Lifestyle</h2>

          <p>
            Discover a collection of properties selected for comfort, quality
            and location.
          </p>
        </div>
      </section>

      {/* FILTERS AND LISTINGS */}

      <section className="properties-content">
        <div className="properties-filters">
          <div className="filter-group">
            <label>Region</label>

            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setDestination("All Destinations");
              }}
            >
              <option value="All Regions">All Regions</option>

              {Object.keys(locations).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>County / Destination</label>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={region === "All Regions"}
            >
              <option value="All Destinations">All Destinations</option>

              {availableDestinations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Property Type</label>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All Types">All Types</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Maximum Price</label>

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="All Prices">All Prices</option>
              <option value="10000000">Up to KSh 10M</option>
              <option value="20000000">Up to KSh 20M</option>
              <option value="30000000">Up to KSh 30M</option>
              <option value="50000000">Up to KSh 50M</option>
              <option value="100000000">Up to KSh 100M</option>
              <option value="250000000">Up to KSh 250M</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Bedrooms</label>

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        {/* RESULTS HEADING */}

        <div className="properties-results-heading">
          <h2>Explore Properties</h2>

          <span>{filteredProperties.length} Properties Found</span>
        </div>

        {/* PROPERTY CARDS */}

        {filteredProperties.length > 0 && (
          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <article className="property-card" key={property.id}>
                <div className="property-card-image">
                  <img
                    src={property.image}
                    alt={property.name}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="property-status">FOR SALE</span>
                </div>

                <div className="property-card-details">
                  <span className="property-type">{property.type}</span>

                  <h3>{property.name}</h3>

                  <p className="property-location">{property.location}</p>

                  <div className="property-features">
                    <span>{property.bedrooms} Bedrooms</span>
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>

                  <div className="property-card-bottom">
                    <strong>{formatPrice(property.price)}</strong>

                    <Link
                      to={`/properties/${property.id}`}
                      className="view-details-btn"
                    >
                      View Details <span>↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}

        {filteredProperties.length === 0 && (
          <div className="properties-empty">
            {requestedLocation ? (
              <>
                <span>ÉLAN HOMES COLLECTION</span>

                <h3>Properties Coming Soon</h3>

                <p>
                  We are preparing our property collection for{" "}
                  {requestedLocationName}. Beautiful homes, villas and
                  apartments will be featured here soon.
                </p>

                <Link to="/destinations">Explore Other Destinations</Link>
              </>
            ) : (
              <>
                <h3>No properties found</h3>

                <p>Try adjusting your filters to see more properties.</p>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
