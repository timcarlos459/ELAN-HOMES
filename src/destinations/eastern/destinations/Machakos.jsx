import { Link } from "react-router-dom";
import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Machakos.css";

export default function Machakos() {
  return (
    <main className="machakos-page">
      {/* HERO SECTION */}
      <section className="machakos-hero">
        <div className="machakos-hero-content">
          <span>ÉLAN HOMES · EASTERN KENYA</span>

          <h1>Discover Machakos</h1>

          <p>
            Explore beautiful homes, residential properties, investment
            opportunities and memorable places to stay in Machakos.
          </p>

          <a href="#machakos-explore" className="machakos-button">
            Explore Machakos
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="machakos-intro">
        <span>WELCOME TO MACHAKOS</span>

        <h2>Find Your Place in Machakos</h2>

        <p>
          Discover a destination offering opportunities for homeownership,
          property investment and comfortable accommodation. Explore what
          Machakos has to offer through the ÉLAN HOMES collection.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="machakos-explore">
        <LocationMarketplace
          locationName="Machakos"
          countyName="Machakos County"
        />
      </div>

      {/* BACK NAVIGATION */}
      <section className="machakos-back">
        <Link to="/destinations/eastern">← Back to Eastern Region</Link>
      </section>
    </main>
  );
}
