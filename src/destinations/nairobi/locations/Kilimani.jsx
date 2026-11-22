import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kilimani.css";

export default function Kilimani() {
  return (
    <main className="kilimani-page">
      {/* HERO SECTION */}
      <section className="kilimani-hero">
        <div className="kilimani-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Kilimani</h1>

          <p>
            Experience contemporary city living in one of Nairobi's most vibrant
            residential and lifestyle neighbourhoods.
          </p>

          <a href="#kilimani-explore" className="kilimani-hero-button">
            Explore Kilimani
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kilimani-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place in Kilimani</h2>

        <p>
          Explore apartments, homes and holiday stays in Kilimani. Whether you
          are searching for a permanent residence, an investment opportunity or
          a comfortable short stay, discover spaces that match your lifestyle.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="kilimani-explore">
        <LocationMarketplace locationName="Kilimani" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="kilimani-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
