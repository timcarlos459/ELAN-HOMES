import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Roysambu.css";

export default function Roysambu() {
  return (
    <main className="roysambu-page">
      {/* HERO SECTION */}
      <section className="roysambu-hero">
        <div className="roysambu-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Roysambu</h1>

          <p>
            Explore residential properties and comfortable holiday stays in one
            of Nairobi's vibrant neighbourhoods.
          </p>

          <a href="#roysambu-explore" className="roysambu-hero-button">
            Explore Roysambu
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="roysambu-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place in Roysambu</h2>

        <p>
          Discover homes, apartments and accommodation options in Roysambu
          through ÉLAN HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="roysambu-explore">
        <LocationMarketplace locationName="Roysambu" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="roysambu-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
