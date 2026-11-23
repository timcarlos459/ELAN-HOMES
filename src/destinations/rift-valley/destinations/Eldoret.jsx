import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Eldoret.css";

export default function Eldoret() {
  return (
    <main className="rift-destination-page">
      <section className="rift-destination-hero eldoret-hero">
        <div className="rift-destination-hero-content">
          <span className="rift-destination-eyebrow">
            THE ÉLAN HOMES COLLECTION
          </span>

          <h1>Eldoret</h1>

          <p>
            Discover beautiful homes and exceptional places to stay in Eldoret,
            a vibrant destination in Uasin Gishu County.
          </p>

          <Link to="/destinations/rift-valley" className="rift-back-link">
            ← Back to Rift Valley
          </Link>
        </div>
      </section>

      <LocationMarketplace
        locationName="Eldoret"
        countyName="Uasin Gishu County"
      />
    </main>
  );
}
