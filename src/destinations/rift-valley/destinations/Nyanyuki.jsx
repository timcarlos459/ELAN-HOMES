import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Nyanyuki.css";

export default function Nyanyuki() {
  return (
    <main className="nyanyuki-page">
      <section className="nyanyuki-hero">
        <div className="nyanyuki-hero-overlay">
          <span>THE ÉLAN HOMES COLLECTION</span>

          <h1>Discover Nyanyuki</h1>

          <p>
            Experience beautiful mountain surroundings, exceptional residential
            properties and memorable countryside stays in Nyanyuki.
          </p>

          <a href="#nyanyuki-marketplace">EXPLORE NYANYUKI →</a>
        </div>
      </section>

      <section className="nyanyuki-intro">
        <span>WELCOME TO NYANYUKI</span>

        <h2>Where Nature Meets Exceptional Living</h2>

        <p>
          Set against the breathtaking backdrop of Mount Kenya, Nyanyuki offers
          a unique blend of countryside living, scenic escapes and remarkable
          accommodation experiences. Discover properties for sale and beautiful
          places to stay with ÉLAN HOMES.
        </p>
      </section>

      <div id="nyanyuki-marketplace">
        <LocationMarketplace
          locationName="Nyanyuki"
          countyName="Laikipia County"
        />
      </div>

      <div className="nyanyuki-back">
        <Link to="/destinations/rift-valley">← Back to Rift Valley</Link>
      </div>
    </main>
  );
}
