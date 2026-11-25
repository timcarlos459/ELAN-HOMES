import { Link } from "react-router-dom";
import "./Footer.css";

const regions = [
  { name: "Nairobi", link: "/destinations/nairobi" },
  { name: "Coastal Region", link: "/destinations/coastal" },
  { name: "Eastern Region", link: "/destinations/eastern" },
  { name: "Kajiado", link: "/destinations/kajiado" },
  { name: "Central Region", link: "/destinations/central" },
  { name: "Rift Valley", link: "/destinations/rift-valley" },
  { name: "Nyanza & Western", link: "/destinations/nyanza-western" },
];

const companyLinks = [
  { name: "About ÉLAN", link: "/about" },
  { name: "Contact Us", link: "/contact" },
  { name: "List Your Property", link: "/list-property" },
  { name: "Careers", link: "/careers" },
  { name: "FAQs", link: "/help-centre" },
];

const supportLinks = [
  { name: "Help Centre", link: "/help-centre" },
  { name: "Track Your Enquiry", link: "/track-enquiry" },
  { name: "Booking Policy", link: "/booking-policy" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms & Conditions", link: "/terms-and-conditions" },
];

export default function Footer() {
  return (
    <footer className="elan-footer">
      <div className="footer-main">
        {/* BRAND SECTION */}
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand">
            <span className="footer-brand-name">ÉLAN HOMES</span>
            <span className="footer-brand-tagline">LIVE • STAY • INVEST</span>
          </Link>

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
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/stays">Holiday Stays</Link>
          <Link to="/land">Land & Investments</Link>
          <Link to="/destinations/nairobi">Destinations</Link>
        </div>

        {/* DESTINATIONS */}
        <div className="footer-column">
          <h3>Destinations</h3>
          {regions.map((region) => (
            <Link to={region.link} key={region.name}>
              {region.name}
            </Link>
          ))}
        </div>

        {/* COMPANY */}
        <div className="footer-column">
          <h3>Company</h3>
          {companyLinks.map((item) => (
            <Link to={item.link} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* CUSTOMER SUPPORT */}
        <div className="footer-column">
          <h3>Support</h3>
          {supportLinks.map((item) => (
            <Link to={item.link} key={item.name}>
              {item.name}
            </Link>
          ))}
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
