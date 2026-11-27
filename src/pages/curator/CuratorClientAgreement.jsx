import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import "./CuratorClientAgreement.css";

const AGREEMENT_VERSION = "1.4";
const STORAGE_KEY = "elanCuratorClientAgreementAcceptance";

function getSavedAcceptance() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const parsed = JSON.parse(saved);

    if (parsed.agreementVersion !== AGREEMENT_VERSION) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function CuratorClientAgreement() {
  const [fullName, setFullName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [submission, setSubmission] = useState(getSavedAcceptance);

  const formattedDate = submission?.acceptedAt
    ? new Intl.DateTimeFormat("en-KE", {
        dateStyle: "long",
        timeStyle: "medium",
        timeZone: "Africa/Nairobi",
      }).format(new Date(submission.acceptedAt))
    : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (fullName.trim().length < 3) {
      setError("Please enter your full legal name.");
      return;
    }

    if (!accepted) {
      setError("Please confirm your acknowledgement before submitting.");
      return;
    }

    const acknowledgement = {
      fullName: fullName.trim(),
      acceptedAt: new Date().toISOString(),
      agreementVersion: AGREEMENT_VERSION,
      agreement: "ELAN HOMES Curator–Client Agreement",
      acknowledgementType: "Draft Agreement Acknowledgement",
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acknowledgement));

      setSubmission(acknowledgement);
      setFullName("");
      setAccepted(false);
    } catch {
      setError("Your acknowledgement could not be saved. Please try again.");
    }
  };

  return (
    <main className="curator-client-agreement-page">
      <SEO
        title="Curator–Client Agreement | ÉLAN HOMES"
        description="Read the ÉLAN HOMES agreement covering land, properties and short-stay accommodation."
        noindex={true}
      />

      <header className="curator-client-agreement-hero">
        <span>ÉLAN HOMES</span>
        <h1>Curator–Client Agreement</h1>
        <p>
          Transparent property transactions, accommodation bookings and
          professional service.
        </p>
      </header>

      <div className="curator-client-agreement-container">
        <div className="curator-client-agreement-notice">
          <strong>DRAFT AGREEMENT – FOR LEGAL REVIEW</strong>
          <p>
            This proposed agreement requires review and approval by a qualified
            Kenyan legal professional before being used as a final binding
            agreement.
          </p>
        </div>

        <section className="client-agreement-introduction">
          <h2>Introduction</h2>
          <p>
            This agreement establishes the general rights and responsibilities
            of clients and curators using ÉLAN HOMES for land listings, property
            sales and short-stay accommodation.
          </p>
          <p>
            It promotes honest communication, accurate information, transparent
            pricing, responsible transactions and fair treatment.
          </p>
          <p>
            ÉLAN HOMES is the central communication channel between clients and
            curators for all platform-related enquiries, viewings, transactions
            and accommodation bookings.
          </p>
          <p>
            The specific terms of every enquiry, viewing, property transaction
            or accommodation booking must be communicated to the client before
            they make a commitment.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">01</span>
          <h2>Parties to the Agreement</h2>
          <p>The parties involved are:</p>
          <ul>
            <li>
              <strong>Client:</strong> A person enquiring about, viewing,
              purchasing or booking a listing through ÉLAN HOMES.
            </li>
            <li>
              <strong>Curator:</strong> An approved representative responsible
              for managing or coordinating the relevant listing, enquiry or
              booking.
            </li>
            <li>
              <strong>ÉLAN HOMES:</strong> The platform facilitating the
              discovery and coordination of land, property and accommodation
              opportunities and managing client-facing communication.
            </li>
            <li>
              <strong>Owner or authorised provider:</strong> The person or
              organisation legally entitled or authorised to offer the land,
              property or accommodation.
            </li>
          </ul>
          <p>
            The role and identity of the owner, seller, landlord, host or
            authorised representative should be disclosed where relevant.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">02</span>
          <h2>ÉLAN HOMES Service Categories</h2>

          <div className="client-agreement-category">
            <h3>Land</h3>
            <p>
              Land listings, land enquiries, site visits, location information,
              purchase discussions and transaction coordination.
            </p>
          </div>

          <div className="client-agreement-category">
            <h3>Properties</h3>
            <p>
              Houses, apartments, villas and other real estate offered for sale,
              including enquiries, property viewings, offers and transaction
              coordination.
            </p>
          </div>

          <div className="client-agreement-category">
            <h3>Stays</h3>
            <p>
              Short-stay accommodation, holiday homes, villas, apartments, guest
              houses and other approved temporary accommodation, including
              reservations and guest services.
            </p>
          </div>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">03</span>
          <h2>Enquiries, Viewings and Booking Requests</h2>
          <p>
            ÉLAN HOMES shall serve as the central communication channel between
            clients and curators for all enquiries, viewings, property
            transactions and accommodation bookings initiated through the
            platform.
          </p>
          <ul>
            <li>
              Clients shall submit enquiries and requests directly to ÉLAN HOMES
              through the approved communication channels.
            </li>
            <li>
              ÉLAN HOMES shall communicate with clients and coordinate with the
              relevant curator to obtain accurate information and updates.
            </li>
            <li>
              Curators shall provide requested listing information,
              availability, prices, viewing schedules and other relevant updates
              to the ÉLAN HOMES team.
            </li>
            <li>
              ÉLAN HOMES shall coordinate client-facing communication relating
              to viewings, offers, booking requests, confirmations, changes and
              complaints.
            </li>
            <li>
              Curators shall not independently contact clients or communicate
              directly with them about platform enquiries, negotiations,
              bookings or transactions unless ÉLAN HOMES has authorised this in
              writing.
            </li>
            <li>
              An enquiry, viewing request or accommodation request does not
              automatically constitute a completed transaction or confirmed
              reservation.
            </li>
            <li>
              Any required deposit, viewing charge or booking payment must be
              disclosed to the client through ÉLAN HOMES before payment.
            </li>
          </ul>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">04</span>
          <h2>Accuracy of Listings and Information</h2>
          <p>
            Curators must take reasonable steps to ensure that information
            supplied to ÉLAN HOMES and ultimately communicated to clients is
            accurate and not misleading.
          </p>
          <ul>
            <li>Correct location and description.</li>
            <li>Accurate photographs and property features.</li>
            <li>Correct asking prices or accommodation rates.</li>
            <li>Availability and occupancy information.</li>
            <li>Relevant ownership or authority information.</li>
            <li>Known restrictions, charges and material conditions.</li>
          </ul>
          <p>
            Material changes to a listing should be communicated promptly to
            ÉLAN HOMES. Curators must not knowingly advertise unavailable
            properties, fictitious land or accommodation that they are not
            authorised to represent.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">05</span>
          <h2>Land Transactions</h2>
          <p>
            For land listings and enquiries, the curator must provide
            information reasonably available to them to ÉLAN HOMES and avoid
            making unsupported claims about ownership, boundaries, acreage,
            access, zoning or permitted use.
          </p>
          <p>Before purchasing land, the client should:</p>
          <ul>
            <li>
              Conduct an official land search through the appropriate government
              channels.
            </li>
            <li>
              Engage a qualified Kenyan advocate to review ownership and
              transaction documents.
            </li>
            <li>
              Arrange a survey or boundary verification where appropriate.
            </li>
            <li>
              Confirm access roads, easements, restrictions and relevant
              planning or land-use requirements.
            </li>
            <li>
              Verify applicable rates, rents, charges and outstanding
              obligations.
            </li>
            <li>
              Ensure the sale agreement and payment arrangements are properly
              documented.
            </li>
          </ul>
          <p>
            A listing on ÉLAN HOMES is not a guarantee of title, ownership,
            suitability or freedom from disputes. The client should obtain
            independent professional verification before paying a purchase
            deposit or completing a transaction.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">06</span>
          <h2>Property Sales</h2>
          <p>
            This category covers residential and other properties offered for
            sale, including houses, apartments and villas.
          </p>
          <p>The curator should:</p>
          <ul>
            <li>
              Provide accurate descriptions and available property details to
              ÉLAN HOMES.
            </li>
            <li>
              Provide information needed by ÉLAN HOMES to arrange viewings with
              the owner or authorised representative.
            </li>
            <li>
              Supply the asking price and known additional costs to ÉLAN HOMES.
            </li>
            <li>
              Avoid making unsupported claims about ownership, construction
              quality or legal status.
            </li>
          </ul>
          <p>The client should:</p>
          <ul>
            <li>Inspect the property before committing to purchase.</li>
            <li>Verify ownership and relevant property documents.</li>
            <li>
              Obtain independent legal and technical advice where appropriate.
            </li>
            <li>
              Review the sale agreement and payment conditions before signing.
            </li>
          </ul>
          <p>
            Any sale deposit, reservation payment, refund condition or
            transaction fee must be documented and disclosed before payment. The
            parties should use appropriately documented payment channels.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">07</span>
          <h2>Short-Stay Accommodation</h2>
          <p>
            This category covers approved short-stay accommodation listed
            through ÉLAN HOMES.
          </p>
          <p>
            The curator must provide ÉLAN HOMES with accurate information about
            availability, dates, permitted occupancy, property facilities and
            applicable charges before a reservation is confirmed.
          </p>
          <p>The client must receive:</p>
          <ul>
            <li>Accommodation name and location.</li>
            <li>Check-in and check-out dates and times.</li>
            <li>Permitted number of guests.</li>
            <li>Total booking price and payment conditions.</li>
            <li>House rules and applicable restrictions.</li>
            <li>Cancellation and refund policy.</li>
            <li>Contact and check-in instructions.</li>
          </ul>
          <p>
            ÉLAN HOMES shall communicate booking information and confirmation to
            the client. A reservation is confirmed only when the stated
            confirmation and payment requirements have been satisfied.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">08</span>
          <h2>Payments, Fees and Receipts</h2>
          <ul>
            <li>
              The client must be informed of the amount payable and the
              recipient before making payment.
            </li>
            <li>
              Payment instructions should identify the authorised recipient and
              payment method.
            </li>
            <li>
              The client should retain receipts and payment confirmations.
            </li>
            <li>
              No undisclosed fees should be imposed after a transaction or
              booking has been confirmed.
            </li>
            <li>
              Any additional charge must be explained and agreed upon before it
              is incurred, except where the law provides otherwise.
            </li>
          </ul>
          <p>
            The 10% short-stay booking commission is governed by the separate
            Curator–ÉLAN HOMES Agreement. It is not automatically an additional
            charge to the client.
          </p>
          <p>
            Land and property sale commissions, agency fees and other
            transaction charges must be covered by separate written terms and
            disclosed to the client where applicable.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">09</span>
          <h2>Cancellation, Changes and Refunds</h2>
          <p>
            The applicable cancellation, change and refund conditions must be
            disclosed before the client makes a payment or commitment.
          </p>
          <ul>
            <li>
              Stay cancellations must follow the booking-specific policy
              communicated to the client by ÉLAN HOMES.
            </li>
            <li>
              Changes to land or property viewing arrangements should be
              communicated to ÉLAN HOMES as early as reasonably possible.
            </li>
            <li>
              Any refund relating to a property or land transaction must follow
              the signed transaction documents and applicable law.
            </li>
            <li>
              Where a curator or accommodation provider cannot honour a
              confirmed stay booking, the client should be informed promptly
              through ÉLAN HOMES and offered the remedies available under the
              booking terms and applicable law.
            </li>
            <li>
              Refunds should be processed within the agreed or legally required
              period.
            </li>
          </ul>
          <p>
            No cancellation policy may remove statutory rights that cannot
            lawfully be excluded.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">10</span>
          <h2>Client Responsibilities</h2>
          <p>The client agrees to:</p>
          <ul>
            <li>Provide accurate contact and transaction information.</li>
            <li>
              Submit enquiries, requests, offers and booking instructions
              through ÉLAN HOMES.
            </li>
            <li>
              Use ÉLAN HOMES as the official communication channel for matters
              relating to listings, viewings, negotiations, bookings and
              transactions arranged through the platform.
            </li>
            <li>Attend scheduled viewings or notify ÉLAN HOMES of changes.</li>
            <li>
              Conduct appropriate independent checks before property or land
              purchases.
            </li>
            <li>
              Make payments only through the agreed and authorised channels.
            </li>
            <li>
              Respect accommodation rules and occupancy limits when using stays.
            </li>
            <li>
              Communicate honestly and treat curators, owners and staff
              respectfully.
            </li>
            <li>
              Report material concerns or suspected fraud promptly to ÉLAN
              HOMES.
            </li>
          </ul>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">11</span>
          <h2>Curator Responsibilities</h2>
          <p>The curator agrees to:</p>
          <ul>
            <li>Act honestly, professionally and in good faith.</li>
            <li>Provide accurate and current listing information.</li>
            <li>Respect client privacy and confidentiality.</li>
            <li>
              Disclose known material facts and relevant charges to ÉLAN HOMES.
            </li>
            <li>
              Avoid false promises about ownership, returns, availability or
              property condition.
            </li>
            <li>
              Provide timely information to ÉLAN HOMES to support the
              coordination of viewings, enquiries and bookings.
            </li>
            <li>
              Direct all client-facing communication through ÉLAN HOMES and
              respond promptly to requests from the ÉLAN HOMES team.
            </li>
            <li>
              Not independently negotiate with, solicit, or make private
              arrangements with clients introduced through ÉLAN HOMES without
              written authorisation from ÉLAN HOMES.
            </li>
            <li>
              Communicate complaints, cancellations and material changes
              promptly to ÉLAN HOMES.
            </li>
            <li>Avoid discriminatory, abusive or deceptive conduct.</li>
          </ul>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">12</span>
          <h2>Damage, Loss and Liability</h2>
          <p>
            Each party is responsible for its own negligent, intentional or
            unlawful conduct, subject to applicable law.
          </p>
          <ul>
            <li>
              A client may be responsible for proven damage caused by their
              negligence or intentional actions during a stay.
            </li>
            <li>
              Ordinary wear and tear should not be treated as client-caused
              damage.
            </li>
            <li>Damage claims should be supported by reasonable evidence.</li>
            <li>
              Curators must not knowingly misrepresent material facts about
              land, properties or accommodation.
            </li>
            <li>
              Parties should promptly report safety risks, fraud or suspected
              unlawful activity to ÉLAN HOMES.
            </li>
          </ul>
          <p>
            Nothing in this agreement excludes liability where such exclusion
            would be unlawful.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">13</span>
          <h2>Role and Responsibilities of ÉLAN HOMES</h2>
          <p>
            ÉLAN HOMES provides a platform for discovering and coordinating
            land, property and accommodation opportunities.
          </p>
          <p>
            ÉLAN HOMES shall be the central communication and coordination point
            between clients and curators for services and opportunities
            originating through the platform.
          </p>
          <p>Its communication responsibilities include:</p>
          <ul>
            <li>Receiving and managing client enquiries.</li>
            <li>
              Communicating client requests and questions to relevant curators.
            </li>
            <li>
              Obtaining listing information, prices and availability from
              curators.
            </li>
            <li>Coordinating viewing arrangements and booking requests.</li>
            <li>Relaying offers, updates, changes and relevant information.</li>
            <li>
              Managing client-facing complaints and communication updates.
            </li>
          </ul>
          <p>
            Curators shall communicate with the ÉLAN HOMES team regarding
            platform-related clients and services. Direct curator-to-client
            communication is not permitted unless ÉLAN HOMES gives prior written
            authorisation.
          </p>
          <p>
            The precise role of ÉLAN HOMES in a transaction, including whether
            it acts as an intermediary, booking agent or payment facilitator,
            must be disclosed in the applicable service and booking terms.
          </p>
          <p>
            ÉLAN HOMES may establish listing standards, review reported
            concerns, suspend misleading listings and take appropriate action
            against accounts that breach platform rules.
          </p>
          <p>
            Nothing in this agreement removes any legal responsibility that ÉLAN
            HOMES may have under applicable law.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">14</span>
          <h2>Privacy and Personal Information</h2>
          <p>
            Personal information should only be collected and used for
            legitimate purposes connected to the relevant enquiry, transaction,
            booking or service.
          </p>
          <ul>
            <li>Information must be handled responsibly and confidentially.</li>
            <li>
              Personal details should not be disclosed to unauthorised persons.
            </li>
            <li>
              Information should be retained and protected in accordance with
              applicable law.
            </li>
            <li>
              Clients may exercise their applicable data protection rights.
            </li>
          </ul>
          <p>
            The parties must comply with the Kenya Data Protection Act, 2019 and
            applicable regulations.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">15</span>
          <h2>Complaints and Dispute Resolution</h2>
          <p>
            Clients should submit complaints, concerns and service-related
            disputes to ÉLAN HOMES through its official communication channels.
          </p>
          <p>
            ÉLAN HOMES shall coordinate communication with the relevant curator
            or service provider, request relevant information and communicate
            appropriate updates to the client.
          </p>
          <p>
            Curators must promptly provide ÉLAN HOMES with accurate information
            and reasonable cooperation when a complaint or dispute is being
            reviewed.
          </p>
          <p>
            If a dispute cannot be resolved through the platform's process, the
            parties may consider mediation or another lawful dispute resolution
            process.
          </p>
          <p>
            Either party may seek assistance from a competent Kenyan court or
            regulator where appropriate.
          </p>
        </section>

        <section className="client-agreement-section">
          <span className="client-agreement-number">16</span>
          <h2>Applicable Law and Agreement Changes</h2>
          <p>
            This agreement is intended to operate under the laws of Kenya.
            Changes to its terms should be communicated before they apply to new
            transactions or bookings.
          </p>
          <p>
            Changes should not unfairly alter an existing confirmed booking or
            signed transaction without the affected party's agreement, except
            where required by law.
          </p>
        </section>

        <section className="client-agreement-booking-summary">
          <h2>Transaction-Specific Details</h2>
          <p>
            The relevant details should be recorded separately for each
            transaction or booking.
          </p>

          <h3>For Land</h3>
          <ul>
            <li>Land reference and location.</li>
            <li>Size, boundaries and asking price.</li>
            <li>Owner or authorised seller details.</li>
            <li>Viewing arrangements and relevant charges.</li>
            <li>Sale terms and payment arrangements.</li>
          </ul>

          <h3>For Properties</h3>
          <ul>
            <li>Property address and description.</li>
            <li>Asking price and material property details.</li>
            <li>Owner or authorised seller details.</li>
            <li>Viewing arrangements.</li>
            <li>Sale terms and payment arrangements.</li>
          </ul>

          <h3>For Stays</h3>
          <ul>
            <li>Accommodation name and location.</li>
            <li>Check-in and check-out dates.</li>
            <li>Number of guests.</li>
            <li>Total booking price and payment schedule.</li>
            <li>Cancellation and refund policy.</li>
            <li>House rules and additional charges.</li>
          </ul>
        </section>

        <section className="client-agreement-final-disclaimer">
          <h2>IMPORTANT DISCLAIMER – LAND AND PROPERTY TRANSACTIONS</h2>

          <p>
            ÉLAN HOMES operates as a property and accommodation platform. For
            land and property sale transactions, ÉLAN HOMES shall not
            automatically be considered a buyer, seller, estate agent,
            transaction representative, legal adviser or party to the
            transaction.
          </p>

          <p>
            Any land or property transaction is primarily between the relevant
            buyer and seller, together with their appointed representatives.
            ÉLAN HOMES shall not be responsible for negotiating, verifying
            ownership, conducting due diligence, preparing legal documents,
            receiving purchase funds or completing the transaction unless its
            involvement has been specifically requested by either party and
            accepted by ÉLAN HOMES in writing.
          </p>

          <p>
            Where ÉLAN HOMES agrees to participate, the scope of its role,
            responsibilities, fees and any applicable liability shall be
            separately agreed in writing by the relevant parties before ÉLAN
            HOMES undertakes that role.
          </p>

          <p>
            Neither party should assume that ÉLAN HOMES has verified, approved,
            guaranteed or endorsed a land or property transaction merely because
            the property or land is advertised on the platform. Buyers and
            sellers are encouraged to conduct independent legal and professional
            due diligence before entering into a transaction.
          </p>

          <p>
            This disclaimer does not remove any obligations or legal
            responsibilities that ÉLAN HOMES may have under applicable Kenyan
            law or under a separate written agreement that it expressly accepts.
          </p>
        </section>

        <section className="curator-client-acceptance">
          <h2>Draft Agreement Acknowledgement</h2>

          <p>
            Please enter your full legal name and submit your acknowledgement to
            confirm that you have reviewed and understood the preliminary terms
            of this ÉLAN HOMES Curator–Client Agreement.
          </p>

          <p>
            Your acknowledgement date, time and agreement version will be
            recorded. This acknowledgement relates to the current draft and does
            not constitute acceptance of a final binding agreement.
          </p>

          {submission ? (
            <div className="client-acceptance-success">
              <h3>Acknowledgement Successfully Recorded</h3>

              <p>
                <strong>Full legal name:</strong> {submission.fullName}
              </p>

              <p>
                <strong>Date and time:</strong> {formattedDate} (EAT)
              </p>

              <p>
                <strong>Agreement version:</strong>{" "}
                {submission.agreementVersion}
              </p>

              <p>
                <strong>Record type:</strong>{" "}
                {submission.acknowledgementType ||
                  "Draft Agreement Acknowledgement"}
              </p>

              <p>
                Your acknowledgement has been saved in this browser. It has not
                yet been submitted to the ÉLAN HOMES server.
              </p>
            </div>
          ) : (
            <form className="client-acceptance-form" onSubmit={handleSubmit}>
              <label htmlFor="client-signature-name">Full Legal Name</label>

              <input
                id="client-signature-name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full legal name"
                autoComplete="name"
                required
              />

              <label className="client-acceptance-checkbox">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                />

                <span>
                  I confirm that I have read and understood the preliminary
                  terms of this ÉLAN HOMES Curator–Client Agreement. I
                  acknowledge this draft for review purposes, subject to
                  approval of the final agreement and applicable
                  transaction-specific terms.
                </span>
              </label>

              {error && (
                <p className="client-acceptance-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="client-acceptance-submit">
                SUBMIT ACKNOWLEDGEMENT
              </button>
            </form>
          )}
        </section>

        <div className="client-agreement-footer">
          <Link to="/">RETURN TO ÉLAN HOMES</Link>
        </div>
      </div>
    </main>
  );
}

export default CuratorClientAgreement;
