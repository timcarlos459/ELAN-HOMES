import { Link } from "react-router-dom";
import stays from "../data/stays";
import "./FeaturedStays.css";

export default function FeaturedStays() {
  // Display actual stays and exclude demo listings.
  const featuredStays = stays
    .filter((stay) => stay.status !== "demo")
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
    <section className="featured-stays" id="bnb">
      <div className="stays-container">
        <div className="stays-heading">
          <div>
            <span>STAY SOMEWHERE SPECIAL</span>

            <h2>
              Discover <strong>Beautiful Stays</strong>
            </h2>

            <p>
              From peaceful retreats to luxury holiday villas, find your perfect
              place to stay across Kenya.
            </p>
          </div>

          <Link to="/stays" className="stays-view-all">
            Explore All Stays <span>↗</span>
          </Link>
        </div>

        {featuredStays.length > 0 ? (
          <div className="stays-grid">
            {featuredStays.map((stay) => (
              <article className="stay-card" key={stay.id}>
                <Link
                  to={`/stays/${stay.id}`}
                  className="stay-image"
                  aria-label={`View ${stay.name}`}
                >
                  <img
                    src={stay.image}
                    alt={stay.name}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="stay-tag">
                    {stay.accommodation || stay.type || "Short Stay"}
                  </span>
                </Link>

                <div className="stay-content">
                  <p className="stay-location">
                    <span>⌖</span> {stay.location}
                  </p>

                  <h3>{stay.name}</h3>

                  <div className="stay-details">
                    {stay.guests != null && <span>{stay.guests} Guests</span>}

                    {stay.bedrooms != null && (
                      <span>
                        {stay.bedrooms === 0
                          ? "Studio"
                          : `${stay.bedrooms} Bedrooms`}
                      </span>
                    )}
                  </div>

                  <div className="stay-bottom">
                    <div>
                      <strong>{formatPrice(stay.price)}</strong>
                      <small> / night</small>
                    </div>

                    <Link
                      to={`/stays/${stay.id}`}
                      aria-label={`Explore ${stay.name}`}
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
            <h3>Beautiful Stays Coming Soon</h3>
            <p>
              We are preparing exceptional short-stay accommodation. Please
              check back soon.
            </p>

            <Link to="/stays" className="stays-view-all">
              Explore All Stays ↗
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
