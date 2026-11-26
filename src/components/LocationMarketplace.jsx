import { Link } from "react-router-dom";
import "./LocationMarketplace.css";

export default function LocationMarketplace({
  locationName = "",
  countyName = "",
}) {
  const locationSlug = locationName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const displayLocation = locationName || "this destination";
  const displayCounty = countyName || "";

  return (
    <section className="location-marketplace">
      <div className="location-marketplace-heading">
        <span>THE ÉLAN HOMES COLLECTION</span>

        <h2>Discover Properties &amp; Stays</h2>

        <p>
          Discover beautiful properties for sale and exceptional places to stay
          in {displayLocation}
          {displayCounty ? `, ${displayCounty}` : ""}.
        </p>
      </div>

      <div className="location-marketplace-grid">
        {/* PROPERTIES FOR SALE */}

        <article className="location-marketplace-card">
          <div className="location-marketplace-card-content">
            <span className="location-marketplace-category">REAL ESTATE</span>

            <h3>Properties</h3>

            <p>
              Discover exceptional homes, villas, apartments and residential
              properties available for sale in {displayLocation}.
            </p>

            <Link
              to={`/properties?location=${encodeURIComponent(locationSlug)}`}
              className="location-marketplace-status"
              aria-label={`Explore properties for sale in ${displayLocation}`}
            >
              EXPLORE PROPERTIES →
            </Link>
          </div>
        </article>

        {/* B&B AND SHORT STAYS */}

        <article className="location-marketplace-card">
          <div className="location-marketplace-card-content">
            <span className="location-marketplace-category">ACCOMMODATION</span>

            <h3>Stays</h3>

            <p>
              Discover beautiful B&amp;Bs, holiday homes, furnished
              accommodation and memorable places to stay in {displayLocation}.
            </p>

            <Link
              to={`/stays?location=${encodeURIComponent(locationSlug)}`}
              className="location-marketplace-status"
              aria-label={`Explore short stays in ${displayLocation}`}
            >
              EXPLORE STAYS →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
