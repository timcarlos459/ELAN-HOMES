import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Tiwi.css";

export default function Tiwi() {
  return (
    <main className="tiwi-page">
      {/* HERO */}
      <section className="tiwi-hero">
        <div className="tiwi-hero-content">
          <span>ÉLAN HOMES · KWALE COUNTY</span>

          <h1>Discover Tiwi</h1>

          <p>
            Escape to the peaceful shores of Tiwi, where tropical scenery,
            beautiful beaches and relaxed coastal living create a unique place
            to stay, live and invest.
          </p>

          <a href="#tiwi-intro" className="tiwi-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="tiwi-intro" id="tiwi-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Discover the Tranquillity of Tiwi</h2>

        <p>
          Tiwi offers a quieter coastal atmosphere, with natural beauty and a
          relaxed environment along the Indian Ocean. Explore opportunities for
          private residences, holiday homes and memorable coastal escapes.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace locationName="Tiwi" countyName="Kwale County" />

      {/* NAVIGATION */}
      <section className="tiwi-navigation">
        <Link to="/destinations/coastal/kwale">← Back to Kwale County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
