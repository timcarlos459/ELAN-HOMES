import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kakamega.css";

export default function Kakamega() {
  return (
    <main className="nyanza-destination-page kakamega-page">
      <section className="nyanza-destination-hero kakamega-hero">
        <div className="nyanza-destination-hero-content">
          <span>ÉLAN HOMES • NYANZA & WESTERN</span>
          <h1>Discover Kakamega</h1>
          <p>
            Explore the green landscapes of Kakamega, vibrant residential
            communities and welcoming accommodation near the famous Kakamega
            Forest.
          </p>
        </div>
      </section>

      <div className="nyanza-destination-intro">
        <span>THE GREEN HEART OF WESTERN KENYA</span>
        <h2>Find Your Place in Kakamega</h2>
        <p>
          Discover beautiful homes, residential properties and comfortable
          places to stay in Kakamega and its surrounding communities.
        </p>
      </div>

      <LocationMarketplace
        locationName="Kakamega"
        countyName="Kakamega County"
      />
    </main>
  );
}
