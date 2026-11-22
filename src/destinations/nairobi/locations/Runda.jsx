import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Runda.css";

export default function Runda() {
  return (
    <main className="runda-page">
      {/* HERO SECTION */}
      <section className="runda-hero">
        <div className="runda-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Runda</h1>

          <p>
            Experience refined living in one of Nairobi's most exclusive
            residential neighbourhoods, known for spacious homes and tranquil
            surroundings.
          </p>

          <a href="#runda-explore" className="runda-hero-button">
            Explore Runda
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="runda-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place in Runda</h2>

        <p>
          Discover elegant residences, spacious family homes and quality holiday
          accommodation in Runda. Explore properties that combine privacy,
          comfort and a peaceful residential atmosphere.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="runda-explore">
        <LocationMarketplace locationName="Runda" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="runda-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
