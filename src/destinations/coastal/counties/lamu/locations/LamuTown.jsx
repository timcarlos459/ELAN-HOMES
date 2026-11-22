import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./LamuTown.css";

export default function LamuTown() {
  return (
    <main className="lamu-town-page">
      {/* HERO */}
      <section className="lamu-town-hero">
        <div className="lamu-town-hero-content">
          <span>ÉLAN HOMES · LAMU COUNTY</span>

          <h1>Lamu Town</h1>

          <p>
            Experience the timeless charm of Lamu's historic Swahili
            architecture, beautiful heritage homes and distinctive island
            lifestyle.
          </p>

          <a href="#lamu-town-intro" className="lamu-town-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="lamu-town-intro" id="lamu-town-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Discover the Heritage of Lamu Town</h2>

        <p>
          Lamu Town is a historic island settlement celebrated for its Swahili
          culture, narrow streets, traditional architecture and rich coastal
          heritage. Discover distinctive residences, holiday accommodation and
          unique opportunities in one of Kenya's most characterful destinations.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace locationName="Lamu Town" countyName="Lamu County" />

      {/* NAVIGATION */}
      <section className="lamu-town-navigation">
        <Link to="/destinations/coastal/lamu">← Back to Lamu County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
