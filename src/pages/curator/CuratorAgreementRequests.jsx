import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import "./CuratorAgreementRequests.css";

const STORAGE_KEY = "elanAgreementRequests";

const categories = [
  {
    value: "Land",
    description: "Land sales, purchases and leases.",
  },
  {
    value: "Properties",
    description: "Property sales, rentals and leases.",
  },
  {
    value: "Stays",
    description: "Holiday homes, villas and short stays.",
  },
];

const transactionOptions = {
  Land: [
    { value: "Sale", label: "Land Sale" },
    { value: "Purchase", label: "Land Purchase" },
    { value: "Lease", label: "Land Lease" },
  ],
  Properties: [
    { value: "Sale", label: "Property Sale" },
    { value: "Rental", label: "Property Rental" },
    { value: "Lease", label: "Property Lease" },
  ],
  Stays: [
    { value: "Short Stay Booking", label: "Short Stay Booking" },
    { value: "Extended Stay", label: "Extended Stay" },
  ],
};

// STORAGE
function getSavedRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// FORMAT DATE
function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// FORMAT AMOUNT
function formatAmount(amount) {
  if (amount === "" || amount === null || amount === undefined) {
    return "Not provided";
  }

  const number = Number(amount);

  if (!Number.isFinite(number)) {
    return "Not provided";
  }

  return `KSh ${number.toLocaleString("en-KE")}`;
}

// CATEGORY DETAILS
function getCategoryDetails(request) {
  const details = request.categoryDetails || {};

  if (request.category === "Land") {
    return [
      ["Land size", details.plotSize],
      ["Land tenure", details.tenure],
    ];
  }

  if (request.category === "Properties") {
    return [
      ["Property type", details.propertyType],
      ["Furnishing", details.furnishing],
    ];
  }

  return [
    ["Check-in", details.checkIn],
    ["Check-out", details.checkOut],
    ["Guests", details.guestCount],
    ["Units", details.unitCount],
  ];
}

function CuratorAgreementRequests() {
  const [category, setCategory] = useState("Land");

  const [listingReference, setListingReference] = useState("");
  const [listingTitle, setListingTitle] = useState("");
  const [location, setLocation] = useState("");
  const [transactionType, setTransactionType] = useState("Sale");
  const [amount, setAmount] = useState("");
  const [clientReference, setClientReference] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");

  // LAND DETAILS
  const [plotSize, setPlotSize] = useState("");
  const [tenure, setTenure] = useState("");

  // PROPERTY DETAILS
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");

  // STAY DETAILS
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [unitCount, setUnitCount] = useState("");

  // REQUEST TRACKING
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState(getSavedRequests);
  const [expandedRequest, setExpandedRequest] = useState(null);

  // CHANGE CATEGORY
  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setTransactionType(transactionOptions[newCategory][0].value);
    setMessage("");
  };

  // RESET FORM
  const resetForm = () => {
    setListingReference("");
    setListingTitle("");
    setLocation("");
    setAmount("");
    setClientReference("");
    setTransactionDetails("");

    setPlotSize("");
    setTenure("");

    setPropertyType("");
    setFurnishing("");

    setCheckIn("");
    setCheckOut("");
    setGuestCount("");
    setUnitCount("");
  };

  // SUBMIT REQUEST
  const handleSubmit = (event) => {
    event.preventDefault();

    const numericAmount = amount === "" ? "" : Number(amount);

    if (
      numericAmount !== "" &&
      (!Number.isFinite(numericAmount) || numericAmount < 0)
    ) {
      setMessage("Please enter a valid transaction amount.");
      return;
    }

    if (category === "Stays") {
      if (!checkIn || !checkOut) {
        setMessage("Please provide both check-in and check-out dates.");
        return;
      }

      if (checkOut <= checkIn) {
        setMessage("Check-out date must be after the check-in date.");
        return;
      }

      if (guestCount && Number(guestCount) < 1) {
        setMessage("Guest count must be at least one.");
        return;
      }

      if (unitCount && Number(unitCount) < 1) {
        setMessage("Unit count must be at least one.");
        return;
      }
    }

    const newRequest = {
      id: `EAR-${Date.now()}`,
      category,
      listingReference: listingReference.trim(),
      listingTitle: listingTitle.trim(),
      location: location.trim(),
      transactionType,
      amount: numericAmount,
      clientReference: clientReference.trim(),
      transactionDetails: transactionDetails.trim(),

      categoryDetails:
        category === "Land"
          ? {
              plotSize,
              tenure,
            }
          : category === "Properties"
            ? {
                propertyType,
                furnishing,
              }
            : {
                checkIn,
                checkOut,
                guestCount,
                unitCount,
              },

      status: "Submitted",
      createdAt: new Date().toISOString(),
    };

    const updatedRequests = [newRequest, ...requests];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));

      setRequests(updatedRequests);
      resetForm();
      setMessage("Your agreement request has been saved successfully.");
      setExpandedRequest(null);
    } catch {
      setMessage(
        "The request could not be saved. Please check your browser storage.",
      );
    }
  };

  const submittedCount = requests.filter(
    (item) => item.status === "Submitted",
  ).length;

  return (
    <main className="agreement-requests-page">
      <SEO
        title="Request Client Agreement | ÉLAN HOMES"
        description="Submit transaction details to ÉLAN HOMES for preparation of client agreements."
        noindex={true}
      />

      {/* HEADER */}
      <header className="agreement-requests-header">
        <span>ÉLAN HOMES PARTNER PORTAL</span>

        <h1>Request Client Agreement</h1>

        <p>
          Submit transaction information to the ÉLAN HOMES team for preparation
          of the appropriate client agreement.
        </p>
      </header>

      <div className="agreement-requests-container">
        <Link to="/curator" className="agreement-back-link">
          ← Back to Dashboard
        </Link>

        {/* INTRODUCTION */}
        <section className="agreement-request-intro">
          <span>AGREEMENT MANAGEMENT</span>

          <h2>Start a new agreement request</h2>

          <p>
            Select a transaction category and provide the relevant information.
            ÉLAN HOMES will review the request and coordinate the agreement
            process with the client.
          </p>
        </section>

        {/* CATEGORY SELECTOR */}
        <div className="agreement-category-grid">
          {categories.map((item) => (
            <button
              type="button"
              key={item.value}
              className={
                category === item.value
                  ? "agreement-category active"
                  : "agreement-category"
              }
              onClick={() => changeCategory(item.value)}
              aria-pressed={category === item.value}
            >
              <strong>{item.value}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>

        {/* REQUEST FORM */}
        <form className="agreement-request-form" onSubmit={handleSubmit}>
          <div className="agreement-form-heading">
            <span>NEW REQUEST</span>
            <h2>{category} Agreement Details</h2>
          </div>

          <div className="agreement-form-grid">
            <div className="agreement-form-field">
              <label htmlFor="listingReference">Listing Reference Number</label>

              <input
                id="listingReference"
                type="text"
                value={listingReference}
                onChange={(event) => setListingReference(event.target.value)}
                placeholder="e.g. ELAN-LAND-001"
              />
            </div>

            <div className="agreement-form-field">
              <label htmlFor="listingTitle">Listing Title *</label>

              <input
                id="listingTitle"
                type="text"
                value={listingTitle}
                onChange={(event) => setListingTitle(event.target.value)}
                placeholder="Enter listing or property name"
                required
              />
            </div>

            <div className="agreement-form-field">
              <label htmlFor="listingLocation">Location *</label>

              <input
                id="listingLocation"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="agreement-form-field">
              <label htmlFor="transactionType">Transaction Type *</label>

              <select
                id="transactionType"
                value={transactionType}
                onChange={(event) => setTransactionType(event.target.value)}
                required
              >
                {transactionOptions[category].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="agreement-form-field">
              <label htmlFor="transactionAmount">
                {category === "Stays"
                  ? "Proposed Booking Amount (KSh)"
                  : "Proposed Transaction Amount (KSh)"}
              </label>

              <input
                id="transactionAmount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div className="agreement-form-field">
              <label htmlFor="clientReference">
                Internal Client Reference (Optional)
              </label>

              <input
                id="clientReference"
                type="text"
                value={clientReference}
                onChange={(event) => setClientReference(event.target.value)}
                placeholder="Internal reference only"
              />
            </div>
          </div>

          {/* LAND DETAILS */}
          {category === "Land" && (
            <>
              <div className="agreement-form-heading">
                <h2>Land Details</h2>
              </div>

              <div className="agreement-form-grid">
                <div className="agreement-form-field">
                  <label htmlFor="plotSize">Land Size</label>

                  <input
                    id="plotSize"
                    type="text"
                    value={plotSize}
                    onChange={(event) => setPlotSize(event.target.value)}
                    placeholder="e.g. 50 x 100 ft, 1 acre"
                  />
                </div>

                <div className="agreement-form-field">
                  <label htmlFor="landTenure">Land Tenure</label>

                  <select
                    id="landTenure"
                    value={tenure}
                    onChange={(event) => setTenure(event.target.value)}
                  >
                    <option value="">Select tenure</option>
                    <option value="Freehold">Freehold</option>
                    <option value="Leasehold">Leasehold</option>
                    <option value="Unknown">Not yet confirmed</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* PROPERTY DETAILS */}
          {category === "Properties" && (
            <>
              <div className="agreement-form-heading">
                <h2>Property Details</h2>
              </div>

              <div className="agreement-form-grid">
                <div className="agreement-form-field">
                  <label htmlFor="propertyType">Property Type</label>

                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(event) => setPropertyType(event.target.value)}
                  >
                    <option value="">Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Maisonette">Maisonette</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Commercial">Commercial Property</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="agreement-form-field">
                  <label htmlFor="furnishing">Furnishing Status</label>

                  <select
                    id="furnishing"
                    value={furnishing}
                    onChange={(event) => setFurnishing(event.target.value)}
                  >
                    <option value="">Select furnishing status</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-furnished">Semi-furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Not applicable">Not applicable</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* STAY DETAILS */}
          {category === "Stays" && (
            <>
              <div className="agreement-form-heading">
                <h2>Stay Booking Details</h2>
              </div>

              <div className="agreement-form-grid">
                <div className="agreement-form-field">
                  <label htmlFor="checkIn">Check-in Date</label>

                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                  />
                </div>

                <div className="agreement-form-field">
                  <label htmlFor="checkOut">Check-out Date</label>

                  <input
                    id="checkOut"
                    type="date"
                    min={checkIn || undefined}
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                  />
                </div>

                <div className="agreement-form-field">
                  <label htmlFor="guestCount">Number of Guests</label>

                  <input
                    id="guestCount"
                    type="number"
                    min="1"
                    step="1"
                    value={guestCount}
                    onChange={(event) => setGuestCount(event.target.value)}
                    placeholder="e.g. 4"
                  />
                </div>

                <div className="agreement-form-field">
                  <label htmlFor="unitCount">Number of Units</label>

                  <input
                    id="unitCount"
                    type="number"
                    min="1"
                    step="1"
                    value={unitCount}
                    onChange={(event) => setUnitCount(event.target.value)}
                    placeholder="e.g. 1"
                  />
                </div>
              </div>
            </>
          )}

          {/* ADDITIONAL INFORMATION */}
          <div className="agreement-form-field full-width">
            <label htmlFor="transactionDetails">
              Additional Transaction Details
            </label>

            <textarea
              id="transactionDetails"
              rows="6"
              value={transactionDetails}
              onChange={(event) => setTransactionDetails(event.target.value)}
              placeholder="Include relevant conditions, payment arrangements, dates, booking details or other information for ÉLAN HOMES."
            />
          </div>

          {/* COMMUNICATION POLICY */}
          <div className="agreement-request-policy">
            <strong>ÉLAN HOMES Communication Policy</strong>

            <p>
              Submit transaction information to ÉLAN HOMES. The ÉLAN HOMES team
              coordinates agreements and client communication. Curators must not
              send agreements directly to clients or arrange private
              transactions outside the authorised process.
            </p>
          </div>

          {/* FEEDBACK */}
          {message && (
            <div
              className="agreement-request-message"
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <button type="submit" className="agreement-submit-button">
            SAVE AGREEMENT REQUEST →
          </button>

          <p className="agreement-demo-note">
            Demonstration only: requests are saved in this browser. They are not
            yet delivered to the ÉLAN HOMES team.
          </p>
        </form>

        {/* REQUEST TRACKING */}
        <section className="agreement-request-history">
          <div>
            <span>REQUEST TRACKING</span>

            <h2>Your Agreement Requests</h2>

            <p>
              View the details and current status of your saved agreement
              requests.
            </p>
          </div>

          {/* TRACKING SUMMARY */}
          <div className="agreement-tracking-summary">
            <div>
              <strong>{requests.length}</strong>
              <span>Total Requests</span>
            </div>

            <div>
              <strong>{submittedCount}</strong>
              <span>Submitted</span>
            </div>

            <div>
              <strong>—</strong>
              <span>Backend Review</span>
            </div>
          </div>

          {/* EMPTY STATE */}
          {requests.length === 0 ? (
            <div className="agreement-empty-state">
              <h3>No requests yet</h3>

              <p>Your submitted agreement requests will appear here.</p>
            </div>
          ) : (
            <div className="agreement-request-list">
              {requests.map((request) => {
                const isExpanded = expandedRequest === request.id;

                const categoryDetails = getCategoryDetails(request);

                return (
                  <article className="agreement-request-item" key={request.id}>
                    <div className="agreement-request-main">
                      <span>{request.category}</span>

                      <h3>{request.listingTitle}</h3>

                      <p>{request.location}</p>

                      <small>Reference: {request.id}</small>

                      <p>Transaction: {request.transactionType}</p>

                      <small>Submitted: {formatDate(request.createdAt)}</small>
                    </div>

                    <div className="agreement-request-side">
                      <div className="agreement-request-status">
                        {request.status || "Submitted"}
                      </div>

                      <button
                        type="button"
                        className="agreement-view-details"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedRequest(isExpanded ? null : request.id)
                        }
                      >
                        {isExpanded ? "Hide details ↑" : "View details →"}
                      </button>
                    </div>

                    {/* EXPANDED DETAILS */}
                    {isExpanded && (
                      <div className="agreement-request-expanded">
                        <h4>Request Information</h4>

                        <div className="agreement-request-detail-grid">
                          <div>
                            <span>Listing Reference</span>
                            <strong>
                              {request.listingReference || "Not provided"}
                            </strong>
                          </div>

                          <div>
                            <span>Transaction Amount</span>
                            <strong>{formatAmount(request.amount)}</strong>
                          </div>

                          <div>
                            <span>Client Reference</span>
                            <strong>
                              {request.clientReference || "Not provided"}
                            </strong>
                          </div>

                          {categoryDetails.map(([label, value]) => (
                            <div key={label}>
                              <span>{label}</span>
                              <strong>{value || "Not provided"}</strong>
                            </div>
                          ))}
                        </div>

                        <h4>Additional Details</h4>

                        <p>
                          {request.transactionDetails ||
                            "No additional details were provided."}
                        </p>

                        <div className="agreement-tracking-note">
                          <strong>
                            Current stage: {request.status || "Submitted"}
                          </strong>

                          <p>
                            This request is saved locally in this browser. ÉLAN
                            HOMES has not yet received or reviewed it. Status
                            updates will become available after backend
                            integration.
                          </p>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default CuratorAgreementRequests;
