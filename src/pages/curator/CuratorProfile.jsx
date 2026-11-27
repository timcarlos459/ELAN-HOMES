import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import "./CuratorProfile.css";

const STORAGE_KEY = "elanCuratorApplication";

const categories = ["Land", "Properties", "Stays"];

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  county: "",
  town: "",
  categories: [],
  description: "",
};

function getSavedApplication() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        profile: initialFormData,
        status: "not_submitted",
      };
    }

    const parsed = JSON.parse(saved);

    return {
      ...parsed,
      profile: {
        ...initialFormData,
        ...(parsed.profile || {}),
        categories: Array.isArray(parsed.profile?.categories)
          ? parsed.profile.categories
          : [],
      },
    };
  } catch {
    return {
      profile: initialFormData,
      status: "not_submitted",
    };
  }
}

function CuratorProfile() {
  const [application, setApplication] = useState(getSavedApplication);

  const [formData, setFormData] = useState(application.profile);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const isSubmitted = [
    "pending",
    "under_review",
    "approved",
    "rejected",
    "suspended",
  ].includes(application.status);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleCategoryChange(category) {
    setFormData((previous) => ({
      ...previous,
      categories: previous.categories.includes(category)
        ? previous.categories.filter((item) => item !== category)
        : [...previous.categories, category],
    }));

    setMessage("");
  }

  function validateForm() {
    const requiredFields = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["email", "Email address"],
      ["phone", "Phone number"],
      ["businessType", "Business type"],
      ["county", "County"],
      ["town", "Town or area"],
      ["description", "Business description"],
    ];

    for (const [field, label] of requiredFields) {
      if (!String(formData[field] || "").trim()) {
        return `${label} is required.`;
      }
    }

    if (formData.categories.length === 0) {
      return "Please select at least one listing category.";
    }

    if (formData.description.trim().length < 20) {
      return "Please provide a business description of at least 20 characters.";
    }

    return "";
  }

  function saveDraft() {
    if (isSubmitted) {
      setMessage(
        "Your application has already been submitted. Contact ÉLAN HOMES if you need to update it.",
      );
      setMessageType("error");
      return;
    }

    try {
      const updatedApplication = {
        ...application,
        profile: formData,
        status: "draft",
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplication));

      setApplication(updatedApplication);

      setMessage(
        "Your profile draft has been saved in this browser. It has not been submitted to ÉLAN HOMES.",
      );

      setMessageType("success");
    } catch {
      setMessage("Unable to save your draft. Please try again.");
      setMessageType("error");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitted) {
      setMessage(
        "An application has already been submitted. Please contact ÉLAN HOMES if you need to update it.",
      );
      setMessageType("error");
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      setMessageType("error");
      return;
    }

    try {
      const existing = getSavedApplication();

      const updatedApplication = {
        ...existing,
        profile: formData,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplication));

      setApplication(updatedApplication);

      setMessage(
        "Your application has been submitted in this browser demonstration. Your dashboard will show the pending status. This is not yet a live submission to ÉLAN HOMES.",
      );

      setMessageType("success");
    } catch {
      setMessage("Unable to submit your application. Please try again.");
      setMessageType("error");
    }
  }

  return (
    <main className="curator-profile-page">
      <SEO
        title="Curator Profile | ÉLAN HOMES"
        description="Complete your ÉLAN HOMES curator profile and application."
        noindex={true}
      />

      <section className="curator-profile-header">
        <span>ÉLAN HOMES PARTNER PORTAL</span>
        <h1>Curator Profile</h1>
        <p>
          Tell us about yourself and the property or accommodation services you
          provide.
        </p>
        <Link to="/curator">← Back to Dashboard</Link>
      </section>

      <section className="curator-profile-container">
        <div className="curator-profile-intro">
          <span>YOUR INFORMATION</span>
          <h2>Build your curator profile</h2>
          <p>
            Complete your information to help ÉLAN HOMES understand your
            business, operating locations and listing categories.
          </p>
        </div>

        {isSubmitted && (
          <div className="curator-profile-message success" role="status">
            Your application has already been submitted. Your current
            application status is: {application.status.replace("_", " ")}.
            Contact ÉLAN HOMES if you need to update your information.
          </div>
        )}

        <form className="curator-profile-form" onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitted}>
            <div className="curator-form-section">
              <h3>Personal Information</h3>

              <div className="curator-form-grid">
                <div className="curator-form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="curator-form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="curator-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="curator-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="curator-form-section">
              <h3>Business Information</h3>

              <div className="curator-form-grid">
                <div className="curator-form-group">
                  <label htmlFor="businessName">Business / Agency Name</label>
                  <input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter business name"
                  />
                </div>

                <div className="curator-form-group">
                  <label htmlFor="businessType">Business Type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="individual">Independent Curator</option>
                    <option value="agency">Real Estate Agency</option>
                    <option value="property-manager">Property Manager</option>
                    <option value="accommodation-provider">
                      Accommodation Provider
                    </option>
                    <option value="land-agent">Land Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="curator-form-section">
              <h3>Operating Locations</h3>

              <div className="curator-form-grid">
                <div className="curator-form-group">
                  <label htmlFor="county">County</label>
                  <input
                    id="county"
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    placeholder="e.g. Nairobi"
                    required
                  />
                </div>

                <div className="curator-form-group">
                  <label htmlFor="town">Town / Area</label>
                  <input
                    id="town"
                    name="town"
                    value={formData.town}
                    onChange={handleChange}
                    placeholder="e.g. Karen"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="curator-form-section">
              <h3>Listing Categories</h3>
              <p className="curator-form-description">
                Select all categories you intend to manage.
              </p>

              <div className="curator-category-options">
                {categories.map((category) => (
                  <label className="curator-category-option" key={category}>
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="curator-form-section">
              <h3>About Your Business</h3>

              <div className="curator-form-group">
                <label htmlFor="description">Short Business Description</label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your experience, services and the areas you cover..."
                  rows="5"
                  maxLength="1000"
                  required
                />

                <small>Maximum 1,000 characters.</small>
              </div>
            </div>
          </fieldset>

          {message && (
            <div
              className={`curator-profile-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <div className="curator-profile-actions">
            <Link to="/curator">Cancel</Link>

            {!isSubmitted && (
              <>
                <button
                  type="button"
                  className="curator-save-draft"
                  onClick={saveDraft}
                >
                  SAVE DRAFT
                </button>

                <button type="submit">SUBMIT APPLICATION</button>
              </>
            )}
          </div>
        </form>

        <p className="curator-profile-demo-note">
          This profile currently uses browser storage for demonstration.
          Applications are not yet transmitted to ÉLAN HOMES. Live account
          verification and application processing will be connected later.
        </p>
      </section>
    </main>
  );
}

export default CuratorProfile;
