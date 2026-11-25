import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { getListingById } from "../utils/listingLookup";
import createEnquiryRecord from "../utils/enquiryRecords";
import generateEnquiryReference from "../utils/enquiryReference";

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

  const isValidDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
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

  const validStayBooking =
    categoryKey === "stay" &&
    checkInDate &&
    checkOutDate &&
    checkOutDate > checkInDate &&
    guests !== null &&
    guests > 0 &&
    nights !== null &&
    nights > 0 &&
    total !== null &&
    total >= 0;

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
  };

  // CREATE AND SAVE ALL ENQUIRIES
  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (!listing) {
        throw new Error("The selected listing could not be found.");
      }

      // CREATE CENTRAL ENQUIRY RECORD
      const record = createEnquiryRecord({
        category: categoryKey,
        listing,
        customer: formData,
        message: formData.message,
        bookingDetails:
          categoryKey === "stay" && validStayBooking
            ? {
                checkIn,
                checkOut,
                guests,
                nights,
                estimatedTotal: total,
              }
            : null,
      });

      // ENSURE SUBMISSION DATE IS RECORDED
      const enquiryRecord = {
        ...record,
        createdAt: record.createdAt || new Date().toISOString(),
      };

      // SAVE ALL CATEGORIES TO CENTRAL ENQUIRY COLLECTION
      const existingEnquiries = JSON.parse(
        localStorage.getItem("elanEnquiries") || "[]",
      );

      if (!Array.isArray(existingEnquiries)) {
        throw new Error("Stored enquiry records are invalid.");
      }

      localStorage.setItem(
        "elanEnquiries",
        JSON.stringify([...existingEnquiries, enquiryRecord]),
      );

      // SAVE STAY BOOKING ENQUIRIES TO MY BOOKINGS
      if (categoryKey === "stay" && validStayBooking) {
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
          location: listingLocation,
          image: listing.image || "",

          // BOOKING INFORMATION
          checkIn,
          checkOut,
          guests,
          nights,
          total,

          // CUSTOMER INFORMATION
          customerName: formData.fullName.trim(),
          customerEmail: formData.email.trim().toLowerCase(),
          customerPhone: formData.phone,

          // INITIAL BOOKING STATUS
          status: "pending",
        };

        localStorage.setItem(
          "elanBookings",
          JSON.stringify([...existingBookings, bookingRecord]),
        );
      }

      setCreatedRecord(enquiryRecord);
      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry record creation failed:", error);

      alert(
        "We could not prepare your enquiry. Please check your details and try again.",
      );
    }
  };

  // GENERATE STANDARD REFERENCE NUMBER
  const referenceNumber = createdRecord
    ? generateEnquiryReference(createdRecord.id)
    : "";

  // COPY REFERENCE NUMBER
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
        <div className="enquiry-heading">
          <span className="enquiry-eyebrow">ÉLAN HOMES CUSTOMER SUPPORT</span>

          <h1>Send an Enquiry</h1>

          <p>
            Interested in this listing? Send your enquiry to ÉLAN HOMES. Our
            team will coordinate with the owner or authorised representative and
            communicate the response to you.
          </p>
        </div>

        <div className="enquiry-layout">
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

          <section className="enquiry-form-section">
            {submitted ? (
              <div className="enquiry-success">
                <h2>Enquiry Prepared Successfully</h2>

                <p>
                  Your enquiry details have been prepared successfully. Once our
                  secure communication system is connected, ÉLAN HOMES will be
                  able to process your request, coordinate with the relevant
                  property owner or authorised representative, and keep you
                  informed of the progress.
                </p>

                {createdRecord && (
                  <div className="enquiry-reference">
                    <span>ÉLAN HOMES REFERENCE NUMBER</span>

                    <strong>{referenceNumber}</strong>

                    <button
                      type="button"
                      className="enquiry-copy-reference"
                      onClick={handleCopyReference}
                    >
                      {copied ? "Reference Copied ✓" : "Copy Reference Number"}
                    </button>
                  </div>
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

                {validStayBooking && (
                  <div className="enquiry-booking-summary">
                    <h3>Your Stay Request</h3>

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
                      This is a booking enquiry, not a confirmed reservation.
                      Availability and final booking arrangements must be
                      confirmed by ÉLAN HOMES.
                    </p>
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

                  <button type="submit" className="enquiry-submit-button">
                    Submit Enquiry
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
