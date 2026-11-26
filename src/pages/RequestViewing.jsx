import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties";
import SEO from "../components/SEO";
import { createEnquiryRecord } from "../utils/enquiryRecords";
import { isPropertyViewingDateAvailable } from "../utils/propertyViewingAvailability";
import "./RequestViewing.css";

export default function RequestViewing() {
  const { id } = useParams();

  // FIND PROPERTY USING UUID
  const property = properties.find(
    (item) => item.id === id && item.status !== "demo",
  );

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

  // PROPERTY STATUS
  const listingStatus = String(property?.status || "")
    .toLowerCase()
    .trim();

  const availabilityStatus = String(property?.availabilityStatus || "")
    .toLowerCase()
    .trim();

  const isSold =
    listingStatus === "sold" ||
    availabilityStatus === "sold" ||
    property?.isSold === true;

  const unavailableStatuses = ["unavailable", "blocked", "not available"];

  const isAvailable =
    !isSold &&
    !unavailableStatuses.includes(listingStatus) &&
    !unavailableStatuses.includes(availabilityStatus);

  // SELECTED VIEWING DATE
  const selectedDateAvailable =
    Boolean(formData.preferredDate) &&
    isValidViewingDate(formData.preferredDate) &&
    formData.preferredDate >= today &&
    isAvailable &&
    isPropertyViewingDateAvailable(property, formData.preferredDate);

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

    if (!property) {
      setError("The selected property could not be found.");
      return;
    }

    if (isSold) {
      setError(
        "This property has been sold and is no longer available for viewing.",
      );
      return;
    }

    if (!isAvailable) {
      setError(
        "This property is currently unavailable for viewing. Please explore other listings.",
      );
      return;
    }

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!fullName || !email || !phone) {
      setError("Please complete all your contact details.");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setError(
        "Please enter your phone number with country code, for example +254712345678.",
      );
      return;
    }

    if (!formData.acceptFeePolicy) {
      setError("Please accept the viewing connection fee policy.");
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

    if (!isPropertyViewingDateAvailable(property, formData.preferredDate)) {
      setError("This viewing date is unavailable. Please select another date.");
      return;
    }

    // PREVENT DUPLICATE SUBMISSIONS
    setIsSubmitting(true);

    try {
      const now = new Date().toISOString();

      // CREATE CENTRAL ENQUIRY RECORD
      const record = createEnquiryRecord({
        category: "property",
        listing: property,
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

      const invoiceReference = `ELAN-VIEW-${invoiceId
        .slice(0, 8)
        .toUpperCase()}`;

      // PROPERTY VIEWING REQUEST
      const viewingRecord = {
        ...record,

        enquiryType: "property_viewing",

        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,

        viewingDate: formData.preferredDate,
        viewingTime: formData.preferredTime,

        feeAmount: null,
        feeCurrency: "KES",

        paid: false,
        paymentStatus: "not_due",

        feePolicyAccepted: true,
        feePolicyAcceptedAt: now,

        status: "awaiting_fee_confirmation",
        viewingStatus: "awaiting_fee_confirmation",

        invoiceId,
        invoiceReference,

        createdAt: now,
      };

      // PROVISIONAL VIEWING INVOICE
      const invoiceRecord = {
        id: invoiceId,
        invoiceId,
        invoiceReference,

        enquiryId: record.id,

        listingId: property.id,
        listingName: property.name,
        listingLocation: property.location,

        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,

        invoiceType: "property_viewing_connection_fee",

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
      console.error("Property viewing request error:", submissionError);

      setError(
        submissionError.message ||
          "We could not save your viewing request. Please try again.",
      );

      setIsSubmitting(false);
    }
  };

  // PRICE FORMAT
  const formatPrice = (price) => {
    const amount = Number(price);

    if (!Number.isFinite(amount) || amount <= 0) {
      return "Price on request";
    }

    return `KSh ${amount.toLocaleString("en-KE")}`;
  };

  // PROPERTY NOT FOUND
  if (!property) {
    return (
      <>
        <SEO
          title="Property Not Found | ÉLAN HOMES"
          description="The requested property could not be found."
        />

        <main className="viewing-page">
          <div className="viewing-not-found">
            <h1>Property Not Found</h1>
            <p>This property may no longer be available.</p>
            <Link to="/properties">Explore Properties</Link>
          </div>
        </main>
      </>
    );
  }

  // SOLD PROPERTY
  if (isSold) {
    return (
      <>
        <SEO
          title="Property Sold | ÉLAN HOMES"
          description="This property is no longer available for viewing."
        />

        <main className="viewing-page">
          <div className="viewing-not-found">
            <h1>This Property Has Been Sold</h1>

            <p>
              New viewing requests are not available for this property. ÉLAN
              HOMES can help you find similar properties.
            </p>

            <Link to="/properties">Explore Available Properties</Link>
          </div>
        </main>
      </>
    );
  }

  // UNAVAILABLE PROPERTY
  if (!isAvailable) {
    return (
      <>
        <SEO
          title="Viewing Unavailable | ÉLAN HOMES"
          description="This property is temporarily unavailable for viewing."
        />

        <main className="viewing-page">
          <div className="viewing-not-found">
            <h1>Viewing Currently Unavailable</h1>

            <p>
              This property is not currently accepting viewing requests. Please
              explore other available properties.
            </p>

            <Link to="/properties">Explore Available Properties</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Request a Viewing - ${property.name} | ÉLAN HOMES`}
        description={`Request a viewing for ${property.name} in ${property.location} through ÉLAN HOMES.`}
      />

      <main className="viewing-page">
        <div className="viewing-container">
          {/* BREADCRUMB */}
          <div className="viewing-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/properties">Properties</Link>
            <span>/</span>
            <Link to={`/properties/${property.id}`}>{property.name}</Link>
            <span>/</span>
            <span>Request Viewing</span>
          </div>

          {/* PAGE HEADING */}
          <div className="viewing-heading">
            <span className="details-label">ÉLAN HOMES VIEWING SERVICE</span>

            <h1>Request a Property Viewing</h1>

            <p>
              Complete the form below and let ÉLAN HOMES help arrange your
              property viewing.
            </p>
          </div>

          <div className="viewing-layout">
            <section className="viewing-form-section">
              {submitted ? (
                <div className="viewing-success">
                  <span className="details-label">
                    ÉLAN HOMES CUSTOMER SERVICE
                  </span>

                  <h2>Viewing Request Recorded</h2>

                  <p>
                    Your property viewing request has been recorded. ÉLAN HOMES
                    will review your request and coordinate the next steps with
                    the authorised property representative.
                  </p>

                  {/* ENQUIRY REFERENCE */}
                  <div className="viewing-confirmation-reference">
                    <span>VIEWING REQUEST REFERENCE</span>
                    <strong>{createdReference}</strong>
                  </div>

                  {/* VIEWING DETAILS */}
                  <div className="viewing-confirmation-details">
                    <h3>Viewing Request Details</h3>

                    <div>
                      <span>Property</span>
                      <strong>{property.name}</strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{property.location}</strong>
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
                  <div className="viewing-invoice">
                    <div className="viewing-invoice-heading">
                      <div>
                        <span>ÉLAN HOMES</span>
                        <h3>Viewing Fee Summary</h3>
                      </div>

                      <span className="viewing-invoice-badge">PROVISIONAL</span>
                    </div>

                    <div className="viewing-invoice-reference">
                      <span>Invoice Reference</span>
                      <strong>{createdInvoice?.invoiceReference}</strong>
                    </div>

                    <div className="viewing-invoice-line">
                      <span>Property Viewing Connection Fee</span>
                      <strong>To be confirmed</strong>
                    </div>

                    <div className="viewing-invoice-total">
                      <span>Amount Payable</span>
                      <strong>Not yet determined</strong>
                    </div>

                    <div className="viewing-invoice-payment">
                      <span>Payment Status</span>
                      <strong>NOT YET DUE</strong>
                    </div>

                    <p>
                      The viewing connection fee will be communicated before
                      payment. This fee is separate from the property's purchase
                      price.
                    </p>

                    <p>
                      Payment instructions will be provided by ÉLAN HOMES after
                      the fee has been confirmed. This provisional summary is
                      not a payable invoice or payment request.
                    </p>
                  </div>

                  {/* NEXT STEPS */}
                  <div className="viewing-next-steps">
                    <span>REQUEST STATUS</span>

                    <strong>AWAITING FEE CONFIRMATION</strong>

                    <p>
                      Your viewing request has been recorded. The viewing will
                      be processed after the fee and payment arrangements have
                      been communicated.
                    </p>
                  </div>

                  <Link to="/bookings">View My Bookings &amp; Enquiries</Link>

                  <p className="viewing-confirmation-note">
                    If ÉLAN HOMES cancels the viewing or cannot provide the
                    promised service, you may choose either a refund of the
                    amount paid or an alternative viewing date.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Your Contact Details</h2>

                  <div className="viewing-form-group">
                    <label htmlFor="fullName">Full Name</label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="viewing-form-row">
                    <div className="viewing-form-group">
                      <label htmlFor="email">Email Address</label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="viewing-form-group">
                      <label htmlFor="phone">Phone Number</label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
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
                  <h2 className="viewing-section-title">
                    Preferred Viewing Schedule
                  </h2>

                  <div className="viewing-form-row">
                    <div className="viewing-form-group">
                      <label htmlFor="preferredDate">Preferred Date</label>

                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        min={today}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                      />

                      {formData.preferredDate && (
                        <p
                          className={
                            selectedDateAvailable
                              ? "viewing-date-available"
                              : "viewing-date-unavailable"
                          }
                          role="status"
                        >
                          {selectedDateAvailable
                            ? "This date is available for a viewing request."
                            : "This date is unavailable. Please choose another date."}
                        </p>
                      )}
                    </div>

                    <div className="viewing-form-group">
                      <label htmlFor="preferredTime">Preferred Time</label>

                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>

                  {/* ADDITIONAL INFORMATION */}
                  <div className="viewing-form-group">
                    <label htmlFor="message">
                      Additional Information (Optional)
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Any additional information about your viewing request..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* VIEWING FEE POLICY */}
                  <div className="viewing-policy">
                    <h3>Viewing Connection Fee</h3>

                    <p>
                      A connection fee is payable to ÉLAN HOMES before your
                      viewing request is processed. The exact amount will be
                      communicated before payment.
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

                    <p>
                      The viewing connection fee is not part of the property's
                      purchase price.
                    </p>

                    <label className="viewing-checkbox">
                      <input
                        type="checkbox"
                        name="acceptFeePolicy"
                        checked={formData.acceptFeePolicy}
                        onChange={handleChange}
                        required
                      />

                      <span>
                        I understand and accept the viewing connection fee
                        policy.
                      </span>
                    </label>
                  </div>

                  {error && (
                    <p role="alert" className="viewing-error">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="viewing-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Viewing Request"}
                  </button>

                  <p className="viewing-security-note">
                    Your contact details will be used by ÉLAN HOMES to
                    coordinate your viewing request.
                  </p>
                </form>
              )}
            </section>

            {/* PROPERTY SUMMARY */}
            <aside className="viewing-property-card">
              <img src={property.image} alt={property.name} />

              <div className="viewing-property-info">
                <span>PROPERTY SELECTED</span>

                <h3>{property.name}</h3>

                <p>{property.location}</p>

                <strong>{formatPrice(property.price)}</strong>

                <Link to={`/properties/${property.id}`}>
                  View Property Details ↗
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
