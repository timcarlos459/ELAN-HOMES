import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./MyBookings.css";

export default function MyBookings() {
  // LOAD ALL ENQUIRIES AND STAY BOOKINGS
  const [records] = useState(() => {
    try {
      const savedEnquiries = JSON.parse(
        localStorage.getItem("elanEnquiries") || "[]",
      );

      const savedBookings = JSON.parse(
        localStorage.getItem("elanBookings") || "[]",
      );

      const enquiries = Array.isArray(savedEnquiries) ? savedEnquiries : [];
      const bookings = Array.isArray(savedBookings) ? savedBookings : [];

      const stayEnquiries = enquiries.filter(
        (item) => item.category === "stay",
      );

      const nonStayEnquiries = enquiries.filter(
        (item) => item.category === "property" || item.category === "land",
      );

      const matchedStayRecords = stayEnquiries.map((enquiry) => {
        const matchingBooking = bookings.find(
          (booking) => booking.id === enquiry.id,
        );

        return matchingBooking || enquiry;
      });

      const unmatchedBookings = bookings.filter(
        (booking) =>
          !stayEnquiries.some((enquiry) => enquiry.id === booking.id),
      );

      return [
        ...nonStayEnquiries,
        ...matchedStayRecords,
        ...unmatchedBookings,
      ].sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.submittedAt || a.enquiryDate || 0,
        ).getTime();

        const dateB = new Date(
          b.createdAt || b.submittedAt || b.enquiryDate || 0,
        ).getTime();

        return dateB - dateA;
      });
    } catch (error) {
      console.error("Could not load customer records:", error);
      return [];
    }
  });

  // STAY CANCELLATION STATE
  const [activeCancellation, setActiveCancellation] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [requestPrepared, setRequestPrepared] = useState(false);

  // PROPERTY AND LAND VIEWING CANCELLATION STATE
  const [activeViewingCancellation, setActiveViewingCancellation] =
    useState(null);
  const [viewingCancellationAcknowledged, setViewingCancellationAcknowledged] =
    useState(false);
  const [viewingCancellationPrepared, setViewingCancellationPrepared] =
    useState(false);

  // EARLY CHECKOUT STATE
  const [activeEarlyCheckout, setActiveEarlyCheckout] = useState(null);
  const [earlyCheckoutAcknowledged, setEarlyCheckoutAcknowledged] =
    useState(false);
  const [earlyCheckoutPrepared, setEarlyCheckoutPrepared] = useState(false);
  const [earlyCheckoutNotice, setEarlyCheckoutNotice] =
    useState("one_day_notice");

  // FORMATTING
  const formatPrice = (price) =>
    `KSh ${Number(price || 0).toLocaleString("en-KE")}`;

  const parseDate = (value) => {
    if (!value) return null;

    if (typeof value !== "string" && !(value instanceof Date)) {
      return null;
    }

    const parsedDate =
      typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Date(`${value}T00:00:00`)
        : new Date(value);

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const formatDate = (value) => {
    const parsedDate = parseDate(value);

    if (!parsedDate) return "Not selected";

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatSubmissionDate = (record) => {
    const submissionDate =
      record.createdAt ||
      record.submittedAt ||
      record.enquiryDate ||
      record.created_at;

    const parsedDate = parseDate(submissionDate);

    if (!parsedDate) return "Date unavailable";

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // GET THE LISTING UUID
  const getListingId = (record) =>
    record.listing?.id || record.listingId || record.listing?.listingId || "";

  // CHECK WHETHER A VIEWING REQUEST HAS BEEN PAID
  const isViewingFeePaid = (record) => {
    const paymentStatus = String(
      record.paymentStatus ||
        record.payment?.status ||
        record.viewingPayment?.status ||
        "",
    ).toLowerCase();

    return (
      record.paid === true ||
      record.payment?.paid === true ||
      record.viewingPayment?.paid === true ||
      ["paid", "confirmed", "completed"].includes(paymentStatus)
    );
  };

  // CATEGORY INFORMATION
  const getCategory = (record) => {
    const category = String(record.category || "").toLowerCase();
    const listingId = getListingId(record);

    if (category === "property") {
      return {
        label: "Property Enquiry",
        className: "property",
        title:
          record.listing?.title ||
          record.listing?.name ||
          record.propertyName ||
          record.name ||
          "Property Enquiry",
        location:
          record.listing?.location ||
          record.location ||
          "Location available on request",
        listingId,
        link: listingId ? `/properties/${listingId}` : "/properties",
        viewingLink: listingId
          ? `/properties/${listingId}/request-viewing`
          : null,
      };
    }

    if (category === "land") {
      return {
        label: "Land Enquiry",
        className: "land",
        title:
          record.listing?.title ||
          record.listing?.name ||
          record.landName ||
          record.name ||
          "Land Enquiry",
        location:
          record.listing?.location ||
          record.location ||
          "Location available on request",
        listingId,
        link: listingId ? `/land/${listingId}` : "/land",
        viewingLink: listingId ? `/land/${listingId}/request-viewing` : null,
      };
    }

    return {
      label: "Stay Booking",
      className: "stay",
      title:
        record.stayName ||
        record.listing?.title ||
        record.listing?.name ||
        record.name ||
        "Holiday Stay",
      location:
        record.location ||
        record.listing?.location ||
        "Location available on request",
      listingId,
      link: listingId ? `/stays/${listingId}` : "/stays",
      viewingLink: null,
    };
  };

  // STATUS INFORMATION
  const getStatus = (record) => {
    const normalizedStatus = String(record.status || "pending").toLowerCase();

    if (normalizedStatus === "confirmed") {
      return {
        label: "Confirmed",
        className: "confirmed",
        message: "Your booking has been confirmed by ÉLAN HOMES.",
      };
    }

    if (normalizedStatus === "cancelled") {
      return {
        label: "Cancelled",
        className: "cancelled",
        message: "This request has been cancelled.",
      };
    }

    if (normalizedStatus === "completed") {
      return {
        label: "Completed",
        className: "confirmed",
        message: "This request has been completed.",
      };
    }

    if (normalizedStatus === "under_review") {
      return {
        label: "Under Review",
        className: "pending",
        message: "ÉLAN HOMES is reviewing your enquiry.",
      };
    }

    if (normalizedStatus === "owner_contacted") {
      return {
        label: "Owner Contacted",
        className: "pending",
        message: "ÉLAN HOMES has contacted the listing representative.",
      };
    }

    if (normalizedStatus === "awaiting_owner") {
      return {
        label: "Awaiting Response",
        className: "pending",
        message: "We are awaiting a response from the listing representative.",
      };
    }

    if (normalizedStatus === "response_received") {
      return {
        label: "Response Received",
        className: "confirmed",
        message: "ÉLAN HOMES has received a response.",
      };
    }

    if (normalizedStatus === "customer_contacted") {
      return {
        label: "Customer Contacted",
        className: "confirmed",
        message: "ÉLAN HOMES has contacted you with an update.",
      };
    }

    if (normalizedStatus === "new") {
      return {
        label: "New Enquiry",
        className: "pending",
        message: "Your enquiry has been recorded.",
      };
    }

    return {
      label: "Pending",
      className: "pending",
      message: "Awaiting confirmation from ÉLAN HOMES.",
    };
  };

  // DATE VALIDATION
  const getDateOnly = (value) => {
    const date = parseDate(value);

    if (!date) return null;

    date.setHours(0, 0, 0, 0);
    return date;
  };

  const isBeforeCheckIn = (checkIn) => {
    const date = getDateOnly(checkIn);

    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date > today;
  };

  const isWithinStay = (checkIn, checkOut) => {
    const startDate = getDateOnly(checkIn);
    const endDate = getDateOnly(checkOut);

    if (!startDate || !endDate || endDate <= startDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today >= startDate && today < endDate;
  };

  // STAY CANCELLATION FUNCTIONS
  const openCancellation = (booking) => {
    setActiveCancellation(booking);
    setAcknowledged(false);
    setRequestPrepared(false);
  };

  const closeCancellation = () => {
    setActiveCancellation(null);
    setAcknowledged(false);
    setRequestPrepared(false);
  };

  const handleCancellationRequest = () => {
    if (!acknowledged) {
      alert(
        "Please confirm that you have read and understood the cancellation policy.",
      );
      return;
    }

    setRequestPrepared(true);
  };

  // PROPERTY AND LAND VIEWING CANCELLATION FUNCTIONS
  const openViewingCancellation = (record) => {
    setActiveViewingCancellation(record);
    setViewingCancellationAcknowledged(false);
    setViewingCancellationPrepared(false);
  };

  const closeViewingCancellation = () => {
    setActiveViewingCancellation(null);
    setViewingCancellationAcknowledged(false);
    setViewingCancellationPrepared(false);
  };

  const handleViewingCancellation = () => {
    if (!viewingCancellationAcknowledged) {
      alert(
        "Please confirm that you have read and understood the viewing cancellation policy.",
      );
      return;
    }

    setViewingCancellationPrepared(true);
  };

  // EARLY CHECKOUT FUNCTIONS
  const openEarlyCheckout = (booking) => {
    setActiveEarlyCheckout(booking);
    setEarlyCheckoutAcknowledged(false);
    setEarlyCheckoutPrepared(false);
    setEarlyCheckoutNotice("one_day_notice");
  };

  const closeEarlyCheckout = () => {
    setActiveEarlyCheckout(null);
    setEarlyCheckoutAcknowledged(false);
    setEarlyCheckoutPrepared(false);
    setEarlyCheckoutNotice("one_day_notice");
  };

  const handleEarlyCheckoutRequest = () => {
    if (!earlyCheckoutAcknowledged) {
      alert(
        "Please confirm that you have read and understood the early-checkout policy.",
      );
      return;
    }

    setEarlyCheckoutPrepared(true);
  };

  // CATEGORY COUNTS
  const propertyCount = records.filter(
    (record) => record.category === "property",
  ).length;

  const landCount = records.filter(
    (record) => record.category === "land",
  ).length;

  const stayCount = records.filter(
    (record) => record.category === "stay",
  ).length;

  const pendingCount = records.filter((record) => {
    const status = String(record.status || "pending").toLowerCase();

    return [
      "pending",
      "new",
      "under_review",
      "owner_contacted",
      "awaiting_owner",
    ].includes(status);
  }).length;

  const confirmedCount = records.filter(
    (record) => record.status?.toLowerCase() === "confirmed",
  ).length;

  const cancelledCount = records.filter(
    (record) => record.status?.toLowerCase() === "cancelled",
  ).length;

  return (
    <main className="my-bookings-page">
      <SEO
        title="My Bookings & Requests | ÉLAN HOMES"
        description="View and manage your ÉLAN HOMES property enquiries, land viewing requests and holiday stay bookings."
        noindex={true}
      />

      <section className="bookings-hero">
        <div className="bookings-hero-content">
          <span>YOUR ÉLAN HOMES EXPERIENCE</span>
          <h1>My Bookings & Requests</h1>
          <p>
            Keep track of your property, land and holiday stay requests in one
            place.
          </p>
        </div>
      </section>

      <section className="bookings-container">
        <div className="bookings-heading">
          <div>
            <span className="bookings-label">YOUR ACCOUNT</span>
            <h2>Your Activity</h2>
            <p>
              View your stay bookings, property viewing requests and land
              viewing requests.
            </p>
          </div>

          <div className="bookings-count">
            <strong>{records.length}</strong>
            <span>Total Records</span>
          </div>
        </div>

        {records.length > 0 && (
          <>
            <div className="booking-statistics">
              <div className="booking-stat-item">
                <strong>{propertyCount}</strong>
                <span>Properties</span>
              </div>

              <div className="booking-stat-item">
                <strong>{landCount}</strong>
                <span>Land</span>
              </div>

              <div className="booking-stat-item">
                <strong>{stayCount}</strong>
                <span>Stays</span>
              </div>
            </div>

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
          </>
        )}

        {records.length > 0 ? (
          <div className="bookings-list">
            {records.map((record, index) => {
              const category = getCategory(record);
              const status = getStatus(record);

              const isStay = record.category === "stay";
              const isProperty = record.category === "property";
              const isLand = record.category === "land";

              const normalizedStatus = String(
                record.status || "pending",
              ).toLowerCase();

              const isConfirmed = normalizedStatus === "confirmed";
              const isCancelled = normalizedStatus === "cancelled";
              const isCompleted = normalizedStatus === "completed";

              const viewingDate = record.viewingDate || record.preferredDate;
              const viewingTime = record.viewingTime || record.preferredTime;

              const isViewingRequest =
                record.enquiryType === "viewing" ||
                record.enquiryType === "property_viewing" ||
                record.enquiryType === "land_viewing" ||
                Boolean(viewingDate) ||
                Boolean(viewingTime);

              const viewingFeePaid = isViewingFeePaid(record);

              const canCancelViewing =
                (isProperty || isLand) &&
                isViewingRequest &&
                !isCancelled &&
                !isCompleted;

              const canCancel =
                isStay && isConfirmed && isBeforeCheckIn(record.checkIn);

              const canRequestEarlyCheckout =
                isStay &&
                isConfirmed &&
                isWithinStay(record.checkIn, record.checkOut);

              const reference =
                record.reference ||
                record.bookingReference ||
                record.id ||
                `Request ${index + 1}`;

              const viewingRedirect = category.viewingLink
                ? `/signin?redirect=${encodeURIComponent(category.viewingLink)}`
                : null;

              return (
                <article
                  className="booking-card"
                  key={`${record.category || "record"}-${record.id || index}`}
                >
                  <div className="booking-card-top">
                    <div>
                      <span className="booking-reference">
                        ÉLAN HOMES REFERENCE
                      </span>

                      <h3>{reference}</h3>

                      <span
                        className={`booking-category-badge ${category.className}`}
                      >
                        {category.label}
                      </span>
                    </div>

                    <span className={`booking-status ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="booking-section-title">
                    <h4>
                      {isStay
                        ? "Accommodation Details"
                        : isLand
                          ? "Land Details"
                          : "Property Details"}
                    </h4>
                  </div>

                  <div className="booking-card-details">
                    <div>
                      <span>{isStay ? "Accommodation" : "Listing"}</span>
                      <strong>{category.title}</strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{category.location}</strong>
                    </div>

                    {isStay ? (
                      <>
                        <div>
                          <span>Check-in</span>
                          <strong>{formatDate(record.checkIn)}</strong>
                        </div>

                        <div>
                          <span>Check-out</span>
                          <strong>{formatDate(record.checkOut)}</strong>
                        </div>

                        <div>
                          <span>Guests</span>
                          <strong>{record.guests || 1}</strong>
                        </div>

                        <div>
                          <span>Number of Nights</span>
                          <strong>{record.nights || 0}</strong>
                        </div>

                        <div>
                          <span>Estimated Total</span>
                          <strong className="booking-total">
                            {formatPrice(
                              record.total ??
                                record.bookingDetails?.estimatedTotal,
                            )}
                          </strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span>Enquiry Type</span>
                          <strong>
                            {isViewingRequest
                              ? "Viewing Request"
                              : "General Enquiry"}
                          </strong>
                        </div>

                        {viewingDate && (
                          <div>
                            <span>Preferred Viewing Date</span>
                            <strong>{formatDate(viewingDate)}</strong>
                          </div>
                        )}

                        {viewingTime && (
                          <div>
                            <span>Preferred Viewing Time</span>
                            <strong>{viewingTime}</strong>
                          </div>
                        )}

                        {isViewingRequest && (
                          <div>
                            <span>Viewing Fee Status</span>
                            <strong>
                              {viewingFeePaid
                                ? "Paid"
                                : "Payment Not Confirmed"}
                            </strong>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="booking-customer-section">
                    <h4>Customer Information</h4>

                    <div className="booking-customer-details">
                      <div>
                        <span>Full Name</span>
                        <strong>
                          {record.customerName ||
                            record.name ||
                            record.customer?.fullName ||
                            "Not provided"}
                        </strong>
                      </div>

                      <div>
                        <span>Email Address</span>
                        <strong>
                          {record.customerEmail ||
                            record.email ||
                            record.customer?.email ||
                            "Not provided"}
                        </strong>
                      </div>

                      <div>
                        <span>Phone Number</span>
                        <strong>
                          {record.customerPhone ||
                            record.phone ||
                            record.customer?.phone ||
                            "Not provided"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="booking-card-footer">
                    <div>
                      <span>Request Submitted</span>
                      <strong>{formatSubmissionDate(record)}</strong>
                    </div>

                    <p>{status.message}</p>
                  </div>

                  {/* VIEW LISTING */}
                  <div className="booking-cancellation-action">
                    <Link
                      to={category.link}
                      className="booking-cancel-btn"
                      style={{
                        textDecoration: "none",
                        color: "#171717",
                        borderColor: "#c9a45c",
                      }}
                    >
                      View Listing
                    </Link>
                  </div>

                  {/* PROPERTY VIEWING REQUEST */}
                  {isProperty && !isCancelled && category.viewingLink && (
                    <div className="booking-cancellation-action">
                      <Link to={viewingRedirect} className="booking-cancel-btn">
                        Sign In to Request Property Viewing
                      </Link>
                    </div>
                  )}

                  {/* LAND VIEWING REQUEST */}
                  {isLand && !isCancelled && category.viewingLink && (
                    <div className="booking-cancellation-action">
                      <Link to={viewingRedirect} className="booking-cancel-btn">
                        Sign In to Request Land Viewing
                      </Link>
                    </div>
                  )}

                  {/* PROPERTY AND LAND VIEWING CANCELLATION */}
                  {canCancelViewing && (
                    <div className="booking-cancellation-action">
                      <button
                        type="button"
                        className="booking-viewing-cancel-btn"
                        onClick={() => openViewingCancellation(record)}
                      >
                        Cancel Viewing Request
                      </button>
                    </div>
                  )}

                  {/* STAY CANCELLATION */}
                  {canCancel && (
                    <div className="booking-cancellation-action">
                      <button
                        type="button"
                        className="booking-cancel-btn"
                        onClick={() => openCancellation(record)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}

                  {/* STAY EARLY CHECKOUT */}
                  {canRequestEarlyCheckout && (
                    <div className="booking-early-checkout-action">
                      <button
                        type="button"
                        className="booking-early-checkout-btn"
                        onClick={() => openEarlyCheckout(record)}
                      >
                        Request Early Checkout
                      </button>
                    </div>
                  )}

                  {isCancelled && (
                    <p className="booking-already-cancelled">
                      This request is already cancelled.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bookings-empty">
            <div className="bookings-empty-icon">
              <span>▤</span>
            </div>

            <h3>No Bookings or Requests Yet</h3>

            <p>
              Your property viewing requests, land viewing requests and holiday
              stay bookings will appear here when you submit them.
            </p>

            <div className="bookings-categories-links">
              <Link to="/properties" className="bookings-explore-btn">
                Explore Properties ↗
              </Link>

              <Link to="/land" className="bookings-explore-btn">
                Explore Land ↗
              </Link>

              <Link to="/stays" className="bookings-explore-btn">
                Explore Stays ↗
              </Link>
            </div>
          </div>
        )}

        <div className="bookings-information">
          <h3>Need Help With an Enquiry or Booking?</h3>

          <p>
            ÉLAN HOMES can assist with property enquiries, land viewings,
            accommodation availability and booking questions.
          </p>

          <Link to="/contact">Contact ÉLAN HOMES ↗</Link>
        </div>
      </section>

      {/* PROPERTY AND LAND VIEWING CANCELLATION MODAL */}
      {activeViewingCancellation && (
        <div
          className="booking-cancellation-overlay"
          role="presentation"
          onClick={closeViewingCancellation}
        >
          <section
            className="booking-cancellation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewing-cancellation-title"
            onClick={(e) => e.stopPropagation()}
          >
            {!viewingCancellationPrepared ? (
              <>
                <span className="booking-cancellation-eyebrow">
                  ÉLAN HOMES VIEWING POLICY
                </span>

                <h2 id="viewing-cancellation-title">Cancel Viewing Request</h2>

                <p>
                  You are requesting cancellation of your{" "}
                  {activeViewingCancellation.category === "land"
                    ? "land"
                    : "property"}{" "}
                  viewing request.
                </p>

                <div className="booking-cancellation-reference">
                  <span>ENQUIRY REFERENCE</span>
                  <strong>
                    {activeViewingCancellation.reference ||
                      activeViewingCancellation.id}
                  </strong>

                  <span>LISTING</span>
                  <strong>
                    {activeViewingCancellation.listing?.title ||
                      activeViewingCancellation.listing?.name ||
                      activeViewingCancellation.name ||
                      "Your selected listing"}
                  </strong>

                  <span>VIEWING FEE STATUS</span>
                  <strong>
                    {isViewingFeePaid(activeViewingCancellation)
                      ? "Payment Confirmed"
                      : "Payment Not Confirmed"}
                  </strong>
                </div>

                <div className="booking-early-checkout-policy">
                  <h3>Viewing Cancellation and Refund Policy</h3>

                  <p>
                    Customers may request cancellation of a property or land
                    viewing request through ÉLAN HOMES.
                  </p>

                  {isViewingFeePaid(activeViewingCancellation) ? (
                    <p>
                      <strong>Customer-initiated cancellation:</strong> The
                      viewing or connection fee has been paid. If you choose to
                      cancel this request, the paid fee is non-refundable.
                    </p>
                  ) : (
                    <p>
                      <strong>Customer-initiated cancellation:</strong> No
                      confirmed viewing-fee payment is recorded for this
                      request. If a viewing fee becomes payable, it will be
                      handled according to the applicable invoice.
                    </p>
                  )}

                  <p>
                    <strong>Cancellation by ÉLAN HOMES:</strong> If ÉLAN HOMES
                    cancels the viewing or cannot provide the promised service,
                    you may choose either a full refund of the paid viewing fee
                    or an alternative viewing date agreed upon with ÉLAN HOMES.
                  </p>

                  <p>
                    ÉLAN HOMES will communicate with you to arrange the
                    applicable resolution.
                  </p>
                </div>

                <label className="booking-cancellation-acknowledgement">
                  <input
                    type="checkbox"
                    checked={viewingCancellationAcknowledged}
                    onChange={(e) =>
                      setViewingCancellationAcknowledged(e.target.checked)
                    }
                  />

                  <span>
                    I have read and understood the property and land viewing
                    cancellation and refund policy.
                  </span>
                </label>

                <div className="booking-cancellation-buttons">
                  <button
                    type="button"
                    className="booking-cancellation-confirm"
                    onClick={handleViewingCancellation}
                  >
                    Confirm Cancellation Request
                  </button>

                  <button
                    type="button"
                    className="booking-cancellation-continue"
                    onClick={closeViewingCancellation}
                  >
                    Keep Viewing Request
                  </button>
                </div>
              </>
            ) : (
              <div className="booking-cancellation-prepared">
                <div className="booking-cancellation-success-icon">✓</div>

                <h2>Viewing Cancellation Request Prepared</h2>

                <p>
                  Your cancellation request for reference{" "}
                  <strong>
                    {activeViewingCancellation.reference ||
                      activeViewingCancellation.id}
                  </strong>{" "}
                  has been prepared.
                </p>

                <button
                  type="button"
                  className="booking-cancellation-confirm"
                  onClick={closeViewingCancellation}
                >
                  CLOSE
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* STAY CANCELLATION POLICY MODAL */}
      {activeCancellation && (
        <div
          className="booking-cancellation-overlay"
          role="presentation"
          onClick={closeCancellation}
        >
          <section
            className="booking-cancellation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancellation-title"
            onClick={(e) => e.stopPropagation()}
          >
            {!requestPrepared ? (
              <>
                <span className="booking-cancellation-eyebrow">
                  ÉLAN HOMES BOOKING POLICY
                </span>

                <h2 id="cancellation-title">Cancel Your Booking</h2>

                <p>
                  Please review the cancellation and refund conditions before
                  proceeding.
                </p>

                <div className="booking-cancellation-reference">
                  <span>BOOKING REFERENCE</span>
                  <strong>
                    {activeCancellation.bookingReference ||
                      activeCancellation.id}
                  </strong>
                </div>

                <div className="booking-cancellation-rules">
                  <div>
                    <strong>Within 24 hours of booking</strong>
                    <span>
                      100% refund when the check-in date is at least 7 days
                      away.
                    </span>
                  </div>

                  <div>
                    <strong>7 days or more before check-in</strong>
                    <span>100% refund of the amount paid.</span>
                  </div>

                  <div>
                    <strong>3 days to less than 7 days before check-in</strong>
                    <span>70% refund of the amount paid.</span>
                  </div>

                  <div>
                    <strong>Less than 3 days before check-in</strong>
                    <span>50% refund of the amount paid.</span>
                  </div>

                  <div>
                    <strong>No-show</strong>
                    <span>
                      No refund where a customer does not arrive and does not
                      notify ÉLAN HOMES.
                    </span>
                  </div>
                </div>

                <p className="booking-cancellation-note">
                  Refund percentages are calculated against the full amount paid
                  on your invoice. Your invoice is all-inclusive; no additional
                  processing-fee deductions are made.
                </p>

                <label className="booking-cancellation-acknowledgement">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                  />

                  <span>
                    I have read and understood the cancellation and refund
                    policy.
                  </span>
                </label>

                <div className="booking-cancellation-buttons">
                  <button
                    type="button"
                    className="booking-cancellation-confirm"
                    onClick={handleCancellationRequest}
                  >
                    Confirm Cancellation
                  </button>

                  <button
                    type="button"
                    className="booking-cancellation-continue"
                    onClick={closeCancellation}
                  >
                    Continue with Stay
                  </button>
                </div>
              </>
            ) : (
              <div className="booking-cancellation-prepared">
                <div className="booking-cancellation-success-icon">✓</div>

                <h2>Cancellation Request Prepared</h2>

                <p>
                  Your cancellation request has been prepared for booking{" "}
                  <strong>
                    {activeCancellation.bookingReference ||
                      activeCancellation.id}
                  </strong>
                  .
                </p>

                <button
                  type="button"
                  className="booking-cancellation-confirm"
                  onClick={closeCancellation}
                >
                  CLOSE
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* EARLY CHECKOUT POLICY MODAL */}
      {activeEarlyCheckout && (
        <div
          className="booking-cancellation-overlay"
          role="presentation"
          onClick={closeEarlyCheckout}
        >
          <section
            className="booking-cancellation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-checkout-title"
            onClick={(e) => e.stopPropagation()}
          >
            {!earlyCheckoutPrepared ? (
              <>
                <span className="booking-cancellation-eyebrow">
                  ÉLAN HOMES BOOKING POLICY
                </span>

                <h2 id="early-checkout-title">Request Early Checkout</h2>

                <p>
                  If you need to leave before your confirmed departure date,
                  please review the early-checkout policy and select the notice
                  arrangement that applies to you.
                </p>

                <div className="booking-cancellation-reference">
                  <span>BOOKING REFERENCE</span>
                  <strong>
                    {activeEarlyCheckout.bookingReference ||
                      activeEarlyCheckout.id}
                  </strong>

                  <span>CONFIRMED CHECK-OUT DATE</span>
                  <strong>{formatDate(activeEarlyCheckout.checkOut)}</strong>
                </div>

                <div className="booking-early-checkout-policy">
                  <h3>Early Checkout Policy</h3>

                  <p>
                    Customers must notify ÉLAN HOMES through the official
                    communication channels when requesting an early checkout.
                  </p>

                  <p>
                    <strong>With one-day notice:</strong> The actual nights
                    stayed and the one-day notice period are treated as occupied
                    days. A refund is calculated against the remaining unused
                    accommodation amount.
                  </p>

                  <p>
                    <strong>
                      Immediate checkout without the required notice:
                    </strong>{" "}
                    The refund is calculated under the applicable immediate
                    early-checkout settlement rules.
                  </p>

                  <p>
                    ÉLAN HOMES will communicate the applicable refund amount and
                    settlement details to you.
                  </p>
                </div>

                <div className="booking-early-checkout-options">
                  <h3>Which notice arrangement applies?</h3>

                  <label>
                    <input
                      type="radio"
                      name="earlyCheckoutNotice"
                      value="one_day_notice"
                      checked={earlyCheckoutNotice === "one_day_notice"}
                      onChange={(e) => setEarlyCheckoutNotice(e.target.value)}
                    />

                    <span>I am giving one-day notice before checking out.</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="earlyCheckoutNotice"
                      value="immediate"
                      checked={earlyCheckoutNotice === "immediate"}
                      onChange={(e) => setEarlyCheckoutNotice(e.target.value)}
                    />

                    <span>
                      I need to check out immediately without the required
                      notice.
                    </span>
                  </label>
                </div>

                <label className="booking-cancellation-acknowledgement">
                  <input
                    type="checkbox"
                    checked={earlyCheckoutAcknowledged}
                    onChange={(e) =>
                      setEarlyCheckoutAcknowledged(e.target.checked)
                    }
                  />

                  <span>
                    I have read and understood the early-checkout policy and the
                    notice arrangement selected above.
                  </span>
                </label>

                <div className="booking-cancellation-buttons">
                  <button
                    type="button"
                    className="booking-cancellation-confirm"
                    onClick={handleEarlyCheckoutRequest}
                  >
                    Confirm Early Checkout Request
                  </button>

                  <button
                    type="button"
                    className="booking-cancellation-continue"
                    onClick={closeEarlyCheckout}
                  >
                    Continue with Stay
                  </button>
                </div>
              </>
            ) : (
              <div className="booking-cancellation-prepared">
                <div className="booking-cancellation-success-icon">✓</div>

                <h2>Early Checkout Request Prepared</h2>

                <p>
                  Your early-checkout request for booking{" "}
                  <strong>
                    {activeEarlyCheckout.bookingReference ||
                      activeEarlyCheckout.id}
                  </strong>{" "}
                  has been prepared.
                </p>

                <button
                  type="button"
                  className="booking-cancellation-confirm"
                  onClick={closeEarlyCheckout}
                >
                  CLOSE
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
