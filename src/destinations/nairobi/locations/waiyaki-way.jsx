import LocationMarketplace from "../../../components/LocationMarketplace";
import "./waiyaki-way.css";

export default function WaiyakiWay() {
  return (
    <main className="nairobi-destination-page waiyaki-way-page">
      <section className="nairobi-destination-hero waiyaki-way-hero">
        <div className="nairobi-destination-hero-content">
          <span>ÉLAN HOMES COLLECTION • NAIROBI</span>

          <h1>Waiyaki Way</h1>

          <div className="waiyaki-gold-line"></div>

          <p>
            Discover contemporary city living along one of Nairobi's most
            vibrant corridors. Explore exceptional residential properties and
            comfortable places to stay.
          </p>

          <a href="#waiyaki-marketplace" className="waiyaki-explore-button">
            EXPLORE WAIYAKI WAY
            <span>→</span>
          </a>
        </div>
      </section>

      <section className="nairobi-destination-intro waiyaki-intro">
        <span>THE WESTERN NAIROBI CORRIDOR</span>

        <h2>Where City Living Meets Convenience</h2>

        <p>
          From modern apartments to welcoming short-stay accommodation, explore
          living and investment opportunities around Waiyaki Way.
        </p>
      </section>

      <div id="waiyaki-marketplace" className="waiyaki-marketplace">
        <LocationMarketplace
          locationName="Waiyaki Way"
          countyName="Nairobi County"
        />
      </div>
    </main>
  );
}
