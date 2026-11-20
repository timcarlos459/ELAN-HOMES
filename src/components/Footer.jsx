import "./Footer.css";

export default function Footer() {
  return (
    <footer className="elan-footer">
      <div className="footer-main">
        {/* BRAND SECTION */}
        <div className="footer-brand-section">
          <a href="/" className="footer-brand">
            <span className="footer-brand-name">ÉLAN HOMES</span>
            <span className="footer-brand-tagline">LIVE • STAY • INVEST</span>
          </a>

          <p>
            Discover exceptional properties, beautiful holiday destinations and
            prime investment opportunities across Kenya.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              ig
            </a>
            <a href="#" aria-label="TikTok">
              tk
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Explore</h3>
          <a href="/">Home</a>
          <a href="#properties">Properties</a>
          <a href="#bnb">Holiday Stays</a>
          <a href="#land">Land & Investments</a>
          <a href="#destinations">Destinations</a>
        </div>

        {/* DESTINATIONS */}
        <div className="footer-column">
          <h3>Destinations</h3>
          <a href="#nairobi">Nairobi</a>
          <a href="#mombasa">Mombasa</a>
          <a href="#kilifi">Kilifi</a>
          <a href="#nakuru">Nakuru</a>
          <a href="#naivasha">Naivasha</a>
          <a href="#nanyuki">Nanyuki</a>
        </div>

        {/* COMPANY */}
        <div className="footer-column">
          <h3>Company</h3>
          <a href="#about">About ELAN</a>
          <a href="#contact">Contact Us</a>
          <a href="#list-property">List Your Property</a>
          <a href="#careers">Careers</a>
          <a href="#faq">FAQs</a>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div className="footer-column">
          <h3>Support</h3>
          <a href="#help">Help Centre</a>
          <a href="#booking-policy">Booking Policy</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ÉLAN HOMES. All rights reserved.</p>

        <p>Designed for better living in Kenya.</p>
      </div>
    </footer>
  );
}
