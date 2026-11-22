import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Nyeri.css";

export default function Nyeri() {
  return (
    <main className="nyeri-page">
      <section className="nyeri-hero">
        <div className="nyeri-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · CENTRAL KENYA</span>

          <h1>Discover Nyeri</h1>

          <p>
            Explore distinctive homes, beautiful residential properties and
            memorable places to stay in Nyeri.
          </p>

          <a href="#nyeri-explore" className="nyeri-button">
            Explore Nyeri
          </a>
        </div>
      </section>

      <section className="nyeri-intro">
        <span>THE NYERI COLLECTION</span>

        <h2>Discover the Beauty of Nyeri</h2>

        <p>
          From scenic countryside surroundings to established residential
          communities, discover properties and welcoming accommodation
          experiences in Nyeri.
        </p>
      </section>

      <div id="nyeri-explore">
        <LocationMarketplace locationName="Nyeri" countyName="Nyeri County" />
      </div>

      <section className="nyeri-back">
        <Link to="/destinations/central">← Back to Central Kenya</Link>
      </section>
    </main>
  );
}
