import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./BookingPolicy.css";

function BookingPolicy() {
  return (
    <>
      <SEO
        title="Booking Policy | ÉLAN HOMES"
        description="Read the ÉLAN HOMES booking policy covering accommodation enquiries, availability, pricing, payments and cancellations."
      />

      <main className="booking-policy-page">
        <section className="booking-policy-hero">
          <span>ÉLAN HOMES INFORMATION</span>
          <h1>Booking Policy</h1>
          <p>
            Important information to help you understand how accommodation
            enquiries and reservations work through ÉLAN HOMES.
          </p>
        </section>

        <section className="booking-policy-content">
          <div className="booking-policy-intro">
            <h2>Before making a booking</h2>
            <p>
              We want every guest to have a clear and comfortable booking
              experience. Please read this policy before submitting an
              accommodation enquiry or proceeding with a reservation.
            </p>
          </div>

          <article className="booking-policy-section">
            <h3>1. Booking Enquiries</h3>
            <p>
              Guests can submit enquiries about accommodation displayed on ÉLAN
              HOMES. An enquiry allows us to establish your preferred dates,
              requirements and availability.
            </p>
            <p>
              Submitting an enquiry does not automatically create or confirm a
              reservation.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>2. Availability Confirmation</h3>
            <p>
              All accommodation is subject to availability. Availability must be
              checked and confirmed by ÉLAN HOMES or the relevant accommodation
              provider before a reservation is accepted.
            </p>
            <p>
              Do not assume that a listing is available simply because it
              appears on the website.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>3. Prices and Charges</h3>
            <p>
              Prices displayed on our website are provided for guidance. The
              final price must be confirmed before a booking is completed.
            </p>
            <p>
              Additional charges, where applicable, should be communicated and
              agreed upon before payment.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>4. Payments</h3>
            <p>
              Payment instructions should only be followed after the reservation
              details, total amount and applicable terms have been confirmed
              through an approved ÉLAN HOMES or property provider channel.
            </p>
            <p>
              Never share your M-Pesa PIN, banking password, card PIN or
              one-time security codes with anyone claiming to process your
              reservation.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>5. Cancellations and Refunds</h3>
            <p>
              Cancellation conditions and refund arrangements may vary depending
              on the accommodation and the provider's terms.
            </p>
            <p>
              Before making payment, request and review the applicable
              cancellation and refund conditions. No cancellation window or
              refund amount should be assumed unless it has been confirmed in
              writing.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>6. Check-in and Check-out</h3>
            <p>
              Check-in and check-out times are determined by the individual
              accommodation provider. Please review the times shown on the
              listing and confirm any special arrangements before arrival.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>7. Guest Responsibilities</h3>
            <p>
              Guests are expected to provide accurate booking information,
              respect the accommodation rules, take reasonable care of the
              property and comply with the provider's check-in requirements.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>8. Changes to Reservations</h3>
            <p>
              Requests to change booking dates, guest numbers or other
              reservation details are subject to availability and approval by
              the relevant accommodation provider.
            </p>
          </article>

          <article className="booking-policy-section">
            <h3>9. Contact and Assistance</h3>
            <p>
              If you need clarification about a listing, booking enquiry,
              payment instruction or reservation, contact our team before
              proceeding.
            </p>
            <Link to="/contact" className="booking-policy-link">
              Visit our Contact Page
            </Link>
          </article>

          <div className="booking-policy-note">
            <strong>Important:</strong> A reservation is only confirmed after
            the relevant availability, price and booking conditions have been
            agreed upon and confirmation has been provided.
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
