import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Oloitoktok.css";

export default function Oloitoktok() {
  return (
    <main className="oloitoktok-page">
      {/* HERO SECTION */}
      <section className="oloitoktok-hero">
        <div className="oloitoktok-hero-content">
          <span>ÉLAN HOMES · KAJIADO COUNTY</span>

          <h1>Discover Oloitoktok</h1>

          <p>
            Explore residential properties, investment opportunities and
            comfortable places to stay in Oloitoktok, near the beautiful slopes
            of Mount Kilimanjaro.
          </p>

          <a href="#oloitoktok-explore" className="oloitoktok-button">
            Explore Oloitoktok
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="oloitoktok-intro">
        <span>WELCOME TO OLOITOKTOK</span>

        <h2>Find Your Place in Oloitoktok</h2>

        <p>
          Discover a unique destination surrounded by beautiful landscapes,
          agricultural communities and views of Mount Kilimanjaro. Explore
          opportunities for property ownership, investment and accommodation
          through ÉLAN HOMES.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="oloitoktok-explore">
        <LocationMarketplace
          locationName="Oloitoktok"
          countyName="Kajiado County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="oloitoktok-back">
        <Link to="/destinations/kajiado">← Back to Kajiado</Link>
      </section>
    </main>
  );
}
