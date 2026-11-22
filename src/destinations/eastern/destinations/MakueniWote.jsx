import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./MakueniWote.css";

export default function MakueniWote() {
  return (
    <main className="makueni-page">
      {/* HERO SECTION */}
      <section className="makueni-hero">
        <div className="makueni-hero-content">
          <span>ÉLAN HOMES · EASTERN KENYA</span>

          <h1>Discover Makueni – Wote</h1>

          <p>
            Explore beautiful homes, residential properties, investment
            opportunities and memorable places to stay in Wote, Makueni.
          </p>

          <a href="#makueni-explore" className="makueni-button">
            Explore Makueni
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="makueni-intro">
        <span>WELCOME TO WOTE</span>

        <h2>Find Your Place in Makueni</h2>

        <p>
          Discover opportunities for comfortable living, property investment and
          accommodation in Wote. Explore the destination through the ÉLAN HOMES
          collection.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="makueni-explore">
        <LocationMarketplace
          locationName="Makueni–Wote"
          countyName="Makueni County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="makueni-back">
        <Link to="/destinations/eastern">← Back to Eastern Region</Link>
      </section>
    </main>
  );
}
