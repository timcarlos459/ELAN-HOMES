import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import landListings from "../data/land";
import "./RequestLandViewing.css";

export default function RequestLandViewing() {
  const { id } = useParams();

  // TEMPORARILY ALLOW DEMO LISTINGS FOR TESTING
  const land = landListings.find((item) => item.id === id);

  const today = new Date().toLocaleDateString("en-CA");

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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.acceptFeePolicy) return;

    // LOCAL FORM VALIDATION ONLY.
    // No request is sent and no payment is processed.
    setSubmitted(true);
  };

  if (!land) {
    return (
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
    );
  }

  const formatPrice = (price) => {
    if (typeof price === "number" && Number.isFinite(price)) {
      return `KSh ${price.toLocaleString("en-KE")}`;
    }

    if (typeof price === "string" && price.trim()) {
      return price.startsWith("KSh") ? price : `KSh ${price}`;
    }

    return "Price on request";
  };

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
          {/* VIEWING FORM */}

          <section className="land-viewing-form-section">
            {submitted ? (
              <div className="land-viewing-success">
                <div className="land-viewing-success-icon">✓</div>

                <h2>Details Validated Successfully</h2>

                <p>
                  Your details have been successfully validated. Your viewing
                  request has not yet been submitted, and no payment has been
                  processed.
                </p>

                <Link to={`/land/${land.id}`}>Return to Land Details</Link>
              </div>
            ) : (
              <>
                <h2>Your Contact Details</h2>

                <p className="land-viewing-form-intro">
                  Please provide accurate information so our team can reach you.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* FULL NAME */}

                  <div className="land-viewing-form-group">
                    <label htmlFor="fullName">Full Name</label>

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* EMAIL AND PHONE */}

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
                        required
                      />
                    </div>

                    <div className="land-viewing-form-group">
                      <label htmlFor="phone">Phone Number</label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+254 7XX XXX XXX"
                        value={formData.phone}
                        onChange={handleChange}
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

                  {/* FEE POLICY */}

                  <div className="land-viewing-policy">
                    <h3>Viewing & Connection Fee Policy</h3>

                    <p>
                      A viewing and connection fee applies to land viewing
                      requests. The fee is payable before the request is
                      processed and is separate from the land purchase price.
                      Once a viewing request has been submitted and processed,
                      the fee is non-refundable, subject to the applicable
                      cancellation and service-resolution policy.
                    </p>

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

                  {/* SUBMIT */}

                  <button type="submit" className="land-viewing-submit-btn">
                    Review Viewing Request
                  </button>

                  <p className="land-viewing-security-note">
                    Your contact information will be handled confidentially by
                    ÉLAN HOMES.
                  </p>
                </form>
              </>
            )}
          </section>

          {/* SELECTED LAND SUMMARY */}

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
