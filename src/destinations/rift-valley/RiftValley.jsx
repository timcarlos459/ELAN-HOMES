import "./RiftValley.css";

import Nyanyuki from "./destinations/Nyanyuki";
import Sekenani from "./destinations/Sekenani";
import Talek from "./destinations/Talek";
import MaraTriangle from "./destinations/MaraTriangle";
import Eldoret from "./destinations/Eldoret";
import Naivasha from "./destinations/Naivasha";
import Nakuru from "./destinations/Nakuru";

const destinations = [
  {
    name: "Nyanyuki",
    slug: "nyanyuki",
    description:
      "Discover scenic mountain views, luxury homes, countryside escapes and exceptional stays in Nyanyuki.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    component: Nyanyuki,
  },
  {
    name: "Sekenani — Near Mara Gate",
    slug: "sekenani",
    description:
      "Explore beautiful safari accommodation, wilderness retreats and properties near the Sekenani Gate of Maasai Mara.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    component: Sekenani,
  },
  {
    name: "Talek — Inside Mara",
    slug: "talek",
    description:
      "Experience the heart of Maasai Mara through exclusive safari stays and exceptional wilderness properties.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    component: Talek,
  },
  {
    name: "Mara Triangle",
    slug: "mara-triangle",
    description:
      "Discover extraordinary safari experiences, luxury camps and exclusive accommodation within the Mara Triangle.",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d",
    component: MaraTriangle,
  },
  {
    name: "Eldoret",
    slug: "eldoret",
    description:
      "Explore residential properties, comfortable stays and lifestyle opportunities in Eldoret.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    component: Eldoret,
  },
  {
    name: "Naivasha",
    slug: "naivasha",
    description:
      "Discover lakeside homes, holiday retreats, beautiful villas and accommodation in Naivasha.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    component: Naivasha,
  },
  {
    name: "Nakuru",
    slug: "nakuru",
    description:
      "Explore exceptional homes, residential properties and memorable places to stay in Nakuru.",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    component: Nakuru,
  },
];

export default function RiftValley({ locationSlug }) {
  if (locationSlug) {
    const destination = destinations.find((item) => item.slug === locationSlug);

    if (destination) {
      const DestinationComponent = destination.component;

      return <DestinationComponent />;
    }

    return (
      <div className="rift-valley-not-found">
        <h2>Destination Not Found</h2>
        <p>The destination you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <main className="rift-valley-page">
      <section className="rift-valley-hero">
        <div className="rift-valley-hero-overlay">
          <span className="rift-valley-eyebrow">EXPLORE KENYA</span>

          <h1>Rift Valley</h1>

          <p>
            Discover extraordinary landscapes, luxury safari experiences,
            beautiful homes and unforgettable destinations across Kenya's Rift
            Valley.
          </p>
        </div>
      </section>

      <section className="rift-valley-destinations">
        <div className="rift-valley-section-heading">
          <span>THE ÉLAN HOMES COLLECTION</span>

          <h2>Explore Rift Valley</h2>

          <p>
            Discover exceptional properties and stays across the region's most
            remarkable destinations.
          </p>
        </div>

        <div className="rift-valley-grid">
          {destinations.map((destination) => (
            <a
              key={destination.slug}
              href={`/destinations/rift-valley/${destination.slug}`}
              className="rift-valley-card"
            >
              <div className="rift-valley-card-image">
                <img src={destination.image} alt={destination.name} />

                <div className="rift-valley-card-overlay">
                  <span>EXPLORE DESTINATION</span>
                </div>
              </div>

              <div className="rift-valley-card-content">
                <h3>{destination.name}</h3>

                <p>{destination.description}</p>

                <span className="rift-valley-card-link">DISCOVER MORE →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
