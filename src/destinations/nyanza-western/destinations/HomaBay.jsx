import LocationMarketplace from "../../../components/LocationMarketplace";
import "./HomaBay.css";

export default function HomaBay() {
  return (
    <main className="nyanza-destination-page homa-bay-page">
      <section className="nyanza-destination-hero homa-bay-hero">
        <div className="nyanza-destination-hero-content">
          <span>ÉLAN HOMES • NYANZA & WESTERN</span>
          <h1>Discover Homa Bay</h1>
          <p>
            Explore the beauty of Lake Victoria, peaceful lakeside surroundings,
            residential properties and welcoming places to stay in Homa Bay.
          </p>
        </div>
      </section>

      <div className="nyanza-destination-intro">
        <span>THE LAKESIDE ESCAPE</span>
        <h2>Find Your Place in Homa Bay</h2>
        <p>
          Discover property opportunities and comfortable accommodation
          surrounded by the natural beauty and relaxed atmosphere of Homa Bay
          County.
        </p>
      </div>

      <LocationMarketplace
        locationName="Homa Bay"
        countyName="Homa Bay County"
      />
    </main>
  );
}
