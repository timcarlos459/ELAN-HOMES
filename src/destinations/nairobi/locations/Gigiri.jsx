import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Gigiri.css";

export default function Gigiri() {
  return (
    <main className="gigiri-page">
      {/* HERO SECTION */}
      <section className="gigiri-hero">
        <div className="gigiri-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Gigiri</h1>

          <p>
            Experience refined residential living, elegant homes and exceptional
            stays in one of Nairobi's most prestigious neighbourhoods.
          </p>

          <a href="#gigiri-explore">Explore Gigiri</a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="gigiri-intro">
        <span>PRESTIGE & INTERNATIONAL LIVING</span>

        <h2>Find Your Place in Gigiri</h2>

        <p>
          Known for its diplomatic presence, established residences, leafy
          surroundings and international lifestyle, Gigiri offers a distinctive
          place to live and stay in Nairobi.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="gigiri-explore">
        <LocationMarketplace locationName="Gigiri" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="gigiri-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
