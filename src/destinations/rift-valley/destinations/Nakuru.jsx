import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Nakuru.css";

export default function Nakuru() {
  return (
    <main className="rift-destination-page">
      <section className="rift-destination-hero nakuru-hero">
        <div className="rift-destination-hero-content">
          <span className="rift-destination-eyebrow">
            THE ÉLAN HOMES COLLECTION
          </span>

          <h1>Nakuru</h1>

          <p>
            Discover exceptional homes and memorable places to stay in Nakuru, a
            vibrant destination surrounded by the beauty of the Great Rift
            Valley.
          </p>

          <Link to="/destinations/rift-valley" className="rift-back-link">
            ← Back to Rift Valley
          </Link>
        </div>
      </section>

      <LocationMarketplace locationName="Nakuru" countyName="Nakuru County" />
    </main>
  );
}
