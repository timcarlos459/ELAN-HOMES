import LocationMarketplace from "../../../components/LocationMarketplace";
import "./RusingaIsland.css";

export default function RusingaIsland() {
  return (
    <main className="nyanza-destination-page rusinga-page">
      <section className="nyanza-destination-hero rusinga-hero">
        <div className="nyanza-destination-hero-content">
          <span>ÉLAN HOMES • NYANZA & WESTERN</span>
          <h1>Discover Rusinga Island</h1>
          <p>
            Experience peaceful island living on Lake Victoria, with beautiful
            lakeside surroundings and welcoming places to stay.
          </p>
        </div>
      </section>

      <div className="nyanza-destination-intro">
        <span>THE LAKESIDE ESCAPE</span>
        <h2>Find Your Place on Rusinga Island</h2>
        <p>
          Explore residential property opportunities and comfortable
          accommodation on Rusinga Island, a unique destination on Lake
          Victoria.
        </p>
      </div>

      <LocationMarketplace
        locationName="Rusinga Island"
        countyName="Homa Bay County"
      />
    </main>
  );
}
