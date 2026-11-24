import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./TermsConditions.css";

function TermsConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions | ÉLAN HOMES"
        description="Read the terms and conditions governing access to and use of the ÉLAN HOMES property and accommodation marketplace."
      />

      <main className="terms-page">
        <section className="terms-hero">
          <span>ÉLAN HOMES</span>
          <h1>Terms & Conditions</h1>
          <p>
            Please read these terms carefully before using our website and
            services.
          </p>
        </section>

        <section className="terms-content">
          <div className="terms-intro">
            <h2>Welcome to ÉLAN HOMES</h2>
            <p>
              These Terms and Conditions govern your access to and use of the
              ÉLAN HOMES website and its property and accommodation services. By
              accessing or using our website, you agree to comply with these
              terms.
            </p>
          </div>

          <article className="terms-section">
            <h3>1. About ÉLAN HOMES</h3>
            <p>
              ÉLAN HOMES provides an online platform through which users can
              explore property listings for sale and accommodation options for
              short stays.
            </p>
            <p>
              The website may also allow property owners or authorised
              representatives to submit property information for consideration.
            </p>
          </article>

          <article className="terms-section">
            <h3>2. Website Use</h3>
            <p>When using our website, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information.</li>
              <li>Use the platform for lawful purposes.</li>
              <li>Respect the rights of other users and property owners.</li>
              <li>
                Not interfere with the operation or security of the website.
              </li>
              <li>
                Not submit misleading, fraudulent or unauthorised content.
              </li>
            </ul>
          </article>

          <article className="terms-section">
            <h3>3. Property Listings</h3>
            <p>
              Property listings are provided to help users discover properties
              that may be available for sale. Information may include
              descriptions, photographs, locations, features and indicative
              prices.
            </p>
            <p>
              Users should independently verify ownership, title, approvals,
              property condition, pricing and all other important details before
              entering into a property transaction.
            </p>
          </article>

          <article className="terms-section">
            <h3>4. Accommodation and Stays</h3>
            <p>
              Accommodation listings provide information about short-stay
              options. Availability, rates, facilities, house rules and other
              arrangements must be confirmed with the relevant provider before a
              reservation is finalised.
            </p>
            <p>
              Submitting a booking enquiry does not automatically confirm a
              reservation.
            </p>
          </article>

          <article className="terms-section">
            <h3>5. Accuracy of Information</h3>
            <p>
              We aim to present useful and accurate listing information.
              However, property details, prices, photographs and availability
              may change or require verification.
            </p>
            <p>
              ÉLAN HOMES does not guarantee that every listing detail will
              always be complete, current or error-free.
            </p>
          </article>

          <article className="terms-section">
            <h3>6. User Accounts</h3>
            <p>
              Where account registration is available, users are responsible for
              providing accurate registration information and keeping their
              login credentials confidential.
            </p>
            <p>
              You should notify us if you become aware of unauthorised access to
              your account.
            </p>
          </article>

          <article className="terms-section">
            <h3>7. Enquiries and Transactions</h3>
            <p>
              An enquiry submitted through ÉLAN HOMES is a request for further
              information or assistance. It is not, by itself, a binding
              property sale agreement or confirmed accommodation reservation.
            </p>
            <p>
              Any sale, lease, reservation or other transaction remains subject
              to separate verification, agreements and applicable legal
              requirements.
            </p>
          </article>

          <article className="terms-section">
            <h3>8. Payments and Financial Information</h3>
            <p>
              Users should only make payments after verifying the transaction
              details, recipient, amount and applicable conditions through an
              approved channel.
            </p>
            <p>
              ÉLAN HOMES will not ask users to disclose their M-Pesa PIN,
              banking password, card PIN or one-time security codes.
            </p>
          </article>

          <article className="terms-section">
            <h3>9. Intellectual Property</h3>
            <p>
              Website branding, original written content, design elements and
              other materials belonging to ÉLAN HOMES may not be copied,
              reproduced, distributed or commercially exploited without
              appropriate authorisation.
            </p>
            <p>
              Photographs and materials supplied by property owners or other
              third parties may remain the property of their respective owners.
            </p>
          </article>

          <article className="terms-section">
            <h3>10. Third-Party Services</h3>
            <p>
              Our website may link to third-party websites or services. We are
              not responsible for the content, availability, policies or
              practices of external services.
            </p>
          </article>

          <article className="terms-section">
            <h3>11. Limitation of Liability</h3>
            <p>
              To the extent permitted by applicable law, ÉLAN HOMES is not
              responsible for losses arising from inaccurate third-party listing
              information, changes in availability or transactions independently
              agreed between users and property providers.
            </p>
            <p>
              Nothing in these terms excludes or limits any liability or
              consumer right that cannot lawfully be excluded or limited under
              applicable law.
            </p>
          </article>

          <article className="terms-section">
            <h3>12. Suspension or Restriction of Access</h3>
            <p>
              We may restrict access to the website where necessary to protect
              the platform, address misuse, comply with legal obligations or
              investigate suspected fraudulent activity.
            </p>
          </article>

          <article className="terms-section">
            <h3>13. Changes to These Terms</h3>
            <p>
              We may revise these Terms and Conditions as our services develop
              or legal requirements change. Updated terms will be published on
              this page.
            </p>
            <p>
              Continued use of the website after changes take effect will be
              subject to the updated terms, to the extent permitted by law.
            </p>
          </article>

          <article className="terms-section">
            <h3>14. Applicable Law</h3>
            <p>
              These terms are intended to operate in accordance with the laws of
              Kenya, subject to applicable consumer protection and other legal
              requirements.
            </p>
          </article>

          <article className="terms-section">
            <h3>15. Contact ÉLAN HOMES</h3>
            <p>
              If you have questions about these Terms and Conditions, please
              reach out through our Contact page.
            </p>
            <Link to="/contact" className="terms-link">
              Contact Us
            </Link>
          </article>

          <div className="terms-actions">
            <Link to="/properties" className="terms-button">
              Explore Properties
            </Link>

            <Link to="/privacy-policy" className="terms-back">
              Privacy Policy
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default TermsConditions;
