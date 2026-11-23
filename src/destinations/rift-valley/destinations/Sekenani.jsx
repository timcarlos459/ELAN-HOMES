import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Sekenani.css";

export default function Sekenani() {
  return (
    <main className="sekenani-page">
      <section className="sekenani-hero">
        <div className="sekenani-hero-overlay">
          <span>THE ÉLAN HOMES COLLECTION</span>

          <h1>Sekenani — Near Mara Gate</h1>

          <p>
            Discover exceptional safari accommodation, beautiful wilderness
            retreats and remarkable property opportunities near the Sekenani
            Gate of Maasai Mara.
          </p>

          <a href="#sekenani-marketplace">EXPLORE SEKENANI →</a>
        </div>
      </section>

      <section className="sekenani-intro">
        <span>WELCOME TO SEKENANI</span>

        <h2>Your Gateway to the Maasai Mara</h2>

        <p>
          Located near the Sekenani Gate, this remarkable destination offers
          access to the world-famous Maasai Mara ecosystem. Explore the area's
          safari experiences, natural landscapes and exceptional places to stay
          with ÉLAN HOMES.
        </p>
      </section>

      <div id="sekenani-marketplace">
        <LocationMarketplace
          locationName="Sekenani"
          countyName="Narok County"
        />
      </div>

      <div className="sekenani-back">
        <Link to="/destinations/rift-valley">← Back to Rift Valley</Link>
      </div>
    </main>
  );
}
