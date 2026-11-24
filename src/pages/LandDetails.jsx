import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import landListings from "../data/land";
import "./LandDetails.css";

export default function LandDetails() {
  const { id } = useParams();

  // TEMPORARILY ALLOW DEMO LISTINGS FOR TESTING
  const land = landListings.find((item) => item.id === id);

  const [imageIndex, setImageIndex] = useState(0);

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

  const formatPrice = (price) => {
    if (typeof price === "number" && Number.isFinite(price)) {
      return `KSh ${price.toLocaleString("en-KE")}`;
    }

    if (typeof price === "string" && price.trim()) {
      return price.startsWith("KSh") ? price : `KSh ${price}`;
    }

    return "Price on request";
  };

  // Only display information supplied by the owner or authorised agent.
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
    {
      label: "Electricity",
      value: availabilityLabel(land.electricity),
    },
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

  return (
    <main className="land-details-page">
      <SEO
        title={`${land.title} | Land for Sale | ÉLAN HOMES`}
        description={`Explore ${land.title} in ${land.destination}, ${land.region}, Kenya. Contact ÉLAN HOMES to arrange a viewing.`}
      />

      <div className="land-details-container">
        {/* BREADCRUMB */}

        <nav className="land-details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/land">Land</Link>
          <span>/</span>
          <span>{land.title}</span>
        </nav>

        {/* HEADING */}

        <div className="land-details-heading">
          <div>
            <span className="land-details-eyebrow">
              ÉLAN HOMES LAND COLLECTION
            </span>

            <h1>{land.title}</h1>

            <p>
              {land.destination}, {land.region}, Kenya
            </p>
          </div>

          <div className="land-details-price">
            <small>Asking Price</small>
            <strong>{formatPrice(land.price)}</strong>
          </div>
        </div>

        {/* MAIN LAYOUT */}

        <div className="land-details-layout">
          <section className="land-details-main">
            {/* IMAGE GALLERY */}

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
                  <p>Property images coming soon</p>
                </div>
              )}
            </div>

            {/* LAND OVERVIEW */}

            <section className="land-details-section">
              <span>LAND OVERVIEW</span>
              <h2>About This Land</h2>

              <p>
                {land.description ||
                  "Contact ÉLAN HOMES for further information about this land opportunity."}
              </p>
            </section>

            {/* LAND SPECIFICATIONS */}

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

          {/* ENQUIRY SIDEBAR */}

          <aside className="land-details-sidebar">
            <div className="land-details-enquiry-card">
              <span>INTERESTED IN THIS LAND?</span>

              <h2>Arrange a Viewing</h2>

              <p>
                Request a viewing and let ÉLAN HOMES coordinate the next steps
                with you.
              </p>

              <Link
                to={`/land/${land.id}/request-viewing`}
                className="land-details-viewing-button"
              >
                Request Land Viewing ↗
              </Link>

              <p className="land-details-fee-notice">
                A non-refundable viewing and connection fee applies. This fee is
                separate from the land purchase price.
              </p>

              <Link
                to={`/enquiry/land/${land.id}`}
                className="land-details-contact-button"
              >
                General Enquiry
              </Link>
            </div>

            <Link to="/land" className="land-details-back-link">
              ← Back to Land Opportunities
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
