import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Siaya.css";

export default function Siaya() {
  return (
    <main className="nyanza-destination-page siaya-page">
      <section className="nyanza-destination-hero siaya-hero">
        <div className="nyanza-destination-hero-content">
          <span>ÉLAN HOMES • NYANZA & WESTERN</span>
          <h1>Discover Siaya</h1>
          <p>
            Explore the peaceful landscapes of Siaya, beautiful residential
            surroundings and welcoming places to stay near Lake Victoria.
          </p>
        </div>
      </section>

      <div className="nyanza-destination-intro">
        <span>THE BEAUTY OF SIAYA</span>
        <h2>Find Your Place in Siaya</h2>
        <p>
          Discover residential property opportunities and comfortable
          accommodation across Siaya and its surrounding communities.
        </p>
      </div>

      <LocationMarketplace locationName="Siaya" countyName="Siaya County" />
    </main>
  );
}
