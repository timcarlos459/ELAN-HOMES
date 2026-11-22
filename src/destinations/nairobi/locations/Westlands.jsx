import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Westlands.css";

export default function Westlands() {
  return (
    <main className="westlands-page">
      {/* HERO SECTION */}
      <section className="westlands-hero">
        <div className="westlands-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Westlands</h1>

          <p>
            Explore premium residences, modern apartments and exceptional
            holiday stays in Nairobi's vibrant Westlands.
          </p>

          <a href="#westlands-explore" className="westlands-hero-button">
            Explore Westlands
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="westlands-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place in Westlands</h2>

        <p>
          Discover a collection of residential properties and accommodation
          options in one of Nairobi's most dynamic neighbourhoods.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="westlands-explore">
        <LocationMarketplace locationName="Westlands" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="westlands-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
