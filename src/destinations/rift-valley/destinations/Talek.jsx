import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Talek.css";

export default function Talek() {
  return (
    <main className="talek-page">
      <section className="talek-hero">
        <div className="talek-hero-overlay">
          <span>THE ÉLAN HOMES COLLECTION</span>

          <h1>Talek — Inside Mara</h1>

          <p>
            Experience the heart of the Maasai Mara through extraordinary safari
            experiences, exclusive wilderness retreats and memorable places to
            stay.
          </p>

          <a href="#talek-marketplace">EXPLORE TALEK →</a>
        </div>
      </section>

      <section className="talek-intro">
        <span>WELCOME TO TALEK</span>

        <h2>Experience the Heart of the Mara</h2>

        <p>
          Talek is a remarkable safari destination within the greater Maasai
          Mara region. Discover its spectacular landscapes, wildlife experiences
          and exceptional accommodation opportunities with ÉLAN HOMES.
        </p>
      </section>

      <div id="talek-marketplace">
        <LocationMarketplace locationName="Talek" countyName="Narok County" />
      </div>

      <div className="talek-back">
        <Link to="/destinations/rift-valley">← Back to Rift Valley</Link>
      </div>
    </main>
  );
}
