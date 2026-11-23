import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./Register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Your passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    alert(
      "Registration form completed. Account creation will be activated when authentication is connected.",
    );
  };

  return (
    <main className="register-page">
      <SEO
        title="Create an Account | Join ÉLAN HOMES"
        description="Create your ÉLAN HOMES account to explore exceptional properties for sale, save your favourite homes and manage your holiday stay enquiries across Kenya."
        noindex={true}
      />

      <div className="register-container">
        <div className="register-brand">
          <Link to="/" className="register-logo">
            ÉLAN <span>HOMES</span>
          </Link>

          <p className="register-eyebrow">JOIN ÉLAN HOMES</p>

          <h1>Create your account</h1>

          <p className="register-subtitle">
            Create an account to discover exceptional properties, save your
            favourites and manage your holiday stay enquiries.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
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
              required
            />
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
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
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
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="register-terms">
            <input type="checkbox" required />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>

          <button type="submit" className="register-submit">
            CREATE ACCOUNT
          </button>
        </form>

        <div className="register-divider">
          <span>ALREADY HAVE AN ACCOUNT?</span>
        </div>

        <Link to="/signin" className="register-signin">
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
