import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Limuru.css";

export default function Limuru() {
  return (
    <main className="limuru-page">
      <section className="limuru-hero">
        <div className="limuru-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · CENTRAL KENYA</span>

          <h1>Discover Limuru</h1>

          <p>
            Explore peaceful countryside homes, beautiful residential properties
            and exceptional places to stay in Limuru.
          </p>

          <a href="#limuru-explore" className="limuru-button">
            Explore Limuru
          </a>
        </div>
      </section>

      <section className="limuru-intro">
        <span>THE LIMURU COLLECTION</span>

        <h2>Experience the Beauty of Limuru</h2>

        <p>
          Discover a destination known for its green landscapes, countryside
          atmosphere, beautiful homes and peaceful accommodation experiences.
        </p>
      </section>

      <div id="limuru-explore">
        <LocationMarketplace locationName="Limuru" countyName="Kiambu County" />
      </div>

      <section className="limuru-back">
        <Link to="/destinations/central">← Back to Central Kenya</Link>
      </section>
    </main>
  );
}
