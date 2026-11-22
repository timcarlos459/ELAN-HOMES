import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Kiwayu.css";

export default function Kiwayu() {
  return (
    <main className="kiwayu-page">
      {/* HERO */}
      <section className="kiwayu-hero">
        <div className="kiwayu-hero-content">
          <span>ÉLAN HOMES · LAMU COUNTY</span>

          <h1>Kiwayu</h1>

          <p>
            Discover secluded island living, pristine beaches, exclusive coastal
            retreats and the natural beauty of Kenya's northern coastline.
          </p>

          <a href="#kiwayu-intro" className="kiwayu-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kiwayu-intro" id="kiwayu-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Experience the Beauty of Kiwayu</h2>

        <p>
          Kiwayu is a remote island destination known for its beautiful beaches,
          clear waters and peaceful coastal environment. Discover opportunities
          for private retreats, holiday accommodation and exceptional coastal
          experiences.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace locationName="Kiwayu" countyName="Lamu County" />

      {/* NAVIGATION */}
      <section className="kiwayu-navigation">
        <Link to="/destinations/coastal/lamu">← Back to Lamu County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
