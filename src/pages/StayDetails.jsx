import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import stays from "../data/stays";
import { getSavedListings, toggleSavedListing } from "../utils/savedListings";
import SEO from "../components/SEO";
import "./StayDetails.css";

/* =================================
   GUEST REVIEWS & RATINGS
================================= */

const getStayReviews = (stay) => {
  const reviews = Array.isArray(stay.reviews) ? stay.reviews : [];

  const validReviews = reviews.filter((review) => {
    const rating = Number(review.rating);
    return Number.isFinite(rating) && rating >= 1 && rating <= 5;
  });

  const averageRating =
    validReviews.length > 0
      ? validReviews.reduce(
          (total, review) => total + Number(review.rating),
          0,
        ) / validReviews.length
      : 0;

  return {
    reviews: validReviews,
    averageRating,
    reviewCount: validReviews.length,
  };
};

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={
        index < Math.round(rating) ? "review-star filled" : "review-star"
      }
    >
      ★
    </span>
  ));

/* =================================
   STAY DETAILS PAGE
================================= */

export default function StayDetails() {
  const { id } = useParams();

  const stay = stays.find((item) => item.id === id);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [savedListings, setSavedListings] = useState(() => getSavedListings());

  const [showAccountOptions, setShowAccountOptions] = useState(false);

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
    ? `Discover ${stay.name}, a ${
        stay.accommodation || stay.type || "holiday accommodation"
      } in ${stay.location}, Kenya. Explore photos, amenities, accommodation details and nightly rates with ÉLAN HOMES.`
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

  /* =================================
     STAY INFORMATION
  ================================= */

  const formatPrice = (price) => `KSh ${Number(price).toLocaleString("en-KE")}`;

  const today = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  })();

  const hasGuestLimit =
    stay.guests !== null &&
    stay.guests !== undefined &&
    Number.isFinite(Number(stay.guests)) &&
    Number(stay.guests) > 0;

  const guestOptions = hasGuestLimit
    ? Array.from({ length: Number(stay.guests) }, (_, index) => index + 1)
    : Array.from({ length: 12 }, (_, index) => index + 1);

  const accommodationType = stay.accommodation || stay.type;

  /* =================================
     REVIEWS
  ================================= */

  const { reviews, averageRating, reviewCount } = getStayReviews(stay);

  /* =================================
     BOOKING CALCULATIONS
  ================================= */

  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const totalPrice = nights > 0 ? nights * stay.price : 0;

  const enquiryLink = `/enquiry/stay/${stay.id}?checkIn=${encodeURIComponent(
    checkIn,
  )}&checkOut=${encodeURIComponent(
    checkOut,
  )}&guests=${guests}&nights=${nights}&total=${totalPrice}`;

  const signInLink = `/signin?redirect=${encodeURIComponent(enquiryLink)}`;

  const registerLink = `/register?redirect=${encodeURIComponent(enquiryLink)}`;

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />

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

        {/* PROPERTY VIDEO TOUR */}

        {stay.video && (
          <section className="stay-video-section">
            <div className="stay-video-heading">
              <span>EXPLORE THE SPACE</span>

              <h2>Property Video Tour</h2>

              <p>
                Take a closer look at {stay.name} and experience the
                accommodation before your visit.
              </p>
            </div>

            <video
              className="stay-video-player"
              controls
              playsInline
              preload="metadata"
              poster={stay.image}
            >
              <source src={stay.video} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </section>
        )}

        {/* DETAILS AND BOOKING */}

        <section className="stay-details-container">
          <div className="stay-details-main">
            {/* ACCOMMODATION HEADING */}

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

            {/* GUEST REVIEWS & RATINGS */}

            <section className="stay-details-section stay-reviews-section">
              <div className="stay-reviews-heading">
                <div>
                  <span className="stay-reviews-eyebrow">
                    GUEST EXPERIENCES
                  </span>

                  <h3>Reviews & Ratings</h3>

                  <p>Discover what guests have to say about this stay.</p>
                </div>

                {reviewCount > 0 && (
                  <div className="stay-average-rating">
                    <strong>{averageRating.toFixed(1)}</strong>

                    <div>
                      <div className="stay-review-stars">
                        {renderStars(averageRating)}
                      </div>

                      <span>
                        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {reviewCount > 0 ? (
                <div className="stay-reviews-grid">
                  {reviews.map((review, index) => (
                    <article
                      className="stay-review-card"
                      key={review.id || index}
                    >
                      <div className="stay-review-card-top">
                        <div className="stay-review-avatar">
                          {(review.name || "Guest").charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{review.name || "Guest"}</strong>
                          <span>{review.date || "Guest review"}</span>
                        </div>
                      </div>

                      <div className="stay-review-stars">
                        {renderStars(Number(review.rating))}
                      </div>

                      {review.title && <h4>{review.title}</h4>}

                      <p>{review.comment || "No written comment provided."}</p>

                      {review.verified && (
                        <span className="stay-verified-review">
                          ✓ Verified Stay
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="stay-no-reviews">
                  <div className="stay-no-reviews-icon">☆</div>

                  <h4>No Guest Reviews Yet</h4>

                  <p>
                    This accommodation is waiting for its first guest review.
                    Guest ratings and feedback will appear here as they become
                    available.
                  </p>
                </div>
              )}
            </section>
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
                {guestOptions.map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* CHECK-IN */}

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

            {/* CHECK-OUT */}

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

            {/* BOOK NOW */}

            <button
              type="button"
              className="stay-booking-btn"
              onClick={() => {
                if (!checkIn || !checkOut || nights <= 0) {
                  alert("Please select valid check-in and check-out dates.");
                  return;
                }

                setShowAccountOptions(true);
              }}
            >
              BOOK NOW
            </button>

            <p className="stay-booking-note">
              Your selected dates and booking estimate will be included in your
              booking request. Final pricing and availability will be confirmed
              by ÉLAN HOMES.
            </p>
          </aside>
        </section>

        {/* ACCOUNT OPTIONS MODAL */}

        {showAccountOptions && (
          <div
            className="stay-account-overlay"
            onClick={() => setShowAccountOptions(false)}
          >
            <div
              className="stay-account-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="stay-account-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="stay-account-close"
                onClick={() => setShowAccountOptions(false)}
                aria-label="Close"
              >
                ×
              </button>

              <span>ÉLAN HOMES BOOKING</span>

              <h2 id="stay-account-title">Continue with Your Booking</h2>

              <p>
                Sign in to your existing account or create an account to
                continue with your booking.
              </p>

              <Link to={signInLink} className="stay-account-signin">
                SIGN IN TO CONTINUE BOOKING
              </Link>

              <Link to={registerLink} className="stay-account-register">
                CREATE ACCOUNT TO CONTINUE
              </Link>

              <button
                type="button"
                className="stay-account-cancel"
                onClick={() => setShowAccountOptions(false)}
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* BACK TO STAYS */}

        <div className="stay-details-back">
          <Link to="/stays">← Back to Holiday Stays</Link>
        </div>
      </main>
    </>
  );
}
