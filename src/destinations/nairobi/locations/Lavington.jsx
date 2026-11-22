import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Lavington.css";

export default function Lavington() {
  return (
    <main className="lavington-page">
      {/* HERO SECTION */}
      <section className="lavington-hero">
        <div className="lavington-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Lavington</h1>

          <p>
            Explore elegant homes, exclusive properties and exceptional stays in
            one of Nairobi's most desirable residential neighbourhoods.
          </p>

          <a href="#lavington-explore">Explore Lavington</a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="lavington-intro">
        <span>EXCLUSIVE NAIROBI LIVING</span>

        <h2>Find Your Place in Lavington</h2>

        <p>
          Known for its leafy surroundings, beautiful residential homes and
          convenient access to shopping, dining and lifestyle destinations,
          Lavington offers a distinctive Nairobi living experience.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="lavington-explore">
        <LocationMarketplace locationName="Lavington" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="lavington-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
