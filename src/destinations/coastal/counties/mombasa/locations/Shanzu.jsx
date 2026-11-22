import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Shanzu.css";

export default function Shanzu() {
  return (
    <main className="shanzu-page">
      <section className="shanzu-hero">
        <div className="shanzu-hero-content">
          <span>ÉLAN HOMES · MOMBASA COUNTY</span>

          <h1>Discover Shanzu</h1>

          <p>
            Experience peaceful coastal living, beautiful holiday villas,
            resort-style accommodation and relaxing beachfront escapes in
            Shanzu.
          </p>

          <a href="#shanzu-intro" className="shanzu-button">
            Explore Shanzu
          </a>
        </div>
      </section>

      <section className="shanzu-intro" id="shanzu-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Find Your Escape Along the Kenyan Coast</h2>

        <p>
          Shanzu offers a relaxed coastal atmosphere with beach experiences,
          established hospitality destinations and residential developments. It
          is an attractive destination for holidaymakers, property seekers and
          those looking for a peaceful coastal lifestyle.
        </p>
      </section>

      <LocationMarketplace locationName="Shanzu" countyName="Mombasa County" />

      <section className="shanzu-navigation">
        <Link to="/destinations/coastal/mombasa">← Back to Mombasa County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
