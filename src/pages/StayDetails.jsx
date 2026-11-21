import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import stays from "../data/stays";
import { getSavedListings, toggleSavedListing } from "../utils/savedListings";
import "./StayDetails.css";

export default function StayDetails() {
  const { id } = useParams();

  const stay = stays.find((item) => item.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // SAVED STAY FUNCTIONALITY
  const [savedListings, setSavedListings] = useState(() => getSavedListings());

  const isSaved = savedListings.some(
    (item) => item.type === "stay" && item.id === stay?.id,
  );

  const handleSaveStay = () => {
    if (!stay) return;

    const updatedListings = toggleSavedListing("stay", stay.id);

    setSavedListings(updatedListings);
  };

  if (!stay) {
    return (
      <main className="stay-not-found">
        <h1>Stay Not Found</h1>
        <p>Sorry, we could not find this holiday accommodation.</p>
        <Link to="/stays">Explore Holiday Stays</Link>
      </main>
    );
  }

  const formatPrice = (price) => `KSh ${price.toLocaleString("en-KE")}`;

  const today = new Date().toISOString().split("T")[0];

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
    <main className="stay-details-page">
      {/* HERO */}

      <section className="stay-details-hero">
        <div className="stay-details-hero-content">
          <span>ELAN HOMES EXPERIENCES</span>
          <h1>{stay.name}</h1>
          <p>{stay.location}</p>
        </div>
      </section>

      {/* BREADCRUMB */}

      <div className="stay-details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/stays">Holiday Stays</Link>
        <span>/</span>
        <strong>{stay.name}</strong>
      </div>

      {/* IMAGE GALLERY */}

      <section className="stay-details-gallery">
        <div className="stay-gallery-main">
          <img src={stay.image} alt={stay.name} />
        </div>

        <div className="stay-gallery-side">
          {stay.gallery?.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${stay.name} gallery ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="stay-details-container">
        <div className="stay-details-main">
          {/* TITLE */}

          <div className="stay-details-heading">
            <span>{stay.type}</span>
            <h2>{stay.name}</h2>
            <p>{stay.location}</p>

            {/* SAVE STAY BUTTON */}

            <button
              type="button"
              className={`save-listing-btn ${isSaved ? "saved" : ""}`}
              onClick={handleSaveStay}
              aria-pressed={isSaved}
            >
              {isSaved ? "♥ Saved" : "♡ Save Stay"}
            </button>
          </div>

          {/* FEATURES */}

          <div className="stay-details-features">
            <div>
              <strong>{stay.guests}</strong>
              <span>Guests</span>
            </div>

            <div>
              <strong>{stay.bedrooms}</strong>
              <span>Bedrooms</span>
            </div>

            <div>
              <strong>{stay.bathrooms}</strong>
              <span>Bathrooms</span>
            </div>

            <div>
              <strong>{stay.type}</strong>
              <span>Accommodation</span>
            </div>
          </div>

          {/* DESCRIPTION */}

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

          {/* CHECK IN / OUT */}

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

          {/* GUESTS */}

          <div className="stay-booking-field">
            <label htmlFor="stay-guests">Number of Guests</label>

            <select
              id="stay-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {Array.from({ length: stay.guests }, (_, index) => index + 1).map(
                (number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "Guest" : "Guests"}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* CHECK IN */}

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

          {/* CHECK OUT */}

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

          {/* PRICE SUMMARY */}

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

          <div className="stay-booking-info">
            <span>Maximum Guests</span>
            <strong>{stay.guests}</strong>
          </div>

          <div className="stay-booking-info">
            <span>Bedrooms</span>
            <strong>{stay.bedrooms}</strong>
          </div>

          <div className="stay-booking-info">
            <span>Bathrooms</span>
            <strong>{stay.bathrooms}</strong>
          </div>

          {/* ENQUIRY BUTTON */}

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

      {/* BACK TO STAYS */}

      <div className="stay-details-back">
        <Link to="/stays">← Back to Holiday Stays</Link>
      </div>
    </main>
  );
}
