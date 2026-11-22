import { Link } from "react-router-dom";
import "./TaitaTaveta.css";

import WundanyiTaitaHills from "./locations/WundanyiTaitaHills";
import Taveta from "./locations/Taveta";
import Voi from "./locations/Voi";

const locations = [
  {
    name: "Wundanyi – Taita Hills",
    slug: "wundanyi-taita-hills",
    description:
      "Discover scenic mountain landscapes, peaceful residential settings and countryside retreats.",
  },
  {
    name: "Taveta",
    slug: "taveta",
    description:
      "Explore countryside living, agricultural surroundings and accommodation opportunities.",
  },
  {
    name: "Voi",
    slug: "voi",
    description:
      "Explore the gateway to Tsavo, beautiful landscapes and places to stay.",
  },
];

export default function TaitaTaveta({ locationSlug }) {
  if (locationSlug === "wundanyi-taita-hills") {
    return <WundanyiTaitaHills />;
  }

  if (locationSlug === "taveta") {
    return <Taveta />;
  }

  if (locationSlug === "voi") {
    return <Voi />;
  }

  return (
    <main className="taita-taveta-page">
      <section className="taita-taveta-hero">
        <div className="taita-taveta-hero-content">
          <span>ÉLAN HOMES · COASTAL REGION</span>

          <h1>Discover Taita Taveta</h1>

          <p>
            Explore mountain landscapes, countryside destinations, residential
            opportunities and unique places to stay across Taita Taveta County.
          </p>
        </div>
      </section>

      <section className="taita-taveta-intro">
        <span>EXPLORE THE COUNTY</span>

        <h2>Discover Your Next Destination</h2>

        <p>
          From the scenic Taita Hills to the landscapes around Voi and Taveta,
          discover places to live, invest and stay.
        </p>
      </section>

      <section className="taita-taveta-locations">
        <div className="taita-taveta-locations-heading">
          <span>THE ÉLAN HOMES COLLECTION</span>

          <h2>Explore Taita Taveta Locations</h2>

          <p>
            Find properties for sale and discover distinctive places to stay
            across the county.
          </p>
        </div>

        <div className="taita-taveta-grid">
          {locations.map((location) => (
            <article className="taita-taveta-card" key={location.slug}>
              <div className="taita-taveta-card-content">
                <span>TAITA TAVETA COUNTY</span>

                <h3>{location.name}</h3>

                <p>{location.description}</p>

                <Link
                  to={`/destinations/coastal/taita-taveta/${location.slug}`}
                >
                  Explore Destination →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="taita-taveta-back">
        <Link to="/destinations/coastal">← Back to Coastal Region</Link>
      </section>
    </main>
  );
}
