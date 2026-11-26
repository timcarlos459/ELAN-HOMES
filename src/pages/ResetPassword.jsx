
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email") || "";
  const requestedRedirect = searchParams.get("redirect");

  const redirectTo =
    requestedRedirect &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//") &&
    !requestedRedirect.includes("\\")
      ? requestedRedirect
      : "/account";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(
        "Your email address is missing. Please restart the password reset process.",
      );
      return;
    }

    if (!isPasswordStrong) {
      setError("Please meet all the password requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    // Frontend demonstration only.
    // The backend will verify the OTP session, securely hash
    // the new password and update the customer's account.

    setSuccess(true);
  };

  const handleReturnToSignIn = () => {
    navigate(`/signin?redirect=${encodeURIComponent(redirectTo)}`);
  };

  return (
    <main className="reset-password-page">
      <SEO
        title="Reset Password | ÉLAN HOMES"
        description="Create a new secure password for your ÉLAN HOMES account."
        noindex={true}
      />

      <div className="reset-password-container">
        <Link to="/" className="reset-password-logo">
          ÉLAN <span>HOMES</span>
        </Link>

        {!success ? (
          <>
            <div className="reset-password-heading">
              <span>ACCOUNT SECURITY</span>
              <h1>Create a New Password</h1>
              <p>
                Choose a strong password to secure your ÉLAN HOMES account.
              </p>

              {email && (
                <div className="reset-password-email">
                  {email}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="reset-password-field">
                <label htmlFor="password">New Password</label>

                <div className="reset-password-input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a new password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide new password" : "Show new password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="reset-password-requirements">
                <p>Your password must contain:</p>

                <ul>
                  <li className={passwordChecks.length ? "valid" : ""}>
                    At least 8 characters
                  </li>
                  <li className={passwordChecks.uppercase ? "valid" : ""}>
                    One uppercase letter
                  </li>
                  <li className={passwordChecks.lowercase ? "valid" : ""}>
                    One lowercase letter
                  </li>
                  <li className={passwordChecks.number ? "valid" : ""}>
                    One number
                  </li>
                  <li className={passwordChecks.special ? "valid" : ""}>
                    One special character
                  </li>
                </ul>
              </div>

              <div className="reset-password-field">
                <label htmlFor="confirmPassword">
                  Confirm New Password
                </label>

                <div className="reset-password-input-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
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

                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="reset-password-mismatch">
                      Passwords do not match.
                    </p>
                  )}
              </div>

              {error && (
                <p className="reset-password-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="reset-password-submit"
                disabled={!email.trim()}
              >
                RESET PASSWORD
              </button>
            </form>

            <Link
              to={`/verify-otp?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirectTo)}`}
              className="reset-password-back"
            >
              ← Back to Email Verification
            </Link>
          </>
        ) : (
          <div className="reset-password-success">
            <span>ACCOUNT SECURITY</span>
            <h1>Password Reset Prepared</h1>

            <p>
              Your new password has passed the frontend checks. No account
              password has been changed yet. The secure backend must verify
              your OTP session and update your password before the reset
              becomes effective.
            </p>

            <button
              type="button"
              className="reset-password-submit"
              onClick={handleReturnToSignIn}
            >
              RETURN TO SIGN IN
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
