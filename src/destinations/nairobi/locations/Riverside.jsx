import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Riverside.css";

export default function Riverside() {
  return (
    <main className="riverside-page">
      {/* HERO SECTION */}
      <section className="riverside-hero">
        <div className="riverside-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Riverside</h1>

          <p>
            Experience elegant urban living in one of Nairobi's sought-after
            neighbourhoods, with stylish residences and convenient access to the
            city.
          </p>

          <a href="#riverside-explore" className="riverside-hero-button">
            Explore Riverside
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="riverside-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place in Riverside</h2>

        <p>
          Explore apartments, premium residences and holiday accommodation in
          Riverside. Discover comfortable spaces suited to professionals,
          families, investors and visitors looking for a convenient Nairobi
          location.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="riverside-explore">
        <LocationMarketplace locationName="Riverside" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="riverside-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
