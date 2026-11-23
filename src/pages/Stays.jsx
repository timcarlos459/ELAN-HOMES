import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import stays from "../data/stays";
import SEO from "../components/SEO";
import "./Stays.css";

/* =================================
   ELAN HOMES LOCATIONS
================================= */

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

/* =================================
   LOCATION HELPERS
================================= */

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

const matchesLocation = (stay, requestedLocation) => {
  const search = normalizeLocation(requestedLocation);

  if (!search) return true;

  const destination = normalizeLocation(stay.destination || "");
  const location = normalizeLocation(stay.location || "");

  return (
    destination.includes(search) ||
    search.includes(destination) ||
    location.includes(search)
  );
};

/* =================================
   DATE HELPER
================================= */

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =================================
   HOLIDAY STAYS PAGE
================================= */

export default function Stays() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedLocation = searchParams.get("location") || "";
  const requestedLocationName = formatLocationName(requestedLocation);

  const initialRegion = searchParams.get("region") || "All Regions";
  const initialDestination =
    searchParams.get("destination") || "All Destinations";
  const initialType = searchParams.get("type") || "All Types";
  const initialBudget = searchParams.get("budget") || "All Prices";

  /* =================================
     FILTER STATES
  ================================= */

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

  const [guests, setGuests] = useState(searchParams.get("guests") || "");

  const [type, setType] = useState(
    ["Villa", "Apartment", "Cottage", "Lodge", "Estate", "Studio"].includes(
      initialType,
    )
      ? initialType
      : "All Types",
  );

  const [maxPrice, setMaxPrice] = useState(
    /^\d+$/.test(initialBudget) ? initialBudget : "All Prices",
  );

  const availableDestinations =
    region === "All Regions" ? [] : locations[region] || [];

  /* =================================
     SEO SETTINGS
  ================================= */

  const seoLocation =
    requestedLocationName ||
    (destination !== "All Destinations"
      ? destination
      : region !== "All Regions"
        ? region
        : "");

  const seoTitle = seoLocation
    ? `Holiday Stays in ${seoLocation}, Kenya | ÉLAN HOMES`
    : "Holiday Stays & Furnished Accommodation in Kenya | ÉLAN HOMES";

  const seoDescription = seoLocation
    ? `Explore beautiful holiday homes, B&Bs, studios and furnished short-stay accommodation in ${seoLocation}, Kenya. Discover your next stay with ÉLAN HOMES.`
    : "Discover beautiful holiday homes, B&Bs, furnished apartments, studios and short-stay accommodation across Kenya with ÉLAN HOMES.";

  /* =================================
     PHOTO GALLERY STATES
  ================================= */

  const [selectedStay, setSelectedStay] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);

  /* =================================
     PHOTO GALLERY FUNCTIONS
  ================================= */

  const openGallery = (stay) => {
    setSelectedStay(stay);
    setActivePhoto(0);
  };

  const closeGallery = () => {
    setSelectedStay(null);
    setActivePhoto(0);
  };

  const currentGallery =
    selectedStay?.gallery?.length > 0
      ? selectedStay.gallery
      : selectedStay?.image
        ? [selectedStay.image]
        : [];

  const nextPhoto = () => {
    setActivePhoto((current) =>
      currentGallery.length ? (current + 1) % currentGallery.length : 0,
    );
  };

  const previousPhoto = () => {
    setActivePhoto((current) =>
      currentGallery.length
        ? (current - 1 + currentGallery.length) % currentGallery.length
        : 0,
    );
  };

  /* =================================
     KEYBOARD GALLERY CONTROLS
  ================================= */

  useEffect(() => {
    if (!selectedStay) return;

    const photoCount =
      selectedStay.gallery?.length > 0
        ? selectedStay.gallery.length
        : selectedStay.image
          ? 1
          : 0;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedStay(null);
        setActivePhoto(0);
      }

      if (event.key === "ArrowRight") {
        setActivePhoto((current) =>
          photoCount ? (current + 1) % photoCount : 0,
        );
      }

      if (event.key === "ArrowLeft") {
        setActivePhoto((current) =>
          photoCount ? (current - 1 + photoCount) % photoCount : 0,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedStay]);

  /* =================================
     FILTER HOLIDAY STAYS
  ================================= */

  const filteredStays = stays.filter((stay) => {
    const matchesRegion = region === "All Regions" || stay.region === region;

    const matchesDestination =
      destination === "All Destinations" ||
      normalizeLocation(stay.destination || "") ===
        normalizeLocation(destination);

    const matchesRequestedLocation = matchesLocation(stay, requestedLocation);

    const matchesGuests =
      guests === "" ||
      stay.guests == null ||
      Number(stay.guests) >= Number(guests);

    const matchesType = type === "All Types" || stay.type === type;

    const matchesPrice =
      maxPrice === "All Prices" || Number(stay.price) <= Number(maxPrice);

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

  /* =================================
     FORMAT PRICE
  ================================= */

  const formatPrice = (price) => `KSh ${Number(price).toLocaleString("en-KE")}`;

  /* =================================
     CLEAR FILTERS
  ================================= */

  const clearFilters = () => {
    setRegion("All Regions");
    setDestination("All Destinations");
    setCheckIn("");
    setCheckOut("");
    setGuests("");
    setType("All Types");
    setMaxPrice("All Prices");

    setSearchParams(requestedLocation ? { location: requestedLocation } : {});
  };

  /* =================================
     PAGE CONTENT
  ================================= */

  return (
    <main className="stays-page">
      <SEO title={seoTitle} description={seoDescription} />

      {/* HERO */}

      <section className="stays-hero">
        <div className="stays-hero-content">
          <span>ELAN HOMES EXPERIENCES</span>

          <h1>Find Your Perfect Holiday Stay</h1>

          <p>
            From beautiful studios and furnished apartments to peaceful holiday
            homes, discover exceptional places to stay across Kenya.
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
              min={getToday()}
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
              min={checkIn || getToday()}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* GUESTS */}

          <div className="stay-filter-group">
            <label>Number of Guests</label>

            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="">Any number of guests</option>

              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "Guest" : "Guests"}
                  </option>
                ),
              )}
            </select>

            <small className="stay-guest-hint">
              You can browse stays before selecting guests.
            </small>
          </div>

          {/* ACCOMMODATION TYPE */}

          <div className="stay-filter-group">
            <label>Accommodation Type</label>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All Types">All Types</option>
              <option value="Studio">Studio</option>
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

          <button
            type="button"
            className="stays-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* RESULTS HEADING */}

        <div className="stays-results-heading">
          <h2>
            {requestedLocation
              ? `Stays in ${requestedLocationName}`
              : "Available Holiday Stays"}
          </h2>

          <span>{filteredStays.length} Stays Found</span>
        </div>

        {/* STAY CARDS */}

        {filteredStays.length > 0 && (
          <div className="stays-grid">
            {filteredStays.map((stay) => {
              const photoCount = stay.gallery?.length || (stay.image ? 1 : 0);

              return (
                <article className="stay-card" key={stay.id}>
                  {/* MAIN PHOTO */}

                  <div
                    className="stay-card-image"
                    onClick={() => openGallery(stay)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${stay.name} photo gallery`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openGallery(stay);
                      }
                    }}
                  >
                    <img
                      src={stay.image}
                      alt={stay.name}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="stay-card-badge">HOLIDAY STAY</span>

                    <button
                      type="button"
                      className="stay-photo-count"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(stay);
                      }}
                    >
                      ▧ {photoCount} Photos
                    </button>
                  </div>

                  {/* DETAILS */}

                  <div className="stay-card-details">
                    <span className="stay-card-type">{stay.type}</span>

                    <h3>{stay.name}</h3>

                    <p className="stay-card-location">{stay.location}</p>

                    <div className="stay-card-features">
                      <span>
                        {stay.guests == null
                          ? "Guest selection at booking"
                          : `${stay.guests} Guests`}
                      </span>

                      {stay.accommodation && (
                        <span>Accommodation: {stay.accommodation}</span>
                      )}

                      <span>
                        {stay.bedrooms === 0
                          ? "0 Bedrooms"
                          : `${stay.bedrooms} Bedrooms`}
                      </span>

                      {stay.bathrooms > 0 && (
                        <span>{stay.bathrooms} Bathrooms</span>
                      )}

                      {stay.unitsAvailable != null && (
                        <span>{stay.unitsAvailable} Units Available</span>
                      )}
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
              );
            })}
          </div>
        )}

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

      {/* FULL PHOTO GALLERY MODAL */}

      {selectedStay && currentGallery.length > 0 && (
        <div
          className="stay-gallery-overlay"
          onClick={closeGallery}
          role="presentation"
        >
          <div
            className="stay-gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedStay.name} photo gallery`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* GALLERY HEADER */}

            <div className="stay-gallery-header">
              <div>
                <span>ÉLAN HOMES COLLECTION</span>
                <h2>{selectedStay.name}</h2>
              </div>

              <button
                type="button"
                className="stay-gallery-close"
                onClick={closeGallery}
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>

            {/* MAIN IMAGE */}

            <div className="stay-gallery-main">
              <img
                src={currentGallery[activePhoto]}
                alt={`${selectedStay.name} photo ${activePhoto + 1}`}
              />

              {currentGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    className="stay-gallery-arrow stay-gallery-prev"
                    onClick={previousPhoto}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    className="stay-gallery-arrow stay-gallery-next"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </>
              )}

              <span className="stay-gallery-counter">
                {activePhoto + 1} / {currentGallery.length}
              </span>
            </div>

            {/* THUMBNAILS */}

            {currentGallery.length > 1 && (
              <div className="stay-gallery-thumbnails">
                {currentGallery.map((photo, index) => (
                  <button
                    type="button"
                    key={`${selectedStay.id}-${index}`}
                    className={
                      activePhoto === index
                        ? "stay-gallery-thumbnail active"
                        : "stay-gallery-thumbnail"
                    }
                    onClick={() => setActivePhoto(index)}
                    aria-label={`Open photo ${index + 1}`}
                    aria-current={activePhoto === index ? "true" : undefined}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* GALLERY FOOTER */}

            <div className="stay-gallery-footer">
              <span>{selectedStay.location}</span>

              <strong>{formatPrice(selectedStay.price)} / night</strong>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
