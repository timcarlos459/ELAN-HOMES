import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Diani.css";

export default function Diani() {
  return (
    <main className="diani-page">
      {/* HERO */}
      <section className="diani-hero">
        <div className="diani-hero-content">
          <span>ÉLAN HOMES · KWALE COUNTY</span>

          <h1>Discover Diani</h1>

          <p>
            Experience one of Kenya's most celebrated coastal destinations,
            featuring beautiful white-sand beaches, luxury villas, holiday homes
            and exceptional stays.
          </p>

          <a href="#diani-intro" className="diani-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="diani-intro" id="diani-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Experience Coastal Living in Diani</h2>

        <p>
          Diani is renowned for its beautiful Indian Ocean coastline, tropical
          atmosphere and diverse accommodation options. Discover opportunities
          for beachfront living, holiday accommodation and property investment.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace locationName="Diani" countyName="Kwale County" />

      {/* NAVIGATION */}
      <section className="diani-navigation">
        <Link to="/destinations/coastal/kwale">← Back to Kwale County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
