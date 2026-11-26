import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import landListings from "../data/land";
import "./LandDetails.css";

export default function LandDetails() {
  const { id } = useParams();

  const land =
    landListings.find((item) => item.id === id && item.status !== "demo") ||
    landListings.find((item) => item.id === id);

  const [imageIndex, setImageIndex] = useState(0);
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  const viewingRequestPath = land
    ? `/land/${land.id}/request-viewing`
    : "/land";

  const signInLink = `/signin?redirect=${encodeURIComponent(
    viewingRequestPath,
  )}`;

  const registerLink = `/register?redirect=${encodeURIComponent(
    viewingRequestPath,
  )}`;

  useEffect(() => {
    if (!showAccountOptions) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowAccountOptions(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAccountOptions]);

  if (!land) {
    return (
      <main className="land-details-page">
        <div className="land-details-not-found">
          <span>ÉLAN HOMES LAND COLLECTION</span>
          <h1>Land Listing Not Available</h1>
          <p>
            This land listing may have been removed or is no longer available.
          </p>
          <Link to="/land">Explore Land Opportunities</Link>
        </div>
      </main>
    );
  }

  const images = land.images?.length
    ? land.images
    : land.image
      ? [land.image]
      : [];

  const isSold = land.availabilityStatus === "sold";
  const isAvailable = land.availabilityStatus === "available";

  const formatPrice = (price) => {
    if (typeof price === "number" && Number.isFinite(price)) {
      return `KSh ${price.toLocaleString("en-KE")}`;
    }

    if (typeof price === "string" && price.trim()) {
      return price.startsWith("KSh") ? price : `KSh ${price}`;
    }

    return "Price on request";
  };

  const availabilityLabel = (value) => {
    if (value === true || value === "Available") return "Available";
    if (value === false || value === "Not Available") return "Not Available";
    return "Not specified";
  };

  const landSpecifications = [
    { label: "Land Type", value: land.type },
    { label: "Land Size", value: land.size },
    { label: "Location", value: land.destination },
    { label: "Region", value: land.region },
    { label: "Land Use", value: land.landUse },
    { label: "Access Road", value: availabilityLabel(land.accessRoad) },
    { label: "Water Availability", value: availabilityLabel(land.water) },
    { label: "Electricity", value: availabilityLabel(land.electricity) },
    { label: "Title Deed", value: availabilityLabel(land.titleDeed) },
    {
      label: "Ownership Documents",
      value: availabilityLabel(land.ownershipDocuments),
    },
    { label: "Terrain", value: land.terrain },
  ];

  const visibleSpecifications = landSpecifications.filter(
    (item) => item.value && item.value !== "Not specified",
  );

  const seoTitle = `${land.title} | Land for Sale | ÉLAN HOMES`;

  const seoDescription = `Explore ${land.title} in ${land.destination}, ${land.region}, Kenya. Contact ÉLAN HOMES for further information.`;

  return (
    <main className="land-details-page">
      <SEO title={seoTitle} description={seoDescription} />

      <div className="land-details-container">
        <nav className="land-details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/land">Land</Link>
          <span>/</span>
          <span>{land.title}</span>
        </nav>

        <div className="land-details-heading">
          <div>
            <span className="land-details-eyebrow">
              ÉLAN HOMES LAND COLLECTION
            </span>

            <h1>{land.title}</h1>

            <p>
              {land.destination}, {land.region}, Kenya
              <span
                className={`land-details-availability ${
                  isSold ? "sold" : isAvailable ? "available" : "unavailable"
                }`}
              >
                {isSold ? "SOLD" : isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
              </span>
            </p>
          </div>

          <div className="land-details-price">
            <small>{isSold ? "Last Asking Price" : "Asking Price"}</small>
            <strong>{formatPrice(land.price)}</strong>
          </div>
        </div>

        <div className="land-details-layout">
          <section className="land-details-main">
            <div className="land-details-gallery">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[imageIndex]}
                    alt={land.title}
                    className="land-details-main-image"
                  />

                  {images.length > 1 && (
                    <div className="land-details-thumbnails">
                      {images.map((image, index) => (
                        <button
                          type="button"
                          key={`${image}-${index}`}
                          className={imageIndex === index ? "active" : ""}
                          onClick={() => setImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img src={image} alt={`${land.title} ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="land-details-no-image">
                  <span>ÉLAN HOMES</span>
                  <p>Land images coming soon</p>
                </div>
              )}
            </div>

            <section className="land-details-section">
              <span>LAND OVERVIEW</span>
              <h2>About This Land</h2>

              <p>
                {land.description ||
                  "Contact ÉLAN HOMES for further information about this land opportunity."}
              </p>
            </section>

            <section className="land-details-section">
              <span>OWNER / AGENT PROVIDED INFORMATION</span>
              <h2>Land Specifications</h2>

              <div className="land-details-specifications">
                {visibleSpecifications.length > 0 ? (
                  visibleSpecifications.map((item) => (
                    <div key={item.label}>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </div>
                  ))
                ) : (
                  <p>Land specifications have not yet been provided.</p>
                )}
              </div>

              <div className="land-details-information-notice">
                <strong>Important Information</strong>
                <p>
                  The land information displayed on this listing is supplied by
                  the owner or authorised agent. ÉLAN HOMES does not
                  automatically verify ownership, title deed authenticity, legal
                  status, boundaries or availability of utilities. Buyers should
                  independently verify all relevant information and conduct due
                  diligence with a qualified advocate and the relevant
                  authorities before making any payment or entering into an
                  agreement.
                </p>
              </div>
            </section>
          </section>

          <aside className="land-details-sidebar">
            <div className="land-details-enquiry-card">
              <span>LAND AVAILABILITY</span>

              <h2>
                {isSold
                  ? "This Land Has Been Sold"
                  : isAvailable
                    ? "Land Available"
                    : "Currently Unavailable"}
              </h2>

              <p>
                {isSold
                  ? "This land is no longer available for purchase or viewing. Contact ÉLAN HOMES for assistance finding similar land."
                  : isAvailable
                    ? "Contact ÉLAN HOMES to enquire about this land or arrange a viewing."
                    : "This land is temporarily unavailable for new viewing requests. Contact ÉLAN HOMES for more information."}
              </p>

              {isAvailable && (
                <>
                  <button
                    type="button"
                    className="land-details-viewing-button"
                    onClick={() => setShowAccountOptions(true)}
                  >
                    Request Land Viewing ↗
                  </button>

                  <p className="land-details-fee-notice">
                    A non-refundable viewing and connection fee applies. This
                    fee is separate from the land purchase price.
                  </p>
                </>
              )}

              <Link
                to={`/enquiry/land/${land.id}`}
                className="land-details-contact-button"
              >
                {isSold ? "Enquire About Similar Land" : "General Enquiry"}
              </Link>
            </div>

            <Link to="/land" className="land-details-back-link">
              ← Back to Land Opportunities
            </Link>
          </aside>
        </div>
      </div>

      {showAccountOptions && (
        <div
          className="stay-account-overlay"
          role="presentation"
          onClick={() => setShowAccountOptions(false)}
        >
          <div
            className="stay-account-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="land-account-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="stay-account-close"
              onClick={() => setShowAccountOptions(false)}
              aria-label="Close account options"
            >
              ×
            </button>

            <span>ÉLAN HOMES</span>

            <h2 id="land-account-modal-title">
              Continue to Request Land Viewing
            </h2>

            <p>
              Sign in to your existing account or create an ÉLAN HOMES account
              to continue with this land viewing request.
            </p>

            <Link to={signInLink} className="stay-account-signin">
              Sign In to Continue
            </Link>

            <Link to={registerLink} className="stay-account-register">
              Create Account to Continue
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
    </main>
  );
}
