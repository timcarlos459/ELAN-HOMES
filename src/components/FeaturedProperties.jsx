import { Link } from "react-router-dom";
import properties from "../data/properties";
import "./FeaturedProperties.css";

export default function FeaturedProperties() {
  // Use actual property records and exclude demo listings.
  const featuredProperties = properties
    .filter((property) => property.status !== "demo")
    .slice(0, 3);

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `KSh ${price.toLocaleString("en-KE")}`;
    }

    if (typeof price === "string") {
      return price.startsWith("KSh") ? price : `KSh ${price}`;
    }

    return "Price on request";
  };

  return (
    <section className="featured-properties" id="properties">
      <div className="featured-container">
        {/* SECTION HEADER */}
        <div className="featured-header">
          <div>
            <span className="featured-eyebrow">EXCEPTIONAL PLACES</span>

            <h2>
              Featured <span>Properties</span>
            </h2>

            <p>
              Explore a selection of exceptional properties chosen for their
              location, design and lifestyle.
            </p>
          </div>

          <Link to="/properties" className="view-all-properties">
            View All Properties <span>↗</span>
          </Link>
        </div>

        {/* FEATURED PROPERTY CARDS */}
        {featuredProperties.length > 0 ? (
          <div className="featured-grid">
            {featuredProperties.map((property) => (
              <article className="featured-card" key={property.id}>
                <Link
                  to={`/properties/${property.id}`}
                  className="featured-image"
                  aria-label={`View ${property.name}`}
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="property-status">For Sale</span>

                  <span className="property-type">{property.type}</span>
                </Link>

                <div className="featured-card-content">
                  <div className="property-location">
                    <span>⌖</span>
                    {property.location}
                  </div>

                  <h3>{property.name}</h3>

                  <div className="property-details">
                    {property.bedrooms != null && (
                      <span>{property.bedrooms} Bedrooms</span>
                    )}

                    {property.bathrooms != null && (
                      <span>{property.bathrooms} Bathrooms</span>
                    )}
                  </div>

                  <div className="property-card-bottom">
                    <div>
                      <small>Price</small>
                      <strong>{formatPrice(property.price)}</strong>
                    </div>

                    <Link
                      to={`/properties/${property.id}`}
                      aria-label={`View ${property.name}`}
                    >
                      ↗
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="featured-empty">
            <h3>Properties Coming Soon</h3>
            <p>
              We are preparing exceptional property opportunities. Please check
              back soon.
            </p>

            <Link to="/properties" className="view-all-properties">
              Explore Properties ↗
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
