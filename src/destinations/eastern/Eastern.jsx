import { Link } from "react-router-dom";
import "./Eastern.css";

// EASTERN DESTINATION IMPORTS
import Machakos from "./destinations/Machakos";
import Meru from "./destinations/Meru";
import Embu from "./destinations/Embu";
import MakueniWote from "./destinations/MakueniWote";

const destinations = [
  {
    name: "Machakos",
    slug: "machakos",
    description:
      "Discover residential properties, modern homes, investment opportunities and beautiful places to stay in Machakos.",
    number: "01",
  },
  {
    name: "Meru",
    slug: "meru",
    description:
      "Explore distinctive homes, countryside properties, investment opportunities and accommodation in Meru.",
    number: "02",
  },
  {
    name: "Embu",
    slug: "embu",
    description:
      "Discover properties, residential communities and accommodation opportunities across Embu.",
    number: "03",
  },
  {
    name: "Makueni – Wote",
    slug: "makueni-wote",
    description:
      "Explore properties, peaceful countryside living and accommodation opportunities in Wote, Makueni.",
    number: "04",
  },
];

export default function Eastern({ locationSlug }) {
  // INDIVIDUAL DESTINATION PAGES
  if (locationSlug === "machakos") return <Machakos />;
  if (locationSlug === "meru") return <Meru />;
  if (locationSlug === "embu") return <Embu />;
  if (locationSlug === "makueni-wote") return <MakueniWote />;

  // EASTERN REGION OVERVIEW
  return (
    <main className="eastern-page">
      <section className="eastern-hero">
        <div className="eastern-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · KENYA</span>

          <h1>Discover Eastern Kenya</h1>

          <p>
            Explore exceptional properties, beautiful homes, investment
            opportunities and memorable places to stay across Eastern Kenya.
          </p>

          <a href="#eastern-destinations" className="eastern-button">
            Explore Eastern Region
          </a>
        </div>
      </section>

      <section className="eastern-intro">
        <span>THE EASTERN COLLECTION</span>

        <h2>Discover a Place to Call Your Own</h2>

        <p>
          From Machakos to Meru, Embu and Makueni–Wote, discover destinations
          offering residential opportunities, investment properties and
          accommodation experiences.
        </p>
      </section>

      <section className="eastern-destinations" id="eastern-destinations">
        <div className="eastern-heading">
          <span>EXPLORE THE REGION</span>

          <h2>Discover Eastern Destinations</h2>

          <p>Choose a destination and explore the ÉLAN HOMES collection.</p>
        </div>

        <div className="eastern-grid">
          {destinations.map((destination) => (
            <article className="eastern-card" key={destination.slug}>
              <div className="eastern-card-content">
                <span className="eastern-number">{destination.number}</span>

                <h3>{destination.name}</h3>

                <p>{destination.description}</p>

                <Link to={`/destinations/eastern/${destination.slug}`}>
                  Explore Destination →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="eastern-back">
        <Link to="/">← Back to Home</Link>
      </section>
    </main>
  );
}
