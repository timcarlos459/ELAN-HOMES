import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Malindi.css";

export default function Malindi() {
  return (
    <main className="malindi-page">
      {/* HERO */}
      <section className="malindi-hero">
        <div className="malindi-hero-overlay">
          <span>ÉLAN HOMES · KILIFI COUNTY · KENYA</span>

          <h1>Discover Malindi</h1>

          <p>
            Experience coastal living, beautiful holiday villas, exceptional
            properties and the relaxed atmosphere of Kenya's Indian Ocean
            coastline.
          </p>

          <a href="#malindi-collection" className="malindi-hero-button">
            Explore Malindi
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="malindi-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Find Your Place in Malindi</h2>

        <p>
          From beautiful beachfront escapes to elegant residential properties,
          explore places to live, invest and enjoy unforgettable coastal stays.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="malindi-collection">
        <LocationMarketplace
          locationName="Malindi"
          countyName="Kilifi County"
        />
      </div>

      {/* NAVIGATION */}
      <section className="malindi-back">
        <Link to="/destinations/coastal/kilifi">← Back to Kilifi County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
