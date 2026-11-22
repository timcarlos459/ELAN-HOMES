import { Link } from "react-router-dom";
import "./Mombasa.css";

// INDIVIDUAL LOCATION IMPORTS
import MombasaIslandCBD from "./locations/MombasaIslandCBD";
import Bamburi from "./locations/Bamburi";
import Nyali from "./locations/Nyali";
import Shanzu from "./locations/Shanzu";

// MOMBASA LOCATIONS
const locations = [
  {
    name: "Mombasa Island–CBD",
    slug: "mombasa-island-cbd",
    description:
      "Explore urban coastal living, historic architecture, city residences and convenient accommodation.",
  },
  {
    name: "Bamburi",
    slug: "bamburi",
    description:
      "Discover beachfront apartments, holiday homes and beautiful coastal escapes.",
  },
  {
    name: "Nyali",
    slug: "nyali",
    description:
      "Experience premium residences, luxury apartments, villas and exclusive beachside stays.",
  },
  {
    name: "Shanzu",
    slug: "shanzu",
    description:
      "Find beautiful holiday villas, resort-style accommodation and peaceful coastal living.",
  },
];

export default function Mombasa({ locationSlug }) {
  // INDIVIDUAL DESTINATION PAGES

  if (locationSlug === "mombasa-island-cbd") {
    return <MombasaIslandCBD />;
  }

  if (locationSlug === "bamburi") {
    return <Bamburi />;
  }

  if (locationSlug === "nyali") {
    return <Nyali />;
  }

  if (locationSlug === "shanzu") {
    return <Shanzu />;
  }

  // MOMBASA COUNTY OVERVIEW

  return (
    <main className="mombasa-page">
      <section className="mombasa-hero">
        <span>ÉLAN HOMES DESTINATIONS · COASTAL KENYA</span>

        <h1>Discover Mombasa County</h1>

        <p>
          Explore beautiful beachfront residences, luxury apartments, holiday
          villas and exceptional accommodation across Mombasa County.
        </p>

        <a href="#mombasa-locations" className="mombasa-button">
          Explore Mombasa
        </a>
      </section>

      <section className="mombasa-content" id="mombasa-locations">
        <div className="mombasa-heading">
          <span>THE MOMBASA COLLECTION</span>

          <h2>Explore Destinations in Mombasa</h2>

          <p>
            Discover distinctive coastal neighbourhoods and find your perfect
            place to live, invest or escape.
          </p>
        </div>

        <div className="mombasa-location-grid">
          {locations.map((location, index) => (
            <article className="mombasa-location-card" key={location.slug}>
              <span className="mombasa-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{location.name}</h3>

              <p>{location.description}</p>

              <Link to={`/destinations/coastal/mombasa/${location.slug}`}>
                Explore Location <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mombasa-back">
        <Link to="/destinations/coastal">← Back to Coastal Region</Link>
      </section>
    </main>
  );
}
