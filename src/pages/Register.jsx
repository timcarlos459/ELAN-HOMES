import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import "./Register.css";

const CURATOR_CATEGORIES = [
  {
    value: "land",
    number: "01",
    title: "LAND",
    description: "Residential, commercial and agricultural land listings.",
  },
  {
    value: "properties",
    number: "02",
    title: "PROPERTIES",
    description: "Houses, apartments, villas and homes for sale.",
  },
  {
    value: "stays",
    number: "03",
    title: "STAYS",
    description: "B&Bs, holiday homes and short-stay accommodation.",
  },
];

export default function Register() {
  const [searchParams] = useSearchParams();

  const requestedRedirect = searchParams.get("redirect");

  const redirectTo =
    requestedRedirect &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//") &&
    !requestedRedirect.includes("\\")
      ? requestedRedirect
      : "/account";

  const signInLink = `/signin?redirect=${encodeURIComponent(redirectTo)}`;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    accountType: "",
    curatorCategories: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAccountTypeChange = (e) => {
    const accountType = e.target.value;

    setFormData((previous) => ({
      ...previous,
      accountType,
      curatorCategories:
        accountType === "curator" ? previous.curatorCategories : [],
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData((previous) => {
      const alreadySelected = previous.curatorCategories.includes(category);

      return {
        ...previous,
        curatorCategories: alreadySelected
          ? previous.curatorCategories.filter((item) => item !== category)
          : [...previous.curatorCategories, category],
      };
    });
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.accountType) {
      alert("Please select your ÉLAN HOMES account type.");
      return;
    }

    if (
      formData.accountType === "curator" &&
      formData.curatorCategories.length === 0
    ) {
      alert("Please select at least one listing category.");
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert("Please enter your first and last name.");
      return;
    }

    const email = formData.email.trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const normalizedPhone = formData.phone.replace(/[\s-]/g, "");

    const phonePattern = /^(?:\+254|254|0)(?:7\d{8}|1\d{8})$/;

    if (!phonePattern.test(normalizedPhone)) {
      alert("Please enter a valid Kenyan phone number.");
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Your passwords do not match.");
      return;
    }

    if (!formData.acceptedTerms) {
      alert("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    alert(
      "Your registration details have passed frontend validation.\n\nAccount creation and email OTP verification will become available when secure authentication is connected.",
    );
  };

  return (
    <main className="register-page">
      <SEO
        title="Create an Account | Join ÉLAN HOMES"
        description="Create your ÉLAN HOMES account to discover properties, land and exceptional holiday stays across Kenya."
        noindex={true}
      />

      <div className="register-container">
        {/* BRAND SECTION */}

        <div className="register-brand">
          <Link to="/" className="register-logo">
            ÉLAN <span>HOMES</span>
          </Link>

          <p className="register-eyebrow">JOIN ÉLAN HOMES</p>

          <h1>Create your account</h1>

          <p className="register-subtitle">
            Begin your journey with ÉLAN HOMES. Choose how you would like to
            experience our platform.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* ACCOUNT TYPE SELECTION */}

          <div className="register-account-section">
            <div className="register-account-heading">
              <h2>Choose Your Account</h2>
              <p>Select the account type that best describes you.</p>
            </div>

            <div className="register-account-options">
              {/* EXPLORER */}

              <label
                className={`register-account-option ${
                  formData.accountType === "explorer" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="explorer"
                  checked={formData.accountType === "explorer"}
                  onChange={handleAccountTypeChange}
                  required
                />

                <span className="register-account-content">
                  <span className="register-account-icon">
                    <span>01</span>
                  </span>

                  <strong>ÉLAN EXPLORER</strong>

                  <span className="register-account-description">
                    Discover properties, land and exceptional holiday stays
                    across Kenya.
                  </span>

                  <span className="register-account-action">
                    EXPLORE ÉLAN HOMES
                  </span>
                </span>
              </label>

              {/* CURATOR */}

              <label
                className={`register-account-option ${
                  formData.accountType === "curator" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="curator"
                  checked={formData.accountType === "curator"}
                  onChange={handleAccountTypeChange}
                  required
                />

                <span className="register-account-content">
                  <span className="register-account-icon">
                    <span>02</span>
                  </span>

                  <strong>ÉLAN CURATOR</strong>

                  <span className="register-account-description">
                    Showcase and manage your properties, land and accommodation
                    listings.
                  </span>

                  <span className="register-account-action">
                    JOIN AS A CURATOR
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* CURATOR CATEGORY SELECTION */}

          {formData.accountType === "curator" && (
            <section className="register-category-section">
              <div className="register-section-heading">
                <h2>Choose Your Listing Categories</h2>

                <p>
                  Select one or more categories you want to manage on ÉLAN
                  HOMES.
                </p>
              </div>

              <div className="register-category-options">
                {CURATOR_CATEGORIES.map((category) => {
                  const selected = formData.curatorCategories.includes(
                    category.value,
                  );

                  return (
                    <label
                      key={category.value}
                      className={`register-category-option ${
                        selected ? "selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleCategoryChange(category.value)}
                      />

                      <span className="register-category-number">
                        {category.number}
                      </span>

                      <span className="register-category-content">
                        <strong>{category.title}</strong>

                        <span>{category.description}</span>
                      </span>

                      <span className="register-category-check">
                        {selected ? "✓" : "+"}
                      </span>
                    </label>
                  );
                })}
              </div>

              <p className="register-category-note">
                You can select one, two or all three categories. You will manage
                all selected categories from one Curator Dashboard.
              </p>

              <p className="register-category-selected">
                {formData.curatorCategories.length} of 3 categories selected
              </p>
            </section>
          )}

          {/* PERSONAL DETAILS */}

          <div className="register-section-heading">
            <h2>Personal Information</h2>
          </div>

          <div className="register-name-fields">
            <div className="register-field">
              <label htmlFor="firstName">First Name</label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="lastName">Last Name</label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. 0712 345 678"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
            />
          </div>

          {/* PASSWORD */}

          <div className="register-section-heading">
            <h2>Account Security</h2>
          </div>

          <div className="register-field">
            <label htmlFor="password">Create Password</label>

            <div className="register-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <small className="register-password-hint">
              Use at least 8 characters, including uppercase, lowercase and a
              number.
            </small>
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div className="register-password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* TERMS */}

          <label className="register-terms">
            <input
              type="checkbox"
              checked={formData.acceptedTerms}
              onChange={(e) =>
                setFormData((previous) => ({
                  ...previous,
                  acceptedTerms: e.target.checked,
                }))
              }
              required
            />

            <span>
              I agree to the{" "}
              <Link to="/terms" target="_blank">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {/* FRONTEND NOTICE */}

          <p className="register-category-note">
            Registration and email verification will be activated when secure
            account services are connected.
          </p>

          {/* SUBMIT */}

          <button type="submit" className="register-submit">
            CREATE ACCOUNT
          </button>
        </form>

        {/* SIGN IN */}

        <div className="register-divider">
          <span>ALREADY HAVE AN ACCOUNT?</span>
        </div>

        <Link to={signInLink} className="register-signin">
          SIGN IN
        </Link>

        <p className="register-footer">
          Your journey to exceptional living starts here.
        </p>

        <Link to="/" className="register-back-home">
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
