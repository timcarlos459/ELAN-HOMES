import { Link } from "react-router-dom";
import "./ExploreDestinations.css";

const destinations = [
  {
    name: "Nairobi",
    description: "Urban homes, apartments and luxury stays.",
    image: "https://pbs.twimg.com/media/DvkWlLIXQAAZE_R.jpg",
    link: "/destinations/nairobi",
  },
  {
    name: "Coastal Region",
    description: "Mombasa, Diani, Malindi, Watamu and Lamu.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000",
    link: "/destinations/coastal",
  },
  {
    name: "Rift Valley",
    description: "Naivasha, Nakuru and other scenic destinations.",
    image:
      "https://static.333travel.nl/web-images/07/2019/5d235245cb3c0/kenia-great-rift-valley-lake-nakuru-national-park-menengai-krater.jpeg",
    link: "/destinations/rift-valley",
  },
  {
    name: "Kajiado",
    description: "Kitengela, Ngong, Rongai and countryside living.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
    link: "/destinations/kajiado",
  },
];

export default function ExploreDestinations() {
  return (
    <section className="explore-destinations" id="destinations">
      <div className="destinations-container">
        <div className="destinations-heading">
          <div>
            <span>EXPLORE KENYA</span>

            <h2>Find Your Destination</h2>

            <p>
              Discover exceptional properties and stays in some of Kenya's most
              desirable locations.
            </p>
          </div>

          <Link to="/destinations/nairobi">
            View Destinations <span>↗</span>
          </Link>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <Link
              to={destination.link}
              className="destination-card"
              key={destination.name}
            >
              <img
                src={destination.image}
                alt={destination.name}
                loading="lazy"
                decoding="async"
              />

              <div className="destination-overlay">
                <div>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                </div>

                <span className="destination-arrow">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
