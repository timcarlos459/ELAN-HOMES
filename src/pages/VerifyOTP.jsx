import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import SEO from "../components/SEO";
import "./VerifyOTP.css";

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const requestedRedirect = searchParams.get("redirect");

  const redirectTo =
    requestedRedirect &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//") &&
    !requestedRedirect.includes("\\")
      ? requestedRedirect
      : "/account";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOTPChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
    setError("");
    setResendMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setResendMessage("");

    if (!email.trim()) {
      setError(
        "Your email address is missing. Please restart the password reset process.",
      );
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the complete six-digit verification code.");
      return;
    }

    // Actual OTP verification must be performed by the backend.
    // Do not allow password reset navigation before successful verification.

    setError(
      "OTP verification is not yet connected. Please try again when ÉLAN HOMES account verification is available.",
    );
  };

  const handleResend = () => {
    if (countdown > 0) return;

    setOtp("");
    setError("");

    // Actual OTP generation and email delivery will be handled by the backend.
    // This frontend action does not send an email.

    setResendMessage(
      "Email delivery is not yet connected. You will be able to request a new verification code once account services are activated.",
    );
  };

  return (
    <main className="verify-otp-page">
      <SEO
        title="Verify Email | ÉLAN HOMES"
        description="Verify your email address to continue resetting your ÉLAN HOMES password."
        noindex={true}
      />

      <div className="verify-otp-container">
        {/* LOGO */}

        <Link to="/" className="verify-otp-logo">
          ÉLAN <span>HOMES</span>
        </Link>

        {/* HEADING */}

        <div className="verify-otp-heading">
          <span>ACCOUNT SECURITY</span>

          <h1>Email Verification</h1>

          <p>
            Enter the six-digit verification code sent to your registered email
            address.
          </p>

          {email && <strong className="verify-otp-email">{email}</strong>}
        </div>

        {/* OTP FORM */}

        <form onSubmit={handleSubmit}>
          <div className="verify-otp-field">
            <label htmlFor="otp">Verification Code</label>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              value={otp}
              onChange={handleOTPChange}
              maxLength={6}
              pattern="[0-9]{6}"
              aria-describedby="otp-error"
              required
            />
          </div>

          {error && (
            <p id="otp-error" className="verify-otp-error" role="alert">
              {error}
            </p>
          )}

          {resendMessage && (
            <p className="verify-otp-message" role="status" aria-live="polite">
              {resendMessage}
            </p>
          )}

          <button type="submit" className="verify-otp-submit">
            VERIFY CODE
          </button>
        </form>

        {/* RESEND CODE */}

        <div className="verify-otp-resend">
          <p>Didn't receive a code?</p>

          <button type="button" onClick={handleResend} disabled={countdown > 0}>
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Resend verification code"}
          </button>
        </div>

        {/* EXPIRY NOTICE */}

        <p className="verify-otp-expiry">
          Verification codes expire after 10 minutes.
        </p>

        {/* BACK LINK */}

        <Link
          to={`/forgot-password?redirect=${encodeURIComponent(redirectTo)}`}
          className="verify-otp-back"
        >
          ← Back to Forgot Password
        </Link>
      </div>
    </main>
  );
}
