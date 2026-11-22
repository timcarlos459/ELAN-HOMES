import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kileleshwa.css";

export default function Kileleshwa() {
  return (
    <main className="kileleshwa-page">
      {/* HERO SECTION */}
      <section className="kileleshwa-hero">
        <div className="kileleshwa-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Kileleshwa</h1>

          <p>
            Explore stylish apartments, contemporary residences and comfortable
            holiday stays in one of Nairobi's popular residential
            neighbourhoods.
          </p>

          <a href="#kileleshwa-explore">Explore Kileleshwa</a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kileleshwa-intro">
        <span>MODERN URBAN LIVING</span>

        <h2>Find Your Place in Kileleshwa</h2>

        <p>
          Kileleshwa combines a peaceful residential atmosphere with convenient
          access to shopping, restaurants, schools and business districts.
          Discover a neighbourhood suited to modern city living.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="kileleshwa-explore">
        <LocationMarketplace locationName="Kileleshwa" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="kileleshwa-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
