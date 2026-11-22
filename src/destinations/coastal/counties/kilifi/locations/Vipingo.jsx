import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Vipingo.css";

export default function Vipingo() {
  return (
    <main className="vipingo-page">
      {/* HERO */}
      <section className="vipingo-hero">
        <div className="vipingo-hero-content">
          <span>ÉLAN HOMES · KILIFI COUNTY · KENYA</span>

          <h1>Discover Vipingo</h1>

          <p>
            Experience refined coastal living, exclusive residences, beautiful
            villas and peaceful escapes in one of Kenya's distinctive North
            Coast destinations.
          </p>

          <a href="#vipingo-collection" className="vipingo-button">
            Explore Vipingo
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="vipingo-intro">
        <span>EXCLUSIVE COASTAL LIVING</span>

        <h2>Find Your Place in Vipingo</h2>

        <p>
          Discover a unique coastal lifestyle surrounded by beautiful
          landscapes, residential communities and memorable holiday experiences.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="vipingo-collection">
        <LocationMarketplace
          locationName="Vipingo"
          countyName="Kilifi County"
        />
      </div>

      {/* NAVIGATION */}
      <section className="vipingo-back">
        <Link to="/destinations/coastal/kilifi">← Back to Kilifi County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
