import { useState } from "react";
import "./Kilifi.css";

const kilifiLocations = [
  {
    name: "Kilifi Town",
    description:
      "Explore residential properties, apartments and coastal stays.",
    category: "Town & Coastal Living",
  },
  {
    name: "Malindi",
    description: "Discover holiday villas, apartments and beachfront stays.",
    category: "Holiday Destination",
  },
  {
    name: "Watamu",
    description:
      "Explore beautiful beach homes, villas and holiday accommodation.",
    category: "Beach & Luxury Stays",
  },
  {
    name: "Mtwapa",
    description: "Find apartments, rental homes and investment properties.",
    category: "Residential & Investment",
  },
  {
    name: "Vipingo",
    description: "Discover premium homes, villas and lifestyle properties.",
    category: "Premium Living",
  },
  {
    name: "Kikambala",
    description: "Explore coastal homes, holiday properties and apartments.",
    category: "Coastal Living",
  },
];

export default function Kilifi() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <main className="kilifi-page">
      {/* KILIFI HERO */}
      <section className="kilifi-hero">
        <div className="kilifi-hero-content">
          <p>ELAN HOMES • COASTAL REGION</p>

          <h1>Discover Kilifi</h1>

          <p>
            Find exceptional homes, beautiful holiday stays and property
            investment opportunities along the Kenyan Coast.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("kilifi-locations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Locations
          </button>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="kilifi-locations" id="kilifi-locations">
        <div className="kilifi-section-heading">
          <p>EXPLORE THE COAST</p>
          <h2>Popular Locations in Kilifi</h2>
          <span>Explore properties and stays across Kilifi County.</span>
        </div>

        <div className="kilifi-location-grid">
          {kilifiLocations.map((location) => (
            <article className="kilifi-location-card" key={location.name}>
              <div className="kilifi-location-image">
                <span>{location.category}</span>
              </div>

              <div className="kilifi-location-info">
                <h3>{location.name}</h3>

                <p>{location.description}</p>

                <button onClick={() => setSelectedLocation(location.name)}>
                  Explore {location.name}
                </button>
              </div>
            </article>
          ))}
        </div>

        {selectedLocation && (
          <div className="kilifi-selection">
            <h3>{selectedLocation}</h3>
            <p>
              You selected {selectedLocation}. We will connect this location to
              its dedicated property and accommodation page next.
            </p>

            <button onClick={() => setSelectedLocation(null)}>Close</button>
          </div>
        )}
      </section>
    </main>
  );
}
