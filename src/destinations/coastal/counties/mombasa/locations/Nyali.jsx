import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Nyali.css";

export default function Nyali() {
  return (
    <main className="nyali-page">
      <section className="nyali-hero">
        <div className="nyali-hero-content">
          <span>ÉLAN HOMES · MOMBASA COUNTY</span>

          <h1>Discover Nyali</h1>

          <p>
            Explore elegant coastal residences, luxury apartments, exclusive
            villas and exceptional beachside accommodation in one of Mombasa's
            most sought-after neighbourhoods.
          </p>

          <a href="#nyali-intro" className="nyali-button">
            Explore Nyali
          </a>
        </div>
      </section>

      <section className="nyali-intro" id="nyali-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Discover a More Refined Coastal Lifestyle</h2>

        <p>
          Nyali is known for its attractive residential areas, shopping
          destinations, beaches, hospitality and convenient access to Mombasa
          Island. It offers opportunities for comfortable living, property
          investment and memorable coastal holidays.
        </p>
      </section>

      <LocationMarketplace locationName="Nyali" countyName="Mombasa County" />

      <section className="nyali-navigation">
        <Link to="/destinations/coastal/mombasa">← Back to Mombasa County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
