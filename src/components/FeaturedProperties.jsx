import "./FeaturedProperties.css";

const featuredProperties = [
  {
    id: 1,
    name: "Modern Luxury Villa",
    location: "Karen, Nairobi",
    price: "KSh 45,000,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "450 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    status: "For Sale",
  },
  {
    id: 2,
    name: "Contemporary Family Home",
    location: "Ruiru, Kiambu",
    price: "KSh 28,000,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "320 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000",
    status: "For Sale",
  },
  {
    id: 3,
    name: "Elegant City Apartment",
    location: "Kilimani, Nairobi",
    price: "KSh 18,500,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "180 sqm",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    status: "For Sale",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="featured-properties" id="properties">
      <div className="featured-container">
        <div className="featured-header">
          <div>
            <span className="featured-eyebrow">EXCEPTIONAL PLACES</span>

            <h2>
              Featured <span>Properties</span>
            </h2>

            <p>
              Explore a selection of exceptional properties chosen for their
              location, design and lifestyle.
            </p>
          </div>

          <a href="#all-properties" className="view-all-properties">
            View All Properties <span>↗</span>
          </a>
        </div>

        <div className="featured-grid">
          {featuredProperties.map((property) => (
            <article className="featured-card" key={property.id}>
              <div className="featured-image">
                <img src={property.image} alt={property.name} />

                <span className="property-status">{property.status}</span>

                <span className="property-type">{property.type}</span>
              </div>

              <div className="featured-card-content">
                <div className="property-location">
                  <span>⌖</span>
                  {property.location}
                </div>

                <h3>{property.name}</h3>

                <div className="property-details">
                  <span> {property.bedrooms} Bedrooms</span>
                  <span> {property.bathrooms} Bathrooms</span>
                  <span> {property.area}</span>
                </div>

                <div className="property-card-bottom">
                  <div>
                    <small>Price</small>
                    <strong>{property.price}</strong>
                  </div>

                  <a
                    href="#property-details"
                    aria-label={`View ${property.name}`}
                  >
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
