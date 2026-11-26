import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Ngong.css";

export default function Ngong() {
  return (
    <main className="ngong-page">
      {/* HERO SECTION */}
      <section className="ngong-hero">
        <div className="ngong-hero-content">
          <span>ÉLAN HOMES · KAJIADO COUNTY</span>

          <h1>Discover Ngong</h1>

          <p>
            Discover beautiful homes, modern residential properties, investment
            opportunities and peaceful places to stay around Ngong.
          </p>

          <Link to="#ngong-explore" className="ngong-button">
            Explore Ngong
          </Link>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="ngong-intro">
        <span>WELCOME TO NGONG</span>

        <h2>Find Your Place in Ngong</h2>

        <p>
          Explore a destination known for its scenic surroundings, growing
          residential communities and opportunities for comfortable living,
          property ownership and accommodation. Discover Ngong through ÉLAN
          HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="ngong-explore">
        <LocationMarketplace locationName="Ngong" countyName="Kajiado County" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="ngong-back">
        <a to="/destinations/kajiado">← Back to Kajiado</a>
      </section>
    </main>
  );
}
