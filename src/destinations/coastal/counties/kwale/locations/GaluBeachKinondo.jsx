import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./GaluBeachKinondo.css";

export default function GaluBeachKinondo() {
  return (
    <main className="galu-page">
      {/* HERO */}
      <section className="galu-hero">
        <div className="galu-hero-content">
          <span>ÉLAN HOMES · KWALE COUNTY</span>

          <h1>Galu Beach–Kinondo</h1>

          <p>
            Discover coastal living, beautiful beachfront homes and exceptional
            holiday escapes along the Kenyan coast.
          </p>

          <a href="#galu-intro" className="galu-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="galu-intro" id="galu-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Experience the Beauty of Galu Beach–Kinondo</h2>

        <p>
          Galu Beach–Kinondo offers a relaxed coastal setting, tropical scenery
          and access to the beautiful Indian Ocean. It is a destination for
          discovering holiday accommodation, private residences and investment
          opportunities.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace
        locationName="Galu Beach–Kinondo"
        countyName="Kwale County"
      />

      {/* NAVIGATION */}
      <section className="galu-navigation">
        <Link to="/destinations/coastal/kwale">← Back to Kwale County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
