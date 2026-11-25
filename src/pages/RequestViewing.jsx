import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties";
import SEO from "../components/SEO";
import { createEnquiryRecord } from "../utils/enquiryRecords";
import "./RequestViewing.css";

export default function RequestViewing() {
  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === id && item.status !== "demo",
  );

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
  const [error, setError] = useState("");
  const [createdReference, setCreatedReference] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!property) return;

    if (!formData.acceptFeePolicy) {
      setError("Please accept the viewing connection fee policy.");
      return;
    }

    if (!formData.preferredDate || formData.preferredDate < today) {
      setError("Please select a valid viewing date.");
      return;
    }

    try {
      const record = createEnquiryRecord({
        category: "property",
        listing: property,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        message: formData.message,
      });

      const viewingRecord = {
        ...record,

        // Identifies this as a property viewing request.
        enquiryType: "property_viewing",

        // Preferred viewing schedule.
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        viewingDate: formData.preferredDate,
        viewingTime: formData.preferredTime,

        // No payment has been made through this form.
        paid: false,
        paymentStatus: "unpaid",

        // Customer policy acknowledgement.
        feePolicyAccepted: true,
        feePolicyAcceptedAt: new Date().toISOString(),

        status: "new",
      };

      const existingRecords = JSON.parse(
        localStorage.getItem("elanEnquiries") || "[]",
      );

      if (!Array.isArray(existingRecords)) {
        throw new Error("Your enquiry records could not be accessed.");
      }

      localStorage.setItem(
        "elanEnquiries",
        JSON.stringify([...existingRecords, viewingRecord]),
      );

      setCreatedReference(`ELAN-${record.id.toUpperCase()}`);
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Property viewing request error:", submissionError);

      setError(
        submissionError.message ||
          "We could not save your viewing request. Please try again.",
      );
    }
  };

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

  return (
    <>
      <SEO
        title={`Request a Viewing - ${property.name} | ÉLAN HOMES`}
        description={`Request a viewing for ${property.name} in ${property.location} through ÉLAN HOMES.`}
      />

      <main className="viewing-page">
        <div className="viewing-container">
          <div className="viewing-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/properties">Properties</Link>
            <span>/</span>
            <Link to={`/properties/${property.id}`}>{property.name}</Link>
            <span>/</span>
            <span>Request Viewing</span>
          </div>

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
                  <h2>Viewing Request Recorded</h2>

                  <p>
                    Your property viewing request has been saved to your ÉLAN
                    HOMES enquiry records. Our team will review your request and
                    coordinate the next steps.
                  </p>

                  <p>
                    <strong>Enquiry Reference:</strong>
                  </p>

                  <p>{createdReference}</p>

                  <Link to="/account/bookings">
                    View My Bookings & Enquiries
                  </Link>

                  <p>
                    No viewing fee has been paid through this form. Payment
                    arrangements will be communicated separately.
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
                        required
                      />
                    </div>

                    <div className="viewing-form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+254..."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

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

                  <div className="viewing-policy">
                    <h3>Viewing Connection Fee</h3>

                    <p>
                      A connection fee will be payable to ÉLAN HOMES before your
                      viewing request is processed. The amount will be displayed
                      before payment.
                    </p>

                    <p>
                      The viewing connection fee is non-refundable once the
                      request has been submitted and processed, subject to the
                      applicable cancellation and service-resolution policy. It
                      is not part of the property's purchase price.
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

                  <button type="submit" className="viewing-submit-btn">
                    Submit Viewing Request
                  </button>

                  <p className="viewing-security-note">
                    Your contact details will be used by ÉLAN HOMES to
                    coordinate your viewing request.
                  </p>
                </form>
              )}
            </section>

            <aside className="viewing-property-card">
              <img src={property.image} alt={property.name} />

              <div className="viewing-property-info">
                <span>PROPERTY SELECTED</span>
                <h3>{property.name}</h3>
                <p>{property.location}</p>

                <strong>
                  KSh {Number(property.price).toLocaleString("en-KE")}
                </strong>

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
