import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Watamu.css";

export default function Watamu() {
  return (
    <main className="watamu-page">
      {/* HERO */}
      <section className="watamu-hero">
        <div className="watamu-hero-content">
          <span>ÉLAN HOMES · KILIFI COUNTY · KENYA</span>

          <h1>Discover Watamu</h1>

          <p>
            Experience tropical coastal beauty, stunning beachfront villas,
            luxury holiday homes and unforgettable escapes along the Indian
            Ocean.
          </p>

          <a href="#watamu-collection" className="watamu-button">
            Explore Watamu
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="watamu-intro">
        <span>WHERE COASTAL BEAUTY MEETS LUXURY</span>

        <h2>Find Your Place in Watamu</h2>

        <p>
          Discover a beautiful coastal destination known for its beaches, marine
          life, relaxed atmosphere and exceptional holiday experiences.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="watamu-collection">
        <LocationMarketplace locationName="Watamu" countyName="Kilifi County" />
      </div>

      {/* NAVIGATION */}
      <section className="watamu-back">
        <Link to="/destinations/coastal/kilifi">← Back to Kilifi County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
