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
              ÉLAN HOMES website and its property, land and accommodation
              services. By accessing or using our website, you agree to comply
              with these terms.
            </p>
          </div>

          <article className="terms-section">
            <h3>1. About ÉLAN HOMES</h3>
            <p>
              ÉLAN HOMES provides an online marketplace through which users can
              discover properties and land for sale, as well as accommodation
              options for short stays.
            </p>
            <p>
              Property owners, landowners and authorised accommodation providers
              may submit listings for consideration, subject to our listing
              requirements and approval process.
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
              <li>
                Not use the platform to distribute harmful content or engage in
                unlawful activities.
              </li>
            </ul>
          </article>

          <article className="terms-section">
            <h3>3. Property and Land Listings</h3>
            <p>
              ÉLAN HOMES provides information about properties and land that may
              be available for sale. Listings may include descriptions,
              photographs, locations, features, sizes and indicative prices.
            </p>
            <p>
              Submitting a property or land listing is free of charge. However,
              every submission is subject to review and approval before it can
              appear publicly on the platform.
            </p>
            <p>
              Users should independently verify ownership, title documents,
              approvals, boundaries, property condition, pricing and all other
              important details before entering into a transaction.
            </p>
            <p>
              ÉLAN HOMES does not replace independent legal, valuation or
              property verification services.
            </p>
          </article>

          <article className="terms-section">
            <h3>4. Accommodation and Short Stays</h3>
            <p>
              Accommodation listings provide information about available
              short-stay options, including bed and breakfast accommodation and
              other holiday stays.
            </p>
            <p>
              Availability, rates, facilities, house rules, check-in
              arrangements and other booking conditions must be confirmed before
              a reservation is finalised.
            </p>
            <p>
              Submitting a booking request does not automatically confirm a
              reservation. A booking becomes confirmed only after the required
              confirmation process has been completed.
            </p>
            <p>
              Guests must comply with the accommodation provider's applicable
              house rules and booking conditions.
            </p>
          </article>

          <article className="terms-section">
            <h3>5. Accuracy of Information</h3>
            <p>
              We aim to present useful and accurate listing information.
              However, property details, prices, photographs, facilities and
              availability may change or require verification.
            </p>
            <p>
              ÉLAN HOMES does not guarantee that every listing detail will
              always be complete, current or error-free.
            </p>
            <p>
              We encourage users to request clarification and verify important
              information before making financial or contractual commitments.
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
              You must not share your password, one-time verification codes or
              other account security information with another person.
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
              ÉLAN HOMES may coordinate communication between customers and
              property owners, landowners or accommodation providers. Submitting
              an enquiry does not guarantee that a transaction will proceed.
            </p>
            <p>
              Any sale, lease, reservation or other transaction remains subject
              to the necessary verification, agreements and applicable legal
              requirements.
            </p>
          </article>

          <article className="terms-section">
            <h3>8. Payments and Financial Information</h3>
            <p>
              Payments for services offered through ÉLAN HOMES must be made
              using the authorised payment instructions and channels provided
              for the relevant transaction.
            </p>
            <p>
              Applicable charges, payment requirements and conditions will be
              communicated before a payment is requested.
            </p>
            <p>
              For property and land viewing requests, a viewing or connection
              fee may apply. Where applicable, the amount and conditions will be
              disclosed before the customer proceeds with payment.
            </p>
            <p>
              Viewing and connection fees are non-refundable once the viewing
              request has been submitted and processed, subject to applicable
              exceptions where ÉLAN HOMES cancels the arrangement or cannot
              provide the promised service.
            </p>
            <p>
              Property and land purchase payments are ordinarily arranged
              between the buyer and seller through their agreed legal and
              payment arrangements. ÉLAN HOMES may facilitate a purchase payment
              where specifically requested by the buyer and agreed to by the
              seller, subject to applicable legal and regulatory requirements.
            </p>
            <p>
              ÉLAN HOMES will never ask users to disclose their M-Pesa PIN,
              banking password, card PIN or one-time security codes.
            </p>
          </article>

          <article className="terms-section">
            <h3>9. Optional Listing Promotion</h3>
            <p>
              Property and land owners may have the option to pay for
              promotional placement of eligible listings.
            </p>
            <p>
              Promotional services are optional and do not replace the standard
              listing submission and approval process. Only approved and
              eligible listings may be promoted.
            </p>
            <p>
              Applicable promotional prices, durations and conditions will be
              displayed before payment.
            </p>
            <p>
              A promotion becomes active only after the required payment has
              been successfully confirmed. Promotional placement does not
              guarantee a sale, enquiry, viewing or transaction.
            </p>
            <p>
              Promoted listings may be labelled as Featured or Sponsored.
              Promotion does not constitute independent verification of
              ownership, property condition or listing accuracy.
            </p>
          </article>

          <article className="terms-section">
            <h3>10. Viewing Requests and Appointments</h3>
            <p>
              Customers may request property or land viewings through the
              platform. A submitted request is subject to availability,
              confirmation and any applicable viewing fee.
            </p>
            <p>
              Submitting a viewing request does not automatically confirm an
              appointment. ÉLAN HOMES will communicate the relevant arrangements
              after the request has been processed.
            </p>
            <p>
              Customers should attend confirmed appointments at the agreed time
              and comply with any reasonable viewing instructions.
            </p>
          </article>

          <article className="terms-section">
            <h3>11. Intellectual Property</h3>
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
            <p>
              By submitting listing materials, you confirm that you have the
              necessary rights or permission to provide them for publication and
              platform use.
            </p>
          </article>

          <article className="terms-section">
            <h3>12. Third-Party Services</h3>
            <p>
              Our website may contain links to third-party websites or services.
              We are not responsible for the content, availability, policies or
              practices of external services.
            </p>
            <p>
              Users who access third-party services do so subject to the
              relevant third party's terms and conditions.
            </p>
          </article>

          <article className="terms-section">
            <h3>13. Limitation of Liability</h3>
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
            <h3>14. Suspension or Restriction of Access</h3>
            <p>
              We may restrict access to the website, suspend accounts or remove
              listings where necessary to protect the platform, address misuse,
              investigate suspected fraudulent activity or comply with legal
              obligations.
            </p>
            <p>
              Listings may also be withheld or removed where information is
              misleading, unauthorised, inaccurate or inconsistent with our
              listing requirements.
            </p>
          </article>

          <article className="terms-section">
            <h3>15. Changes, Applicable Law and Contact</h3>
            <p>
              We may revise these Terms and Conditions as our services develop
              or legal requirements change. Updated terms will be published on
              this page.
            </p>
            <p>
              Continued use of the website after changes take effect will be
              subject to the updated terms, to the extent permitted by law.
            </p>
            <p>
              These terms are intended to operate in accordance with the laws of
              Kenya, subject to applicable consumer protection and other legal
              requirements.
            </p>
            <p>
              If you have questions about these Terms and Conditions, please
              contact us through our Contact page.
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
