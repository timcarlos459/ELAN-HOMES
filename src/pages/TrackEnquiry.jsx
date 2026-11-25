import { useState } from "react";
import { Link } from "react-router-dom";

import "./TrackEnquiry.css";

function TrackEnquiry() {
  const [reference, setReference] = useState("");
  const [searched, setSearched] = useState(false);

  const normalizedReference = reference.trim().toUpperCase();

  const isValidReference =
    /^ELAN-[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/.test(
      normalizedReference,
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearched(true);
  };

  const handleReferenceChange = (event) => {
    setReference(event.target.value.toUpperCase());
    setSearched(false);
  };

  return (
    <main className="track-enquiry-page">
      <div className="track-enquiry-container">
        {/* PAGE HEADING */}
        <div className="track-enquiry-heading">
          <span>ÉLAN HOMES CUSTOMER SUPPORT</span>

          <h1>Track Your Enquiry</h1>

          <p>
            Enter your ÉLAN HOMES reference number to check the progress of your
            property, land or stay enquiry.
          </p>
        </div>

        {/* REFERENCE SEARCH */}
        <section className="track-enquiry-card">
          <h2>Enter Reference Number</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="enquiryReference">Enquiry Reference</label>

            <input
              id="enquiryReference"
              type="text"
              value={reference}
              onChange={handleReferenceChange}
              placeholder="ELAN-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              autoComplete="off"
              spellCheck="false"
              required
            />

            <button type="submit">Track Enquiry</button>
          </form>

          {/* VALIDATION MESSAGE */}
          {searched && (
            <div
              className={`track-enquiry-message ${
                isValidReference
                  ? "track-enquiry-valid"
                  : "track-enquiry-invalid"
              }`}
              role="status"
              aria-live="polite"
            >
              {isValidReference ? (
                <>
                  <h3>Reference Format Accepted</h3>

                  <p>
                    Your reference number has the correct format. Actual enquiry
                    status and communication history will be available once the
                    ÉLAN HOMES database is connected.
                  </p>
                </>
              ) : (
                <>
                  <h3>Invalid Reference Number</h3>

                  <p>
                    Please check your reference number and enter the complete
                    ÉLAN HOMES reference.
                  </p>
                </>
              )}
            </div>
          )}
        </section>

        {/* HELP SECTION */}
        <div className="track-enquiry-help">
          <p>
            Don't have your reference number? Check the confirmation displayed
            after submitting your enquiry.
          </p>

          <Link to="/">Return to ÉLAN HOMES</Link>
        </div>
      </div>
    </main>
  );
}

export default TrackEnquiry;
