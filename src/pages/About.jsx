import "./About.css";

export default function About() {
  return (
    <main className="about-page">
      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <span className="about-label">ABOUT ELAN HOMES</span>

          <h1>
            Redefining the Way
            <br />
            <span>Kenya Finds Home.</span>
          </h1>

          <p>
            Connecting people to exceptional properties, unforgettable stays,
            and opportunities across Kenya.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story">
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
            alt="Modern luxury property"
          />
        </div>

        <div className="about-story-content">
          <span className="about-section-label">OUR STORY</span>

          <h2>
            More Than Properties.
            <br />
            <span>Creating Possibilities.</span>
          </h2>

          <p>
            ELAN HOMES was founded with a vision to transform the way people
            discover, experience, and connect with properties across Kenya.
          </p>

          <p>
            From beautiful homes and modern apartments to luxury holiday stays
            and investment opportunities, we bring together spaces that inspire
            living, travelling, and investing.
          </p>

          <p>
            We believe finding the right property should be simple, inspiring,
            and rewarding. Through ELAN HOMES, we aim to create a platform where
            property owners and people searching for their perfect space connect
            seamlessly.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-who-we-are">
        <div className="about-who-content">
          <span className="about-section-label">WHO WE ARE</span>

          <h2>
            A New Perspective
            <br />
            on Real Estate.
          </h2>

          <p>
            ELAN HOMES is a modern property and lifestyle platform dedicated to
            showcasing exceptional real estate and accommodation experiences.
          </p>

          <p>
            We bring together property buyers, tenants, investors,
            holidaymakers, property owners, and developers through one platform
            designed to make property discovery easier.
          </p>
        </div>

        <div className="about-who-image">
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
            alt="Contemporary architectural design"
          />
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="about-mission-vision">
        <div className="about-mission-card">
          <span className="about-card-number">01</span>

          <span className="about-section-label">OUR MISSION</span>

          <h2>Making Property Discovery Simple.</h2>

          <p>
            To provide a trusted, innovative, and accessible platform that
            connects people with properties, holiday stays, and real estate
            opportunities while creating value for property owners and
            customers.
          </p>
        </div>

        <div className="about-vision-card">
          <span className="about-card-number">02</span>

          <span className="about-section-label">OUR VISION</span>

          <h2>Building the Future of Real Estate.</h2>

          <p>
            To become one of Africa's leading property and lifestyle platforms,
            transforming how people discover, access, experience, and invest in
            real estate.
          </p>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="about-commitment">
        <div className="about-commitment-content">
          <span className="about-section-label">OUR COMMITMENT</span>

          <h2>
            Your Journey.
            <br />
            <span>Our Commitment.</span>
          </h2>

          <p>
            At ELAN HOMES, we are committed to creating meaningful property
            experiences through convenience, transparency, innovation, and
            exceptional service.
          </p>

          <p>
            Whether you are searching for a home, planning a getaway, exploring
            investment opportunities, or listing your property, we strive to
            make every interaction worthwhile.
          </p>
        </div>

        <div className="about-commitment-image">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
            alt="Beautiful luxury home"
          />
        </div>
      </section>
    </main>
  );
}
