import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import properties from "../data/properties";
import SEO from "../components/SEO";
import "./Properties.css";

/* =========================================
   ÉLAN HOMES — LOCATIONS
========================================= */

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
    "Nanyuki",
    "Sekenani",
    "Talek",
    "Mara Triangle",
    "Eldoret",
    "Naivasha",
    "Nakuru",
  ],
};

/* =========================================
   LOCATION HELPERS
========================================= */

const normalizeLocation = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const formatLocationName = (value = "") =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/* =========================================
   LOCATION MATCHING
========================================= */

const matchesLocation = (property, requestedLocation) => {
  const search = normalizeLocation(requestedLocation);

  if (!search) return true;

  const destination = normalizeLocation(property.destination);
  const location = normalizeLocation(property.location);

  return Boolean(
    (destination &&
      (destination.includes(search) || search.includes(destination))) ||
    (location && location.includes(search)),
  );
};

/* =========================================
   PROPERTY STATUS
========================================= */

const isDemoProperty = (property) =>
  String(property.status || "").toLowerCase() === "demo";

const isSoldProperty = (property) => {
  const status = String(
    property.availabilityStatus || property.status || "",
  ).toLowerCase();

  return (
    status === "sold" || status === "unavailable" || property.isSold === true
  );
};

const isPublicProperty = (property) =>
  !isDemoProperty(property) && !isSoldProperty(property);

/* =========================================
   PRICE FORMATTER
========================================= */

const formatPrice = (price) => {
  const amount = Number(price);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Price on request";
  }

  if (amount >= 1000000) {
    return `KSh ${(amount / 1000000).toLocaleString("en-KE", {
      maximumFractionDigits: 1,
    })}M`;
  }

  return `KSh ${amount.toLocaleString("en-KE")}`;
};

/* =========================================
   PROPERTIES PAGE
========================================= */

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* URL FILTERS */

  const requestedLocation = searchParams.get("location") || "";

  const requestedLocationName = formatLocationName(requestedLocation);

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

  /* PUBLIC PROPERTY RECORDS */

  const publicProperties = useMemo(
    () => properties.filter(isPublicProperty),
    [],
  );

  /* FILTER PROPERTIES */

  const filteredProperties = useMemo(() => {
    return publicProperties.filter((property) => {
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

      const price = Number(property.price);

      const matchesPrice =
        maxPrice === "All Prices" ||
        (Number.isFinite(price) && price <= Number(maxPrice));

      const matchesBedrooms =
        bedrooms === "Any" ||
        Number(property.bedrooms || 0) >= Number(bedrooms);

      return (
        matchesRegion &&
        matchesDestination &&
        matchesRequestedLocation &&
        matchesType &&
        matchesPrice &&
        matchesBedrooms
      );
    });
  }, [
    publicProperties,
    region,
    destination,
    requestedLocation,
    type,
    maxPrice,
    bedrooms,
  ]);

  /* CLEAR FILTERS */

  const clearFilters = () => {
    setRegion("All Regions");
    setDestination("All Destinations");
    setType("All Types");
    setMaxPrice("All Prices");
    setBedrooms("Any");
    setSearchParams({});
  };

  /* PROPERTY AVAILABILITY */

  const hasProperties = publicProperties.length > 0;

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
            ? `Discover property opportunities in ${requestedLocationName}, Kenya with ÉLAN HOMES.`
            : "Discover houses, luxury villas and modern apartments for sale across Kenya with ÉLAN HOMES."
        }
      />

      {/* =====================================
          PAGE HERO
      ===================================== */}

      <section className="properties-hero">
        <div className="properties-hero-content">
          <span>ÉLAN HOMES COLLECTION</span>

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

      {/* =====================================
          PAGE INTRO
      ===================================== */}

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

      {/* =====================================
          PROPERTY COLLECTION
      ===================================== */}

      {!hasProperties ? (
        <section className="properties-content">
          <div className="properties-empty">
            <span>ÉLAN HOMES COLLECTION</span>

            <h3>Properties Coming Soon</h3>

            <p>
              We are carefully preparing our property collection. Soon, you will
              be able to discover houses, luxury villas and modern apartments
              for sale across Kenya.
            </p>

            <Link to="/stays">Explore Available Stays</Link>
          </div>
        </section>
      ) : (
        <section className="properties-content">
          {/* FILTERS */}

          <div className="properties-filters">
            <div className="filter-group">
              <label htmlFor="property-region">Region</label>

              <select
                id="property-region"
                value={region}
                onChange={(event) => {
                  setRegion(event.target.value);
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
              <label htmlFor="property-destination">County / Destination</label>

              <select
                id="property-destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
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
              <label htmlFor="property-type">Property Type</label>

              <select
                id="property-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="All Types">All Types</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="property-budget">Maximum Price</label>

              <select
                id="property-budget"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
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
              <label htmlFor="property-bedrooms">Bedrooms</label>

              <select
                id="property-bedrooms"
                value={bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
              >
                <option value="Any">Any</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            <button
              type="button"
              className="clear-filters-btn"
              onClick={clearFilters}
            >
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
                      alt={`${property.name} for sale in ${property.location || "Kenya"}`}
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
                      <span>{property.bedrooms ?? "—"} Bedrooms</span>

                      <span>{property.bathrooms ?? "—"} Bathrooms</span>
                    </div>

                    <div className="property-card-bottom">
                      <strong>{formatPrice(property.price)}</strong>

                      <Link
                        to={`/properties/${property.id}`}
                        className="view-details-btn"
                        aria-label={`View details for ${property.name}`}
                      >
                        View Details <span>↗</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* FILTERED EMPTY STATE */}

          {filteredProperties.length === 0 && (
            <div className="properties-empty">
              <span>ÉLAN HOMES COLLECTION</span>

              <h3>No Matching Properties</h3>

              <p>
                We couldn't find properties matching your selected filters. Try
                changing your search criteria.
              </p>

              <button type="button" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* =====================================
          CLIENT TESTIMONIALS
      ===================================== */}

      <section className="property-testimonials">
        <div className="testimonials-heading">
          <span>CLIENT EXPERIENCES</span>

          <h2>What Our Clients Say</h2>

          <p>
            We're building a community around better property experiences.
            Genuine client feedback will appear here.
          </p>
        </div>

        <div className="testimonial-demo-notice">
          Verified client testimonials will be featured here as genuine customer
          feedback becomes available.
        </div>
      </section>
    </main>
  );
}
