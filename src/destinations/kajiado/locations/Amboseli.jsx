import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Amboseli.css";

export default function Amboseli() {
  return (
    <main className="amboseli-page">
      {/* HERO SECTION */}
      <section className="amboseli-hero">
        <div className="amboseli-hero-content">
          <span>ÉLAN HOMES · KAJIADO COUNTY</span>

          <h1>Discover Amboseli</h1>

          <p>
            Explore exceptional properties, scenic surroundings and memorable
            places to stay near the iconic Amboseli landscape.
          </p>

          <a href="#amboseli-explore" className="amboseli-button">
            Explore Amboseli
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="amboseli-intro">
        <span>WELCOME TO AMBOSELI</span>

        <h2>Find Your Place in Amboseli</h2>

        <p>
          Discover a remarkable destination known for its wildlife, open
          landscapes and views of Mount Kilimanjaro. Explore opportunities for
          property ownership, investment and memorable accommodation through
          ÉLAN HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="amboseli-explore">
        <LocationMarketplace
          locationName="Amboseli"
          countyName="Kajiado County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="amboseli-back">
        <Link to="/destinations/kajiado">← Back to Kajiado</Link>
      </section>
    </main>
  );
}
