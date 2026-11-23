import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Buruburu.css";

export default function Buruburu() {
  return (
    <main className="nairobi-destination-page buruburu-page">
      <section className="nairobi-destination-hero buruburu-hero">
        <div className="nairobi-destination-hero-content">
          <span>ÉLAN HOMES COLLECTION • NAIROBI</span>
          <h1>Discover Buruburu</h1>
          <p>
            Explore established residential neighbourhoods, family homes,
            apartments and comfortable places to stay in Buruburu, Nairobi.
          </p>
        </div>
      </section>

      <div className="nairobi-destination-intro">
        <span>THE EASTERN NAIROBI NEIGHBOURHOOD</span>
        <h2>Find Your Place in Buruburu</h2>
        <p>
          Discover residential properties for sale and welcoming accommodation
          across Buruburu and its surrounding neighbourhoods.
        </p>
      </div>

      <LocationMarketplace
        locationName="Buruburu"
        countyName="Nairobi County"
      />
    </main>
  );
}
