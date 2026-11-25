import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./BookingPolicy.css";

function BookingPolicy() {
  return (
    <>
      <SEO
        title="Booking Policy | ÉLAN HOMES"
        description="Read the ÉLAN HOMES booking policy covering accommodation bookings, payments, cancellations, refunds, guest responsibilities, property viewings and land and property purchase assistance."
      />

      <main className="booking-policy-page">
        <section className="booking-policy-hero">
          <span>ÉLAN HOMES INFORMATION</span>
          <h1>Booking Policy</h1>
          <p>
            Clear booking conditions, payment procedures, cancellation
            arrangements and customer protections for everyone using ÉLAN HOMES.
          </p>
        </section>

        <section className="booking-policy-content">
          <div className="booking-policy-intro">
            <h2>Before making a booking</h2>
            <p>
              ÉLAN HOMES aims to provide a transparent and reliable experience
              for guests, property buyers, land buyers and accommodation
              providers. Please read this policy carefully before making a
              booking, paying an invoice or arranging a property or land
              viewing.
            </p>
          </div>

          <article className="booking-policy-section">
            <h3>1. Booking Enquiries and Reservations</h3>
            <p>
              Customers can submit enquiries and booking requests for
              accommodation displayed on ÉLAN HOMES.
            </p>
            <p>
              Submitting an enquiry does not automatically confirm a
              reservation. The requested dates, number of guests, price and
              availability must first be reviewed and confirmed.
            </p>
            <p>
              ÉLAN HOMES coordinates communication between customers and
              Curators or their authorised representatives. Customers should use
              the official ÉLAN HOMES communication channels for booking
              enquiries and assistance.
            </p>
            <p>
              A reservation becomes confirmed only after availability has been
              approved, the required payment has been verified and ÉLAN HOMES
              has issued booking confirmation.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>2. Availability Confirmation</h3>
            <p>
              All accommodation is subject to availability. A listing appearing
              on the website does not guarantee that the accommodation is
              available for the requested dates.
            </p>
            <p>
              ÉLAN HOMES coordinates with the relevant Curator or authorised
              accommodation representative to confirm availability before
              issuing a booking invoice.
            </p>
            <p>
              Customers should wait for official confirmation before making
              travel arrangements that depend on the reservation.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>3. Prices, Invoices and Charges</h3>
            <p>
              The invoice issued by ÉLAN HOMES will state the complete amount
              payable for the booking and include all applicable charges.
            </p>
            <p>
              The customer is required to pay exactly the amount stated on the
              invoice. No additional or undisclosed charges will be added after
              the invoice has been issued.
            </p>
            <p>
              Customers will not be required to pay more or less than the stated
              invoice amount unless the original booking is formally changed and
              a revised invoice is issued and accepted.
            </p>
            <p>
              Any applicable fees must be included and clearly explained before
              the customer makes payment.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>4. Payments and Booking Confirmation</h3>
            <p>
              Payments must be made using the official payment instructions
              provided by ÉLAN HOMES.
            </p>
            <p>
              Where an invoice is issued, the customer must use the invoice
              reference and pay the exact amount indicated. Booking payments are
              subject to verification before a reservation is confirmed.
            </p>
            <p>
              A payment instruction or customer-provided payment screenshot
              alone does not constitute confirmation. Confirmation follows
              verification through the relevant payment provider or authorised
              payment channel.
            </p>
            <p>
              Never share your M-Pesa PIN, banking password, card PIN or
              one-time security codes with anyone claiming to process your
              reservation.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>5. Customer Cancellation and Refund Policy</h3>
            <p>
              Customers may request cancellation through the official ÉLAN HOMES
              communication channels. Refund eligibility is determined by the
              time remaining before the scheduled check-in date.
            </p>

            <p>
              <strong>Applicable cancellation conditions:</strong>
            </p>

            <ul>
              <li>
                <strong>Within 24 hours of booking:</strong> A 100% refund
                applies where the scheduled check-in is at least 7 days away.
              </li>
              <li>
                <strong>7 or more days before check-in:</strong> 100% refund.
              </li>
              <li>
                <strong>
                  At least 3 days but less than 7 days before check-in:
                </strong>{" "}
                70% refund.
              </li>
              <li>
                <strong>Less than 3 days before check-in:</strong> 50% refund.
              </li>
              <li>
                <strong>No-show:</strong> If a customer fails to arrive and does
                not notify ÉLAN HOMES or the accommodation provider, the booking
                is non-refundable.
              </li>
            </ul>

            <p>
              Refund percentages are calculated against the complete amount paid
              on the booking invoice. The invoice amount is all-inclusive, and
              no separate payment-processing deduction will be applied to the
              customer's refund.
            </p>
            <p>
              The applicable cancellation period is determined using the
              scheduled check-in date and the time the cancellation request is
              received by ÉLAN HOMES.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>6. Host or Curator Cancellation</h3>
            <p>
              A Curator or accommodation host is expected to honour confirmed
              reservations and maintain accurate availability.
            </p>
            <p>If a host cancels a confirmed booking:</p>
            <ul>
              <li>
                The customer is entitled to a 100% refund of the amount paid for
                the affected booking.
              </li>
              <li>
                ÉLAN HOMES will make reasonable efforts to help the customer
                find similar alternative accommodation, subject to availability
                and the customer's agreement.
              </li>
              <li>
                The host is required to pay ÉLAN HOMES a KSh 250 cancellation
                penalty.
              </li>
              <li>
                The cancellation and applicable penalty will be recorded in the
                Curator's account history.
              </li>
            </ul>
            <p>
              Repeated cancellations, misleading availability information or
              failure to honour confirmed bookings may result in further account
              review or restrictions under the Curator terms.
            </p>
            <p>
              Host cancellation requirements and penalties will also be
              displayed in the Curator Dashboard booking policy.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>7. Early Checkout and Shortened Stays</h3>
            <p>
              A customer who checks out before the confirmed departure date must
              notify ÉLAN HOMES through the official communication channels.
            </p>

            <p>
              <strong>Early checkout with one-day notice:</strong>
            </p>
            <p>
              Where the customer gives the required one-day notice, the actual
              nights stayed and the one-day notice period are treated as
              occupied days. The customer is entitled to a refund of 70% of the
              remaining unused accommodation amount.
            </p>

            <p>
              <strong>
                Immediate early checkout without the required notice:
              </strong>
            </p>
            <p>
              Where a customer checks out immediately without providing the
              required notice, the customer is entitled to a 50% refund of the
              unused accommodation amount, subject to the applicable
              early-checkout settlement rules.
            </p>

            <p>
              ÉLAN HOMES will communicate the applicable refund amount and
              settlement details to the customer.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>8. Check-in and Check-out</h3>
            <p>
              Check-in and check-out times are determined by the individual
              accommodation provider and are displayed or communicated during
              the booking process.
            </p>
            <p>
              Customers should follow the confirmed arrival and departure
              arrangements and communicate any expected delays or changes to
              ÉLAN HOMES.
            </p>
            <p>
              Early check-in, late check-out and extensions are subject to
              availability and approval. Additional accommodation charges, where
              applicable, must be communicated through a revised invoice before
              payment.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>9. Guest Responsibilities and Property Damage</h3>
            <p>
              Guests are expected to respect the accommodation, follow the house
              rules and take reasonable care of the property, furniture,
              appliances, equipment and other facilities.
            </p>
            <p>
              A guest is fully responsible for damage caused by their actions,
              negligence, misconduct or failure to follow the accommodation
              rules.
            </p>
            <p>
              Where damage occurs, the incident should be documented with
              appropriate evidence, such as photographs, inspection reports and
              reasonable repair or replacement estimates. The guest will be
              informed of the claim and given an opportunity to respond.
            </p>
            <p>
              The guest may be required to meet the reasonable and verified cost
              of repairing or replacing items damaged by them.
            </p>
            <p>
              Guests are not responsible for pre-existing damage, ordinary wear
              and tear or damage they did not cause.
            </p>
            <p>
              Suspected deliberate damage, theft or criminal conduct may be
              reported to the relevant authorities for investigation and
              appropriate legal action.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>10. Changes to Reservations</h3>
            <p>
              Requests to change booking dates, guest numbers or accommodation
              arrangements must be submitted through ÉLAN HOMES.
            </p>
            <p>
              All changes are subject to availability and approval by the
              relevant Curator or authorised representative.
            </p>
            <p>
              Where a change affects the booking price, ÉLAN HOMES will issue a
              revised invoice showing the new complete amount before any
              additional payment is requested.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>11. Land and Property Enquiries</h3>
            <p>
              ÉLAN HOMES provides a platform through which customers can
              discover properties and land advertised by owners and authorised
              agents.
            </p>
            <p>
              Submitting an enquiry or paying a viewing or connection fee does
              not constitute a purchase, reservation of ownership or transfer of
              property rights.
            </p>
            <p>
              Sellers and authorised agents are responsible for providing
              accurate listing information and confirming that they own the
              property or have authority to advertise it.
            </p>
            <p>
              ÉLAN HOMES coordinates communication and viewing arrangements.
              Customers should receive confirmation of the viewing arrangements
              before attending.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>12. Buyer Protection and Property Verification</h3>
            <p>
              ÉLAN HOMES aims to provide a transparent enquiry and viewing
              experience. Customers are encouraged to independently verify
              important property and land information before entering into a
              purchase agreement.
            </p>
            <p>
              Before paying a purchase price, buyers should obtain appropriate
              professional assistance to verify:
            </p>
            <ul>
              <li>
                Ownership and the authenticity of relevant title documents.
              </li>
              <li>
                Boundaries, land size and the property's physical location.
              </li>
              <li>Existing disputes, encumbrances or restrictions.</li>
              <li>
                Planning permissions, permitted use and relevant approvals.
              </li>
              <li>
                Access roads, utilities and other material listing
                representations.
              </li>
            </ul>
            <p>
              A seller's indication that ownership documents are available does
              not, by itself, establish that ownership has been independently
              verified or that the property has no legal issues.
            </p>
            <p>
              Customers should use a qualified Kenyan advocate and the relevant
              government authorities for independent verification before making
              a purchase payment.
            </p>
            <p>
              Customers may report suspicious listings, misleading descriptions,
              unauthorised advertising or misconduct to ÉLAN HOMES for review.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>13. Property and Land Viewing Fees</h3>
            <p>
              ÉLAN HOMES may charge a viewing or connection fee for arranging
              access to a property or land listing.
            </p>
            <p>
              The complete viewing fee will be stated on the invoice before
              payment. Customers will pay exactly the invoiced amount.
            </p>
            <p>
              The viewing or connection fee is separate from the property's or
              land's purchase price. Paying this fee does not oblige the
              customer to purchase the property.
            </p>
            <p>
              The fee is non-refundable once the viewing request has been
              submitted and processed, subject to appropriate resolution where
              ÉLAN HOMES cancels the viewing or fails to provide the promised
              connection.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>14. Property and Land Purchase Payments</h3>
            <p>
              Buyers and sellers may complete property or land purchase payments
              directly through their agreed legal and banking arrangements.
            </p>
            <p>
              ÉLAN HOMES may also facilitate a purchase-payment process if the
              buyer specifically requests this assistance and the seller agrees
              to the arrangement.
            </p>
            <p>
              Before facilitating a transaction, ÉLAN HOMES will communicate the
              proposed payment procedure, responsibilities, applicable charges
              and relevant conditions to the parties.
            </p>
            <p>
              Any payment facilitation by ÉLAN HOMES will be subject to
              applicable Kenyan laws and regulatory requirements and the use of
              an appropriately authorised payment arrangement.
            </p>
            <p>
              ÉLAN HOMES will not automatically collect or hold property or land
              purchase funds simply because a customer has submitted an enquiry
              or paid a viewing fee.
            </p>
            <p>
              A viewing fee is not a deposit, purchase payment, commission or
              part-payment towards the property's or land's purchase price.
            </p>
            <p>
              Payment facilitation does not replace a written sale agreement,
              independent legal advice, title verification or the other legal
              requirements applicable to a property transaction.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>15. Communication and Customer Privacy</h3>
            <p>
              ÉLAN HOMES acts as the central communication point for customer
              enquiries and booking requests.
            </p>
            <p>
              Customer messages and relevant booking information may be relayed
              to the appropriate Curator or authorised representative so that
              the request can be processed.
            </p>
            <p>
              Customers should not be required to communicate directly with a
              seller or accommodation provider to obtain ordinary booking
              assistance through ÉLAN HOMES.
            </p>
            <p>
              Personal information will be handled in accordance with the ÉLAN
              HOMES Privacy Policy and applicable data protection requirements.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>16. Complaints and Disputes</h3>
            <p>
              Customers should report booking problems, property damage,
              misleading listings, payment concerns or accommodation complaints
              to ÉLAN HOMES as soon as reasonably possible.
            </p>
            <p>
              ÉLAN HOMES may request relevant evidence and communicate with the
              parties involved to help investigate and resolve the matter.
            </p>
            <p>
              A complaint will be reviewed on its facts and supporting evidence.
              A complaint alone does not automatically establish wrongdoing by a
              customer or Curator.
            </p>
            <p>
              Where necessary, matters involving suspected criminal conduct or
              other serious legal issues may be referred to the relevant
              authorities.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>17. Contact and Assistance</h3>
            <p>
              If you need clarification about a listing, booking, invoice,
              cancellation, refund, viewing arrangement or purchase-payment
              facilitation, contact ÉLAN HOMES through the official support
              channels.
            </p>
            <Link to="/contact" className="booking-policy-link">
              Visit our Contact Page
            </Link>
          </article>

          <div className="booking-policy-note">
            <strong>Important:</strong> Accommodation reservations are confirmed
            only after availability, booking terms and payment have been
            verified and official confirmation has been provided. Property and
            land transactions remain subject to independent legal verification
            and the applicable purchase arrangements.
          </div>

          <div className="booking-policy-actions">
            <Link to="/stays" className="booking-policy-button">
              Explore Stays
            </Link>

            <Link to="/help-centre" className="booking-policy-back">
              Visit Help Centre
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default BookingPolicy;
