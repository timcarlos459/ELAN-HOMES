import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./NgongRoad.css";

export default function NgongRoad() {
  return (
    <main className="ngong-road-page">
      {/* HERO SECTION */}
      <section className="ngong-road-hero">
        <div className="ngong-road-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Ngong Road</h1>

          <p>
            Explore a vibrant Nairobi neighbourhood offering convenient city
            access, modern residences and comfortable places to stay.
          </p>

          <a href="#ngong-road-explore" className="ngong-road-hero-button">
            Explore Ngong Road
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="ngong-road-intro">
        <span>ÉLAN HOMES DESTINATIONS</span>

        <h2>Find Your Place Along Ngong Road</h2>

        <p>
          Discover residential properties and holiday accommodation along Ngong
          Road. Explore homes, apartments and short stays in a convenient
          location connected to Nairobi's lifestyle and amenities.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="ngong-road-explore">
        <LocationMarketplace locationName="Ngong Road" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="ngong-road-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
