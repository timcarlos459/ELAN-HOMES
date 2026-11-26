import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import "./SignIn.css";

export default function SignIn() {
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Preserve the page the customer originally wanted to visit.
  const requestedRedirect = searchParams.get("redirect");

  // Only allow safe internal website paths.
  const isSafeRedirect =
    typeof requestedRedirect === "string" &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//") &&
    !requestedRedirect.includes("\\");

  const redirectTo = isSafeRedirect ? requestedRedirect : "/account";

  const registrationLink = `/register?redirect=${encodeURIComponent(
    redirectTo,
  )}`;

  const forgotPasswordLink = `/forgot-password?redirect=${encodeURIComponent(
    redirectTo,
  )}`;

  // HANDLE INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "email" ? value.trimStart().toLowerCase() : value,
    }));
  };

  // HANDLE SIGN-IN
  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend demonstration only.
    // Real authentication, email OTP verification,
    // account sessions and role-based redirection
    // will be connected through the secure backend.

    alert(
      "Sign-in is not yet activated. Secure account authentication will be available when the backend is connected.",
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
          {/* EMAIL */}

          <div className="signin-field">
            <label htmlFor="signin-email">Email Address</label>

            <input
              type="email"
              id="signin-email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* PASSWORD */}

          <div className="signin-field">
            <label htmlFor="signin-password">Password</label>

            <div className="signin-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="signin-password"
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
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* SIGN-IN OPTIONS */}

          <div className="signin-options">
            <label className="signin-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />

              <span>Remember me</span>
            </label>

            <Link to={forgotPasswordLink}>Forgot password?</Link>
          </div>

          {/* SUBMIT */}

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

        {/* ACCOUNT SECURITY NOTICE */}

        <p className="signin-footer">
          By continuing, you agree to our{" "}
          <Link to="/terms">Terms of Service</Link> and{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>

        <Link to="/" className="signin-back-home">
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
