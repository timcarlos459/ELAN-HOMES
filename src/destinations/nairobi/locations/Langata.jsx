import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Langata.css";

export default function Langata() {
  return (
    <main className="langata-page">
      {/* HERO SECTION */}
      <section className="langata-hero">
        <div className="langata-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Langata</h1>

          <p>
            Discover beautiful homes, spacious residences and welcoming holiday
            stays in one of Nairobi's distinctive neighbourhoods.
          </p>

          <a href="#langata-explore">Explore Langata</a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="langata-intro">
        <span>SPACE, NATURE & LIFESTYLE</span>

        <h2>Find Your Place in Langata</h2>

        <p>
          Langata offers a unique blend of residential living, green
          surroundings and convenient access to Nairobi's attractions. Explore
          homes and stays in this established part of the city.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="langata-explore">
        <LocationMarketplace locationName="Langata" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="langata-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
