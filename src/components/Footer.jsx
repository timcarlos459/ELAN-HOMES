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

const accountLinks = [
  { name: "Sign In", link: "/signin" },
  { name: "Create Account", link: "/register" },
  { name: "My Account", link: "/account" },
  { name: "Saved Listings", link: "/saved" },
  { name: "My Bookings", link: "/bookings" },
];

const socialPlatforms = [
  { name: "Facebook", label: "f" },
  { name: "Instagram", label: "ig" },
  { name: "TikTok", label: "tk" },
  { name: "LinkedIn", label: "in" },
];

function FooterColumn({ title, links }) {
  return (
    <nav className="footer-column" aria-label={title}>
      <h3>{title}</h3>

      {links.map((item) => (
        <Link to={item.link} key={item.name}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="elan-footer">
      <div className="footer-main">
        {/* BRAND SECTION */}
        <div className="footer-brand-section">
          <Link
            to="/"
            className="footer-brand"
            aria-label="ÉLAN HOMES homepage"
          >
            <span className="footer-brand-name">ÉLAN HOMES</span>
            <span className="footer-brand-tagline">LIVE • STAY • INVEST</span>
          </Link>

          <p>
            Discover exceptional properties, beautiful holiday destinations and
            prime investment opportunities across Kenya.
          </p>

          {/* FUTURE SOCIAL MEDIA ACCOUNTS */}
          <div
            className="footer-socials"
            aria-label="Our future social media platforms"
          >
            {socialPlatforms.map((platform) => (
              <span
                key={platform.name}
                aria-label={`${platform.name} account coming soon`}
                title={`${platform.name} - Coming soon`}
              >
                {platform.label}
              </span>
            ))}
          </div>
        </div>

        {/* EXPLORE */}
        <FooterColumn
          title="Explore"
          links={[
            { name: "Home", link: "/" },
            { name: "Properties", link: "/properties" },
            { name: "Holiday Stays", link: "/stays" },
            { name: "Land & Investments", link: "/land" },
            { name: "Destinations", link: "/destinations/nairobi" },
          ]}
        />

        {/* DESTINATIONS */}
        <FooterColumn title="Destinations" links={regions} />

        {/* COMPANY */}
        <FooterColumn title="Company" links={companyLinks} />

        {/* SUPPORT */}
        <FooterColumn title="Support" links={supportLinks} />

        {/* ACCOUNT */}
        <FooterColumn title="My Account" links={accountLinks} />
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ÉLAN HOMES. All rights reserved.</p>

        <p>Designed for better living in Kenya.</p>
      </div>
    </footer>
  );
}
