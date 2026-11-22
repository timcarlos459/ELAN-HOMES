import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Meru.css";

export default function Meru() {
  return (
    <main className="meru-page">
      {/* HERO SECTION */}
      <section className="meru-hero">
        <div className="meru-hero-content">
          <span>ÉLAN HOMES · EASTERN KENYA</span>

          <h1>Discover Meru</h1>

          <p>
            Explore distinctive homes, beautiful properties, investment
            opportunities and memorable places to stay in Meru.
          </p>

          <a href="#meru-explore" className="meru-button">
            Explore Meru
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="meru-intro">
        <span>WELCOME TO MERU</span>

        <h2>Find Your Place in Meru</h2>

        <p>
          Discover a destination surrounded by beautiful landscapes and
          opportunities for residential living, property investment and
          comfortable accommodation. Explore Meru through the ÉLAN HOMES
          collection.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="meru-explore">
        <LocationMarketplace locationName="Meru" countyName="Meru County" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="meru-back">
        <Link to="/destinations/eastern">← Back to Eastern Region</Link>
      </section>
    </main>
  );
}
