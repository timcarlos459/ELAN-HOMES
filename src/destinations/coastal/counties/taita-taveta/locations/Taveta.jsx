import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Taveta.css";

export default function Taveta() {
  return (
    <main className="taveta-page">
      <section className="taveta-hero">
        <div className="taveta-hero-content">
          <span>ÉLAN HOMES · TAITA TAVETA COUNTY</span>

          <h1>Discover Taveta</h1>

          <p>
            Explore beautiful countryside landscapes, agricultural surroundings,
            residential opportunities and peaceful accommodation in Taveta.
          </p>

          <a href="#taveta-intro" className="taveta-button">
            Explore Taveta
          </a>
        </div>
      </section>

      <section className="taveta-intro" id="taveta-intro">
        <span>THE COUNTRYSIDE COLLECTION</span>

        <h2>Discover a Different Side of Kenya</h2>

        <p>
          Taveta offers a distinctive countryside experience shaped by
          agriculture, local communities and its location near the
          Kenya–Tanzania border. Discover residential opportunities, countryside
          retreats and convenient places to stay.
        </p>
      </section>

      <LocationMarketplace
        locationName="Taveta"
        countyName="Taita Taveta County"
      />

      <section className="taveta-navigation">
        <Link to="/destinations/coastal/taita-taveta">
          ← Back to Taita Taveta County
        </Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
