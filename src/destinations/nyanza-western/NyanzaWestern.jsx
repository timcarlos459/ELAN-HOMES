import { Link, useParams } from "react-router-dom";
import "./NyanzaWestern.css";

// DESTINATION IMPORTS
import Kisumu from "./destinations/Kisumu";
import HomaBay from "./destinations/HomaBay";
import Kakamega from "./destinations/Kakamega";
import Siaya from "./destinations/Siaya";
import Bungoma from "./destinations/Bungoma";
import RusingaIsland from "./destinations/RusingaIsland";

const destinations = [
  {
    name: "Kisumu",
    slug: "kisumu",
    description:
      "Explore lakeside living, modern homes and beautiful accommodation in Kenya's lakeside city.",
  },
  {
    name: "Homa Bay",
    slug: "homa-bay",
    description:
      "Discover peaceful lakeside surroundings, residential properties and places to stay.",
  },
  {
    name: "Kakamega",
    slug: "kakamega",
    description:
      "Explore green landscapes, residential communities and accommodation near Kakamega Forest.",
  },
  {
    name: "Siaya",
    slug: "siaya",
    description:
      "Discover beautiful surroundings, homes and accommodation in Siaya County.",
  },
  {
    name: "Bungoma",
    slug: "bungoma",
    description:
      "Explore residential opportunities and comfortable places to stay in Bungoma.",
  },
  {
    name: "Rusinga Island",
    slug: "rusinga-island",
    description:
      "Experience island living, scenic Lake Victoria views and unique holiday stays.",
  },
];

export default function NyanzaWestern() {
  const { locationSlug } = useParams();

  // KISUMU DESTINATION
  if (locationSlug === "kisumu") {
    return <Kisumu />;
  }

  // HOMA BAY DESTINATION
  if (locationSlug === "homa-bay") {
    return <HomaBay />;
  }

  // KAKAMEGA DESTINATION
  if (locationSlug === "kakamega") {
    return <Kakamega />;
  }

  // SIAYA DESTINATION
  if (locationSlug === "siaya") {
    return <Siaya />;
  }

  // BUNGOMA DESTINATION
  if (locationSlug === "bungoma") {
    return <Bungoma />;
  }

  // RUSINGA ISLAND DESTINATION
  if (locationSlug === "rusinga-island") {
    return <RusingaIsland />;
  }

  return (
    <main className="nyanza-western-page">
      <section className="nyanza-western-hero">
        <div className="nyanza-western-hero-content">
          <span>THE ÉLAN HOMES COLLECTION</span>
          <h1>Discover Nyanza & Western Kenya</h1>
          <p>
            Explore beautiful destinations across western Kenya, from lakeside
            communities and island escapes to vibrant towns and peaceful
            residential neighbourhoods.
          </p>
        </div>
      </section>

      <section className="nyanza-western-destinations">
        <div className="nyanza-western-section-heading">
          <span>EXPLORE THE REGION</span>
          <h2>Discover Our Destinations</h2>
          <p>
            Find exceptional properties for sale and memorable places to stay
            across Nyanza and Western Kenya.
          </p>
        </div>

        <div className="nyanza-western-grid">
          {destinations.map((destination) => (
            <article className="nyanza-western-card" key={destination.slug}>
              <div className="nyanza-western-card-content">
                <span>NYANZA & WESTERN</span>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>

                <Link
                  to={`/destinations/nyanza-western/${destination.slug}`}
                  className="nyanza-western-card-link"
                >
                  EXPLORE DESTINATION →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
