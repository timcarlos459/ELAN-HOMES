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
            Connect with people looking for exceptional properties and holiday
            stays. Showcase your property to a wider audience with ELAN HOMES.
          </p>

          <div className="owner-cta-actions">
            <a href="/list-property" className="owner-primary-btn">
              List Your Property <span>↗</span>
            </a>

            <a href="/contact" className="owner-secondary-btn">
              Talk to Our Team
            </a>
          </div>

          <div className="owner-cta-note">
            <span>01</span>
            <p>Property owners, landlords, developers and hosts are welcome.</p>
          </div>
        </div>

        <div className="owner-cta-image">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
            alt="Luxury modern residential property"
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
