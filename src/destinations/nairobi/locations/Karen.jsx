import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Karen.css";

export default function Karen() {
  return (
    <main className="karen-page">
      {/* HERO SECTION */}
      <section className="karen-hero">
        <div className="karen-hero-content">
          <span>NAIROBI · KENYA</span>

          <h1>Discover Karen</h1>

          <p>
            Explore luxurious residences, beautiful gardens, spacious family
            homes and memorable holiday stays in Nairobi's celebrated Karen
            neighbourhood.
          </p>

          <a href="#karen-explore">Explore Karen</a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="karen-intro">
        <span>SPACE · ELEGANCE · TRANQUILITY</span>

        <h2>Find Your Place in Karen</h2>

        <p>
          Karen is known for its spacious homes, green landscapes, peaceful
          residential atmosphere and distinctive lifestyle. Discover exceptional
          places to live, invest and stay.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="karen-explore">
        <LocationMarketplace locationName="Karen" countyName="Nairobi" />
      </div>

      {/* BACK NAVIGATION */}
      <section className="karen-back">
        <Link to="/destinations/nairobi">← Back to Nairobi</Link>
      </section>
    </main>
  );
}
