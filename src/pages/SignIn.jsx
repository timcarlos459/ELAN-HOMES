import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import "./SignIn.css";

export default function SignIn() {
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Preserve the page the customer wanted to visit.
  const requestedRedirect = searchParams.get("redirect");

  // Only allow internal website paths.
  const redirectTo =
    requestedRedirect &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/account";

  const registrationLink = `/register?redirect=${encodeURIComponent(
    redirectTo,
  )}`;

  const forgotPasswordLink = `/forgot-password?redirect=${encodeURIComponent(
    redirectTo,
  )}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "email" ? value.trimStart().toLowerCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demonstration only.
    // Secure authentication, account verification and role-based
    // redirection will be connected through the backend later.

    alert(
      "Secure sign-in is not yet activated. Your selected destination will be preserved when authentication is connected.",
    );
  };

  return (
    <main className="signin-page">
      <SEO
        title="Sign In | ÉLAN HOMES Account"
        description="Sign in to your ÉLAN HOMES account to access your saved properties, favourite holiday stays and booking enquiries."
        noindex={true}
      />

      <div className="signin-container">
        {/* BRAND SECTION */}
        <div className="signin-brand">
          <Link to="/" className="signin-logo">
            ÉLAN <span>HOMES</span>
          </Link>

          <p>WELCOME BACK</p>

          <h1>Sign in to your account</h1>

          <p className="signin-subtitle">
            Access your saved properties, holiday stays and bookings from one
            place.
          </p>
        </div>

        {/* UNIFIED SIGN-IN FORM */}
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-field">
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

          <div className="signin-field">
            <label htmlFor="password">Password</label>

            <div className="signin-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="signin-show-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="signin-options">
            <label className="signin-remember">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to={forgotPasswordLink}>Forgot password?</Link>
          </div>

          <button type="submit" className="signin-submit">
            SIGN IN
          </button>
        </form>

        {/* REGISTRATION LINK */}
        <div className="signin-divider">
          <span>NEW TO ÉLAN HOMES?</span>
        </div>

        <Link to={registrationLink} className="signin-register">
          CREATE AN ACCOUNT
        </Link>

        <p className="signin-footer">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

        <Link to="/" className="signin-back-home">
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
