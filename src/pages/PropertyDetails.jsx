import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties";
import { getSavedListings, toggleSavedListing } from "../utils/savedListings";
import SEO from "../components/SEO";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find((item) => item.id === Number(id));

  const gallery = property
    ? property.gallery?.length
      ? property.gallery
      : [property.image]
    : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // SAVED PROPERTY FUNCTIONALITY
  const [savedListings, setSavedListings] = useState(() => getSavedListings());

  const isSaved = savedListings.some(
    (item) => item.type === "property" && item.id === property?.id,
  );

  const handleSaveProperty = () => {
    if (!property) return;

    const updatedListings = toggleSavedListing("property", property.id);
    setSavedListings(updatedListings);
  };

  const formatPrice = (price) =>
    `KSh ${(price / 1000000).toLocaleString("en-KE", {
      maximumFractionDigits: 1,
    })}M`;

  // DYNAMIC PROPERTY SEO
  const seoTitle = property
    ? `${property.name} for Sale in ${property.location} | ÉLAN HOMES`
    : "Property Not Found | ÉLAN HOMES";

  const seoDescription = property
    ? `Explore ${property.name}, a ${property.type?.toLowerCase() || "property"} for sale in ${property.location}, Kenya. View property details, ${property.bedrooms || "available"} bedrooms, features and enquire with ÉLAN HOMES.`
    : "The requested property could not be found. Explore available houses, villas and apartments for sale across Kenya with ÉLAN HOMES.";

  // KEYBOARD NAVIGATION
  useEffect(() => {
    if (!lightboxOpen) return;

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

  // PROPERTY NOT FOUND
  if (!property) {
    return (
      <>
        <SEO title={seoTitle} description={seoDescription} />

        <main className="property-not-found">
          <h1>Property Not Found</h1>
          <p>Sorry, this property may no longer be available.</p>
          <Link to="/properties">Back to Properties</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />

      <main className="property-details-page">
        {/* BREADCRUMB */}

        <div className="property-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/properties">Properties</Link>
          <span>/</span>
          <span>{property.name}</span>
        </div>

        {/* PROPERTY GALLERY */}

        <section className="property-details-hero">
          <div className="property-details-image">
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

            <span className="details-status">FOR SALE</span>
          </div>

          {/* GALLERY THUMBNAILS */}

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

          {/* PROPERTY HEADING */}

          <div className="property-details-heading">
            <div>
              <span className="details-category">{property.type}</span>

              <h1>{property.name}</h1>

              <p className="details-location">{property.location}</p>
            </div>

            <div className="details-price">
              <span>Asking Price</span>
              <strong>{formatPrice(property.price)}</strong>

              {/* SAVE PROPERTY BUTTON */}

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

        {/* PROPERTY INFORMATION */}

        <section className="property-details-content">
          <div className="property-main-information">
            {/* OVERVIEW */}

            <div className="property-overview">
              <span className="details-label">PROPERTY OVERVIEW</span>

              <h2>About This Property</h2>

              <p>{property.description}</p>
            </div>

            {/* SPECIFICATIONS */}

            <div className="property-specifications">
              <div className="specification-item">
                <span>Bedrooms</span>
                <strong>{property.bedrooms}</strong>
              </div>

              <div className="specification-item">
                <span>Bathrooms</span>
                <strong>{property.bathrooms}</strong>
              </div>

              <div className="specification-item">
                <span>Property Type</span>
                <strong>{property.type}</strong>
              </div>

              <div className="specification-item">
                <span>Location</span>
                <strong>{property.location}</strong>
              </div>
            </div>

            {/* AMENITIES */}

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

          {/* ENQUIRY PANEL */}

          <aside className="property-enquiry-panel">
            <span className="details-label">INTERESTED IN THIS PROPERTY?</span>

            <h3>Make This Property Yours</h3>

            <p>
              Contact ELAN HOMES to enquire about this property or arrange a
              viewing.
            </p>

            <Link
              to={`/contact?property=${encodeURIComponent(property.name)}`}
              className="property-enquiry-btn"
            >
              Enquire Now ↗
            </Link>

            <Link to="/properties" className="property-back-btn">
              ← Back to Properties
            </Link>
          </aside>
        </section>

        {/* FULL-SCREEN IMAGE VIEWER */}

        {lightboxOpen && (
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
      </main>
    </>
  );
}
