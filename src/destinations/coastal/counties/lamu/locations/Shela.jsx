import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Shela.css";

export default function Shela() {
  return (
    <main className="shela-page">
      {/* HERO */}
      <section className="shela-hero">
        <div className="shela-hero-content">
          <span>ÉLAN HOMES · LAMU COUNTY</span>

          <h1>Shela</h1>

          <p>
            Discover the charm of Shela, with beautiful sandy beaches, elegant
            island homes, boutique accommodation and a relaxed coastal
            lifestyle.
          </p>

          <a href="#shela-intro" className="shela-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="shela-intro" id="shela-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Experience the Beauty of Shela</h2>

        <p>
          Shela is a distinctive coastal village on Lamu Island, known for its
          beautiful beach, traditional Swahili architecture and peaceful
          atmosphere. Discover characterful residences, boutique holiday stays
          and exceptional island experiences.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace locationName="Shela" countyName="Lamu County" />

      {/* NAVIGATION */}
      <section className="shela-navigation">
        <Link to="/destinations/coastal/lamu">← Back to Lamu County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
