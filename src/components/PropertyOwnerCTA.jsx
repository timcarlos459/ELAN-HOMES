import { Link } from "react-router-dom";
import "./PropertyOwnerCTA.css";

export default function PropertyOwnerCTA() {
  return (
    <section className="property-owner-cta">
      <div className="owner-cta-container">
        <div className="owner-cta-content">
          <span className="owner-cta-label">PARTNER WITH ELAN HOMES</span>

          <h2>
            Have a Property
            <br />
            <span>Worth Discovering?</span>
          </h2>

          <p>
            Showcase your property, land or short-stay accommodation to people
            looking for exceptional places across Kenya. Submit your listing for
            free and let ELAN HOMES help connect you with potential clients.
          </p>

          <div className="owner-cta-actions">
            <Link to="/list-property" className="owner-primary-btn">
              List Your Property <span>↗</span>
            </Link>

            <Link to="/contact" className="owner-secondary-btn">
              Talk to Our Team
            </Link>
          </div>

          <div className="owner-cta-note">
            <span>01</span>
            <p>
              Property owners, landowners, developers, landlords and short-stay
              hosts are welcome. All listings are subject to approval.
            </p>
          </div>
        </div>

        <div className="owner-cta-image">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
            alt="Luxury modern residential property"
            loading="lazy"
            decoding="async"
          />

          <div className="owner-image-caption">
            <span>ELAN HOMES</span>
            <p>Your Property. A Wider Audience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
