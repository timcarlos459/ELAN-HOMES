import { Link } from "react-router-dom";
import "./Kajiado.css";

// KAJIADO LOCATIONS
import OngataRongai from "./locations/OngataRongai";
import Kitengela from "./locations/Kitengela";
import Kiserian from "./locations/Kiserian";
import Ngong from "./locations/Ngong";
import Amboseli from "./locations/Amboseli";
import Oloitoktok from "./locations/Oloitoktok";

const locations = [
  {
    name: "Ongata Rongai",
    slug: "ongata-rongai",
    description:
      "Discover residential homes, modern apartments and convenient stays in Ongata Rongai.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    component: OngataRongai,
  },
  {
    name: "Kitengela",
    slug: "kitengela",
    description:
      "Explore family homes, spacious properties and comfortable stays in Kitengela.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    component: Kitengela,
  },
  {
    name: "Kiserian",
    slug: "kiserian",
    description:
      "Find residential properties and relaxing accommodation around Kiserian.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    component: Kiserian,
  },
  {
    name: "Ngong",
    slug: "ngong",
    description:
      "Discover homes, villas and peaceful stays near the beautiful Ngong Hills.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    component: Ngong,
  },
  {
    name: "Amboseli",
    slug: "amboseli",
    description:
      "Explore exceptional properties and safari-inspired stays near Amboseli.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    component: Amboseli,
  },
  {
    name: "Oloitoktok",
    slug: "oloitoktok",
    description:
      "Discover property opportunities and accommodation near the slopes of Mount Kilimanjaro.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    component: Oloitoktok,
  },
];

export default function Kajiado() {
  return (
    <main className="kajiado-page">
      <section className="kajiado-hero">
        <div className="kajiado-hero-overlay">
          <span className="kajiado-eyebrow">ÉLAN HOMES DESTINATIONS</span>

          <h1>Discover Kajiado</h1>

          <p>
            Explore exceptional properties and beautiful places to stay across
            Kajiado County, Kenya.
          </p>

          <div className="kajiado-hero-actions">
            <Link to="/properties" className="kajiado-btn">
              Explore Properties
            </Link>

            <Link to="/stays" className="kajiado-btn-outline">
              Discover Stays
            </Link>
          </div>
        </div>
      </section>

      <section className="kajiado-intro">
        <span>EXPLORE THE COUNTY</span>
        <h2>Find Your Place in Kajiado</h2>
        <p>
          From vibrant residential communities to scenic countryside
          destinations, discover places to live, invest and stay.
        </p>
      </section>

      <section className="kajiado-locations">
        <div className="kajiado-section-heading">
          <div>
            <span>OUR DESTINATIONS</span>
            <h2>Explore Kajiado Locations</h2>
          </div>

          <p>Six destinations. More opportunities to discover.</p>
        </div>

        <div className="kajiado-grid">
          {locations.map((location) => (
            <Link
              to={`/destinations/kajiado/${location.slug}`}
              className="kajiado-card"
              key={location.slug}
            >
              <div className="kajiado-card-image">
                <img
                  src={location.image}
                  alt={`${location.name}, Kajiado`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="kajiado-card-content">
                <span>KAJIADO COUNTY</span>
                <h3>{location.name}</h3>
                <p>{location.description}</p>

                <div className="kajiado-card-link">
                  Explore Location <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
