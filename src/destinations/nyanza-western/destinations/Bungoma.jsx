import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Bungoma.css";

export default function Bungoma() {
  return (
    <main className="nyanza-destination-page bungoma-page">
      <section className="nyanza-destination-hero bungoma-hero">
        <div className="nyanza-destination-hero-content">
          <span>ÉLAN HOMES • NYANZA & WESTERN</span>
          <h1>Discover Bungoma</h1>
          <p>
            Explore the welcoming landscapes of Bungoma, discover beautiful
            residential surroundings and find comfortable places to stay.
          </p>
        </div>
      </section>

      <div className="nyanza-destination-intro">
        <span>THE BEAUTY OF BUNGOMA</span>
        <h2>Find Your Place in Bungoma</h2>
        <p>
          Discover residential properties for sale and welcoming accommodation
          across Bungoma and its surrounding communities.
        </p>
      </div>

      <LocationMarketplace locationName="Bungoma" countyName="Bungoma County" />
    </main>
  );
}
