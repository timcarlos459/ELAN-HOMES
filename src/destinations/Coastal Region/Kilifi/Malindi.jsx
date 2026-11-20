import { useState } from "react";
import "./Malindi.css";

const malindiAreas = [
  {
    name: "Malindi Town",
    category: "Town Living",
    description:
      "Explore apartments, residential homes and properties close to the town centre.",
  },
  {
    name: "Casuarina",
    category: "Coastal Living",
    description:
      "Discover beautiful coastal homes, villas and holiday accommodation.",
  },
  {
    name: "Marine Park",
    category: "Beachfront",
    description:
      "Experience premium beach properties and exclusive holiday stays.",
  },
  {
    name: "Silversands",
    category: "Luxury Living",
    description:
      "Find luxury villas, beach houses and premium coastal properties.",
  },
  {
    name: "Ngomeni",
    category: "Coastal Retreat",
    description:
      "Discover peaceful coastal properties and unique holiday escapes.",
  },
];

export default function Malindi() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Properties", "Holiday Stays", "Land"];

  return (
    <main className="malindi-page">
      {/* HERO SECTION */}
      <section className="malindi-hero">
        <div className="malindi-hero-content">
          <span className="malindi-eyebrow">ELAN HOMES | KILIFI COUNTY</span>

          <h1>
            Discover
            <br />
            <span>Malindi</span>
          </h1>

          <p>
            Discover beautiful coastal homes, luxury villas, holiday stays and
            investment opportunities in one of Kenya's most iconic coastal
            destinations.
          </p>

          <div className="malindi-hero-buttons">
            <button
              onClick={() =>
                document
                  .getElementById("malindi-explore")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Malindi
            </button>

            <button
              className="malindi-secondary-button"
              onClick={() =>
                document
                  .getElementById("malindi-areas")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Discover Areas
            </button>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="malindi-introduction">
        <div className="malindi-introduction-content">
          <span className="malindi-eyebrow">THE KENYAN COAST</span>

          <h2>
            Coastal Living,
            <br />
            Redefined.
          </h2>

          <p>
            Malindi offers a unique blend of coastal lifestyle, beautiful
            beaches, culture and property investment opportunities. Whether you
            are searching for a permanent home, a holiday villa or an investment
            property, explore what Malindi has to offer.
          </p>
        </div>
      </section>

      {/* EXPLORE CATEGORIES */}
      <section className="malindi-explore" id="malindi-explore">
        <div className="malindi-section-heading">
          <span className="malindi-eyebrow">EXPLORE MALINDI</span>

          <h2>Find Your Perfect Place</h2>

          <p>Discover properties and accommodation in Malindi.</p>
        </div>

        <div className="malindi-category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category ? "malindi-filter-active" : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="malindi-category-grid">
          {(activeCategory === "All" || activeCategory === "Properties") && (
            <article className="malindi-category-card">
              <div className="malindi-category-image malindi-properties-image">
                <span>PROPERTY</span>
              </div>

              <div className="malindi-category-content">
                <h3>Properties</h3>

                <p>
                  Explore houses, apartments, villas and residential properties.
                </p>

                <button>Explore Properties</button>
              </div>
            </article>
          )}

          {(activeCategory === "All" || activeCategory === "Holiday Stays") && (
            <article className="malindi-category-card">
              <div className="malindi-category-image malindi-stays-image">
                <span>HOLIDAY STAYS</span>
              </div>

              <div className="malindi-category-content">
                <h3>Holiday Stays</h3>

                <p>
                  Discover beautiful holiday homes, villas and short-stay
                  accommodation.
                </p>

                <button>Explore Stays</button>
              </div>
            </article>
          )}

          {(activeCategory === "All" || activeCategory === "Land") && (
            <article className="malindi-category-card">
              <div className="malindi-category-image malindi-land-image">
                <span>LAND & INVESTMENT</span>
              </div>

              <div className="malindi-category-content">
                <h3>Land</h3>

                <p>
                  Explore land opportunities for residential, commercial and
                  investment purposes.
                </p>

                <button>Explore Land</button>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* MALINDI LOCATIONS */}
      <section className="malindi-areas" id="malindi-areas">
        <div className="malindi-section-heading">
          <span className="malindi-eyebrow">EXPLORE THE NEIGHBOURHOODS</span>

          <h2>Popular Areas in Malindi</h2>

          <p>
            Explore different neighbourhoods and coastal locations around
            Malindi.
          </p>
        </div>

        <div className="malindi-areas-grid">
          {malindiAreas.map((area) => (
            <article className="malindi-area-card" key={area.name}>
              <div className="malindi-area-image">
                <span>{area.category}</span>
              </div>

              <div className="malindi-area-content">
                <h3>{area.name}</h3>

                <p>{area.description}</p>

                <button>Explore {area.name}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="malindi-cta">
        <div className="malindi-cta-content">
          <span className="malindi-eyebrow">ELAN HOMES</span>

          <h2>
            Your Malindi
            <br />
            Story Starts Here.
          </h2>

          <p>
            Find your next home, holiday destination or investment opportunity.
          </p>

          <button>Explore Available Listings</button>
        </div>
      </section>
    </main>
  );
}
