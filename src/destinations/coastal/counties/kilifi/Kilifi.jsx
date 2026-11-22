import { Link } from "react-router-dom";
import "./Kilifi.css";

// KILIFI LOCATION IMPORTS
import Kikambala from "./locations/Kikambala";
import Malindi from "./locations/Malindi";
import Mtwapa from "./locations/Mtwapa";
import Vipingo from "./locations/Vipingo";
import Watamu from "./locations/Watamu";

// KILIFI LOCATIONS
const locations = [
  {
    name: "Kikambala",
    slug: "kikambala",
    description: "Discover beautiful coastal homes and peaceful beach escapes.",
  },
  {
    name: "Malindi",
    slug: "malindi",
    description:
      "Explore holiday villas, oceanfront properties and coastal living.",
  },
  {
    name: "Mtwapa",
    slug: "mtwapa",
    description: "Discover residential properties and holiday accommodation.",
  },
  {
    name: "Vipingo",
    slug: "vipingo",
    description:
      "Experience exclusive coastal residences and golf-side living.",
  },
  {
    name: "Watamu",
    slug: "watamu",
    description: "Find tropical holiday homes and beautiful beachfront stays.",
  },
];

export default function Kilifi({ locationSlug }) {
  // INDIVIDUAL DESTINATION PAGES
  if (locationSlug === "kikambala") {
    return <Kikambala />;
  }

  if (locationSlug === "malindi") {
    return <Malindi />;
  }

  if (locationSlug === "mtwapa") {
    return <Mtwapa />;
  }

  if (locationSlug === "vipingo") {
    return <Vipingo />;
  }

  if (locationSlug === "watamu") {
    return <Watamu />;
  }

  // UNKNOWN LOCATION
  if (locationSlug) {
    return (
      <main className="kilifi-page">
        <section className="kilifi-hero">
          <span>ÉLAN HOMES · KILIFI COUNTY</span>
          <h1>Destination Coming Soon</h1>
          <p>We are preparing this destination for ÉLAN HOMES.</p>
          <Link to="/destinations/coastal/kilifi">Back to Kilifi County</Link>
        </section>
      </main>
    );
  }

  // KILIFI COUNTY OVERVIEW
  return (
    <main className="kilifi-page">
      {/* HERO */}
      <section className="kilifi-hero">
        <span>ÉLAN HOMES DESTINATIONS · COASTAL KENYA</span>

        <h1>Discover Kilifi County</h1>

        <p>
          Explore exceptional coastal properties, luxury villas, beachfront
          homes and holiday stays across Kilifi County.
        </p>

        <a href="#kilifi-locations" className="kilifi-button">
          Explore Kilifi
        </a>
      </section>

      {/* LOCATIONS */}
      <section className="kilifi-content" id="kilifi-locations">
        <div className="kilifi-heading">
          <span>THE KILIFI COLLECTION</span>

          <h2>Explore Destinations in Kilifi</h2>

          <p>
            Discover distinctive coastal destinations and find your perfect
            place to live, invest or escape.
          </p>
        </div>

        <div className="kilifi-location-grid">
          {locations.map((location, index) => (
            <article className="kilifi-location-card" key={location.slug}>
              <span className="kilifi-number">0{index + 1}</span>

              <h3>{location.name}</h3>

              <p>{location.description}</p>

              <Link to={`/destinations/coastal/kilifi/${location.slug}`}>
                Explore Location <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* BACK TO COASTAL REGION */}
      <section className="kilifi-back">
        <Link to="/destinations/coastal">← Back to Coastal Region</Link>
      </section>
    </main>
  );
}
