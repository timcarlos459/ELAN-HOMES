import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { getListingById } from "../utils/listingLookup";
import createEnquiryRecord from "../utils/enquiryRecords";
import generateEnquiryReference from "../utils/enquiryReference";
import { isStayDateRangeAvailable } from "../utils/stayAvailability";

import "./Enquiry.css";

function Enquiry() {
  const { category, id } = useParams();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdRecord, setCreatedRecord] = useState(null);
  const [copied, setCopied] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const categoryKey = category?.toLowerCase();

  const categoryLabels = {
    property: "Property",
    land: "Land",
    stay: "Stay",
  };

  const selectedCategory = categoryLabels[categoryKey];
  const listing = getListingById(categoryKey, id);

  // STAY BOOKING DETAILS
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guestsValue = searchParams.get("guests") || "";
  const nightsValue = searchParams.get("nights") || "";
  const totalValue = searchParams.get("total") || "";

  // DATE VALIDATION
  const isValidDate = (value) => {
    if (typeof value !== "string") return false;

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) return false;

    const [, year, month, day] = match;

    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    return (
      date.getUTCFullYear() === Number(year) &&
      date.getUTCMonth() === Number(month) - 1 &&
      date.getUTCDate() === Number(day)
    );
  };

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const calculateNights = (start, end) => {
    if (!isValidDate(start) || !isValidDate(end)) return 0;

    const [startYear, startMonth, startDay] = start.split("-").map(Number);
    const [endYear, endMonth, endDay] = end.split("-").map(Number);

    const startDate = Date.UTC(startYear, startMonth - 1, startDay);
    const endDate = Date.UTC(endYear, endMonth - 1, endDay);

    return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const checkInDate = isValidDate(checkIn)
    ? new Date(`${checkIn}T00:00:00`)
    : null;

  const checkOutDate = isValidDate(checkOut)
    ? new Date(`${checkOut}T00:00:00`)
    : null;

  const guests = /^\d+$/.test(guestsValue) ? Number(guestsValue) : null;

  const nights = /^\d+$/.test(nightsValue) ? Number(nightsValue) : null;

  const total = /^\d+(\.\d+)?$/.test(totalValue) ? Number(totalValue) : null;

  const calculatedNights = calculateNights(checkIn, checkOut);

  const nightlyPrice = Number(listing?.price);

  const validStayBooking =
    categoryKey === "stay" &&
    Boolean(
      listing &&
      checkInDate &&
      checkOutDate &&
      checkIn >= getToday() &&
      checkOut > checkIn &&
      guests !== null &&
      guests > 0 &&
      nights !== null &&
      nights > 0 &&
      nights === calculatedNights &&
      total !== null &&
      total > 0 &&
      Number.isFinite(nightlyPrice) &&
      nightlyPrice > 0 &&
      Math.abs(total - nights * nightlyPrice) < 0.01 &&
      isStayDateRangeAvailable(listing, checkIn, checkOut) &&
      (listing.guests == null || guests <= Number(listing.guests)),
    );

  // FORMATTING
  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price, selectedType) => {
    if (price === undefined || price === null) {
      return "Price on request";
    }

    const formatted = new Intl.NumberFormat("en-KE").format(price);

    return selectedType === "stay"
      ? `KSh ${formatted} per night`
      : `KSh ${formatted}`;
  };

  const formatCurrency = (amount) => {
    return `KSh ${new Intl.NumberFormat("en-KE").format(amount)}`;
  };

  const listingName = listing?.name || listing?.title;

  const listingLocation =
    listing?.location ||
    [listing?.destination, listing?.region].filter(Boolean).join(", ");

  // CUSTOMER FORM
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "phone" ? value.replace(/[\s()-]/g, "") : value,
    }));

    setSubmissionError("");
  };

  // CREATE AND SAVE ALL ENQUIRIES
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmissionError("");

    try {
      if (!listing) {
        throw new Error("The selected listing could not be found.");
      }

      // A STAY REQUEST MUST HAVE VALID BOOKING DETAILS.
      if (categoryKey === "stay" && !validStayBooking) {
        throw new Error(
          "Your selected booking details are invalid or unavailable. Please return to the stay listing and select available dates again.",
        );
      }

      // CREATE CENTRAL ENQUIRY RECORD
      const record = createEnquiryRecord({
        category: categoryKey,
        listing,
        customer: formData,
        message: formData.message,
        bookingDetails:
          categoryKey === "stay"
            ? {
                checkIn,
                checkOut,
                guests,
                nights,
                estimatedTotal: total,
                nightlyRate: nightlyPrice,
              }
            : null,
      });

      const enquiryRecord = {
        ...record,
        createdAt: record.createdAt || new Date().toISOString(),
      };

      // READ EXISTING ENQUIRIES
      const existingEnquiries = JSON.parse(
        localStorage.getItem("elanEnquiries") || "[]",
      );

      if (!Array.isArray(existingEnquiries)) {
        throw new Error("Stored enquiry records are invalid.");
      }

      let updatedBookings = null;

      // PREPARE STAY BOOKING RECORD
      if (categoryKey === "stay") {
        const existingBookings = JSON.parse(
          localStorage.getItem("elanBookings") || "[]",
        );

        if (!Array.isArray(existingBookings)) {
          throw new Error("Stored booking records are invalid.");
        }

        const bookingRecord = {
          ...enquiryRecord,

          // LISTING INFORMATION
          stayName: listingName,
          listingTitle: listingName,
          location: listingLocation,
          image: listing.image || "",

          // BOOKING INFORMATION
          checkIn,
          checkOut,
          guests,
          nights,
          nightlyRate: nightlyPrice,
          total,
          estimatedTotal: total,

          // CUSTOMER INFORMATION
          customerName: formData.fullName.trim(),
          customerEmail: formData.email.trim().toLowerCase(),
          customerPhone: formData.phone,

          // BOOKING IDENTIFICATION
          bookingReference: generateEnquiryReference(record.id),

          // PROVISIONAL INVOICE
          invoiceReference: `ELAN-INV-${record.id.toUpperCase()}`,
          invoiceStatus: "provisional",
          invoiceAmount: total,
          currency: "KES",

          // PAYMENT INFORMATION
          paymentStatus: "not_due",
          paid: false,

          // BOOKING STATUS
          status: "awaiting_confirmation",
          bookingStatus: "awaiting_confirmation",

          // PAYMENT IS NOT REQUESTED UNTIL AVAILABILITY IS CONFIRMED.
          paymentInstructionsIssued: false,

          createdAt: enquiryRecord.createdAt,
        };

        updatedBookings = [...existingBookings, bookingRecord];
      }

      // SAVE CENTRAL ENQUIRY RECORD
      localStorage.setItem(
        "elanEnquiries",
        JSON.stringify([...existingEnquiries, enquiryRecord]),
      );

      // SAVE STAY BOOKING RECORD
      if (updatedBookings) {
        localStorage.setItem("elanBookings", JSON.stringify(updatedBookings));
      }

      setCreatedRecord(enquiryRecord);
      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry record creation failed:", error);

      setSubmissionError(
        error.message ||
          "We could not prepare your enquiry. Please check your details and try again.",
      );
    }
  };

  // GENERATE STANDARD REFERENCE
  const referenceNumber = createdRecord
    ? generateEnquiryReference(createdRecord.id)
    : "";

  // INVOICE REFERENCE
  const invoiceReference = createdRecord
    ? `ELAN-INV-${createdRecord.id.toUpperCase()}`
    : "";

  // COPY REFERENCE
  const handleCopyReference = async () => {
    if (!referenceNumber) return;

    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
    } catch (error) {
      console.error("Could not copy reference number:", error);

      alert(
        "Unable to copy automatically. Please select and copy the reference number.",
      );
    }
  };

  // INVALID CATEGORY
  if (!selectedCategory) {
    return (
      <main className="enquiry-page">
        <div className="enquiry-not-found">
          <h2>Invalid Enquiry Category</h2>
          <p>Please return to ÉLAN HOMES and select a valid listing.</p>
          <Link to="/">Return Home</Link>
        </div>
      </main>
    );
  }

  // LISTING NOT FOUND
  if (!listing) {
    return (
      <main className="enquiry-page">
        <div className="enquiry-not-found">
          <h2>Listing Not Found</h2>
          <p>
            We could not find the selected listing. It may have been removed or
            the link may be incorrect.
          </p>
          <Link to="/">Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="enquiry-page">
      <div className="enquiry-container">
        {/* PAGE HEADING */}
        <div className="enquiry-heading">
          <span className="enquiry-eyebrow">ÉLAN HOMES CUSTOMER SUPPORT</span>

          <h1>
            {categoryKey === "stay"
              ? "Complete Your Booking Request"
              : "Send an Enquiry"}
          </h1>

          <p>
            Interested in this listing? Send your enquiry to ÉLAN HOMES. Our
            team will coordinate with the owner or authorised representative and
            communicate the response to you.
          </p>
        </div>

        <div className="enquiry-layout">
          {/* LISTING CARD */}
          <aside className="enquiry-listing-card">
            {listing.image && (
              <img
                src={listing.image}
                alt={listingName}
                className="enquiry-listing-image"
              />
            )}

            <div className="enquiry-listing-content">
              <span className="enquiry-category">{selectedCategory}</span>

              <h2>{listingName}</h2>

              <p className="enquiry-listing-location">
                {listingLocation || "Location available on request"}
              </p>

              <p className="enquiry-listing-price">
                {formatPrice(listing.price, categoryKey)}
              </p>

              <p className="enquiry-listing-description">
                {listing.description ||
                  "Contact ÉLAN HOMES for more information about this listing."}
              </p>
            </div>
          </aside>

          {/* ENQUIRY FORM AND CONFIRMATION */}
          <section className="enquiry-form-section">
            {submitted ? (
              <div className="enquiry-success">
                {categoryKey === "stay" && validStayBooking ? (
                  <>
                    <h2>Booking Request Recorded</h2>

                    <p>
                      Your stay booking request has been recorded successfully.
                      ÉLAN HOMES will coordinate with the accommodation provider
                      to confirm availability.
                    </p>

                    {/* BOOKING REFERENCE */}
                    <div className="enquiry-reference">
                      <span>BOOKING REFERENCE</span>

                      <strong>{referenceNumber}</strong>

                      <button
                        type="button"
                        className="enquiry-copy-reference"
                        onClick={handleCopyReference}
                      >
                        {copied
                          ? "Reference Copied ✓"
                          : "Copy Booking Reference"}
                      </button>
                    </div>

                    {/* BOOKING CONFIRMATION SUMMARY */}
                    <div className="enquiry-booking-summary">
                      <h3>Booking Summary</h3>

                      <div className="enquiry-booking-details">
                        <div>
                          <span>Accommodation</span>
                          <strong>{listingName}</strong>
                        </div>

                        <div>
                          <span>Location</span>
                          <strong>{listingLocation}</strong>
                        </div>

                        <div>
                          <span>Check-in</span>
                          <strong>{formatDate(checkInDate)}</strong>
                        </div>

                        <div>
                          <span>Check-out</span>
                          <strong>{formatDate(checkOutDate)}</strong>
                        </div>

                        <div>
                          <span>Guests</span>
                          <strong>
                            {guests} {guests === 1 ? "Guest" : "Guests"}
                          </strong>
                        </div>

                        <div>
                          <span>Duration</span>
                          <strong>
                            {nights} {nights === 1 ? "Night" : "Nights"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* PROVISIONAL INVOICE */}
                    <div className="enquiry-invoice">
                      <div className="enquiry-invoice-heading">
                        <div>
                          <span>ÉLAN HOMES</span>
                          <h3>Booking Invoice Summary</h3>
                        </div>

                        <span className="enquiry-invoice-status">
                          PROVISIONAL
                        </span>
                      </div>

                      <div className="enquiry-invoice-meta">
                        <div>
                          <span>Invoice Reference</span>
                          <strong>{invoiceReference}</strong>
                        </div>

                        <div>
                          <span>Booking Reference</span>
                          <strong>{referenceNumber}</strong>
                        </div>

                        <div>
                          <span>Invoice Date</span>
                          <strong>
                            {formatDate(new Date(createdRecord.createdAt))}
                          </strong>
                        </div>
                      </div>

                      <div className="enquiry-invoice-line">
                        <span>
                          Accommodation ({nights}{" "}
                          {nights === 1 ? "night" : "nights"})
                        </span>

                        <strong>{formatCurrency(total)}</strong>
                      </div>

                      <div className="enquiry-invoice-line">
                        <span>Nightly Rate</span>
                        <strong>{formatCurrency(nightlyPrice)}</strong>
                      </div>

                      <div className="enquiry-invoice-total">
                        <span>Estimated Booking Total</span>
                        <strong>{formatCurrency(total)}</strong>
                      </div>

                      <div className="enquiry-payment-status">
                        <span>Payment Status</span>
                        <strong>NOT YET DUE</strong>
                      </div>

                      <p className="enquiry-invoice-note">
                        This is a provisional booking summary, not a confirmed
                        payable invoice. Payment instructions will be provided
                        after availability and booking details have been
                        confirmed by ÉLAN HOMES.
                      </p>
                    </div>

                    {/* BOOKING STATUS */}
                    <div className="enquiry-booking-status">
                      <span>Current Booking Status</span>
                      <strong>AWAITING CONFIRMATION</strong>
                    </div>

                    <p>
                      Please keep your booking reference. ÉLAN HOMES will
                      communicate the confirmation and payment instructions
                      through the contact details you provided.
                    </p>
                  </>
                ) : (
                  <>
                    <h2>Enquiry Prepared Successfully</h2>

                    <p>
                      Your enquiry details have been prepared successfully. ÉLAN
                      HOMES will coordinate with the relevant property owner or
                      authorised representative and communicate the response to
                      you.
                    </p>

                    <div className="enquiry-reference">
                      <span>ÉLAN HOMES REFERENCE NUMBER</span>

                      <strong>{referenceNumber}</strong>

                      <button
                        type="button"
                        className="enquiry-copy-reference"
                        onClick={handleCopyReference}
                      >
                        {copied
                          ? "Reference Copied ✓"
                          : "Copy Reference Number"}
                      </button>
                    </div>
                  </>
                )}

                <Link to="/" className="enquiry-back-home">
                  Back to ÉLAN HOMES
                </Link>
              </div>
            ) : (
              <>
                <div className="enquiry-form-heading">
                  <h2>Customer Information</h2>

                  <p>
                    Please provide your contact details and enquiry below. Our
                    customer relations team will assist you with your request
                    and coordinate the next steps.
                  </p>
                </div>

                {/* STAY BOOKING SUMMARY BEFORE SUBMISSION */}
                {categoryKey === "stay" && (
                  <div className="enquiry-booking-summary">
                    <h3>Your Stay Request</h3>

                    {validStayBooking ? (
                      <>
                        <div className="enquiry-booking-details">
                          <div>
                            <span>Check-in</span>
                            <strong>{formatDate(checkInDate)}</strong>
                          </div>

                          <div>
                            <span>Check-out</span>
                            <strong>{formatDate(checkOutDate)}</strong>
                          </div>

                          <div>
                            <span>Guests</span>
                            <strong>
                              {guests} {guests === 1 ? "Guest" : "Guests"}
                            </strong>
                          </div>

                          <div>
                            <span>Duration</span>
                            <strong>
                              {nights} {nights === 1 ? "Night" : "Nights"}
                            </strong>
                          </div>
                        </div>

                        <div className="enquiry-booking-total">
                          <span>Estimated Total</span>
                          <strong>{formatCurrency(total)}</strong>
                        </div>

                        <p>
                          This is a booking request, not a confirmed
                          reservation. Availability and final booking
                          arrangements must be confirmed by ÉLAN HOMES.
                        </p>
                      </>
                    ) : (
                      <p role="alert">
                        Your booking dates or booking details are invalid or
                        unavailable. Please return to the stay listing and
                        select a valid date range before continuing.
                      </p>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="enquiry-form-group">
                    <label htmlFor="fullName">Full Name</label>

                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="enquiry-form-group">
                    <label htmlFor="email">Email Address</label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="enquiry-form-group">
                    <label htmlFor="phone">
                      Phone Number (Country Code Required)
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254712345678"
                      pattern="^\+[1-9]\d{7,14}$"
                      title="Enter your phone number with country code, e.g. +254712345678"
                      required
                    />

                    <small>
                      Include the international country code, for example +254
                      for Kenya.
                    </small>
                  </div>

                  <div className="enquiry-form-group">
                    <label htmlFor="message">Your Message (Optional)</label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message (optional)"
                      rows="5"
                    />
                  </div>

                  <div className="enquiry-privacy-note">
                    Your enquiry is addressed to ÉLAN HOMES. We coordinate
                    communication with the relevant listing owner or authorised
                    representative. Owner contact details are not shared
                    directly through this form.
                  </div>

                  {submissionError && (
                    <p className="enquiry-form-error" role="alert">
                      {submissionError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="enquiry-submit-button"
                    disabled={categoryKey === "stay" && !validStayBooking}
                  >
                    {categoryKey === "stay"
                      ? "Submit Booking Request"
                      : "Submit Enquiry"}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Enquiry;
