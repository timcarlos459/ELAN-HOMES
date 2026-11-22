import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./MombasaIslandCBD.css";

export default function MombasaIslandCBD() {
  return (
    <main className="mombasa-island-page">
      {/* HERO */}
      <section className="mombasa-island-hero">
        <div className="mombasa-island-hero-content">
          <span>ÉLAN HOMES · MOMBASA COUNTY</span>

          <h1>Mombasa Island–CBD</h1>

          <p>
            Discover urban coastal living, historic architecture, modern city
            residences and convenient accommodation in the heart of Mombasa.
          </p>

          <a href="#mombasa-island-intro" className="mombasa-island-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mombasa-island-intro" id="mombasa-island-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Experience the Energy of Mombasa Island</h2>

        <p>
          Mombasa Island is the historic and commercial heart of the coastal
          city. It combines rich Swahili heritage, business districts,
          established neighbourhoods and convenient access to the wider coastal
          region. Discover residential properties, city accommodation and urban
          investment opportunities.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace
        locationName="Mombasa Island–CBD"
        countyName="Mombasa County"
      />

      {/* NAVIGATION */}
      <section className="mombasa-island-navigation">
        <Link to="/destinations/coastal/mombasa">← Back to Mombasa County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
