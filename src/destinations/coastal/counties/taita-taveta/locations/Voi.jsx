import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Voi.css";

export default function Voi() {
  return (
    <main className="voi-page">
      <section className="voi-hero">
        <div className="voi-hero-content">
          <span>ÉLAN HOMES · TAITA TAVETA COUNTY</span>

          <h1>Discover Voi</h1>

          <p>
            Explore the gateway to Tsavo, discover beautiful landscapes,
            residential opportunities and unique accommodation experiences in
            Voi.
          </p>

          <a href="#voi-intro" className="voi-button">
            Explore Voi
          </a>
        </div>
      </section>

      <section className="voi-intro" id="voi-intro">
        <span>THE WILDLIFE & COUNTRYSIDE COLLECTION</span>

        <h2>Experience the Beauty of Voi</h2>

        <p>
          Located in Taita Taveta County, Voi offers access to the remarkable
          landscapes of Tsavo and the surrounding countryside. Discover places
          to live, investment opportunities and accommodation for travellers
          exploring this part of Kenya.
        </p>
      </section>

      <LocationMarketplace
        locationName="Voi"
        countyName="Taita Taveta County"
      />

      <section className="voi-navigation">
        <Link to="/destinations/coastal/taita-taveta">
          ← Back to Taita Taveta County
        </Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
