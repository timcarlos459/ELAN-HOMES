import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./Account.css";

export default function Account() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const firstName = profile.firstName.trim();
    const lastName = profile.lastName.trim();
    const email = profile.email.trim().toLowerCase();
    const phone = profile.phone.replace(/[\s()-]/g, "");

    if (!firstName || !lastName || !email || !phone) {
      setError("Please complete all your personal information.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setError(
        "Please enter your phone number with the international country code, for example +254712345678.",
      );
      return;
    }

    setProfile((previous) => ({
      ...previous,
      firstName,
      lastName,
      email,
      phone,
    }));

    setSuccess("Your profile details have been validated successfully.");
  };

  const displayName =
    `${profile.firstName} ${profile.lastName}`.trim() || "Welcome";

  return (
    <main className="account-page">
      <SEO
        title="Customer Dashboard | ÉLAN HOMES"
        description="Manage your ÉLAN HOMES profile, saved listings, bookings and customer support."
        noindex={true}
      />

      <section className="account-header">
        <div>
          <p className="account-eyebrow">ÉLAN HOMES EXPLORER</p>
          <h1>Customer Dashboard</h1>
          <p>Manage your property journey and accommodation bookings.</p>
        </div>

        <Link to="/" className="account-home-link">
          Back to Home ↗
        </Link>
      </section>

      <section className="account-layout">
        <aside className="account-sidebar">
          <div className="account-avatar">ÉH</div>

          <h2>{displayName}</h2>
          <p>ÉLAN EXPLORER</p>

          <nav className="account-side-nav">
            <a href="#overview" className="active">
              Dashboard Overview
            </a>

            <a href="#profile">Personal Information</a>

            <Link to="/saved">Saved Listings</Link>

            <Link to="/bookings">My Bookings</Link>

            <a href="#viewing-requests">Viewing Requests</a>

            <a href="#support">Customer Support</a>

            <a href="#settings">Account Security</a>
          </nav>

          <Link to="/signin" className="account-signout">
            ACCOUNT SIGN IN ↗
          </Link>
        </aside>

        <div className="account-content">
          <section className="account-welcome-card" id="overview">
            <div>
              <span>YOUR ACCOUNT OVERVIEW</span>

              <h2>{displayName}, welcome to ÉLAN HOMES.</h2>

              <p>
                Your personal space to discover properties, explore holiday
                stays, manage bookings and keep track of your property
                enquiries.
              </p>

              <Link to="/properties">EXPLORE PROPERTIES ↗</Link>
            </div>

            <div className="account-welcome-mark">É</div>
          </section>

          <section className="account-shortcuts">
            <Link to="/saved" className="account-shortcut">
              <span className="account-shortcut-icon">♡</span>
              <div>
                <h3>Saved Listings</h3>
                <p>Access your favourite properties, land and stays.</p>
              </div>
              <span className="account-shortcut-arrow">↗</span>
            </Link>

            <Link to="/bookings" className="account-shortcut">
              <span className="account-shortcut-icon">▤</span>
              <div>
                <h3>My Bookings</h3>
                <p>View your accommodation booking records.</p>
              </div>
              <span className="account-shortcut-arrow">↗</span>
            </Link>

            <Link to="/properties" className="account-shortcut">
              <span className="account-shortcut-icon">⌂</span>
              <div>
                <h3>Explore Properties</h3>
                <p>Discover available properties across Kenya.</p>
              </div>
              <span className="account-shortcut-arrow">↗</span>
            </Link>

            <Link to="/stays" className="account-shortcut">
              <span className="account-shortcut-icon">⌑</span>
              <div>
                <h3>Explore Stays</h3>
                <p>Find accommodation for your next trip.</p>
              </div>
              <span className="account-shortcut-arrow">↗</span>
            </Link>
          </section>

          <section className="account-profile-section" id="viewing-requests">
            <div className="account-section-heading">
              <div>
                <span>PROPERTY SERVICES</span>
                <h2>My Viewing Requests</h2>
              </div>
            </div>

            <div className="account-dashboard-notice">
              <div>
                <h3>Property and Land Viewings</h3>
                <p>
                  Your property and land viewing requests, scheduled
                  appointments and updates will appear here once customer
                  account services are connected.
                </p>
              </div>

              <Link to="/properties">EXPLORE PROPERTIES ↗</Link>
            </div>
          </section>

          <section className="account-profile-section" id="profile">
            <div className="account-section-heading">
              <div>
                <span>PROFILE DETAILS</span>
                <h2>Personal Information</h2>
              </div>

              <p>Manage your account contact information.</p>
            </div>

            <form className="account-profile-form" onSubmit={handleSubmit}>
              <div className="account-form-grid">
                <div className="account-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={profile.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={profile.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="accountEmail">Email Address</label>
                  <input
                    id="accountEmail"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={profile.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="accountPhone">Phone Number</label>
                  <input
                    id="accountPhone"
                    name="phone"
                    type="tel"
                    placeholder="+254712345678"
                    value={profile.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="account-form-error">
                  {error}
                </p>
              )}

              {success && (
                <p role="status" className="account-form-success">
                  {success}
                </p>
              )}

              <button type="submit" className="account-save-btn">
                SAVE CHANGES
              </button>
            </form>
          </section>

          <section className="account-settings-section" id="support">
            <div>
              <span>ÉLAN HOMES ASSISTANCE</span>
              <h2>Customer Support</h2>
              <p>
                Get assistance with general questions or contact our team about
                your bookings, enquiries and viewing requests.
              </p>
            </div>

            <Link to="/contact">CONTACT ÉLAN HOMES ↗</Link>
          </section>

          <section className="account-settings-section" id="settings">
            <div>
              <span>ACCOUNT SETTINGS</span>
              <h2>Account Security</h2>
              <p>
                Keep your account secure by managing your password and email
                verification settings.
              </p>
            </div>

            <Link to="/account/security">MANAGE ACCOUNT SECURITY ↗</Link>
          </section>
        </div>
      </section>
    </main>
  );
}
