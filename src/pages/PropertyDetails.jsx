import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties";
import { getSavedListings, toggleSavedListing } from "../utils/savedListings";
import SEO from "../components/SEO";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === id && item.status !== "demo",
  );

  const gallery = property
    ? property.gallery?.length
      ? property.gallery
      : property.image
        ? [property.image]
        : []
    : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [savedListings, setSavedListings] = useState(() => getSavedListings());
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  const isSaved = savedListings.some(
    (item) => item.type === "property" && item.id === property?.id,
  );

  const isSold = String(property?.status || "").toLowerCase() === "sold";

  const isFeatured = property?.promotion?.status === "active" && !isSold;

  const viewingRequestPath = property
    ? `/properties/${property.id}/request-viewing`
    : "/properties";

  const signInLink = `/signin?redirect=${encodeURIComponent(
    viewingRequestPath,
  )}`;

  const registerLink = `/register?redirect=${encodeURIComponent(
    viewingRequestPath,
  )}`;

  const handleSaveProperty = () => {
    if (!property) return;

    const updatedListings = toggleSavedListing("property", property.id);
    setSavedListings(updatedListings);
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "Price on Request";

    return `KSh ${(price / 1000000).toLocaleString("en-KE", {
      maximumFractionDigits: 1,
    })}M`;
  };

  const seoTitle = property
    ? `${property.name} ${
        isSold ? "Sold" : "for Sale"
      } in ${property.location} | ÉLAN HOMES`
    : "Property Coming Soon | ÉLAN HOMES";

  const seoDescription = property
    ? `Explore ${property.name}, a ${
        property.type?.toLowerCase() || "property"
      } in ${property.location}, Kenya. View property details and enquire with ÉLAN HOMES.`
    : "Property listings are coming soon. Explore accommodation and discover property opportunities across Kenya with ÉLAN HOMES.";

  useEffect(() => {
    if (!lightboxOpen || gallery.length === 0) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setSelectedImage((current) =>
          current === 0 ? gallery.length - 1 : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setSelectedImage((current) =>
          current === gallery.length - 1 ? 0 : current + 1,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, gallery.length]);

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

  if (!property) {
    return (
      <>
        <SEO title={seoTitle} description={seoDescription} />

        <main className="property-not-found">
          <span className="details-label">ÉLAN HOMES</span>

          <h1>Properties Coming Soon</h1>

          <p>
            We are preparing our property collection. Soon, you will be able to
            discover houses, apartments and villas for sale across Kenya.
          </p>

          <Link to="/properties">Explore Properties</Link>

          <Link to="/stays">Explore Stays</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />

      <main className="property-details-page">
        <div className="property-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/properties">Properties</Link>
          <span>/</span>
          <span>{property.name}</span>
        </div>

        <section className="property-details-hero">
          <div className="property-details-image">
            {gallery.length > 0 ? (
              <button
                type="button"
                className="main-gallery-image"
                onClick={() => setLightboxOpen(true)}
                aria-label="Open full-screen property gallery"
              >
                <img
                  src={gallery[selectedImage]}
                  alt={`${property.name} - Photo ${selectedImage + 1}`}
                  decoding="async"
                />

                <span className="gallery-expand-label">View Gallery ↗</span>
              </button>
            ) : (
              <div className="main-gallery-image gallery-empty">
                Property image coming soon
              </div>
            )}

            <span className={`details-status ${isSold ? "sold" : "available"}`}>
              {isSold ? "SOLD" : "FOR SALE"}
            </span>

            {isFeatured && (
              <span className="details-featured-badge">FEATURED</span>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="property-gallery-thumbnails">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  key={image + index}
                  className={`gallery-thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View property photo ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <img
                    src={image}
                    alt={`${property.name} thumbnail ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="property-details-heading">
            <div>
              <span className="details-category">{property.type}</span>

              <h1>{property.name}</h1>

              <p className="details-location">{property.location}</p>
            </div>

            <div className="details-price">
              <span>Asking Price</span>

              <strong>{formatPrice(property.price)}</strong>

              <button
                type="button"
                className={`save-listing-btn ${isSaved ? "saved" : ""}`}
                onClick={handleSaveProperty}
                aria-pressed={isSaved}
              >
                {isSaved ? "♥ Saved" : "♡ Save Property"}
              </button>
            </div>
          </div>
        </section>

        <section className="property-details-content">
          <div className="property-main-information">
            <div className="property-overview">
              <span className="details-label">PROPERTY OVERVIEW</span>

              <h2>About This Property</h2>

              <p>{property.description}</p>
            </div>

            <div className="property-specifications">
              <div className="specification-item">
                <span>Bedrooms</span>
                <strong>{property.bedrooms ?? "N/A"}</strong>
              </div>

              <div className="specification-item">
                <span>Bathrooms</span>
                <strong>{property.bathrooms ?? "N/A"}</strong>
              </div>

              <div className="specification-item">
                <span>Property Type</span>
                <strong>{property.type || "N/A"}</strong>
              </div>

              <div className="specification-item">
                <span>Location</span>
                <strong>{property.location || "N/A"}</strong>
              </div>

              {property.area && (
                <div className="specification-item">
                  <span>Area</span>
                  <strong>{property.area}</strong>
                </div>
              )}
            </div>

            <div className="property-amenities">
              <span className="details-label">PROPERTY FEATURES</span>

              <h2>Amenities & Features</h2>

              <div className="amenities-grid">
                {property.amenities?.map((amenity, index) => (
                  <div className="amenity-item" key={index}>
                    <span>✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="property-enquiry-panel">
            <span className="details-label">
              {isSold ? "PROPERTY STATUS" : "INTERESTED IN THIS PROPERTY?"}
            </span>

            {isSold ? (
              <>
                <h3>This Property Has Been Sold</h3>

                <p>
                  This listing is no longer available for viewing. Contact ÉLAN
                  HOMES if you would like assistance finding a similar property.
                </p>

                <Link
                  to={`/enquiry/property/${property.id}`}
                  className="property-enquiry-btn"
                >
                  Enquire About Similar Properties
                </Link>
              </>
            ) : (
              <>
                <h3>Make This Property Yours</h3>

                <p>
                  Contact ÉLAN HOMES to enquire about this property or arrange a
                  viewing.
                </p>

                <button
                  type="button"
                  className="property-enquiry-btn"
                  onClick={() => setShowAccountOptions(true)}
                >
                  Request Viewing ↗
                </button>

                <p className="viewing-fee-notice">
                  A non-refundable viewing and connection fee applies. The fee
                  is not part of the property purchase price.
                </p>

                <Link
                  to={`/enquiry/property/${property.id}`}
                  className="property-back-btn"
                >
                  General Enquiry
                </Link>
              </>
            )}

            <Link to="/properties" className="property-back-btn">
              ← Back to Properties
            </Link>
          </aside>
        </section>

        {lightboxOpen && gallery.length > 0 && (
          <div
            className="property-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Property photo gallery"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
            >
              ×
            </button>

            <button
              type="button"
              className="lightbox-arrow lightbox-previous"
              onClick={(event) => {
                event.stopPropagation();

                setSelectedImage((current) =>
                  current === 0 ? gallery.length - 1 : current - 1,
                );
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div
              className="lightbox-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={gallery[selectedImage]}
                alt={`${property.name} - Photo ${selectedImage + 1}`}
                decoding="async"
              />

              <p>
                {selectedImage + 1} / {gallery.length} — {property.name}
              </p>
            </div>

            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              onClick={(event) => {
                event.stopPropagation();

                setSelectedImage((current) =>
                  current === gallery.length - 1 ? 0 : current + 1,
                );
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}

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
              aria-labelledby="property-account-modal-title"
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

              <h2 id="property-account-modal-title">
                Continue to Request a Viewing
              </h2>

              <p>
                Sign in to your existing account or create an ÉLAN HOMES account
                to continue with this property viewing request.
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
    </>
  );
}
