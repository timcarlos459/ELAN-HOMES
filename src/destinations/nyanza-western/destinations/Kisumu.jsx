import LocationMarketplace from "../../../components/LocationMarketplace";
import "./Kisumu.css";

export default function Kisumu() {
  return (
    <main className="nyanza-destination-page kisumu-page">
      <section className="nyanza-destination-hero kisumu-hero">
        <div className="nyanza-destination-hero-content">
          <span>ÉLAN HOMES • NYANZA & WESTERN</span>
          <h1>Discover Kisumu</h1>
          <p>
            Experience lakeside living in one of Kenya's most vibrant cities.
            Explore beautiful homes, residential properties and welcoming places
            to stay around Lake Victoria.
          </p>
        </div>
      </section>

      <div className="nyanza-destination-intro">
        <span>THE LAKESIDE CITY</span>
        <h2>Find Your Place in Kisumu</h2>
        <p>
          From modern city residences to peaceful lakeside accommodation,
          discover property and stay opportunities in Kisumu and its surrounding
          neighbourhoods.
        </p>
      </div>

      <LocationMarketplace locationName="Kisumu" countyName="Kisumu County" />
    </main>
  );
}
