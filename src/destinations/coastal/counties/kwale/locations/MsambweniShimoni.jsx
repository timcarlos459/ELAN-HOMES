import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./MsambweniShimoni.css";

export default function MsambweniShimoni() {
  return (
    <main className="msambweni-page">
      {/* HERO */}
      <section className="msambweni-hero">
        <div className="msambweni-hero-content">
          <span>ÉLAN HOMES · KWALE COUNTY</span>

          <h1>Msambweni–Shimoni</h1>

          <p>
            Discover a quieter side of Kenya's coastline, with beautiful ocean
            views, peaceful surroundings, private residences and unique coastal
            escapes.
          </p>

          <a href="#msambweni-intro" className="msambweni-button">
            Explore Destination
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="msambweni-intro" id="msambweni-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Discover the Beauty of Msambweni–Shimoni</h2>

        <p>
          From the tranquil shores of Msambweni to the coastal landscapes around
          Shimoni, this destination offers a distinctive coastal experience.
          Explore opportunities for holiday stays, private homes and property
          investment.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <LocationMarketplace
        locationName="Msambweni–Shimoni"
        countyName="Kwale County"
      />

      {/* NAVIGATION */}
      <section className="msambweni-navigation">
        <Link to="/destinations/coastal/kwale">← Back to Kwale County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
