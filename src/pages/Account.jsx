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

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Profile saving will be activated when account authentication is connected.",
    );
  };

  return (
    <main className="account-page">
      <SEO
        title="My Account | ÉLAN HOMES"
        description="Manage your ÉLAN HOMES profile, personal information, saved properties, favourite holiday stays and booking enquiries."
        noindex={true}
      />

      <section className="account-header">
        <div>
          <p className="account-eyebrow">YOUR ELAN HOMES</p>
          <h1>My Account</h1>
          <p>Manage your profile, saved properties and holiday stays.</p>
        </div>

        <Link to="/" className="account-home-link">
          Back to Home ↗
        </Link>
      </section>

      <section className="account-layout">
        <aside className="account-sidebar">
          <div className="account-avatar">EH</div>
          <h2>Welcome</h2>
          <p>ELAN HOMES Member</p>

          <nav className="account-side-nav">
            <a href="#profile" className="active">
              Personal Information
            </a>
            <Link to="/saved">Saved Listings</Link>
            <Link to="/bookings">My Bookings</Link>
            <a href="#settings">Account Settings</a>
          </nav>

          <Link to="/signin" className="account-signout">
            Sign In / Sign Out ↗
          </Link>
        </aside>

        <div className="account-content">
          <section className="account-welcome-card">
            <div>
              <span>ACCOUNT OVERVIEW</span>
              <h2>Your property journey starts here.</h2>
              <p>
                Keep your details updated and manage your favourite properties
                and holiday stay enquiries in one place.
              </p>
            </div>
            <div className="account-welcome-mark">É</div>
          </section>

          <section className="account-shortcuts">
            <Link to="/saved" className="account-shortcut">
              <span className="account-shortcut-icon">♡</span>
              <div>
                <h3>Saved Listings</h3>
                <p>View properties and stays you have saved.</p>
              </div>
              <span className="account-shortcut-arrow">↗</span>
            </Link>

            <Link to="/bookings" className="account-shortcut">
              <span className="account-shortcut-icon">▤</span>
              <div>
                <h3>My Bookings</h3>
                <p>Keep track of your holiday stay enquiries.</p>
              </div>
              <span className="account-shortcut-arrow">↗</span>
            </Link>
          </section>

          <section className="account-profile-section" id="profile">
            <div className="account-section-heading">
              <div>
                <span>PROFILE DETAILS</span>
                <h2>Personal Information</h2>
              </div>
              <p>Update your contact details below.</p>
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
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="accountPhone">Phone Number</label>
                  <input
                    id="accountPhone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="account-save-btn">
                SAVE CHANGES
              </button>
            </form>
          </section>

          <section className="account-settings-section" id="settings">
            <div>
              <span>ACCOUNT SETTINGS</span>
              <h2>Account Security</h2>
              <p>
                Password management and account security will be available when
                authentication is connected.
              </p>
            </div>
            <Link to="/signin">Sign In ↗</Link>
          </section>
        </div>
      </section>
    </main>
  );
}
