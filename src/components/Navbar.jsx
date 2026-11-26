import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setDestinationOpen(false);
    setAccountOpen(false);
  };

  const toggleDestinations = () => {
    setDestinationOpen((current) => !current);
    setAccountOpen(false);
  };

  const toggleAccount = () => {
    setAccountOpen((current) => !current);
    setDestinationOpen(false);
  };

  return (
    <header className="elan-navbar">
      <div className="elan-navbar-inner">
        {/* BRAND */}
        <Link to="/" className="elan-brand" onClick={closeMenus}>
          <span className="brand-name">ÉLAN</span>
          <span className="brand-subtitle">H O M E S</span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="elan-main-navigation"
        >
          <span>{menuOpen ? "✕" : "☰"}</span>
        </button>

        {/* MAIN NAVIGATION */}
        <nav
          id="elan-main-navigation"
          className={`elan-nav-links ${menuOpen ? "show" : ""}`}
          aria-label="Main navigation"
        >
          <Link to="/" onClick={closeMenus}>
            Home
          </Link>

          <Link to="/properties" onClick={closeMenus}>
            Properties
          </Link>

          <Link to="/stays" onClick={closeMenus}>
            Holiday Stays
          </Link>

          <Link to="/land" onClick={closeMenus}>
            Land
          </Link>

          {/* DESTINATIONS */}
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-trigger"
              onClick={toggleDestinations}
              aria-expanded={destinationOpen}
              aria-haspopup="true"
            >
              Destinations <span>⌄</span>
            </button>

            {destinationOpen && (
              <div className="nav-dropdown-menu destinations-menu">
                <div className="dropdown-heading">EXPLORE KENYA</div>

                <Link to="/destinations/nairobi" onClick={closeMenus}>
                  Nairobi
                </Link>

                <Link to="/destinations/coastal" onClick={closeMenus}>
                  Coastal Region
                </Link>

                <Link to="/destinations/eastern" onClick={closeMenus}>
                  Eastern
                </Link>

                <Link to="/destinations/kajiado" onClick={closeMenus}>
                  Kajiado
                </Link>

                <Link to="/destinations/central" onClick={closeMenus}>
                  Central
                </Link>

                <Link to="/destinations/rift-valley" onClick={closeMenus}>
                  Rift Valley
                </Link>

                <Link to="/destinations/nyanza-western" onClick={closeMenus}>
                  Nyanza & Western
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" onClick={closeMenus}>
            About Us
          </Link>

          <Link to="/contact" onClick={closeMenus}>
            Contact
          </Link>

          {/* MOBILE ACCOUNT */}
          <div className="mobile-account-section">
            <button
              type="button"
              className="nav-dropdown-trigger mobile-account-trigger"
              onClick={toggleAccount}
              aria-expanded={accountOpen}
              aria-haspopup="true"
            >
              <span>Account</span>
              <span>{accountOpen ? "⌃" : "⌄"}</span>
            </button>

            {accountOpen && (
              <div className="mobile-account-menu">
                <Link to="/signin" onClick={closeMenus}>
                  Sign In
                </Link>

                <Link to="/register" onClick={closeMenus}>
                  Create Account
                </Link>

                <Link to="/account" onClick={closeMenus}>
                  My Account
                </Link>

                <Link to="/saved" onClick={closeMenus}>
                  Saved Listings
                </Link>

                <Link to="/bookings" onClick={closeMenus}>
                  My Bookings
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="mobile-nav-actions">
            <Link to="/search" onClick={closeMenus}>
              Search
            </Link>

            <Link to="/list-property" onClick={closeMenus}>
              List Your Property
            </Link>
          </div>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="elan-nav-actions">
          <Link to="/search" className="nav-search" onClick={closeMenus}>
            <span>⌕</span> Search
          </Link>

          {/* DESKTOP ACCOUNT */}
          <div className="nav-dropdown account-dropdown">
            <button
              type="button"
              className="account-trigger"
              onClick={toggleAccount}
              aria-expanded={accountOpen}
              aria-haspopup="true"
            >
              <span className="account-icon">♙</span>
              <span>Account</span>
              <span>⌄</span>
            </button>

            {accountOpen && (
              <div className="nav-dropdown-menu account-menu">
                <Link to="/signin" onClick={closeMenus}>
                  Sign In
                </Link>

                <Link to="/register" onClick={closeMenus}>
                  Create Account
                </Link>

                <div className="dropdown-divider"></div>

                <Link to="/account" onClick={closeMenus}>
                  My Account
                </Link>

                <Link to="/saved" onClick={closeMenus}>
                  Saved Listings
                </Link>

                <Link to="/bookings" onClick={closeMenus}>
                  My Bookings
                </Link>
              </div>
            )}
          </div>

          {/* LIST YOUR PROPERTY */}
          <Link
            to="/list-property"
            className="list-property-btn"
            onClick={closeMenus}
          >
            List Your Property <span>↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
