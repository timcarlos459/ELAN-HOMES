import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import contactDetails from "../data/contact";
import "./Contact.css";

export default function Contact() {
  const [searchParams] = useSearchParams();

  // SELECTED PROPERTY
  const propertyName = searchParams.get("property") || "";

  // HOLIDAY STAY BOOKING DETAILS
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests")) || 1;
  const nights = Number(searchParams.get("nights")) || 0;
  const total = Number(searchParams.get("total")) || 0;

  const isStayEnquiry = Boolean(checkIn || checkOut);

  // SEO SETTINGS
  const seoTitle = isStayEnquiry
    ? "Holiday Stay Booking Enquiry | ÉLAN HOMES"
    : propertyName
      ? `Enquire About ${propertyName} | ÉLAN HOMES`
      : "Contact ÉLAN HOMES | Property & Holiday Stay Enquiries";

  const seoDescription =
    "Contact ÉLAN HOMES for enquiries about properties for sale, holiday stays, land opportunities, property listings and partnerships across Kenya.";

  // FORMAT PRICE
  const formatPrice = (price) =>
    `KSh ${Number(price || 0).toLocaleString("en-KE")}`;

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "Not selected";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not selected";
    }

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // INITIAL MESSAGE
  const initialMessage = isStayEnquiry
    ? `I am interested in booking ${propertyName}.

Check-in: ${formatDate(checkIn)}
Check-out: ${formatDate(checkOut)}
Guests: ${guests}
Number of nights: ${nights}
Estimated accommodation total: ${formatPrice(total)}

Please confirm availability and provide further booking information.`
    : propertyName
      ? `I am interested in ${propertyName}. Please provide more information or arrange a viewing.`
      : "";

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: isStayEnquiry
      ? "Holiday Stays"
      : propertyName
        ? "Buying a Property"
        : "",
    message: initialMessage,
  });

  // HANDLE FORM CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();

    // SAVE HOLIDAY STAY BOOKING ENQUIRY
    if (isStayEnquiry && propertyName) {
      try {
        const existingBookings = JSON.parse(
          localStorage.getItem("elanBookings") || "[]",
        );

        const bookings = Array.isArray(existingBookings)
          ? existingBookings
          : [];

        // GENERATE PERMANENT UUID
        const bookingId = crypto.randomUUID();

        // GENERATE CUSTOMER-FRIENDLY REFERENCE
        const bookingReference = `ELAN-${bookingId.slice(0, 8).toUpperCase()}`;

        // CREATE BOOKING RECORD
        const newBooking = {
          id: bookingId,
          bookingReference,
          type: "stay",
          stayName: propertyName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: "To be confirmed",
          checkIn,
          checkOut,
          guests,
          nights,
          total,
          status: "pending",
        };

        // SAVE BOOKING
        bookings.unshift(newBooking);

        localStorage.setItem("elanBookings", JSON.stringify(bookings));
      } catch (error) {
        console.error("Could not save booking enquiry:", error);

        alert("We could not save your booking enquiry. Please try again.");

        return;
      }
    }

    // PREPARE WHATSAPP MESSAGE
    const message = `Hello ELAN HOMES,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
${propertyName ? `Property / Accommodation: ${propertyName}` : ""}

${
  isStayEnquiry
    ? `BOOKING DETAILS:

Check-in: ${formatDate(checkIn)}
Check-out: ${formatDate(checkOut)}
Guests: ${guests}
Number of nights: ${nights}
Estimated Total: ${formatPrice(total)}

`
    : ""
}Message:
${formData.message}`;

    // WHATSAPP NUMBER
    const whatsappNumber = contactDetails.whatsappNumber;

    // OPEN WHATSAPP
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className="contact-page">
      <SEO title={seoTitle} description={seoDescription} />

      {/* CONTACT HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span>WE WOULD LOVE TO HEAR FROM YOU</span>

          <h1>Let's Start a Conversation.</h1>

          <p>
            Whether you are looking for a home, planning your next stay, or
            interested in listing your property, our team is here to help.
          </p>
        </div>
      </section>

      {/* CONTACT INTRO */}
      <section className="contact-intro">
        <span className="contact-eyebrow">GET IN TOUCH</span>

        <h2>How Can We Help You?</h2>

        <p>
          Reach out to ELAN HOMES. We look forward to helping you find the right
          property or accommodation.
        </p>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-main">
        {/* CONTACT INFORMATION */}
        <div className="contact-information">
          <span className="contact-eyebrow">CONTACT INFORMATION</span>

          <h2>Connect With Our Team</h2>

          <p>
            Speak with us about property enquiries, holiday stays, partnerships
            and general assistance.
          </p>

          <div className="contact-info-item">
            <div className="contact-icon">✉</div>

            <div>
              <h3>Email Us</h3>
              <p>Coming soon</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">☎</div>

            <div>
              <h3>Call Us</h3>
              <p>Contact number coming soon</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">⌖</div>

            <div>
              <h3>Our Location</h3>
              <p>{contactDetails.location}</p>
            </div>
          </div>

          <div className="contact-social">
            <h3>ELAN HOMES</h3>
            <p>Find your place. Experience the difference.</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-container">
          <span className="contact-eyebrow">SEND AN ENQUIRY</span>

          <h2>Send Us a Message</h2>

          <p>Complete the form below and our team will get back to you.</p>

          {/* SELECTED PROPERTY OR STAY */}
          {propertyName && (
            <div className="selected-property-enquiry">
              <span>
                {isStayEnquiry ? "HOLIDAY STAY ENQUIRY" : "PROPERTY ENQUIRY"}
              </span>

              <h3>{propertyName}</h3>

              {isStayEnquiry ? (
                <div className="booking-enquiry-summary">
                  <div>
                    <span>Check-in</span>
                    <strong>{formatDate(checkIn)}</strong>
                  </div>

                  <div>
                    <span>Check-out</span>
                    <strong>{formatDate(checkOut)}</strong>
                  </div>

                  <div>
                    <span>Guests</span>
                    <strong>{guests}</strong>
                  </div>

                  <div>
                    <span>Number of nights</span>
                    <strong>{nights}</strong>
                  </div>

                  <div className="booking-enquiry-total">
                    <span>Estimated Total</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>

                  <p>
                    Availability and final pricing will be confirmed by ELAN
                    HOMES.
                  </p>
                </div>
              ) : (
                <p>Your enquiry will be linked to this selected property.</p>
              )}
            </div>
          )}

          {/* CONTACT FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Enquiry Type</option>
              <option value="Buying a Property">Buying a Property</option>
              <option value="Holiday Stays">Holiday Stays</option>
              <option value="Listing a Property">Listing a Property</option>
              <option value="Land Enquiry">Land Enquiry</option>
              <option value="Partnership">Partnership</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us how we can help you..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Enquiry via WhatsApp</button>

            <small>
              Your booking enquiry will be saved in My Bookings. WhatsApp will
              open with your message ready for you to send.
            </small>
          </form>
        </div>
      </section>
    </main>
  );
}
