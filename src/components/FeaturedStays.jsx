import "./FeaturedStays.css";

const featuredStays = [
  {
    id: 1,
    name: "Luxury Beachfront Villa",
    location: "Diani, Kwale County",
    price: 15000,
    guests: 6,
    bedrooms: 3,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
    tag: "Beachfront Escape",
  },
  {
    id: 2,
    name: "Modern Nairobi Apartment",
    location: "Westlands, Nairobi",
    price: 8500,
    guests: 4,
    bedrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    tag: "City Living",
  },
  {
    id: 3,
    name: "Private Safari Retreat",
    location: "Naivasha, Nakuru County",
    price: 18000,
    guests: 8,
    bedrooms: 4,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    tag: "Nature Escape",
  },
];

export default function FeaturedStays() {
  return (
    <section className="featured-stays" id="bnb">
      <div className="stays-container">
        <div className="stays-heading">
          <div>
            <span>STAY SOMEWHERE SPECIAL</span>
            <h2>
              Discover <strong>Beautiful Stays</strong>
            </h2>
            <p>
              From peaceful retreats to luxury holiday villas, find your perfect
              place to stay across Kenya.
            </p>
          </div>

          <a href="/stays" className="stays-view-all">
            Explore All Stays <span>↗</span>
          </a>
        </div>

        <div className="stays-grid">
          {featuredStays.map((stay) => (
            <article className="stay-card" key={stay.id}>
              <div className="stay-image">
                <img src={stay.image} alt={stay.name} />
                <span className="stay-tag">{stay.tag}</span>
              </div>

              <div className="stay-content">
                <p className="stay-location">
                  <span>⌖</span> {stay.location}
                </p>

                <h3>{stay.name}</h3>

                <div className="stay-details">
                  <span>{stay.guests} Guests</span>
                  <span>{stay.bedrooms} Bedrooms</span>
                </div>

                <div className="stay-bottom">
                  <div>
                    <strong>KSh {stay.price.toLocaleString("en-KE")}</strong>
                    <small> / night</small>
                  </div>

                  <a href="/stays" aria-label={`Explore ${stay.name}`}>
                    ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
