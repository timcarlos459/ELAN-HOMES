import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./MaraTriangle.css";

export default function MaraTriangle() {
  return (
    <main className="mara-triangle-page">
      <section className="mara-triangle-hero">
        <div className="mara-triangle-hero-overlay">
          <span>THE ÉLAN HOMES COLLECTION</span>

          <h1>Mara Triangle</h1>

          <p>
            Discover one of Africa's most remarkable wilderness destinations,
            with exceptional safari experiences and exclusive places to stay.
          </p>

          <a href="#mara-triangle-marketplace">EXPLORE MARA TRIANGLE →</a>
        </div>
      </section>

      <section className="mara-triangle-intro">
        <span>WELCOME TO MARA TRIANGLE</span>

        <h2>Discover the Wild Side of Luxury</h2>

        <p>
          Located within the Maasai Mara ecosystem, the Mara Triangle is
          celebrated for its extraordinary landscapes, abundant wildlife and
          unforgettable safari experiences. Explore accommodation opportunities
          and exceptional properties with ÉLAN HOMES.
        </p>
      </section>

      <div id="mara-triangle-marketplace">
        <LocationMarketplace
          locationName="Mara Triangle"
          countyName="Narok County"
        />
      </div>

      <div className="mara-triangle-back">
        <Link to="/destinations/rift-valley">← Back to Rift Valley</Link>
      </div>
    </main>
  );
}
