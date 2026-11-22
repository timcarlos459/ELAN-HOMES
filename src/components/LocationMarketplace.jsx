import { Link } from "react-router-dom";
import "./LocationMarketplace.css";

export default function LocationMarketplace({ locationName, countyName }) {
  const locationSlug = locationName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <section className="location-marketplace">
      <div className="location-marketplace-heading">
        <span>THE ÉLAN HOMES COLLECTION</span>

        <h2>Discover Properties & Stays</h2>

        <p>
          Discover beautiful properties for sale and exceptional places to stay
          in {locationName}, {countyName}.
        </p>
      </div>

      <div className="location-marketplace-grid">
        {/* PROPERTIES */}
        <article className="location-marketplace-card">
          <div className="location-marketplace-card-content">
            <span className="location-marketplace-category">REAL ESTATE</span>

            <h3>Properties</h3>

            <p>
              Discover exceptional homes, villas, apartments and residential
              properties available for sale in {locationName}.
            </p>

            <Link
              to={`/properties?location=${locationSlug}`}
              className="location-marketplace-status"
            >
              EXPLORE PROPERTIES →
            </Link>
          </div>
        </article>

        {/* STAYS */}
        <article className="location-marketplace-card">
          <div className="location-marketplace-card-content">
            <span className="location-marketplace-category">ACCOMMODATION</span>

            <h3>Stays</h3>

            <p>
              Discover beautiful B&Bs, holiday homes, furnished accommodation
              and memorable places to stay in {locationName}.
            </p>

            <Link
              to={`/stays?location=${locationSlug}`}
              className="location-marketplace-status"
            >
              EXPLORE STAYS →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
