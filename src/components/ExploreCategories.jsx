import "./ExploreCategories.css";

const categories = [
  {
    number: "01",
    title: "Find Your Home",
    description:
      "Explore exceptional houses, apartments and villas for sale across Kenya.",
    link: "#properties",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    action: "Explore Properties",
  },
  {
    number: "02",
    title: "Holiday Stays",
    description:
      "Discover beautiful holiday homes, villas and unique places to stay.",
    link: "#bnb",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
    action: "Explore Stays",
  },
  {
    number: "03",
    title: "Land & Investments",
    description:
      "Discover prime residential, commercial and agricultural land opportunities.",
    link: "#land",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    action: "Explore Land",
  },
];

export default function ExploreCategories() {
  return (
    <section className="explore-categories">
      <div className="explore-container">
        <div className="explore-heading">
          <span>DISCOVER ELAN HOMES</span>

          <h2>
            Find Your Place.
            <br />
            <span>Discover More.</span>
          </h2>

          <p>
            Whether you are looking to buy, book or invest, discover
            opportunities that bring you closer to the lifestyle you want.
          </p>
        </div>

        <div className="explore-grid">
          {categories.map((category) => (
            <article className="explore-card" key={category.number}>
              <div className="explore-card-image">
                <img src={category.image} alt={category.title} />

                <span className="explore-number">{category.number}</span>
              </div>

              <div className="explore-card-content">
                <h3>{category.title}</h3>

                <p>{category.description}</p>

                <a href={category.link}>
                  {category.action}
                  <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
