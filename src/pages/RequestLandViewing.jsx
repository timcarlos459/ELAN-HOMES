import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import landListings from "../data/land";
import { createEnquiryRecord } from "../utils/enquiryRecords";
import { isLandViewingDateAvailable } from "../utils/landViewingAvailability";
import "./RequestLandViewing.css";

export default function RequestLandViewing() {
  const { id } = useParams();

  // FIND LAND USING ITS UUID
  const land = landListings.find((item) => item.id === id);

  // LOCAL DATE FORMAT: YYYY-MM-DD
  const getLocalDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getLocalDate();

  // STRICT DATE VALIDATION
  const isValidViewingDate = (value) => {
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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    acceptFeePolicy: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdReference, setCreatedReference] = useState("");
  const [createdInvoice, setCreatedInvoice] = useState(null);

  // LAND AVAILABILITY
  const landStatus = String(land?.status || "")
    .toLowerCase()
    .trim();

  const availabilityStatus = String(land?.availabilityStatus || "")
    .toLowerCase()
    .trim();

  const isSold =
    landStatus === "sold" ||
    availabilityStatus === "sold" ||
    land?.isSold === true;

  const unavailableStatuses = ["unavailable", "blocked", "not available"];

  const isAvailable =
    !isSold &&
    !unavailableStatuses.includes(landStatus) &&
    !unavailableStatuses.includes(availabilityStatus);

  // SELECTED VIEWING DATE
  const selectedDateAvailable =
    Boolean(formData.preferredDate) &&
    isValidViewingDate(formData.preferredDate) &&
    formData.preferredDate >= today &&
    isAvailable &&
    isLandViewingDateAvailable(land, formData.preferredDate);

  // FORM CHANGES
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // FORM SUBMISSION
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (isSubmitting) return;

    if (!land) {
      setError("The selected land listing could not be found.");
      return;
    }

    if (isSold) {
      setError(
        "This land has been sold and is no longer available for viewing.",
      );
      return;
    }

    if (!isAvailable) {
      setError(
        "This land is currently unavailable for viewing. Please explore other listings.",
      );
      return;
    }

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setError(
        "Please enter your phone number with country code, for example +254712345678.",
      );
      return;
    }

    if (!formData.acceptFeePolicy) {
      setError("Please accept the viewing and connection fee policy.");
      return;
    }

    if (
      !isValidViewingDate(formData.preferredDate) ||
      formData.preferredDate < today
    ) {
      setError("Please select a valid viewing date.");
      return;
    }

    if (!formData.preferredTime) {
      setError("Please select your preferred viewing time.");
      return;
    }

    if (!isLandViewingDateAvailable(land, formData.preferredDate)) {
      setError(
        "This date is unavailable for land viewing. Please select another date.",
      );
      return;
    }

    // PREVENT DUPLICATE SUBMISSIONS
    setIsSubmitting(true);

    try {
      const now = new Date().toISOString();

      // CREATE CENTRAL ENQUIRY RECORD
      const record = createEnquiryRecord({
        category: "land",
        listing: land,
        customer: {
          fullName,
          email,
          phone,
        },
        message,
      });

      if (!record?.id) {
        throw new Error(
          "Your enquiry reference could not be generated. Please try again.",
        );
      }

      // GENERATE INVOICE UUID
      if (!globalThis.crypto?.randomUUID) {
        throw new Error(
          "Secure invoice generation is unavailable in this browser.",
        );
      }

      const invoiceId = globalThis.crypto.randomUUID();

      const invoiceReference = `ELAN-LAND-VIEW-${invoiceId
        .slice(0, 8)
        .toUpperCase()}`;

      // LAND VIEWING REQUEST RECORD
      const viewingRecord = {
        ...record,

        enquiryType: "land_viewing",

        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,

        viewingDate: formData.preferredDate,
        viewingTime: formData.preferredTime,

        paid: false,
        paymentStatus: "not_due",

        feeAmount: null,
        feeCurrency: "KES",

        feePolicyAccepted: true,
        feePolicyAcceptedAt: now,

        status: "awaiting_fee_confirmation",
        viewingStatus: "awaiting_fee_confirmation",

        invoiceId,
        invoiceReference,

        createdAt: now,
      };

      // PROVISIONAL LAND VIEWING INVOICE
      const invoiceRecord = {
        id: invoiceId,
        invoiceId,
        invoiceReference,

        enquiryId: record.id,
        listingId: land.id,
        listingName: land.title,
        listingLocation: `${land.destination}, ${land.region}, Kenya`,

        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,

        invoiceType: "land_viewing_connection_fee",

        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,

        currency: "KES",
        amount: null,

        invoiceStatus: "provisional",
        paymentStatus: "not_due",

        paid: false,

        createdAt: now,
      };

      // READ EXISTING ENQUIRIES
      const existingRecords = JSON.parse(
        localStorage.getItem("elanEnquiries") || "[]",
      );

      if (!Array.isArray(existingRecords)) {
        throw new Error("Your enquiry records could not be accessed.");
      }

      // READ EXISTING INVOICES
      const existingInvoices = JSON.parse(
        localStorage.getItem("elanInvoices") || "[]",
      );

      if (!Array.isArray(existingInvoices)) {
        throw new Error("Your invoice records could not be accessed.");
      }

      // SAVE ENQUIRY
      localStorage.setItem(
        "elanEnquiries",
        JSON.stringify([...existingRecords, viewingRecord]),
      );

      // SAVE PROVISIONAL INVOICE
      localStorage.setItem(
        "elanInvoices",
        JSON.stringify([...existingInvoices, invoiceRecord]),
      );

      // DISPLAY CONFIRMATION
      setCreatedReference(`ELAN-${record.id.toUpperCase()}`);
      setCreatedInvoice(invoiceRecord);
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Land viewing request error:", submissionError);

      setError(
        submissionError.message ||
          "We could not save your viewing request. Please try again.",
      );

      setIsSubmitting(false);
    }
  };

  // PRICE FORMAT
  const formatPrice = (price) => {
    if (typeof price === "number" && Number.isFinite(price)) {
      return `KSh ${price.toLocaleString("en-KE")}`;
    }

    if (typeof price === "string" && price.trim()) {
      return price.startsWith("KSh") ? price : `KSh ${price}`;
    }

    return "Price on request";
  };

  // LAND NOT FOUND
  if (!land) {
    return (
      <>
        <SEO
          title="Land Not Found | ÉLAN HOMES"
          description="The requested land listing could not be found."
        />

        <main className="land-viewing-page">
          <div className="land-viewing-not-found">
            <span>ÉLAN HOMES LAND COLLECTION</span>
            <h1>Land Listing Not Available</h1>
            <p>
              This land listing may have been removed or is no longer available.
            </p>
            <Link to="/land">Explore Land Opportunities</Link>
          </div>
        </main>
      </>
    );
  }

  // SOLD LAND
  if (isSold) {
    return (
      <>
        <SEO
          title={`Land Sold | ${land.title} | ÉLAN HOMES`}
          description={`This land listing in ${land.destination}, ${land.region}, Kenya is no longer available for viewing.`}
        />

        <main className="land-viewing-page">
          <div className="land-viewing-not-found">
            <span>ÉLAN HOMES LAND COLLECTION</span>
            <h1>This Land Has Been Sold</h1>
            <p>
              This listing is no longer accepting viewing requests. You can
              explore other land opportunities through ÉLAN HOMES.
            </p>
            <Link to="/land">Explore Available Land</Link>
          </div>
        </main>
      </>
    );
  }

  // UNAVAILABLE LAND
  if (!isAvailable) {
    return (
      <>
        <SEO
          title={`Land Viewing Unavailable | ${land.title} | ÉLAN HOMES`}
          description="This land listing is temporarily unavailable for viewing."
        />

        <main className="land-viewing-page">
          <div className="land-viewing-not-found">
            <span>ÉLAN HOMES LAND COLLECTION</span>
            <h1>Viewing Currently Unavailable</h1>
            <p>
              This land listing is not currently accepting viewing requests.
              Please explore other available land opportunities.
            </p>
            <Link to="/land">Explore Available Land</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="land-viewing-page">
      <SEO
        title={`Request Land Viewing | ${land.title} | ÉLAN HOMES`}
        description={`Request a viewing for ${land.title} in ${land.destination}, ${land.region}, Kenya.`}
      />

      <div className="land-viewing-container">
        {/* BREADCRUMB */}
        <nav className="land-viewing-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/land">Land</Link>
          <span>/</span>
          <Link to={`/land/${land.id}`}>{land.title}</Link>
          <span>/</span>
          <span>Request Viewing</span>
        </nav>

        {/* PAGE HEADING */}
        <header className="land-viewing-heading">
          <span>ÉLAN HOMES • LAND COLLECTION</span>
          <h1>Request a Land Viewing</h1>
          <p>
            Provide your details and preferred viewing schedule. Our team will
            review your request and coordinate the next steps.
          </p>
        </header>

        <div className="land-viewing-layout">
          <section className="land-viewing-form-section">
            {submitted ? (
              <div className="land-viewing-success">
                <div className="land-viewing-success-icon">✓</div>

                <span>ÉLAN HOMES CUSTOMER SERVICE</span>

                <h2>Viewing Request Recorded</h2>

                <p>
                  Your land viewing request has been recorded. ÉLAN HOMES will
                  review your request and coordinate with the authorised land
                  representative.
                </p>

                {/* REQUEST REFERENCE */}
                <div className="land-viewing-confirmation-reference">
                  <span>VIEWING REQUEST REFERENCE</span>
                  <strong>{createdReference}</strong>
                </div>

                {/* VIEWING DETAILS */}
                <div className="land-viewing-confirmation-details">
                  <h3>Viewing Request Details</h3>

                  <div>
                    <span>Land Listing</span>
                    <strong>{land.title}</strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>
                      {land.destination}, {land.region}
                    </strong>
                  </div>

                  <div>
                    <span>Preferred Date</span>
                    <strong>{createdInvoice?.preferredDate}</strong>
                  </div>

                  <div>
                    <span>Preferred Time</span>
                    <strong>{createdInvoice?.preferredTime}</strong>
                  </div>
                </div>

                {/* PROVISIONAL INVOICE */}
                <div className="land-viewing-invoice">
                  <div className="land-viewing-invoice-heading">
                    <div>
                      <span>ÉLAN HOMES</span>
                      <h3>Viewing Fee Summary</h3>
                    </div>

                    <span className="land-viewing-invoice-badge">
                      PROVISIONAL
                    </span>
                  </div>

                  <div className="land-viewing-invoice-reference">
                    <span>Invoice Reference</span>
                    <strong>{createdInvoice?.invoiceReference}</strong>
                  </div>

                  <div className="land-viewing-invoice-line">
                    <span>Land Viewing Connection Fee</span>
                    <strong>To be confirmed</strong>
                  </div>

                  <div className="land-viewing-invoice-total">
                    <span>Amount Payable</span>
                    <strong>Not yet determined</strong>
                  </div>

                  <div className="land-viewing-invoice-payment">
                    <span>Payment Status</span>
                    <strong>NOT YET DUE</strong>
                  </div>

                  <p>
                    The viewing connection fee will be communicated before
                    payment. It is separate from the land purchase price.
                  </p>

                  <p>
                    This is a provisional summary, not an official payable
                    invoice. The official invoice will be issued once ÉLAN HOMES
                    confirms the viewing and applicable fee.
                  </p>
                </div>

                {/* NEXT STEPS */}
                <div className="land-viewing-next-steps">
                  <span>REQUEST STATUS</span>
                  <strong>AWAITING FEE CONFIRMATION</strong>

                  <p>
                    Payment instructions will be provided after confirmation.
                    Your viewing will be processed according to the confirmed
                    arrangements.
                  </p>
                </div>

                <Link to="/bookings">View My Bookings &amp; Enquiries</Link>

                <p className="land-viewing-confirmation-note">
                  If ÉLAN HOMES cancels the viewing or cannot provide the
                  promised service, you may choose either a refund of the amount
                  paid or an alternative viewing date.
                </p>
              </div>
            ) : (
              <>
                <h2>Your Contact Details</h2>

                <p className="land-viewing-form-intro">
                  Please provide accurate information so our team can reach you.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* CONTACT DETAILS */}
                  <div className="land-viewing-form-group">
                    <label htmlFor="fullName">Full Name</label>

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="land-viewing-form-row">
                    <div className="land-viewing-form-group">
                      <label htmlFor="email">Email Address</label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="land-viewing-form-group">
                      <label htmlFor="phone">Phone Number</label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+254712345678"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        pattern="^\+[1-9]\d{7,14}$"
                        title="Enter your phone number with country code, for example +254712345678."
                        required
                      />
                    </div>
                  </div>

                  {/* VIEWING SCHEDULE */}
                  <h2 className="land-viewing-schedule-title">
                    Preferred Viewing Schedule
                  </h2>

                  <div className="land-viewing-form-row">
                    <div className="land-viewing-form-group">
                      <label htmlFor="preferredDate">Preferred Date</label>

                      <input
                        id="preferredDate"
                        type="date"
                        name="preferredDate"
                        min={today}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                      />

                      {formData.preferredDate && (
                        <p
                          className={
                            selectedDateAvailable
                              ? "land-viewing-date-available"
                              : "land-viewing-date-unavailable"
                          }
                          role="status"
                        >
                          {selectedDateAvailable
                            ? "This date is available for a viewing request."
                            : "This date is unavailable. Please select another date."}
                        </p>
                      )}
                    </div>

                    <div className="land-viewing-form-group">
                      <label htmlFor="preferredTime">Preferred Time</label>

                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select preferred time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>

                  {/* ADDITIONAL INFORMATION */}
                  <div className="land-viewing-form-group">
                    <label htmlFor="message">
                      Additional Information (Optional)
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Share any additional information about your viewing..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* VIEWING FEE POLICY */}
                  <div className="land-viewing-policy">
                    <h3>Viewing &amp; Connection Fee Policy</h3>

                    <p>
                      A viewing and connection fee applies to land viewing
                      requests. The fee is payable before the request is
                      processed. The amount will be communicated before payment.
                    </p>

                    <p>
                      Once paid and the viewing request has been processed, the
                      fee is non-refundable if you cancel the request.
                    </p>

                    <p>
                      If ÉLAN HOMES cancels the viewing or cannot provide the
                      promised service, you may choose either a refund of the
                      amount paid or an alternative viewing date.
                    </p>

                    <p>The fee is separate from the land purchase price.</p>

                    <label className="land-viewing-checkbox">
                      <input
                        type="checkbox"
                        name="acceptFeePolicy"
                        checked={formData.acceptFeePolicy}
                        onChange={handleChange}
                        required
                      />

                      <span>
                        I have read and agree to the viewing and connection fee
                        policy.
                      </span>
                    </label>
                  </div>

                  {error && (
                    <p role="alert" className="land-viewing-error">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="land-viewing-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Viewing Request"}
                  </button>

                  <p className="land-viewing-security-note">
                    Your contact information will be handled confidentially by
                    ÉLAN HOMES.
                  </p>
                </form>
              </>
            )}
          </section>

          {/* LAND SUMMARY */}
          <aside className="land-viewing-property-card">
            <span>YOUR SELECTED LAND</span>

            <h2>{land.title}</h2>

            <p>
              {land.destination}, {land.region}, Kenya
            </p>

            <div className="land-viewing-property-info">
              <div>
                <small>Land Type</small>
                <strong>{land.type || "Not specified"}</strong>
              </div>

              <div>
                <small>Land Size</small>
                <strong>{land.size || "Not specified"}</strong>
              </div>

              <div>
                <small>Asking Price</small>
                <strong>{formatPrice(land.price)}</strong>
              </div>
            </div>

            <Link to={`/land/${land.id}`}>View Land Details ↗</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
