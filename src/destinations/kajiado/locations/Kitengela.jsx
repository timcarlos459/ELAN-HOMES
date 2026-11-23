import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kitengela.css";

export default function Kitengela() {
  return (
    <main className="kitengela-page">
      {/* HERO SECTION */}
      <section className="kitengela-hero">
        <div className="kitengela-hero-content">
          <span>ÉLAN HOMES · KAJIADO COUNTY</span>

          <h1>Discover Kitengela</h1>

          <p>
            Explore modern family homes, spacious residential properties,
            investment opportunities and comfortable places to stay in
            Kitengela.
          </p>

          <a href="#kitengela-explore" className="kitengela-button">
            Explore Kitengela
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kitengela-intro">
        <span>WELCOME TO KITENGELA</span>

        <h2>Find Your Place in Kitengela</h2>

        <p>
          Discover a growing residential destination with opportunities for
          homeownership, property investment and convenient accommodation.
          Explore the Kitengela collection with ÉLAN HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="kitengela-explore">
        <LocationMarketplace
          locationName="Kitengela"
          countyName="Kajiado County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="kitengela-back">
        <Link to="/destinations/kajiado">← Back to Kajiado</Link>
      </section>
    </main>
  );
}
