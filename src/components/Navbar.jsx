import { useState } from "react";
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

  return (
    <header className="elan-navbar">
      <div className="elan-navbar-inner">
        {/* BRAND */}
        <a href="/" className="elan-brand" onClick={closeMenus}>
          <span className="brand-name">ÉLAN</span>
          <span className="brand-subtitle">H O M E S</span>
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span>{menuOpen ? "✕" : "☰"}</span>
        </button>

        {/* NAVIGATION */}
        <nav className={`elan-nav-links ${menuOpen ? "show" : ""}`}>
          <a href="/" onClick={closeMenus}>
            Home
          </a>

          <a href="#properties" onClick={closeMenus}>
            Properties
          </a>

          <a href="#bnb" onClick={closeMenus}>
            Holiday Stays
          </a>

          <a href="#land" onClick={closeMenus}>
            Land
          </a>

          {/* DESTINATIONS DROPDOWN */}
          <div className="nav-dropdown">
            <button
              className="nav-dropdown-trigger"
              onClick={() => {
                setDestinationOpen(!destinationOpen);
                setAccountOpen(false);
              }}
              aria-expanded={destinationOpen}
            >
              Destinations <span>⌄</span>
            </button>

            {destinationOpen && (
              <div className="nav-dropdown-menu destinations-menu">
                <div className="dropdown-heading">EXPLORE KENYA</div>

                <a href="#nairobi" onClick={closeMenus}>
                  Nairobi
                </a>
                <a href="#coastal" onClick={closeMenus}>
                  Coastal Region
                </a>
                <a href="#Eastern" onClick={closeMenus}>
                  Eastern
                </a>
                <a href="#kajiado" onClick={closeMenus}>
                  Kajiado
                </a>
                <a href="#central" onClick={closeMenus}>
                  Central
                </a>
                <a href="#Rift Valley" onClick={closeMenus}>
                  Rift Valley
                </a>
                <a href="#Nyanza/Western" onClick={closeMenus}>
                  Nyanza & Western
                </a>
              </div>
            )}
          </div>

          <a href="#about" onClick={closeMenus}>
            About
          </a>

          <a href="#contact" onClick={closeMenus}>
            Contact
          </a>

          {/* MOBILE ACTIONS */}
          <div className="mobile-nav-actions">
            <a href="#search" onClick={closeMenus}>
              Search
            </a>
            <a href="#list-property" onClick={closeMenus}>
              List Your Property
            </a>
          </div>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="elan-nav-actions">
          <a href="#search" className="nav-search">
            <span>⌕</span> Search
          </a>

          {/* ACCOUNT DROPDOWN */}
          <div className="nav-dropdown account-dropdown">
            <button
              className="account-trigger"
              onClick={() => {
                setAccountOpen(!accountOpen);
                setDestinationOpen(false);
              }}
              aria-expanded={accountOpen}
            >
              <span className="account-icon">♙</span>
              <span>Account</span>
              <span>⌄</span>
            </button>

            {accountOpen && (
              <div className="nav-dropdown-menu account-menu">
                <a href="#signin" onClick={closeMenus}>
                  Sign In
                </a>
                <a href="#register" onClick={closeMenus}>
                  Create Account
                </a>
                <div className="dropdown-divider"></div>
                <a href="#my-account" onClick={closeMenus}>
                  My Account
                </a>
                <a href="#saved" onClick={closeMenus}>
                  Saved Listings
                </a>
                <a href="#bookings" onClick={closeMenus}>
                  My Bookings
                </a>
              </div>
            )}
          </div>

          <a href="#list-property" className="list-property-btn">
            List Your Property
            <span>↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
