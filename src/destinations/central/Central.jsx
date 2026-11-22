import { Link } from "react-router-dom";
import "./Central.css";

// CENTRAL DESTINATION IMPORTS
import Kiambu from "./destinations/Kiambu";
import Limuru from "./destinations/Limuru";
import Nyeri from "./destinations/Nyeri";
import Thika from "./destinations/Thika";
import Tigoni from "./destinations/Tigoni";

const destinations = [
  {
    name: "Kiambu",
    slug: "kiambu",
    description:
      "Discover beautiful residential properties, modern family homes and comfortable places to stay in Kiambu.",
    number: "01",
  },
  {
    name: "Limuru",
    slug: "limuru",
    description:
      "Explore peaceful countryside homes, premium residential properties and charming accommodation in Limuru.",
    number: "02",
  },
  {
    name: "Nyeri",
    slug: "nyeri",
    description:
      "Discover distinctive homes, residential opportunities and memorable places to stay in Nyeri.",
    number: "03",
  },
  {
    name: "Thika",
    slug: "thika",
    description:
      "Explore modern homes, residential properties and convenient accommodation in Thika.",
    number: "04",
  },
  {
    name: "Tigoni",
    slug: "tigoni",
    description:
      "Discover beautiful countryside residences, exclusive homes and peaceful holiday stays in Tigoni.",
    number: "05",
  },
];

export default function Central({ locationSlug }) {
  // INDIVIDUAL DESTINATION PAGES
  if (locationSlug === "kiambu") return <Kiambu />;
  if (locationSlug === "limuru") return <Limuru />;
  if (locationSlug === "nyeri") return <Nyeri />;
  if (locationSlug === "thika") return <Thika />;
  if (locationSlug === "tigoni") return <Tigoni />;

  // CENTRAL REGION OVERVIEW
  return (
    <main className="central-page">
      <section className="central-hero">
        <div className="central-hero-content">
          <span>ÉLAN HOMES DESTINATIONS · KENYA</span>

          <h1>Discover Central Kenya</h1>

          <p>
            Explore exceptional properties, beautiful homes, residential
            communities and memorable places to stay across Central Kenya.
          </p>

          <a href="#central-destinations" className="central-button">
            Explore Central Region
          </a>
        </div>
      </section>

      <section className="central-intro">
        <span>THE CENTRAL COLLECTION</span>

        <h2>Discover a Place to Call Your Own</h2>

        <p>
          From Kiambu and Limuru to Nyeri, Thika and Tigoni, explore
          destinations offering residential opportunities, beautiful properties
          and exceptional accommodation experiences.
        </p>
      </section>

      <section className="central-destinations" id="central-destinations">
        <div className="central-heading">
          <span>EXPLORE THE REGION</span>

          <h2>Discover Central Destinations</h2>

          <p>Choose a destination and explore the ÉLAN HOMES collection.</p>
        </div>

        <div className="central-grid">
          {destinations.map((destination) => (
            <article className="central-card" key={destination.slug}>
              <div className="central-card-content">
                <span className="central-number">{destination.number}</span>

                <h3>{destination.name}</h3>

                <p>{destination.description}</p>

                <Link to={`/destinations/central/${destination.slug}`}>
                  Explore Destination →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="central-back">
        <Link to="/">← Back to Home</Link>
      </section>
    </main>
  );
}
