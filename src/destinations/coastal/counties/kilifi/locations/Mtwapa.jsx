import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Mtwapa.css";

export default function Mtwapa() {
  return (
    <main className="mtwapa-page">
      {/* HERO */}
      <section className="mtwapa-hero">
        <div className="mtwapa-hero-content">
          <span>ÉLAN HOMES · KILIFI COUNTY · KENYA</span>

          <h1>Discover Mtwapa</h1>

          <p>
            Explore vibrant coastal living, beautiful residential properties,
            modern apartments and relaxing holiday accommodation along Kenya's
            North Coast.
          </p>

          <a href="#mtwapa-collection" className="mtwapa-button">
            Explore Mtwapa
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mtwapa-intro">
        <span>LIVE · INVEST · EXPERIENCE</span>

        <h2>Find Your Place in Mtwapa</h2>

        <p>
          Discover a lively coastal destination offering convenient access to
          beaches, restaurants, entertainment and residential communities.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="mtwapa-collection">
        <LocationMarketplace locationName="Mtwapa" countyName="Kilifi County" />
      </div>

      {/* NAVIGATION */}
      <section className="mtwapa-back">
        <Link to="/destinations/coastal/kilifi">← Back to Kilifi County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
