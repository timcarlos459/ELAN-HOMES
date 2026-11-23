import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./SignIn.css";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demonstration only.
    // Real authentication will be connected later.
    alert(
      "Sign-in functionality will be activated when authentication is connected.",
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
        <div className="signin-brand">
          <Link to="/" className="signin-logo">
            ELAN <span>HOMES</span>
          </Link>

          <p>WELCOME BACK</p>

          <h1>Sign in to your account</h1>

          <p className="signin-subtitle">
            Access your saved properties, holiday stays and bookings from one
            place.
          </p>
        </div>

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
                required
              />

              <button
                type="button"
                className="signin-show-password"
                onClick={() => setShowPassword(!showPassword)}
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

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="signin-submit">
            SIGN IN
          </button>
        </form>

        <div className="signin-divider">
          <span>NEW TO ELAN HOMES?</span>
        </div>

        <Link to="/register" className="signin-register">
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
