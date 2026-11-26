import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./WundanyiTaitaHills.css";

export default function WundanyiTaitaHills() {
  return (
    <main className="wundanyi-page">
      <section className="wundanyi-hero">
        <div className="wundanyi-hero-content">
          <span>ÉLAN HOMES · TAITA TAVETA COUNTY</span>

          <h1>Discover Wundanyi & Taita Hills</h1>

          <p>
            Escape into beautiful mountain scenery, green landscapes, peaceful
            retreats and distinctive highland living in the heart of Taita
            Taveta.
          </p>

          <a href="#wundanyi-intro" className="wundanyi-button">
            Explore Destination
          </a>
        </div>
      </section>

      <section className="wundanyi-intro" id="wundanyi-intro">
        <span>THE HIGHLAND COLLECTION</span>

        <h2>Experience the Beauty of Taita Hills</h2>

        <p>
          Wundanyi and the surrounding Taita Hills are known for their scenic
          mountain landscapes, cooler highland atmosphere, forests and
          distinctive communities. Discover opportunities for residential
          living, nature-inspired retreats and memorable stays.
        </p>
      </section>

      <LocationMarketplace
        locationName="Wundanyi – Taita Hills"
        countyName="Taita Taveta County"
      />

      <section className="wundanyi-navigation">
        <Link to="/destinations/coastal/taita-taveta">
          ← Back to Taita Taveta County
        </Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
