import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | ÉLAN HOMES"
        description="Learn how ÉLAN HOMES handles personal information submitted through its property, accommodation and enquiry services."
      />

      <main className="privacy-policy-page">
        <section className="privacy-policy-hero">
          <span>YOUR PRIVACY MATTERS</span>
          <h1>Privacy Policy</h1>
          <p>
            We respect your privacy and are committed to handling your personal
            information responsibly when you use ÉLAN HOMES.
          </p>
        </section>

        <section className="privacy-policy-content">
          <div className="privacy-policy-intro">
            <h2>About this policy</h2>
            <p>
              This Privacy Policy explains how ÉLAN HOMES may collect, use,
              store and share personal information when you visit our website,
              create an account, submit a property listing or make an
              accommodation enquiry.
            </p>
            <p>
              We aim to handle personal information in accordance with
              applicable data protection laws, including Kenya's Data Protection
              Act, 2019.
            </p>
          </div>

          <article className="privacy-policy-section">
            <h3>1. Information We May Collect</h3>
            <p>
              Depending on how you use our website, information you provide may
              include:
            </p>
            <ul>
              <li>Name and contact details.</li>
              <li>Account registration information.</li>
              <li>Property or accommodation enquiry details.</li>
              <li>Booking preferences and requested dates.</li>
              <li>Property information submitted for listing consideration.</li>
              <li>Messages and other information you voluntarily provide.</li>
            </ul>
            <p>
              Technical information such as browser type, device information and
              website usage data may also be collected where applicable.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>2. How We Use Your Information</h3>
            <p>Information may be used to:</p>
            <ul>
              <li>Respond to property and accommodation enquiries.</li>
              <li>Support account registration and account management.</li>
              <li>Process property listing submissions.</li>
              <li>Communicate relevant booking information.</li>
              <li>Improve our website and customer experience.</li>
              <li>Protect the website and prevent misuse.</li>
              <li>Meet applicable legal and regulatory obligations.</li>
            </ul>
          </article>

          <article className="privacy-policy-section">
            <h3>3. Sharing of Information</h3>
            <p>
              We do not sell personal information to third parties. Information
              may be shared where necessary with a relevant property owner,
              accommodation provider or service provider to respond to your
              enquiry or deliver a requested service.
            </p>
            <p>
              Information may also be disclosed where required by law or through
              a lawful request from an authorised authority.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>4. Cookies and Local Storage</h3>
            <p>
              Our website may use browser storage technologies, including local
              storage, to support features such as saved listings and user
              preferences.
            </p>
            <p>
              Your browser settings may allow you to manage or clear stored
              website data. Clearing this data may affect certain website
              features.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>5. Data Security</h3>
            <p>
              We take reasonable steps to protect personal information against
              unauthorised access, loss, misuse or disclosure. However, no
              method of electronic transmission or storage can be guaranteed to
              be completely secure.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>6. Data Retention</h3>
            <p>
              Personal information may be retained for as long as necessary to
              fulfil the purpose for which it was collected, provide requested
              services, resolve disputes and meet applicable legal obligations.
            </p>
            <p>
              Information that is no longer required should be securely deleted
              or otherwise handled in accordance with applicable law.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>7. Your Data Protection Rights</h3>
            <p>Subject to applicable law, you may have the right to:</p>
            <ul>
              <li>Request access to your personal information.</li>
              <li>Request correction of inaccurate information.</li>
              <li>
                Request deletion of personal information where applicable.
              </li>
              <li>Object to certain forms of processing.</li>
              <li>Withdraw consent where processing relies on consent.</li>
              <li>
                Raise a complaint with the relevant data protection authority.
              </li>
            </ul>
          </article>

          <article className="privacy-policy-section">
            <h3>8. Third-Party Services and Websites</h3>
            <p>
              Our website may contain links to external websites or use
              third-party services. Those services may have their own privacy
              policies and data handling practices.
            </p>
            <p>
              We encourage you to review their privacy policies before providing
              personal information to them.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>9. Children's Privacy</h3>
            <p>
              Our website is not intended to encourage children to submit
              personal information independently. Where information relating to
              a child is required, appropriate parental or guardian involvement
              and applicable legal safeguards should be observed.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>10. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy as our services, website
              features or legal obligations change. The updated version will be
              published on this page.
            </p>
          </article>

          <article className="privacy-policy-section">
            <h3>11. Contact Us</h3>
            <p>
              For privacy-related questions or requests concerning your personal
              information, please contact us through our Contact page.
            </p>
            <Link to="/contact" className="privacy-policy-link">
              Contact ÉLAN HOMES
            </Link>
          </article>

          <div className="privacy-policy-note">
            This policy should be reviewed and finalised against the actual data
            collection, storage and service arrangements of ÉLAN HOMES before
            publication.
          </div>

          <div className="privacy-policy-actions">
            <Link to="/help-centre" className="privacy-policy-button">
              Help Centre
            </Link>

            <Link to="/terms-and-conditions" className="privacy-policy-back">
              Terms & Conditions
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default PrivacyPolicy;
