import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import "./CuratorAgreement.css";

const AGREEMENT_VERSION = "1.1";
const STORAGE_KEY = "elanCuratorAgreementAcceptance";

const agreementSections = [
  {
    number: "01",
    title: "Purpose of the Agreement",
    content: [
      "This Agreement sets out the terms under which the Curator may provide property, land and short-stay accommodation listing services through the ÉLAN HOMES platform.",
      "Both parties agree to act honestly, professionally, fairly and in good faith throughout their working relationship.",
      "The parties acknowledge that ÉLAN HOMES shall manage all client-facing communication relating to services and opportunities originating through its platform.",
    ],
  },
  {
    number: "02",
    title: "Responsibilities of ÉLAN HOMES",
    content: [
      "Provide the Curator with access to the platform and the tools authorised for their account.",
      "Review submitted applications and listings within a reasonable period, subject to the volume and completeness of submissions.",
      "Communicate relevant platform policies, applicable fees, commission arrangements and material changes.",
      "Handle customer enquiries and personal information responsibly and in accordance with applicable privacy laws.",
      "Manage all communication with clients, including enquiries, viewing arrangements, offers, booking requests, confirmations, changes and complaints.",
      "Obtain relevant listing details, availability, prices and updates from Curators and communicate appropriate information to clients.",
      "Provide reasonable notice of significant platform changes that materially affect the Curator's services, where practicable.",
      "Provide a channel through which the Curator can raise complaints, request clarification and resolve account-related issues.",
    ],
  },
  {
    number: "03",
    title: "Responsibilities of the Curator",
    content: [
      "Provide truthful, current and complete personal, business and contact information.",
      "Only submit listings that the Curator is authorised to market or manage.",
      "Ensure that listing descriptions, photographs, prices, availability, locations and property details are accurate and not misleading.",
      "Obtain the necessary permissions and comply with applicable laws and regulatory requirements relating to the services offered.",
      "Provide timely listing information, availability updates, prices, viewing schedules and other relevant details to the ÉLAN HOMES team.",
      "Respond promptly and professionally to requests from the ÉLAN HOMES team.",
      "Promptly notify ÉLAN HOMES of changes, disputes, complaints, safety concerns or circumstances affecting a listing.",
      "Respect customer privacy and use customer information only for legitimate purposes connected with the agreed services and authorised by ÉLAN HOMES.",
      "Direct all client-facing communication through ÉLAN HOMES and not independently contact, negotiate with or make private arrangements with clients introduced through the platform unless ÉLAN HOMES has given prior written authorisation.",
    ],
  },
  {
    number: "04",
    title: "Listing Verification and Approval",
    content: [
      "All listings are subject to review and approval by ÉLAN HOMES before being publicly displayed.",
      "ÉLAN HOMES may request supporting documents or additional information where reasonably necessary to verify a listing or the Curator's authority.",
      "The Curator must not knowingly submit false documents, misleading photographs, duplicate listings or information relating to a property they are not authorised to represent.",
      "ÉLAN HOMES may temporarily restrict a listing where there is a credible concern about accuracy, ownership, authority, safety or legal compliance. The Curator should be informed of the reason and given a reasonable opportunity to respond, where appropriate.",
    ],
  },
  {
    number: "05",
    title: "Fees, Commission and Payments",
    content: [
      "The applicable commission and payment arrangements are set out in Schedule A of this Agreement.",
      "ÉLAN HOMES shall not introduce undisclosed charges or make unauthorised deductions from the Curator's earnings.",
      "ÉLAN HOMES must provide a reasonable record of amounts received, commission charged, authorised deductions and payments due to the Curator.",
      "The Curator must provide accurate payout information and any documentation reasonably required for lawful payment processing.",
      "Any disputed payment should be reviewed promptly, with both parties given an opportunity to provide supporting information.",
    ],
  },
  {
    number: "06",
    title: "Property Sales and Land Transactions",
    content: [
      "The Curator is responsible for ensuring that they have appropriate authority to market the relevant property or land.",
      "ÉLAN HOMES does not become the owner or seller of a listed property merely by displaying it on the platform.",
      "The buyer and seller remain responsible for their own due diligence, legal documentation and completion arrangements, subject to any separate written arrangement lawfully accepted by ÉLAN HOMES.",
      "Communication between clients and Curators about listings, offers, negotiations and transaction updates must be coordinated through ÉLAN HOMES.",
      "The 10% short-stay booking commission in Schedule A does not automatically apply to property sales or land transactions.",
      "Any commission relating to property sales or land transactions must be covered by a separate written agreement accepted by the relevant parties before the transaction proceeds.",
    ],
  },
  {
    number: "07",
    title: "Short-Stay Accommodation and Bookings",
    content: [
      "The Curator must keep accommodation availability, pricing, facilities, house rules and check-in information accurate and provide updates to ÉLAN HOMES.",
      "Booking confirmations, customer payments, cancellations, refunds and Curator payouts must follow the applicable booking policy and this Agreement.",
      "The Curator must communicate material changes that could affect a confirmed booking to ÉLAN HOMES as soon as reasonably possible.",
      "ÉLAN HOMES shall manage client-facing booking communication, including booking enquiries, availability responses, booking requests, confirmations, payment updates and changes.",
      "ÉLAN HOMES shall communicate relevant customer requests and booking information to the Curator through the agreed platform process.",
      "The Curator must promptly provide the information and cooperation required by ÉLAN HOMES to manage bookings and resolve booking problems.",
    ],
  },
  {
    number: "08",
    title: "Customer Care and Professional Conduct",
    content: [
      "Both parties must treat customers and each other respectfully and without unlawful discrimination, harassment, intimidation or abusive conduct.",
      "ÉLAN HOMES shall be responsible for direct communication with clients introduced through the platform.",
      "The Curator must not independently respond to, solicit, negotiate with or make private arrangements with platform clients unless ÉLAN HOMES has given prior written authorisation.",
      "The Curator must provide accurate information and timely assistance to the ÉLAN HOMES team so that customer enquiries and concerns can be handled properly.",
      "The Curator must not misrepresent a listing, promise unavailable services or make commitments on behalf of ÉLAN HOMES without authority.",
      "ÉLAN HOMES must not knowingly publish misleading information about the Curator or their authorised listings.",
      "Complaints should be acknowledged and handled within a reasonable period, with appropriate evidence considered before a decision is made.",
    ],
  },
  {
    number: "09",
    title: "Privacy and Confidentiality",
    content: [
      "Both parties must comply with applicable Kenyan data protection and privacy requirements, including the Data Protection Act, 2019, where applicable.",
      "Personal information may only be collected, accessed, shared and used for legitimate purposes connected with the services and in accordance with applicable privacy notices and lawful instructions.",
      "Neither party may sell, misuse or unlawfully disclose confidential business information or customer information.",
      "The Curator shall not independently use client contact information obtained through ÉLAN HOMES to solicit clients, arrange private transactions or bypass the platform.",
      "Each party must take reasonable steps to protect information against unauthorised access, loss, misuse or disclosure.",
      "Where a data breach or suspected misuse occurs, the affected party must notify the other party promptly and cooperate in taking appropriate steps.",
    ],
  },
  {
    number: "10",
    title: "Suspension and Account Restrictions",
    content: [
      "ÉLAN HOMES may restrict or suspend access where there is a reasonable concern involving fraud, serious misconduct, misleading listings, customer safety, unlawful activity or a material breach of this Agreement.",
      "Where practicable, ÉLAN HOMES should explain the reason, identify any corrective action required and provide a reasonable opportunity for the Curator to respond.",
      "Immediate temporary restrictions may be necessary to protect customers, property, funds, personal information or legal compliance.",
      "The Curator may request a review of a suspension or restriction through the designated support channel.",
    ],
  },
  {
    number: "11",
    title: "Term and Termination",
    content: [
      "This Agreement begins when both parties have accepted the final version through an authorised process.",
      "Either party may terminate the relationship by giving reasonable written notice, subject to outstanding bookings, payments, customer obligations and applicable law.",
      "Either party may terminate immediately where there is a serious breach that cannot reasonably be remedied, fraud, unlawful conduct or a material risk to customer safety.",
      "Where a breach can be remedied, the affected party should ordinarily provide written notice and a reasonable opportunity to correct it.",
      "Termination does not remove obligations that arose before termination, including valid payment obligations, confidentiality, privacy and the handling of existing customer commitments.",
    ],
  },
  {
    number: "12",
    title: "Liability and Indemnity",
    content: [
      "Each party is responsible for its own acts, omissions, negligence, misconduct and breaches of this Agreement.",
      "The Curator is responsible for the accuracy of information and authority supplied by the Curator.",
      "ÉLAN HOMES is responsible for its own platform operations, representations and obligations under this Agreement.",
      "Neither party should be held responsible for losses caused solely by the other party's independent actions or unlawful conduct.",
      "Any indemnity or limitation of liability in the final agreement must be clearly stated, reasonable and consistent with applicable Kenyan law. Nothing in this Agreement excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    number: "13",
    title: "Dispute Resolution",
    content: [
      "The parties should first attempt to resolve disputes through good-faith discussion and written communication.",
      "The Curator may raise concerns, complaints or disputes with ÉLAN HOMES through the designated communication channel.",
      "If the matter remains unresolved, the parties may agree to use an independent mediator in Kenya.",
      "Where mediation does not resolve the dispute, either party may pursue remedies through a court or other competent forum in Kenya.",
      "Nothing in this Agreement prevents either party from seeking urgent legal relief where necessary.",
    ],
  },
  {
    number: "14",
    title: "Changes to this Agreement",
    content: [
      "Material changes must be communicated to the Curator in writing.",
      "Where a change materially affects the Curator's financial or contractual obligations, the Curator must be given an opportunity to review and accept the revised terms before they apply to new services.",
      "The final version should identify its version number and effective date.",
    ],
  },
  {
    number: "15",
    title: "Governing Law",
    content: [
      "This Agreement is governed by the laws of the Republic of Kenya.",
      "Any provision found unenforceable should be interpreted or adjusted to the extent permitted by law without invalidating the remaining provisions.",
    ],
  },
];

function getSavedAcceptance() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const parsed = JSON.parse(saved);

    if (
      parsed.agreementVersion !== AGREEMENT_VERSION ||
      parsed.agreement !== "ELAN HOMES Curator Agreement"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function CuratorAgreement() {
  const [fullName, setFullName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submission, setSubmission] = useState(getSavedAcceptance);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (fullName.trim().length < 3) {
      setError("Please enter your full legal name.");
      return;
    }

    if (!accepted) {
      setError("Please confirm that you have read and understood this draft.");
      return;
    }

    const acceptance = {
      fullName: fullName.trim(),
      acceptedAt: new Date().toISOString(),
      agreementVersion: AGREEMENT_VERSION,
      agreement: "ELAN HOMES Curator Agreement",
      acknowledgementType: "Draft acknowledgement",
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acceptance));
      setSubmission(acceptance);
    } catch {
      setError(
        "Your browser could not save this demonstration record. Please try again.",
      );
    }
  }

  const formattedDate = submission?.acceptedAt
    ? new Intl.DateTimeFormat("en-KE", {
        dateStyle: "long",
        timeStyle: "medium",
        timeZone: "Africa/Nairobi",
      }).format(new Date(submission.acceptedAt))
    : "";

  return (
    <main className="curator-agreement-page">
      <SEO
        title="Curator–ÉLAN HOMES Agreement | ÉLAN HOMES"
        description="Review the agreement governing the relationship between ÉLAN HOMES and its curators."
        noindex={true}
      />

      <section className="curator-agreement-hero">
        <span>ÉLAN HOMES PARTNER PORTAL</span>
        <h1>Curator–ÉLAN HOMES Agreement</h1>
        <p>
          A framework for a transparent, professional and mutually beneficial
          partnership.
        </p>
        <Link to="/curator">← Back to Dashboard</Link>
      </section>

      <section className="curator-agreement-container">
        <div className="curator-agreement-notice">
          <strong>DRAFT FOR REVIEW</strong>
          <p>
            This is a preliminary draft for discussion and legal review. It is
            not yet the final binding agreement. The electronic acknowledgement
            feature is currently a frontend demonstration. Its record is saved
            only in this browser and is not securely submitted to ÉLAN HOMES.
          </p>
        </div>

        <div className="curator-agreement-parties">
          <div>
            <span>PARTY ONE</span>
            <h3>ÉLAN HOMES</h3>
            <p>
              The platform operator, whose full registered legal name and
              business details will be inserted in the final version.
            </p>
          </div>

          <div>
            <span>PARTY TWO</span>
            <h3>The Curator</h3>
            <p>
              The individual or authorised business applying to provide listing
              and related services through ÉLAN HOMES.
            </p>
          </div>
        </div>

        <div className="curator-agreement-introduction">
          <h2>Our Partnership</h2>
          <p>
            This Agreement is intended to establish clear expectations, protect
            both parties and support fair dealings with customers. Neither party
            should use its position to impose undisclosed obligations or unfair
            financial terms on the other.
          </p>
        </div>

        <section className="curator-agreement-schedule">
          <h2>Our Communication Structure</h2>
          <p>
            ÉLAN HOMES is the central communication channel between clients and
            Curators. This structure applies to all Land, Properties and Stays
            services offered through the platform.
          </p>

          <h3>ÉLAN HOMES handles client communication</h3>
          <ul>
            <li>Receiving and responding to client enquiries.</li>
            <li>Communicating listing details and availability to clients.</li>
            <li>Coordinating viewings and property visits.</li>
            <li>Relaying offers and negotiation updates.</li>
            <li>Managing booking requests and confirmations.</li>
            <li>Communicating changes, cancellations and complaints.</li>
          </ul>

          <h3>Curators communicate with ÉLAN HOMES</h3>
          <ul>
            <li>Providing accurate listing information and photographs.</li>
            <li>Updating prices, availability and property details.</li>
            <li>Providing viewing schedules and access arrangements.</li>
            <li>Sharing booking information and accommodation updates.</li>
            <li>Responding to requests from the ÉLAN HOMES team.</li>
          </ul>

          <p>
            Curators must not independently contact, solicit, negotiate with or
            make private arrangements with clients introduced through ÉLAN HOMES
            unless ÉLAN HOMES has given prior written authorisation.
          </p>
        </section>

        <div className="curator-agreement-sections">
          {agreementSections.map((section) => (
            <article className="curator-agreement-section" key={section.number}>
              <span className="curator-agreement-number">{section.number}</span>

              <div>
                <h2>{section.title}</h2>
                {section.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="curator-agreement-schedule">
          <h2>Schedule A — Commercial Terms and Commission</h2>

          <h3>1. ÉLAN HOMES Commission</h3>
          <p>
            ÉLAN HOMES shall earn a proposed commission of 10% of the agreed
            accommodation booking amount for every successfully completed
            short-stay booking made through the ÉLAN HOMES platform, subject to
            approval in the final agreement.
          </p>

          <h3>2. When Commission Is Earned</h3>
          <p>
            Under the proposed arrangement, commission becomes payable only
            after the customer has completed the booking and the applicable
            accommodation service has been provided. A booking cancelled before
            completion does not qualify as a successful booking.
          </p>

          <h3>3. Commission Calculation</h3>
          <p>
            The proposed commission shall be calculated as 10% of the agreed
            accommodation booking amount, excluding separately identified
            refundable security deposits and optional charges that do not form
            part of the accommodation price.
          </p>

          <h3>4. Curator Earnings</h3>
          <p>
            Under the proposed arrangement, the Curator shall receive the
            remaining 90% of the applicable accommodation booking amount,
            subject to any other deductions expressly agreed in writing by both
            parties and disclosed before the booking is confirmed.
          </p>

          <h3>5. Payment Records</h3>
          <p>
            ÉLAN HOMES shall maintain reasonable records showing the booking
            amount, proposed 10% commission, authorised deductions and the
            amount payable to the Curator. The Curator may request clarification
            of any payment calculation.
          </p>

          <h3>6. Cancellations and Refunds</h3>
          <p>
            Where a booking is cancelled or refunded, commission treatment shall
            follow the applicable cancellation and refund policy. ÉLAN HOMES
            shall not retain commission on amounts refunded to the customer
            unless a separate lawful and clearly disclosed arrangement applies.
          </p>

          <h3>7. Scope of Commission</h3>
          <p>
            The proposed 10% commission applies only to successfully completed
            short-stay accommodation bookings made through ÉLAN HOMES. Property
            sales and land transactions are not covered by this proposed
            commission and require a separate written agreement.
          </p>

          <div className="curator-commission-example">
            <h3>Commission Examples</h3>

            <div className="curator-commission-table-wrap">
              <table className="curator-commission-table">
                <thead>
                  <tr>
                    <th>Booking Amount</th>
                    <th>ÉLAN HOMES (10%)</th>
                    <th>Curator (90%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>KSh 5,000</td>
                    <td>KSh 500</td>
                    <td>KSh 4,500</td>
                  </tr>
                  <tr>
                    <td>KSh 10,000</td>
                    <td>KSh 1,000</td>
                    <td>KSh 9,000</td>
                  </tr>
                  <tr>
                    <td>KSh 20,000</td>
                    <td>KSh 2,000</td>
                    <td>KSh 18,000</td>
                  </tr>
                  <tr>
                    <td>KSh 50,000</td>
                    <td>KSh 5,000</td>
                    <td>KSh 45,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="curator-agreement-signatures">
          <h2>Draft Acknowledgement</h2>

          <p>
            You may record your acknowledgement of this draft by entering your
            full legal name. The date and time will be recorded in this browser.
            This does not constitute acceptance of a final binding agreement.
          </p>

          {submission ? (
            <div className="curator-acceptance-success">
              <h3>Draft acknowledgement recorded</h3>

              <p>
                <strong>Electronic acknowledgement:</strong>{" "}
                {submission.fullName}
              </p>

              <p>
                <strong>Date and time:</strong> {formattedDate} (EAT)
              </p>

              <p>
                <strong>Agreement version:</strong>{" "}
                {submission.agreementVersion}
              </p>

              <p>
                <strong>Record type:</strong> Draft acknowledgement
              </p>

              <p>
                Your acknowledgement date and time will be recorded. This is a
                preliminary acknowledgement only and does not constitute
                acceptance of a final binding agreement.
              </p>
            </div>
          ) : (
            <form className="curator-acceptance-form" onSubmit={handleSubmit}>
              <label htmlFor="curator-signature-name">Full legal name</label>

              <input
                id="curator-signature-name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full legal name"
                autoComplete="name"
                required
              />

              <label className="curator-acceptance-checkbox">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                />

                <span>
                  I confirm that I have read and understood this draft,
                  including the communication structure and proposed 10%
                  commission on successfully completed short-stay bookings.
                </span>
              </label>

              {error && (
                <p className="curator-acceptance-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="curator-acceptance-submit">
                SUBMIT ACKNOWLEDGEMENT
              </button>
            </form>
          )}
        </section>

        <div className="curator-agreement-footer">
          <Link to="/curator">RETURN TO DASHBOARD</Link>
        </div>
      </section>
    </main>
  );
}

export default CuratorAgreement;
