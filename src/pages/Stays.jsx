import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import stays from "../data/stays";
import "./Stays.css";

/* =================================
   ELAN HOMES LOCATIONS
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
   LOCATION HELPERS
================================= */

const normalizeLocation = (value = "") =>
  value
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

/* =================================
   HOLIDAY STAYS PAGE
================================= */

export default function Stays() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* LOCATION FROM DESTINATION PAGE */

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

  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");

  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");

  const [guests, setGuests] = useState("Any");

  const [type, setType] = useState(
    ["Villa", "Apartment", "Cottage", "Lodge", "Estate"].includes(initialType)
      ? initialType
      : "All Types",
  );

  const [maxPrice, setMaxPrice] = useState(
    /^\d+$/.test(initialBudget) ? initialBudget : "All Prices",
  );

  /* AVAILABLE DESTINATIONS */

  const availableDestinations =
    region !== "All Regions" ? locations[region] || [] : [];

  /* FILTER HOLIDAY STAYS */

  const filteredStays = stays.filter((stay) => {
    const matchesRegion = region === "All Regions" || stay.region === region;

    const matchesDestination =
      destination === "All Destinations" || stay.destination === destination;

    const matchesRequestedLocation =
      !requestedLocation ||
      normalizeLocation(stay.destination || "") ===
        normalizeLocation(requestedLocation) ||
      normalizeLocation(stay.location || "").includes(
        normalizeLocation(requestedLocation),
      );

    const matchesGuests = guests === "Any" || stay.guests >= Number(guests);

    const matchesType = type === "All Types" || stay.type === type;

    const matchesPrice =
      maxPrice === "All Prices" || stay.price <= Number(maxPrice);

    const isNotHotel = (stay.type || "").toLowerCase() !== "hotel";

    return (
      matchesRegion &&
      matchesDestination &&
      matchesRequestedLocation &&
      matchesGuests &&
      matchesType &&
      matchesPrice &&
      isNotHotel
    );
  });

  /* FORMAT PRICE */

  const formatPrice = (price) => `KSh ${price.toLocaleString("en-KE")}`;

  /* CLEAR FILTERS */

  const clearFilters = () => {
    setRegion("All Regions");
    setDestination("All Destinations");
    setCheckIn("");
    setCheckOut("");
    setGuests("Any");
    setType("All Types");
    setMaxPrice("All Prices");

    // Keep the selected destination when clearing other filters.
    setSearchParams(requestedLocation ? { location: requestedLocation } : {});
  };

  /* PAGE CONTENT */

  return (
    <main className="stays-page">
      {/* HERO */}

      <section className="stays-hero">
        <div className="stays-hero-content">
          <span>ELAN HOMES EXPERIENCES</span>

          <h1>Find Your Perfect Holiday Stay</h1>

          <p>
            From beachfront villas to peaceful countryside retreats, discover
            exceptional places to stay across Kenya.
          </p>
        </div>
      </section>

      {/* INTRO */}

      <section className="stays-intro">
        <span className="stays-label">STAY SOMEWHERE SPECIAL</span>

        <h2>Explore Holiday Stays</h2>

        <p>
          Discover beautiful places for weekend escapes, family holidays and
          memorable experiences.
        </p>
      </section>

      {/* FILTERS */}

      <section className="stays-content">
        <div className="stays-filters">
          {/* REGION */}

          <div className="stay-filter-group">
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

          {/* DESTINATION */}

          <div className="stay-filter-group">
            <label>County / Destination</label>

            <select
              value={destination}
              disabled={region === "All Regions"}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="All Destinations">All Destinations</option>

              {availableDestinations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* CHECK-IN */}

          <div className="stay-filter-group">
            <label>Check-in</label>

            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setCheckIn(e.target.value);

                if (checkOut && e.target.value >= checkOut) {
                  setCheckOut("");
                }
              }}
            />
          </div>

          {/* CHECK-OUT */}

          <div className="stay-filter-group">
            <label>Check-out</label>

            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* GUESTS */}

          <div className="stay-filter-group">
            <label>Guests</label>

            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="Any">Any Guests</option>
              <option value="1">1+ Guests</option>
              <option value="2">2+ Guests</option>
              <option value="4">4+ Guests</option>
              <option value="6">6+ Guests</option>
              <option value="8">8+ Guests</option>
            </select>
          </div>

          {/* ACCOMMODATION TYPE */}

          <div className="stay-filter-group">
            <label>Accommodation Type</label>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All Types">All Types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Cottage">Cottage</option>
              <option value="Lodge">Lodge</option>
              <option value="Estate">Estate</option>
            </select>
          </div>

          {/* NIGHTLY BUDGET */}

          <div className="stay-filter-group">
            <label>Maximum Price / Night</label>

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="All Prices">All Prices</option>
              <option value="5000">Up to KSh 5,000</option>
              <option value="10000">Up to KSh 10,000</option>
              <option value="20000">Up to KSh 20,000</option>
              <option value="30000">Up to KSh 30,000</option>
              <option value="50000">Up to KSh 50,000</option>
            </select>
          </div>

          {/* CLEAR FILTERS */}

          <button className="stays-clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        {/* RESULTS */}

        <div className="stays-results-heading">
          <h2>
            {requestedLocation
              ? `Stays in ${requestedLocationName}`
              : "Available Holiday Stays"}
          </h2>

          <span>{filteredStays.length} Stays Found</span>
        </div>

        {/* STAY CARDS */}

        <div className="stays-grid">
          {filteredStays.map((stay) => (
            <article className="stay-card" key={stay.id}>
              <div className="stay-card-image">
                <img src={stay.image} alt={stay.name} />

                <span className="stay-card-badge">HOLIDAY STAY</span>
              </div>

              <div className="stay-card-details">
                <span className="stay-card-type">{stay.type}</span>

                <h3>{stay.name}</h3>

                <p className="stay-card-location">{stay.location}</p>

                <div className="stay-card-features">
                  <span>{stay.guests} Guests</span>
                  <span>{stay.bedrooms} Bedrooms</span>
                  <span>{stay.bathrooms} Bathrooms</span>
                </div>

                <div className="stay-card-bottom">
                  <div>
                    <strong>{formatPrice(stay.price)}</strong>
                    <span> / night</span>
                  </div>

                  <Link to={`/stays/${stay.id}`} className="view-stay-btn">
                    View Stay ↗
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* NO RESULTS / COMING SOON */}

        {filteredStays.length === 0 && (
          <div className="stays-empty">
            {requestedLocation ? (
              <>
                <span>ÉLAN HOMES COLLECTION</span>

                <h3>Stays Coming Soon</h3>

                <p>
                  We are preparing our accommodation collection for{" "}
                  {requestedLocationName}. Beautiful B&Bs, holiday homes and
                  furnished short stays will be featured here soon.
                </p>

                <Link to="/destinations">Explore Other Destinations →</Link>
              </>
            ) : (
              <>
                <h3>No holiday stays found</h3>

                <p>Try adjusting your filters to explore other destinations.</p>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
