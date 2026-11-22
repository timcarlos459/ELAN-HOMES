import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./NairobiWest.css";

export default function NairobiWest() {
  return (
    <main className="nairobi-west-page">
      {/* HERO SECTION */}
      <section className="nairobi-west-hero">
        <div className="nairobi-west-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Nairobi West</h1>

          <p>
            Explore comfortable homes, convenient city living and welcoming
            holiday stays in Nairobi West.
          </p>

          <a href="#nairobi-west-explore" className="nairobi-west-hero-button">
            Explore Nairobi West
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="nairobi-west-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place in Nairobi West</h2>

        <p>
          Discover residential properties and short-stay accommodation in
          Nairobi West. Find a home that suits your lifestyle, or choose a
          comfortable place to stay while exploring the city.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="nairobi-west-explore">
        <LocationMarketplace locationName="Nairobi West" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="nairobi-west-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
