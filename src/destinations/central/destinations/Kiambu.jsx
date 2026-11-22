import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kiambu.css";

export default function Kiambu() {
  return (
    <main className="kiambu-page">
      <section className="kiambu-hero">
        <div className="kiambu-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · CENTRAL KENYA</span>

          <h1>Discover Kiambu</h1>

          <p>
            Explore beautiful residential properties, modern family homes and
            exceptional places to stay in Kiambu.
          </p>

          <a href="#kiambu-explore" className="kiambu-button">
            Explore Kiambu
          </a>
        </div>
      </section>

      <section className="kiambu-intro">
        <span>THE KIAMBU COLLECTION</span>

        <h2>Find Your Place in Kiambu</h2>

        <p>
          Discover a destination offering attractive residential communities,
          beautiful homes and convenient accommodation within reach of Nairobi.
        </p>
      </section>

      <div id="kiambu-explore">
        <LocationMarketplace locationName="Kiambu" countyName="Kiambu County" />
      </div>

      <section className="kiambu-back">
        <Link to="/destinations/central">← Back to Central Kenya</Link>
      </section>
    </main>
  );
}
