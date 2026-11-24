import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties";
import SEO from "../components/SEO";
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

    setSubmitted(true);
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
                  <h2>Form Preview Complete</h2>
                  Your details have been successfully validated. Your viewing
                  request has not yet been submitted, and no payment has been
                  processed.
                  <button type="button" onClick={() => setSubmitted(false)}>
                    Review Details
                  </button>
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
                      request has been submitted and processed. It is not part
                      of the property's purchase price.
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

                  <button type="submit" className="viewing-submit-btn">
                    Review Viewing Request
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
