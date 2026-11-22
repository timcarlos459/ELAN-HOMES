import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Embu.css";

export default function Embu() {
  return (
    <main className="embu-page">
      {/* HERO SECTION */}
      <section className="embu-hero">
        <div className="embu-hero-content">
          <span>ÉLAN HOMES · EASTERN KENYA</span>

          <h1>Discover Embu</h1>

          <p>
            Discover beautiful homes, residential properties, investment
            opportunities and memorable places to stay in Embu.
          </p>

          <a href="#embu-explore" className="embu-button">
            Explore Embu
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="embu-intro">
        <span>WELCOME TO EMBU</span>

        <h2>Find Your Place in Embu</h2>

        <p>
          Explore a destination offering opportunities for comfortable living,
          property investment and accommodation. Discover what Embu has to offer
          through the ÉLAN HOMES collection.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="embu-explore">
        <LocationMarketplace locationName="Embu" countyName="Embu County" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="embu-back">
        <Link to="/destinations/eastern">← Back to Eastern Region</Link>
      </section>
    </main>
  );
}
