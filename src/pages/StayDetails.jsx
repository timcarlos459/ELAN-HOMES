import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import stays from "../data/stays";
import { getSavedListings, toggleSavedListing } from "../utils/savedListings";
import SEO from "../components/SEO";
import "./StayDetails.css";

export default function StayDetails() {
  const { id } = useParams();

  const stay = stays.find((item) => item.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [savedListings, setSavedListings] = useState(() => getSavedListings());

  const isSaved = savedListings.some(
    (item) => item.type === "stay" && item.id === stay?.id,
  );

  const handleSaveStay = () => {
    if (!stay) return;

    const updatedListings = toggleSavedListing("stay", stay.id);
    setSavedListings(updatedListings);
  };

  const seoTitle = stay
    ? `${stay.name} | Holiday Stay in ${stay.location} | ÉLAN HOMES`
    : "Stay Not Found | ÉLAN HOMES";

  const seoDescription = stay
    ? `Discover ${stay.name}, a ${stay.accommodation || stay.type || "holiday accommodation"} in ${stay.location}, Kenya. Explore photos, amenities, accommodation details and nightly rates with ÉLAN HOMES.`
    : "The requested accommodation could not be found. Explore furnished apartments, B&Bs and holiday stays across Kenya with ÉLAN HOMES.";

  if (!stay) {
    return (
      <>
        <SEO title={seoTitle} description={seoDescription} />

        <main className="stay-not-found">
          <h1>Stay Not Found</h1>
          <p>Sorry, we could not find this holiday accommodation.</p>
          <Link to="/stays">Explore Holiday Stays</Link>
        </main>
      </>
    );
  }

  const formatPrice = (price) => `KSh ${price.toLocaleString("en-KE")}`;

  const today = new Date().toISOString().split("T")[0];

  const hasGuestLimit =
    stay.guests !== null &&
    stay.guests !== undefined &&
    Number.isFinite(Number(stay.guests)) &&
    Number(stay.guests) > 0;

  const guestOptions = hasGuestLimit
    ? Array.from({ length: Number(stay.guests) }, (_, index) => index + 1)
    : Array.from({ length: 12 }, (_, index) => index + 1);

  const accommodationType = stay.accommodation || stay.type;

  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const totalPrice = nights > 0 ? nights * stay.price : 0;

  const enquiryLink = `/contact?property=${encodeURIComponent(
    stay.name,
  )}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(
    checkOut,
  )}&guests=${guests}&nights=${nights}&total=${totalPrice}`;

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />

      <main className="stay-details-page">
        <section className="stay-details-hero">
          <div className="stay-details-hero-content">
            <span>ELAN HOMES EXPERIENCES</span>
            <h1>{stay.name}</h1>
            <p>{stay.location}</p>
          </div>
        </section>

        <div className="stay-details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/stays">Holiday Stays</Link>
          <span>/</span>
          <strong>{stay.name}</strong>
        </div>

        {/* ACCOMMODATION GALLERY */}

        <section className="stay-details-gallery">
          <div className="stay-gallery-main">
            <img src={stay.image} alt={stay.name} decoding="async" />
          </div>

          <div className="stay-gallery-side">
            {stay.gallery?.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${stay.name} gallery ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        <section className="stay-details-container">
          <div className="stay-details-main">
            <div className="stay-details-heading">
              <span>{accommodationType}</span>

              <h2>{stay.name}</h2>

              <p>{stay.location}</p>

              <button
                type="button"
                className={`save-listing-btn ${isSaved ? "saved" : ""}`}
                onClick={handleSaveStay}
                aria-pressed={isSaved}
              >
                {isSaved ? "♥ Saved" : "♡ Save Stay"}
              </button>
            </div>

            {/* ACCOMMODATION FEATURES */}

            <div className="stay-details-features">
              {stay.guests != null && (
                <div>
                  <strong>{stay.guests}</strong>
                  <span>Guests</span>
                </div>
              )}

              <div>
                <strong>{stay.bedrooms}</strong>
                <span>Bedrooms</span>
              </div>

              {stay.bathrooms != null && (
                <div>
                  <strong>{stay.bathrooms}</strong>
                  <span>Bathrooms</span>
                </div>
              )}

              <div>
                <strong>{accommodationType}</strong>
                <span>Accommodation</span>
              </div>

              {stay.unitsAvailable != null && (
                <div>
                  <strong>{stay.unitsAvailable}</strong>
                  <span>Units Available</span>
                </div>
              )}
            </div>

            {/* ABOUT */}

            <div className="stay-details-section">
              <h3>About This Stay</h3>
              <p>{stay.description}</p>
            </div>

            {/* AMENITIES */}

            <div className="stay-details-section">
              <h3>Facilities & Amenities</h3>

              <div className="stay-amenities-grid">
                {stay.amenities?.map((amenity, index) => (
                  <div key={index} className="stay-amenity">
                    <span>✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* LOCATION */}

            <div className="stay-details-section">
              <h3>Location</h3>
              <p>{stay.location}</p>
              <p>Region: {stay.region}</p>
              <p>Destination: {stay.destination}</p>
            </div>

            {/* CHECK-IN AND CHECK-OUT */}

            <div className="stay-details-section">
              <h3>Check-in & Check-out</h3>

              <div className="stay-check-times">
                <div>
                  <span>Check-in</span>
                  <strong>{stay.checkIn}</strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>{stay.checkOut}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}

          <aside className="stay-booking-card">
            <span>PRICE PER NIGHT</span>

            <h2>{formatPrice(stay.price)}</h2>

            <p>Accommodation rate per night</p>

            <div className="stay-booking-divider"></div>

            <div className="stay-booking-field">
              <label htmlFor="stay-guests">Number of Guests</label>

              <select
                id="stay-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {guestOptions.map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div className="stay-booking-field">
              <label htmlFor="stay-checkin">Check-in Date</label>

              <input
                id="stay-checkin"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);

                  if (checkOut && e.target.value >= checkOut) {
                    setCheckOut("");
                  }
                }}
              />
            </div>

            <div className="stay-booking-field">
              <label htmlFor="stay-checkout">Check-out Date</label>

              <input
                id="stay-checkout"
                type="date"
                min={checkIn || today}
                value={checkOut}
                disabled={!checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            {/* BOOKING ESTIMATE */}

            {nights > 0 && (
              <div className="stay-price-summary">
                <h3>Booking Estimate</h3>

                <div className="stay-booking-info">
                  <span>Price per night</span>
                  <strong>{formatPrice(stay.price)}</strong>
                </div>

                <div className="stay-booking-info">
                  <span>Number of nights</span>
                  <strong>{nights}</strong>
                </div>

                <div className="stay-booking-info">
                  <span>Guests</span>
                  <strong>{guests}</strong>
                </div>

                <div className="stay-booking-divider"></div>

                <div className="stay-booking-total">
                  <span>Estimated Total</span>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
              </div>
            )}

            <div className="stay-booking-divider"></div>

            {hasGuestLimit && (
              <div className="stay-booking-info">
                <span>Maximum Guests</span>
                <strong>{stay.guests}</strong>
              </div>
            )}

            <div className="stay-booking-info">
              <span>Bedrooms</span>
              <strong>{stay.bedrooms}</strong>
            </div>

            <div className="stay-booking-info">
              <span>Accommodation</span>
              <strong>{accommodationType}</strong>
            </div>

            {stay.unitsAvailable != null && (
              <div className="stay-booking-info">
                <span>Units Available</span>
                <strong>{stay.unitsAvailable}</strong>
              </div>
            )}

            {stay.bathrooms != null && (
              <div className="stay-booking-info">
                <span>Bathrooms</span>
                <strong>{stay.bathrooms}</strong>
              </div>
            )}

            <Link
              to={enquiryLink}
              className="stay-booking-btn"
              onClick={(e) => {
                if (!checkIn || !checkOut || nights <= 0) {
                  e.preventDefault();
                  alert("Please select valid check-in and check-out dates.");
                }
              }}
            >
              Enquire About This Stay
            </Link>

            <p className="stay-booking-note">
              Your dates and booking estimate will be included in your enquiry.
              Final pricing and availability will be confirmed by ELAN HOMES.
            </p>
          </aside>
        </section>

        <div className="stay-details-back">
          <Link to="/stays">← Back to Holiday Stays</Link>
        </div>
      </main>
    </>
  );
}
