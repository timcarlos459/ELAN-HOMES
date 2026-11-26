import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./AccountSecurity.css";

export default function AccountSecurity() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const togglePassword = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const validatePassword = () => {
    if (!form.currentPassword) {
      return "Please enter your current password.";
    }

    if (!form.newPassword) {
      return "Please enter your new password.";
    }

    if (form.newPassword.length < 8) {
      return "Your new password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(form.newPassword)) {
      return "Your new password must contain an uppercase letter.";
    }

    if (!/[a-z]/.test(form.newPassword)) {
      return "Your new password must contain a lowercase letter.";
    }

    if (!/[0-9]/.test(form.newPassword)) {
      return "Your new password must contain a number.";
    }

    if (!/[^A-Za-z0-9]/.test(form.newPassword)) {
      return "Your new password must contain a special character.";
    }

    if (form.newPassword === form.currentPassword) {
      return "Your new password must be different from your current password.";
    }

    if (form.newPassword !== form.confirmPassword) {
      return "Your new passwords do not match.";
    }

    return "";
  };

  const handleRequestOTP = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validatePassword();

    if (validationError) {
      setError(validationError);
      return;
    }

    // Email OTP delivery will be connected through the backend.
    setOtpRequested(true);
    setOtp("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otpRequested) {
      setError("Please request an email verification code first.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the six-digit email verification code.");
      return;
    }

    setError(
      "Email verification is not yet available. Please try again when account security services are active.",
    );
  };

  return (
    <main className="account-security-page">
      <SEO
        title="Account Security | ÉLAN HOMES"
        description="Manage your ÉLAN HOMES password and account security."
        noindex={true}
      />

      <div className="account-security-container">
        <Link to="/account" className="security-back-link">
          ← BACK TO MY ACCOUNT
        </Link>

        <header className="security-header">
          <span>ÉLAN HOMES ACCOUNT</span>
          <h1>Account Security</h1>
          <p>
            Protect your account by regularly updating your password and
            verifying important security changes.
          </p>
        </header>

        <section className="security-card">
          <div className="security-card-heading">
            <div>
              <span>SECURITY SETTINGS</span>
              <h2>Change Your Password</h2>
            </div>

            <div className="security-lock">⌑</div>
          </div>

          <form onSubmit={otpRequested ? handleSubmit : handleRequestOTP}>
            <div className="security-field">
              <label htmlFor="currentPassword">Current Password</label>

              <div className="security-password-input">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button type="button" onClick={() => togglePassword("current")}>
                  {showPasswords.current ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="security-field">
              <label htmlFor="newPassword">New Password</label>

              <div className="security-password-input">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="Create a new password"
                  value={form.newPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button type="button" onClick={() => togglePassword("new")}>
                  {showPasswords.new ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="security-field">
              <label htmlFor="confirmPassword">Confirm New Password</label>

              <div className="security-password-input">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button type="button" onClick={() => togglePassword("confirm")}>
                  {showPasswords.confirm ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="security-password-rules">
              <h3>Password requirements</h3>
              <ul>
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>

            {!otpRequested ? (
              <button type="submit" className="security-submit-btn">
                REQUEST EMAIL VERIFICATION CODE
              </button>
            ) : (
              <div className="security-otp-section">
                <span>EMAIL VERIFICATION</span>
                <h3>Enter Your Verification Code</h3>

                <p>
                  A six-digit verification code will be sent to your registered
                  email address when email verification is available.
                </p>

                <label htmlFor="securityOtp">Six-Digit Code</label>

                <input
                  id="securityOtp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                    setSuccess("");
                  }}
                />

                <button type="submit" className="security-submit-btn">
                  VERIFY AND CHANGE PASSWORD
                </button>

                <button
                  type="button"
                  className="security-edit-btn"
                  onClick={() => {
                    setOtpRequested(false);
                    setOtp("");
                    setError("");
                    setSuccess("");
                  }}
                >
                  EDIT PASSWORD DETAILS
                </button>
              </div>
            )}

            {error && (
              <p className="security-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="security-success" role="status">
                {success}
              </p>
            )}
          </form>
        </section>

        <p className="security-footer-note">
          Your account security is important to us. Never share your password or
          verification code with anyone.
        </p>
      </div>
    </main>
  );
}
