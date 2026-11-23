import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kiserian.css";

export default function Kiserian() {
  return (
    <main className="kiserian-page">
      {/* HERO SECTION */}
      <section className="kiserian-hero">
        <div className="kiserian-hero-content">
          <span>ÉLAN HOMES · KAJIADO COUNTY</span>

          <h1>Discover Kiserian</h1>

          <p>
            Discover beautiful family homes, residential properties, investment
            opportunities and comfortable places to stay in Kiserian.
          </p>

          <a href="#kiserian-explore" className="kiserian-button">
            Explore Kiserian
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kiserian-intro">
        <span>WELCOME TO KISERIAN</span>

        <h2>Find Your Place in Kiserian</h2>

        <p>
          Explore a growing residential destination offering opportunities for
          homeownership, property investment and convenient accommodation.
          Discover Kiserian through ÉLAN HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="kiserian-explore">
        <LocationMarketplace
          locationName="Kiserian"
          countyName="Kajiado County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="kiserian-back">
        <Link to="/destinations/kajiado">← Back to Kajiado</Link>
      </section>
    </main>
  );
}
