import { Link } from "react-router-dom";
import "./nairobi.css";

// LOCATION IMPORTS
import Lavington from "./locations/Lavington";
import Langata from "./locations/Langata";
import Gigiri from "./locations/Gigiri";
import Karen from "./locations/Karen";
import Kileleshwa from "./locations/Kileleshwa";
import Kilimani from "./locations/Kilimani";
import NairobiWest from "./locations/NairobiWest";
import NgongRoad from "./locations/NgongRoad";
import Runda from "./locations/Runda";
import Riverside from "./locations/Riverside";
import Roysambu from "./locations/Roysambu";
import Westlands from "./locations/Westlands";

// ALL NAIROBI LOCATIONS
const locations = [
  { name: "Lavington", slug: "lavington", component: Lavington },
  { name: "Langata", slug: "langata", component: Langata },
  { name: "Gigiri", slug: "gigiri", component: Gigiri },
  { name: "Karen", slug: "karen", component: Karen },
  { name: "Kileleshwa", slug: "kileleshwa", component: Kileleshwa },
  { name: "Kilimani", slug: "kilimani", component: Kilimani },
  { name: "Nairobi West", slug: "nairobi-west", component: NairobiWest },
  { name: "Ngong Road", slug: "ngong-road", component: NgongRoad },
  { name: "Runda", slug: "runda", component: Runda },
  { name: "Riverside", slug: "riverside", component: Riverside },
  { name: "Roysambu", slug: "roysambu", component: Roysambu },
  { name: "Westlands", slug: "westlands", component: Westlands },
];

export default function Nairobi({ locationSlug }) {
  // DISPLAY SELECTED LOCATION
  if (locationSlug) {
    const selectedLocation = locations.find(
      (location) => location.slug === locationSlug,
    );

    if (selectedLocation) {
      const LocationComponent = selectedLocation.component;
      return <LocationComponent />;
    }

    return (
      <main className="nairobi-page">
        <section className="nairobi-coming-soon">
          <h1>Location Coming Soon</h1>
          <p>We are preparing this location for ÉLAN HOMES.</p>
          <Link to="/destinations/nairobi">← Back to Nairobi</Link>
        </section>
      </main>
    );
  }

  // NAIROBI OVERVIEW
  return (
    <main className="nairobi-page">
      <section className="nairobi-hero">
        <div className="nairobi-hero-content">
          <span>EXPLORE KENYA</span>

          <h1>Discover Nairobi</h1>

          <p>
            Explore exceptional homes, premium properties and beautiful holiday
            stays across Nairobi's most sought-after neighbourhoods.
          </p>
        </div>
      </section>

      <section className="nairobi-introduction">
        <span className="nairobi-eyebrow">THE GREEN CITY IN THE SUN</span>

        <h2>Find Your Place in Nairobi</h2>

        <p>
          From the leafy streets of Karen and Lavington to the vibrant lifestyle
          of Kilimani and Westlands, discover places to live, invest and stay.
        </p>
      </section>

      <section className="nairobi-locations">
        <div className="nairobi-section-heading">
          <div>
            <span className="nairobi-eyebrow">EXPLORE THE CITY</span>

            <h2>Popular Nairobi Locations</h2>
          </div>

          <p>Discover properties and stays in every neighbourhood.</p>
        </div>

        <div className="nairobi-location-grid">
          {locations.map((location) => (
            <Link
              to={`/destinations/nairobi/${location.slug}`}
              className="nairobi-location-card"
              key={location.slug}
            >
              <div className="nairobi-location-card-content">
                <span>NAIROBI, KENYA</span>

                <h3>{location.name}</h3>

                <strong>Explore Location →</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
