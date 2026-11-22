import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Bamburi.css";

export default function Bamburi() {
  return (
    <main className="bamburi-page">
      {/* HERO */}
      <section className="bamburi-hero">
        <div className="bamburi-hero-content">
          <span>ÉLAN HOMES · MOMBASA COUNTY</span>

          <h1>Discover Bamburi</h1>

          <p>
            Experience beachfront living, beautiful holiday homes, modern
            apartments and relaxing coastal escapes in one of Mombasa's popular
            seaside destinations.
          </p>

          <a href="#bamburi-intro" className="bamburi-button">
            Explore Bamburi
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bamburi-intro" id="bamburi-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Coastal Living Meets Everyday Comfort</h2>

        <p>
          Bamburi offers a blend of residential neighbourhoods, beachfront
          experiences, hospitality and convenient access to Mombasa's
          attractions. Whether you are looking for a home, an investment
          opportunity or a holiday escape, Bamburi offers a distinctive coastal
          setting.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace locationName="Bamburi" countyName="Mombasa County" />

      {/* NAVIGATION */}
      <section className="bamburi-navigation">
        <Link to="/destinations/coastal/mombasa">← Back to Mombasa County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
