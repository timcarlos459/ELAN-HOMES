import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Tigoni.css";

export default function Tigoni() {
  return (
    <main className="tigoni-page">
      <section className="tigoni-hero">
        <div className="tigoni-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · CENTRAL KENYA</span>

          <h1>Discover Tigoni</h1>

          <p>
            Explore beautiful countryside residences, exclusive homes and
            peaceful places to stay in Tigoni.
          </p>

          <a href="#tigoni-explore" className="tigoni-button">
            Explore Tigoni
          </a>
        </div>
      </section>

      <section className="tigoni-intro">
        <span>THE TIGONI COLLECTION</span>

        <h2>Experience the Beauty of Tigoni</h2>

        <p>
          Discover a peaceful countryside destination known for its green
          landscapes, scenic surroundings, beautiful residences and relaxing
          accommodation experiences.
        </p>
      </section>

      <div id="tigoni-explore">
        <LocationMarketplace locationName="Tigoni" countyName="Kiambu County" />
      </div>

      <section className="tigoni-back">
        <Link to="/destinations/central">← Back to Central Kenya</Link>
      </section>
    </main>
  );
}
