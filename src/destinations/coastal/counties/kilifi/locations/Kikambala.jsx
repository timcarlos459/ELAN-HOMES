import { Link } from "react-router-dom";
import LocationMarketplace from "../../../../../components/LocationMarketplace";
import "./Kikambala.css";

export default function Kikambala() {
  return (
    <main className="kikambala-page">
      {/* HERO */}
      <section className="kikambala-hero">
        <div className="kikambala-hero-content">
          <span>ÉLAN HOMES · KILIFI COUNTY · KENYA</span>

          <h1>Discover Kikambala</h1>

          <p>
            Discover peaceful coastal living, beautiful beach homes, exclusive
            residences and relaxing holiday escapes along Kenya's spectacular
            coastline.
          </p>

          <a href="#kikambala-collection" className="kikambala-button">
            Explore Kikambala
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="kikambala-intro">
        <span>COASTAL LIVING REDEFINED</span>

        <h2>Find Your Place in Kikambala</h2>

        <p>
          Experience the beauty of coastal living in Kikambala. Explore
          residential properties, holiday accommodation and beautiful spaces for
          your next escape.
        </p>
      </section>

      {/* PROPERTIES AND STAYS */}
      <div id="kikambala-collection">
        <LocationMarketplace
          locationName="Kikambala"
          countyName="Kilifi County"
        />
      </div>

      {/* NAVIGATION */}
      <section className="kikambala-back">
        <Link to="/destinations/coastal/kilifi">← Back to Kilifi County</Link>

        <Link to="/destinations/coastal">Explore Coastal Region →</Link>
      </section>
    </main>
  );
}
