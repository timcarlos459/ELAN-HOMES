import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Thika.css";

export default function Thika() {
  return (
    <main className="thika-page">
      <section className="thika-hero">
        <div className="thika-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · CENTRAL KENYA</span>

          <h1>Discover Thika</h1>

          <p>
            Discover modern residential properties, beautiful family homes and
            convenient places to stay in Thika.
          </p>

          <a href="#thika-explore" className="thika-button">
            Explore Thika
          </a>
        </div>
      </section>

      <section className="thika-intro">
        <span>THE THIKA COLLECTION</span>

        <h2>Find Your Place in Thika</h2>

        <p>
          Explore a growing destination with established residential
          neighbourhoods, attractive homes and welcoming accommodation
          experiences.
        </p>
      </section>

      <div id="thika-explore">
        <LocationMarketplace locationName="Thika" countyName="Kiambu County" />
      </div>

      <section className="thika-back">
        <Link to="/destinations/central">← Back to Central Kenya</Link>
      </section>
    </main>
  );
}
