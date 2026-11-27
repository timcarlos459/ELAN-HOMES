import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [desktopAccountOpen, setDesktopAccountOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  const navbarRef = useRef(null);

  const closeMenus = () => {
    setMenuOpen(false);
    setDestinationOpen(false);
    setDesktopAccountOpen(false);
    setMobileAccountOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
    setDestinationOpen(false);
    setDesktopAccountOpen(false);
    setMobileAccountOpen(false);
  };

  const toggleDestinations = () => {
    setDestinationOpen((current) => !current);
    setDesktopAccountOpen(false);
    setMobileAccountOpen(false);
  };

  const toggleDesktopAccount = () => {
    setDesktopAccountOpen((current) => !current);
    setDestinationOpen(false);
    setMobileAccountOpen(false);
  };

  const toggleMobileAccount = () => {
    setMobileAccountOpen((current) => !current);
    setDestinationOpen(false);
    setDesktopAccountOpen(false);
  };

  // Close menus when clicking outside the navbar.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeMenus();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  // Close menus when pressing Escape.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close mobile navigation when returning to desktop layout.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setMenuOpen(false);
        setMobileAccountOpen(false);
      } else {
        setDesktopAccountOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="elan-navbar" ref={navbarRef}>
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
          onClick={toggleMenu}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="elan-main-navigation"
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
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
              aria-controls="elan-destinations-menu"
            >
              Destinations
              <span aria-hidden="true">{destinationOpen ? "⌃" : "⌄"}</span>
            </button>

            {destinationOpen && (
              <div
                id="elan-destinations-menu"
                className="nav-dropdown-menu destinations-menu"
              >
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
              onClick={toggleMobileAccount}
              aria-expanded={mobileAccountOpen}
              aria-haspopup="true"
              aria-controls="elan-mobile-account-menu"
            >
              <span>Account</span>

              <span aria-hidden="true">{mobileAccountOpen ? "⌃" : "⌄"}</span>
            </button>

            {mobileAccountOpen && (
              <div
                id="elan-mobile-account-menu"
                className="mobile-account-menu"
              >
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
            <span aria-hidden="true">⌕</span>
            Search
          </Link>

          {/* DESKTOP ACCOUNT */}
          <div className="nav-dropdown account-dropdown">
            <button
              type="button"
              className="account-trigger"
              onClick={toggleDesktopAccount}
              aria-expanded={desktopAccountOpen}
              aria-haspopup="true"
              aria-controls="elan-desktop-account-menu"
            >
              <span className="account-icon" aria-hidden="true">
                ♙
              </span>

              <span>Account</span>

              <span aria-hidden="true">{desktopAccountOpen ? "⌃" : "⌄"}</span>
            </button>

            {desktopAccountOpen && (
              <div
                id="elan-desktop-account-menu"
                className="nav-dropdown-menu account-menu"
              >
                <Link to="/signin" onClick={closeMenus}>
                  Sign In
                </Link>

                <Link to="/register" onClick={closeMenus}>
                  Create Account
                </Link>

                <div className="dropdown-divider" />

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
            List Your Property
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
