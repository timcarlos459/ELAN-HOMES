import { Link } from "react-router-dom";
import "./Kwale.css";

// KWALE LOCATION IMPORTS
import GaluBeachKinondo from "./locations/GaluBeachKinondo";
import MsambweniShimoni from "./locations/MsambweniShimoni";
import Diani from "./locations/Diani";
import Tiwi from "./locations/Tiwi";

// KWALE LOCATIONS
const locations = [
  {
    name: "Galu Beach–Kinondo",
    slug: "galu-beach-kinondo",
    description:
      "Discover peaceful beach homes, private villas and beautiful coastal escapes.",
  },
  {
    name: "Msambweni–Shimoni",
    slug: "msambweni-shimoni",
    description:
      "Explore secluded coastal properties and unique oceanfront retreats.",
  },
  {
    name: "Diani",
    slug: "diani",
    description:
      "Experience beautiful holiday villas, beachfront stays and coastal living.",
  },
  {
    name: "Tiwi",
    slug: "tiwi",
    description:
      "Find quiet beachside residences and tropical holiday accommodation.",
  },
];

export default function Kwale({ locationSlug }) {
  // INDIVIDUAL DESTINATION PAGES
  if (locationSlug === "galu-beach-kinondo") {
    return <GaluBeachKinondo />;
  }

  if (locationSlug === "msambweni-shimoni") {
    return <MsambweniShimoni />;
  }

  if (locationSlug === "diani") {
    return <Diani />;
  }

  if (locationSlug === "tiwi") {
    return <Tiwi />;
  }

  // UNKNOWN LOCATION
  if (locationSlug) {
    return (
      <main className="kwale-page">
        <section className="kwale-hero">
          <span>ÉLAN HOMES · KWALE COUNTY</span>
          <h1>Destination Coming Soon</h1>
          <p>We are preparing this destination for ÉLAN HOMES.</p>
          <Link to="/destinations/coastal/kwale">Back to Kwale County</Link>
        </section>
      </main>
    );
  }

  // KWALE COUNTY OVERVIEW
  return (
    <main className="kwale-page">
      <section className="kwale-hero">
        <span>ÉLAN HOMES DESTINATIONS · COASTAL KENYA</span>

        <h1>Discover Kwale County</h1>

        <p>
          Explore exceptional coastal properties, luxury villas, beachfront
          homes and memorable holiday stays across Kwale County.
        </p>

        <a href="#kwale-locations" className="kwale-button">
          Explore Kwale
        </a>
      </section>

      <section className="kwale-content" id="kwale-locations">
        <div className="kwale-heading">
          <span>THE KWALE COLLECTION</span>

          <h2>Explore Destinations in Kwale</h2>

          <p>
            Discover distinctive coastal locations and find your perfect place
            to live, invest or escape.
          </p>
        </div>

        <div className="kwale-location-grid">
          {locations.map((location, index) => (
            <article className="kwale-location-card" key={location.slug}>
              <span className="kwale-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{location.name}</h3>

              <p>{location.description}</p>

              <Link to={`/destinations/coastal/kwale/${location.slug}`}>
                Explore Location <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="kwale-back">
        <Link to="/destinations/coastal">← Back to Coastal Region</Link>
      </section>
    </main>
  );
}
