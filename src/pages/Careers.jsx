import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./Careers.css";

const opportunities = [
  {
    title: "Property Sales & Real Estate",
    description:
      "Help clients discover properties, arrange viewings and explore real estate opportunities across Kenya.",
    type: "Sales & Property",
  },
  {
    title: "Hospitality & Guest Experience",
    description:
      "Support guests, coordinate accommodation enquiries and help create memorable short-stay experiences.",
    type: "Hospitality",
  },
  {
    title: "Marketing & Content Creation",
    description:
      "Help grow the ÉLAN HOMES brand through digital marketing, social media and creative content.",
    type: "Marketing",
  },
  {
    title: "Customer Support",
    description:
      "Assist customers with enquiries, property information and general platform support.",
    type: "Customer Experience",
  },
];

function Careers() {
  return (
    <>
      <SEO
        title="Careers | Join ÉLAN HOMES"
        description="Explore career opportunities and become part of the ÉLAN HOMES team, connecting people with properties and accommodation across Kenya."
      />

      <main className="careers-page">
        <section className="careers-hero">
          <div className="careers-hero-content">
            <span>BUILD YOUR FUTURE WITH US</span>
            <h1>Make Your Career Part of Something Exceptional.</h1>
            <p>
              Join a growing property and hospitality brand creating better ways
              to discover properties, accommodation and investment opportunities
              across Kenya.
            </p>

            <a href="#career-opportunities" className="careers-primary-btn">
              Explore Opportunities
            </a>
          </div>
        </section>

        <section className="careers-intro">
          <span>WHY ÉLAN HOMES?</span>
          <h2>More Than a Career. A Place to Grow.</h2>
          <p>
            At ÉLAN HOMES, we believe great experiences begin with great people.
            We are building a platform that brings together property,
            hospitality and customer experience.
          </p>
          <p>
            We welcome passionate, creative and responsible individuals who want
            to contribute to our growth and help shape the future of real estate
            and accommodation services in Kenya.
          </p>
        </section>

        <section className="careers-opportunities" id="career-opportunities">
          <div className="careers-section-heading">
            <span>CAREER PATHS</span>
            <h2>Explore Opportunities</h2>
            <p>
              These are areas where we welcome interest from talented
              individuals.
            </p>
          </div>

          <div className="careers-grid">
            {opportunities.map((opportunity) => (
              <article className="career-card" key={opportunity.title}>
                <span className="career-category">{opportunity.type}</span>

                <h3>{opportunity.title}</h3>

                <p>{opportunity.description}</p>

                <a href="#careers-contact">
                  Express Your Interest <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="careers-values">
          <div className="careers-section-heading">
            <span>WHAT WE VALUE</span>
            <h2>People Who Make a Difference</h2>
          </div>

          <div className="careers-values-grid">
            <div>
              <h3>Integrity</h3>
              <p>We value honesty, responsibility and professionalism.</p>
            </div>

            <div>
              <h3>Innovation</h3>
              <p>
                We welcome fresh ideas and creative approaches to solving
                challenges.
              </p>
            </div>

            <div>
              <h3>Customer Focus</h3>
              <p>
                We put people first and aim to deliver excellent experiences.
              </p>
            </div>

            <div>
              <h3>Teamwork</h3>
              <p>We believe collaboration and respect help everyone grow.</p>
            </div>
          </div>
        </section>

        <section className="careers-contact" id="careers-contact">
          <span>TAKE THE NEXT STEP</span>
          <h2>Interested in Joining ÉLAN HOMES?</h2>
          <p>
            Tell us about your skills, experience and the area in which you
            would like to contribute.
          </p>

          <Link to="/contact" className="careers-contact-btn">
            Contact Our Team
          </Link>
        </section>
      </main>
    </>
  );
}

export default Careers;
