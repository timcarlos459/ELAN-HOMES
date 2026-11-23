import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Naivasha.css";

export default function Naivasha() {
  return (
    <main className="rift-destination-page">
      <section className="rift-destination-hero naivasha-hero">
        <div className="rift-destination-hero-content">
          <span className="rift-destination-eyebrow">
            THE ÉLAN HOMES COLLECTION
          </span>

          <h1>Naivasha</h1>

          <p>
            Explore beautiful homes and relaxing places to stay in Naivasha, a
            lakeside destination known for its scenic landscapes and peaceful
            getaways.
          </p>

          <Link to="/destinations/rift-valley" className="rift-back-link">
            ← Back to Rift Valley
          </Link>
        </div>
      </section>

      <LocationMarketplace locationName="Naivasha" countyName="Nakuru County" />
    </main>
  );
}
