import { Link } from "react-router-dom";
import "./Lamu.css";

// LAMU LOCATION IMPORTS
import Kiwayu from "./locations/Kiwayu";
import LamuTown from "./locations/LamuTown";
import MandaIsland from "./locations/MandaIsland";
import Shela from "./locations/Shela";

// LAMU LOCATIONS
const locations = [
  {
    name: "Kiwayu",
    slug: "kiwayu",
    description:
      "Discover secluded island escapes, pristine beaches and exclusive coastal retreats.",
  },
  {
    name: "Lamu Town",
    slug: "lamu-town",
    description:
      "Explore historic Swahili architecture, distinctive homes and cultural experiences.",
  },
  {
    name: "Manda Island",
    slug: "manda-island",
    description:
      "Experience private island living, luxury villas and beautiful ocean views.",
  },
  {
    name: "Shela",
    slug: "shela",
    description:
      "Discover elegant holiday homes, boutique stays and the charm of coastal living.",
  },
];

export default function Lamu({ locationSlug }) {
  // INDIVIDUAL DESTINATION PAGES
  if (locationSlug === "kiwayu") {
    return <Kiwayu />;
  }

  if (locationSlug === "lamu-town") {
    return <LamuTown />;
  }

  if (locationSlug === "manda-island") {
    return <MandaIsland />;
  }

  if (locationSlug === "shela") {
    return <Shela />;
  }

  // UNKNOWN LOCATION
  if (locationSlug) {
    return (
      <main className="lamu-page">
        <section className="lamu-hero">
          <span>ÉLAN HOMES · LAMU COUNTY</span>
          <h1>Destination Coming Soon</h1>
          <p>We are preparing this destination for ÉLAN HOMES.</p>
          <Link to="/destinations/coastal/lamu">Back to Lamu County</Link>
        </section>
      </main>
    );
  }

  // LAMU COUNTY OVERVIEW
  return (
    <main className="lamu-page">
      <section className="lamu-hero">
        <span>ÉLAN HOMES DESTINATIONS · COASTAL KENYA</span>

        <h1>Discover Lamu County</h1>

        <p>
          Explore exceptional island properties, traditional Swahili
          architecture, private villas and unforgettable coastal stays across
          Lamu County.
        </p>

        <a href="#lamu-locations" className="lamu-button">
          Explore Lamu
        </a>
      </section>

      <section className="lamu-content" id="lamu-locations">
        <div className="lamu-heading">
          <span>THE LAMU COLLECTION</span>

          <h2>Explore Destinations in Lamu</h2>

          <p>
            Discover unique island destinations and find your perfect place to
            live, invest or escape.
          </p>
        </div>

        <div className="lamu-location-grid">
          {locations.map((location, index) => (
            <article className="lamu-location-card" key={location.slug}>
              <span className="lamu-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{location.name}</h3>

              <p>{location.description}</p>

              <Link to={`/destinations/coastal/lamu/${location.slug}`}>
                Explore Location <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="lamu-back">
        <Link to="/destinations/coastal">← Back to Coastal Region</Link>
      </section>
    </main>
  );
}
