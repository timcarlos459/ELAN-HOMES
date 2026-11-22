import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./MandaIsland.css";

export default function MandaIsland() {
  return (
    <main className="manda-island-page">
      {/* HERO */}
      <section className="manda-island-hero">
        <div className="manda-island-hero-content">
          <span>ÉLAN HOMES · LAMU COUNTY</span>

          <h1>Manda Island</h1>

          <p>
            Discover exclusive island living, beautiful ocean views, private
            villas and peaceful coastal escapes in the Lamu Archipelago.
          </p>

          <a href="#manda-island-intro" className="manda-island-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="manda-island-intro" id="manda-island-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Experience the Beauty of Manda Island</h2>

        <p>
          Manda Island offers a distinctive coastal environment with beautiful
          beaches, peaceful surroundings and access to the wider Lamu
          Archipelago. Discover private residences, holiday accommodation and
          unique island lifestyle opportunities.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace
        locationName="Manda Island"
        countyName="Lamu County"
      />

      {/* NAVIGATION */}
      <section className="manda-island-navigation">
        <Link to="/destinations/coastal/lamu">← Back to Lamu County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
