import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyBookings.css";

export default function MyBookings() {
  // LOAD BOOKINGS
  const [bookings] = useState(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("elanBookings") || "[]",
      );

      return Array.isArray(savedBookings) ? savedBookings : [];
    } catch (error) {
      console.error("Could not load bookings:", error);
      return [];
    }
  });

  // FORMAT PRICE
  const formatPrice = (price) =>
    `KSh ${Number(price || 0).toLocaleString("en-KE")}`;

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "Not selected";

    const parsedDate = new Date(date.includes("T") ? date : `${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // FORMAT SUBMISSION DATE
  const formatSubmissionDate = (date) => {
    if (!date) return "Date unavailable";

    return formatDate(date);
  };

  // BOOKING STATUS
  const getStatus = (status) => {
    const normalizedStatus = String(status || "pending").toLowerCase();

    if (normalizedStatus === "confirmed") {
      return {
        label: "Confirmed",
        className: "confirmed",
        message: "Your booking has been confirmed by ELAN HOMES.",
      };
    }

    if (normalizedStatus === "cancelled") {
      return {
        label: "Cancelled",
        className: "cancelled",
        message: "This booking has been cancelled.",
      };
    }

    return {
      label: "Pending",
      className: "pending",
      message: "Awaiting confirmation from ELAN HOMES.",
    };
  };

  // BOOKING SUMMARY
  const pendingCount = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "pending",
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "confirmed",
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "cancelled",
  ).length;

  return (
    <main className="my-bookings-page">
      {/* HERO */}

      <section className="bookings-hero">
        <div className="bookings-hero-content">
          <span>YOUR ELAN HOMES EXPERIENCE</span>

          <h1>My Bookings</h1>

          <p>View and keep track of your holiday accommodation bookings.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="bookings-container">
        {/* PAGE HEADING */}

        <div className="bookings-heading">
          <div>
            <span className="bookings-label">YOUR ACCOUNT</span>

            <h2>Booking History</h2>

            <p>Manage your holiday-stay booking records in one place.</p>
          </div>

          <div className="bookings-count">
            <strong>{bookings.length}</strong>
            <span>Total Bookings</span>
          </div>
        </div>

        {/* BOOKING STATISTICS */}

        {bookings.length > 0 && (
          <div className="booking-statistics">
            <div className="booking-stat-item">
              <strong>{pendingCount}</strong>
              <span>Pending</span>
            </div>

            <div className="booking-stat-item">
              <strong>{confirmedCount}</strong>
              <span>Confirmed</span>
            </div>

            <div className="booking-stat-item">
              <strong>{cancelledCount}</strong>
              <span>Cancelled</span>
            </div>
          </div>
        )}

        {/* BOOKINGS AVAILABLE */}

        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking, index) => {
              const status = getStatus(booking.status);

              return (
                <article
                  className="booking-card"
                  key={booking.id || booking.bookingReference || index}
                >
                  {/* BOOKING HEADER */}

                  <div className="booking-card-top">
                    <div>
                      <span className="booking-reference">
                        BOOKING REFERENCE
                      </span>

                      <h3>
                        {booking.bookingReference ||
                          booking.id ||
                          `Booking ${index + 1}`}
                      </h3>
                    </div>

                    <span className={`booking-status ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* ACCOMMODATION DETAILS */}

                  <div className="booking-section-title">
                    <h4>Accommodation Details</h4>
                  </div>

                  <div className="booking-card-details">
                    <div>
                      <span>Accommodation</span>

                      <strong>
                        {booking.stayName ||
                          booking.propertyName ||
                          "Holiday Stay"}
                      </strong>
                    </div>

                    <div>
                      <span>Location</span>

                      <strong>{booking.location || "To be confirmed"}</strong>
                    </div>

                    <div>
                      <span>Check-in</span>

                      <strong>{formatDate(booking.checkIn)}</strong>
                    </div>

                    <div>
                      <span>Check-out</span>

                      <strong>{formatDate(booking.checkOut)}</strong>
                    </div>

                    <div>
                      <span>Guests</span>

                      <strong>{booking.guests || 1}</strong>
                    </div>

                    <div>
                      <span>Number of Nights</span>

                      <strong>{booking.nights || 0}</strong>
                    </div>

                    <div>
                      <span>Estimated Total</span>

                      <strong className="booking-total">
                        {formatPrice(booking.total)}
                      </strong>
                    </div>
                  </div>

                  {/* CUSTOMER INFORMATION */}

                  <div className="booking-customer-section">
                    <h4>Customer Information</h4>

                    <div className="booking-customer-details">
                      <div>
                        <span>Full Name</span>

                        <strong>{booking.name || "Not provided"}</strong>
                      </div>

                      <div>
                        <span>Email Address</span>

                        <strong>{booking.email || "Not provided"}</strong>
                      </div>

                      <div>
                        <span>Phone Number</span>

                        <strong>{booking.phone || "Not provided"}</strong>
                      </div>
                    </div>
                  </div>

                  {/* BOOKING FOOTER */}

                  <div className="booking-card-footer">
                    <div>
                      <span>Enquiry Submitted</span>

                      <strong>{formatSubmissionDate(booking.createdAt)}</strong>
                    </div>

                    <p>{status.message}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */

          <div className="bookings-empty">
            <div className="bookings-empty-icon">
              <span>▤</span>
            </div>

            <h3>No Bookings Yet</h3>

            <p>
              You haven't made any holiday-stay booking requests yet. Explore
              our accommodation collection and start planning your next
              experience.
            </p>

            <Link to="/stays" className="bookings-explore-btn">
              Explore Holiday Stays ↗
            </Link>
          </div>
        )}

        {/* BOOKING INFORMATION */}

        <div className="bookings-information">
          <h3>Need Help With a Booking?</h3>

          <p>
            Our team can assist with booking enquiries, availability and
            accommodation details.
          </p>

          <Link to="/contact">Contact ELAN HOMES ↗</Link>
        </div>
      </section>
    </main>
  );
}
