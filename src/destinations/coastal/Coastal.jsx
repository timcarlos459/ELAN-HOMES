import { Link } from "react-router-dom";
import "./Coastal.css";

const counties = [
  {
    name: "Kilifi County",
    slug: "kilifi",
    description:
      "Discover coastal homes, holiday villas and beautiful destinations across Kilifi County.",
  },
  {
    name: "Kwale County",
    slug: "kwale",
    description:
      "Explore beachfront residences, holiday homes and tropical escapes in Kwale.",
  },
  {
    name: "Lamu County",
    slug: "lamu",
    description:
      "Experience island living, Swahili architecture and exclusive coastal retreats.",
  },
  {
    name: "Mombasa County",
    slug: "mombasa",
    description:
      "Find homes, apartments and holiday accommodation in Mombasa's popular neighbourhoods.",
  },
  {
    name: "Taita Taveta County",
    slug: "taita-taveta",
    description:
      "Discover properties and stays around the Taita Hills and the wider Taita Taveta region.",
  },
];

export default function Coastal() {
  return (
    <main className="coastal-page">
      <section className="coastal-hero">
        <div className="coastal-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · KENYA</span>

          <h1>Discover the Kenyan Coast</h1>

          <p>
            Explore exceptional coastal properties, beachfront homes, island
            escapes and holiday stays across Kenya's Coast.
          </p>

          <a href="#coastal-counties" className="coastal-hero-button">
            Explore the Coast
          </a>
        </div>
      </section>

      <section className="coastal-intro">
        <span>THE COASTAL COLLECTION</span>

        <h2>Find Your Place by the Ocean</h2>

        <p>
          From the beaches of Kilifi and Kwale to the islands of Lamu, discover
          distinctive places to live, invest and escape. Explore five counties
          and their featured destinations.
        </p>
      </section>

      <section className="coastal-counties" id="coastal-counties">
        <div className="coastal-heading">
          <span>EXPLORE BY COUNTY</span>

          <h2>Coastal Kenya Destinations</h2>

          <p>
            Select a county to discover its neighbourhoods, properties and
            holiday stays.
          </p>
        </div>

        <div className="coastal-county-grid">
          {counties.map((county, index) => (
            <article className="coastal-county-card" key={county.slug}>
              <div className="coastal-county-number">0{index + 1}</div>

              <div className="coastal-county-content">
                <span>COASTAL REGION</span>

                <h3>{county.name}</h3>

                <p>{county.description}</p>

                <div className="coastal-location-list">
                  <Link
                    to={`/destinations/coastal/${county.slug}`}
                    className="coastal-location-link"
                  >
                    Explore County
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="coastal-back">
        <Link to="/destinations">← Back to Destinations</Link>
      </section>
    </main>
  );
}
