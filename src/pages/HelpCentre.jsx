import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./HelpCentre.css";

const faqs = [
  {
    question: "How do I find a property for sale?",
    answer:
      "Visit the Properties page to explore available houses, apartments and villas. You can use the search and filters to narrow down your options.",
  },
  {
    question: "How do I find accommodation?",
    answer:
      "Visit the Stays page to explore available short-stay accommodation, including studios, apartments and holiday homes.",
  },
  {
    question: "How do I enquire about a property or stay?",
    answer:
      "Open the listing you are interested in and use its enquiry or booking option. Provide the requested details so the team can follow up.",
  },
  {
    question: "Does submitting a booking enquiry confirm my stay?",
    answer:
      "No. An enquiry is not a confirmed reservation. Your booking is confirmed only after availability, pricing and the applicable booking terms have been verified.",
  },
  {
    question: "Are displayed prices guaranteed?",
    answer:
      "Displayed prices are provided as a guide and should be confirmed with ÉLAN HOMES or the relevant property provider before making payment.",
  },
  {
    question: "Can I save properties and stays?",
    answer:
      "Where the save feature is available, use the save icon on a listing to add it to your saved listings for easier access later.",
  },
  {
    question: "How can I list my property on ÉLAN HOMES?",
    answer:
      "Visit the List Property page and submit your property details for consideration.",
  },
  {
    question: "What should I do if I experience a problem?",
    answer:
      "Visit our Contact page and provide a clear description of the issue so the team can assist.",
  },
];

function HelpCentre() {
  return (
    <>
      <SEO
        title="Help Centre | ÉLAN HOMES"
        description="Find answers to common questions about buying properties, finding accommodation and making booking enquiries with ÉLAN HOMES."
      />

      <main className="help-centre-page">
        <section className="help-hero">
          <div className="help-hero-content">
            <span className="help-eyebrow">ÉLAN HOMES SUPPORT</span>

            <h1>How can we help you?</h1>

            <p>
              Find answers to common questions about properties, stays, booking
              enquiries and using ÉLAN HOMES.
            </p>

            <div className="help-hero-buttons">
              <Link to="/properties" className="help-primary-btn">
                Explore Properties
              </Link>

              <Link to="/stays" className="help-secondary-btn">
                Explore Stays
              </Link>
            </div>
          </div>
        </section>

        <section className="help-faq-section">
          <div className="help-section-heading">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <h2>How can we assist you?</h2>
            <p>
              Browse the questions below to find useful information about using
              our platform.
            </p>
          </div>

          <div className="help-faq-list">
            {faqs.map((faq, index) => (
              <details className="help-faq-item" key={index}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="help-faq-icon">+</span>
                </summary>

                <div className="help-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="help-contact-section">
          <div>
            <span>NEED MORE ASSISTANCE?</span>
            <h2>We're here to help.</h2>
            <p>
              If you cannot find the information you need, get in touch through
              our contact page.
            </p>
          </div>

          <Link to="/contact" className="help-contact-btn">
            Contact ÉLAN HOMES
          </Link>
        </section>
      </main>
    </>
  );
}

export default HelpCentre;
