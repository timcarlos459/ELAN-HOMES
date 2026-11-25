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
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/account";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOTPChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setResendMessage("");

    if (!email) {
      setError(
        "Your email address is missing. Please restart the password reset process.",
      );
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the complete six-digit verification code.");
      return;
    }

    if (attempts >= 5) {
      setError(
        "You have reached the maximum verification attempts. Please request a new code.",
      );
      return;
    }

    // Backend OTP verification will be connected later.
    // No password reset navigation is allowed before verification.

    setAttempts((previous) => previous + 1);

    setError(
      "OTP verification is not yet connected. Backend verification will be activated later.",
    );
  };

  const handleResend = () => {
    if (countdown > 0) return;

    // Backend will generate and send a new OTP through Resend.
    setCountdown(60);
    setOtp("");
    setError("");

    setResendMessage(
      "A new verification request has been prepared. Email delivery will be activated when the backend is connected.",
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
        <Link to="/" className="verify-otp-logo">
          ÉLAN <span>HOMES</span>
        </Link>

        <div className="verify-otp-heading">
          <span>ACCOUNT SECURITY</span>
          <h1>Email Verification</h1>

          <p>
            Enter the six-digit verification code sent to your registered email
            address.
          </p>

          {email && <strong className="verify-otp-email">{email}</strong>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="verify-otp-field">
            <label htmlFor="otp">Verification Code</label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              value={otp}
              onChange={handleOTPChange}
              maxLength={6}
              required
            />
          </div>

          {error && (
            <p className="verify-otp-error" role="alert">
              {error}
            </p>
          )}

          {resendMessage && (
            <p className="verify-otp-message" role="status">
              {resendMessage}
            </p>
          )}

          <button type="submit" className="verify-otp-submit">
            VERIFY CODE
          </button>
        </form>

        <div className="verify-otp-resend">
          <p>Didn't receive a code?</p>

          <button type="button" onClick={handleResend} disabled={countdown > 0}>
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Resend verification code"}
          </button>
        </div>

        <p className="verify-otp-expiry">
          Verification codes expire after 10 minutes.
        </p>

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
