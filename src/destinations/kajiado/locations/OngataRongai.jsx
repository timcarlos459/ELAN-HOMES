import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./OngataRongai.css";

export default function OngataRongai() {
  return (
    <main className="ongata-rongai-page">
      {/* HERO SECTION */}
      <section className="ongata-rongai-hero">
        <div className="ongata-rongai-hero-content">
          <span>ÉLAN HOMES · KAJIADO COUNTY</span>

          <h1>Discover Ongata Rongai</h1>

          <p>
            Discover beautiful homes, modern apartments, residential properties
            and memorable places to stay in Ongata Rongai.
          </p>

          <a href="#ongata-rongai-explore" className="ongata-rongai-button">
            Explore Ongata Rongai
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="ongata-rongai-intro">
        <span>WELCOME TO ONGATA RONGAI</span>

        <h2>Find Your Place in Ongata Rongai</h2>

        <p>
          Explore a growing residential destination with opportunities for
          comfortable living, property ownership and convenient accommodation.
          Discover Ongata Rongai through ÉLAN HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="ongata-rongai-explore">
        <LocationMarketplace
          locationName="Ongata Rongai"
          countyName="Kajiado County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="ongata-rongai-back">
        <Link to="/destinations/kajiado">← Back to Kajiado</Link>
      </section>
    </main>
  );
}
