import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // REDIRECT PROTECTION
  const requestedRedirect = searchParams.get("redirect");

  const redirectTo =
    requestedRedirect &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//") &&
    !requestedRedirect.includes("\\")
      ? requestedRedirect
      : "/account";

  const signInLink = `/signin?redirect=${encodeURIComponent(redirectTo)}`;

  // HANDLE FORM SUBMISSION
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    // EMAIL VALIDATION
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // FRONTEND DEMONSTRATION ONLY.
    // The backend will verify the account and send the OTP through Resend.

    navigate(
      `/verify-otp?email=${encodeURIComponent(normalizedEmail)}&redirect=${encodeURIComponent(redirectTo)}`,
    );
  };

  return (
    <main className="forgot-password-page">
      <SEO
        title="Forgot Password | ÉLAN HOMES"
        description="Reset your ÉLAN HOMES account password securely."
        noindex={true}
      />

      <div className="forgot-password-container">
        <Link to="/" className="forgot-password-logo">
          ÉLAN <span>HOMES</span>
        </Link>

        <div className="forgot-password-heading">
          <span>ACCOUNT SECURITY</span>

          <h1>Forgot your password?</h1>

          <p>
            Enter the email address associated with your ÉLAN HOMES account. We
            will send you a verification code to help you reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="forgot-password-field">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value.trimStart().toLowerCase())
              }
              autoComplete="email"
              required
            />
          </div>

          {error && (
            <p className="forgot-password-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="forgot-password-submit">
            SEND VERIFICATION CODE
          </button>
        </form>

        <Link to={signInLink} className="forgot-password-back">
          ← Back to Sign In
        </Link>
      </div>
    </main>
  );
}
