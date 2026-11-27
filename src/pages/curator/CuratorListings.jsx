import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import "./CuratorListings.css";

const categories = ["All Listings", "Land", "Properties", "Stays"];

const LISTINGS_KEY = "elanCuratorListings";
const UPDATE_REQUESTS_KEY = "elanListingUpdateRequests";
const REMOVAL_REQUESTS_KEY = "elanListingRemovalRequests";

// READ SAVED DATA
const readStorage = (key) => {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function CuratorListings() {
  const [activeCategory, setActiveCategory] = useState("All Listings");

  // LOAD LOCAL DATA DURING STATE INITIALIZATION
  const [listings] = useState(() => readStorage(LISTINGS_KEY));

  const [updateRequests, setUpdateRequests] = useState(() =>
    readStorage(UPDATE_REQUESTS_KEY),
  );

  const [removalRequests, setRemovalRequests] = useState(() =>
    readStorage(REMOVAL_REQUESTS_KEY),
  );

  // MODALS
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalType, setModalType] = useState("");

  // EDIT FORM
  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
  });

  // REMOVAL FORM
  const [removalReason, setRemovalReason] = useState("");
  const [removalNote, setRemovalNote] = useState("");

  const [message, setMessage] = useState("");

  // PAGE TITLE
  useEffect(() => {
    document.title = "My Listings | ÉLAN HOMES";
  }, []);

  // FILTER LISTINGS
  const filteredListings =
    activeCategory === "All Listings"
      ? listings
      : listings.filter((listing) => listing.category === activeCategory);

  // OVERVIEW COUNTS
  const activeListings = listings.filter(
    (item) => item.status === "Active",
  ).length;

  const pendingListings = listings.filter(
    (item) =>
      item.status === "Under Review" || item.status === "Pending Verification",
  ).length;

  // SAVE UPDATE REQUESTS
  const saveUpdateRequests = (requests) => {
    try {
      localStorage.setItem(UPDATE_REQUESTS_KEY, JSON.stringify(requests));

      setUpdateRequests(requests);
      return true;
    } catch {
      setMessage("Unable to save your request. Please try again.");
      return false;
    }
  };

  // SAVE REMOVAL REQUESTS
  const saveRemovalRequests = (requests) => {
    try {
      localStorage.setItem(REMOVAL_REQUESTS_KEY, JSON.stringify(requests));

      setRemovalRequests(requests);
      return true;
    } catch {
      setMessage("Unable to save your request. Please try again.");
      return false;
    }
  };

  // CHECK PENDING UPDATE
  const hasPendingUpdate = (listingId) =>
    updateRequests.some(
      (request) =>
        String(request.listingId) === String(listingId) &&
        request.status === "Pending Verification",
    );

  // CHECK PENDING REMOVAL
  const hasPendingRemoval = (listingId) =>
    removalRequests.some(
      (request) =>
        String(request.listingId) === String(listingId) &&
        ["Removal Requested", "Removal Under Review"].includes(request.status),
    );

  // OPEN EDIT MODAL
  const openEditModal = (listing) => {
    setSelectedListing(listing);

    setEditForm({
      title: listing.title || "",
      location: listing.location || "",
      price: listing.price || "",
      description: listing.description || "",
    });

    setMessage("");
    setModalType("edit");
  };

  // OPEN REMOVAL MODAL
  const openRemovalModal = (listing) => {
    setSelectedListing(listing);
    setRemovalReason("");
    setRemovalNote("");
    setMessage("");
    setModalType("remove");
  };

  // CLOSE MODAL
  const closeModal = () => {
    setSelectedListing(null);
    setModalType("");
    setMessage("");
  };

  // EDIT FORM CHANGES
  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // SUBMIT UPDATE REQUEST
  const submitUpdateRequest = (event) => {
    event.preventDefault();

    if (!selectedListing) return;

    if (hasPendingUpdate(selectedListing.id)) {
      setMessage(
        "An update request for this listing is already awaiting verification.",
      );
      return;
    }

    if (hasPendingRemoval(selectedListing.id)) {
      setMessage("This listing already has a removal request under review.");
      return;
    }

    const request = {
      id: `LUR-${Date.now()}`,
      listingId: selectedListing.id,
      listingTitle: selectedListing.title,
      category: selectedListing.category,
      requestedChanges: { ...editForm },
      status: "Pending Verification",
      submittedAt: new Date().toISOString(),
    };

    const updatedRequests = [request, ...updateRequests];

    const saved = saveUpdateRequests(updatedRequests);

    if (!saved) return;

    setMessage(
      "Your update request has been submitted for ÉLAN HOMES verification.",
    );

    setModalType("success");
  };

  // SUBMIT REMOVAL REQUEST
  const submitRemovalRequest = (event) => {
    event.preventDefault();

    if (!selectedListing || !removalReason) return;

    if (hasPendingRemoval(selectedListing.id)) {
      setMessage(
        "A removal request for this listing is already being reviewed.",
      );
      return;
    }

    if (hasPendingUpdate(selectedListing.id)) {
      setMessage(
        "This listing already has an update request awaiting verification. Please wait for its review before requesting removal.",
      );
      return;
    }

    const request = {
      id: `LRR-${Date.now()}`,
      listingId: selectedListing.id,
      listingTitle: selectedListing.title,
      category: selectedListing.category,
      reason: removalReason,
      additionalNote: removalNote.trim(),
      status: "Removal Requested",
      submittedAt: new Date().toISOString(),
    };

    const updatedRequests = [request, ...removalRequests];

    const saved = saveRemovalRequests(updatedRequests);

    if (!saved) return;

    setMessage(
      "Your removal request has been submitted to ÉLAN HOMES for review.",
    );

    setModalType("success");
  };

  return (
    <main className="curator-listings-page">
      <SEO
        title="My Listings | ÉLAN HOMES"
        description="Manage your land, property and accommodation listings on ÉLAN HOMES."
        noindex={true}
      />

      {/* PAGE HEADER */}

      <header className="curator-listings-header">
        <Link to="/curator" className="curator-listings-back">
          ← Back to Dashboard
        </Link>

        <span>CURATOR WORKSPACE</span>

        <h1>My Listings</h1>

        <p>
          Organise and monitor your Land, Properties and Stays listings in one
          place.
        </p>
      </header>

      <section className="curator-listings-container">
        {/* MANAGEMENT NOTICE */}

        <div className="curator-listings-notice">
          <strong>Listing management and verification</strong>

          <p>
            You can request changes or removal of your listings at any time. All
            changes and removal requests must be reviewed and approved by the
            ÉLAN HOMES team before taking effect.
          </p>
        </div>

        {/* OVERVIEW */}

        <div className="curator-listings-overview">
          <div>
            <span>Total Listings</span>
            <strong>{listings.length}</strong>
          </div>

          <div>
            <span>Active Listings</span>
            <strong>{activeListings}</strong>
          </div>

          <div>
            <span>Under Review</span>
            <strong>{pendingListings}</strong>
          </div>
        </div>

        {/* LISTING DIRECTORY */}

        <section className="curator-listings-section">
          <div className="curator-listings-heading">
            <div>
              <span>YOUR PORTFOLIO</span>
              <h2>Listing Directory</h2>
            </div>
          </div>

          {/* CATEGORY FILTERS */}

          <div className="curator-listings-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* LISTINGS */}

          {filteredListings.length === 0 ? (
            <div className="curator-listings-empty">
              <span className="curator-listings-empty-icon">⌂</span>

              <h3>No listings available yet</h3>

              <p>
                Your{" "}
                {activeCategory === "All Listings"
                  ? "listings"
                  : activeCategory.toLowerCase() + " listings"}{" "}
                will appear here once they have been submitted and added to your
                curator portfolio.
              </p>
            </div>
          ) : (
            <div className="curator-listings-grid">
              {filteredListings.map((listing) => {
                const updatePending = hasPendingUpdate(listing.id);
                const removalPending = hasPendingRemoval(listing.id);

                return (
                  <article className="curator-listing-card" key={listing.id}>
                    <div className="curator-listing-card-top">
                      <span className="curator-listing-category">
                        {listing.category}
                      </span>

                      <span className="curator-listing-status">
                        {listing.status || "Unspecified"}
                      </span>
                    </div>

                    <h3>{listing.title}</h3>

                    <p>{listing.location}</p>

                    <strong>{listing.price}</strong>

                    {updatePending && (
                      <p className="curator-listing-pending">
                        Update Pending Verification
                      </p>
                    )}

                    {removalPending && (
                      <p className="curator-listing-pending">
                        Removal Request Under Review
                      </p>
                    )}

                    <div className="curator-listing-actions">
                      <button
                        type="button"
                        onClick={() => openEditModal(listing)}
                        disabled={updatePending || removalPending}
                      >
                        Edit Listing
                      </button>

                      <button
                        type="button"
                        className="curator-listing-remove-button"
                        onClick={() => openRemovalModal(listing)}
                        disabled={removalPending || updatePending}
                      >
                        Request Removal
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* REQUEST HISTORY */}

        <section className="curator-listings-requests">
          <div className="curator-listings-heading">
            <div>
              <span>MANAGEMENT ACTIVITY</span>
              <h2>Your Requests</h2>
            </div>
          </div>

          {updateRequests.length === 0 && removalRequests.length === 0 ? (
            <p className="curator-listings-no-requests">
              You have not submitted any listing changes or removal requests.
            </p>
          ) : (
            <div className="curator-listings-request-list">
              {[
                ...updateRequests.map((request) => ({
                  ...request,
                  requestType: "Listing Update",
                })),

                ...removalRequests.map((request) => ({
                  ...request,
                  requestType: "Removal Request",
                })),
              ]
                .sort(
                  (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt),
                )
                .map((request) => (
                  <article
                    className="curator-listings-request"
                    key={request.id}
                  >
                    <div>
                      <span>{request.requestType}</span>

                      <h3>{request.listingTitle}</h3>

                      <small>Reference: {request.id}</small>
                    </div>

                    <div>
                      <strong>{request.status}</strong>

                      <small>
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </small>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>

        {/* FOOTER */}

        <div className="curator-listings-footer">
          <h3>Need assistance?</h3>

          <p>
            Contact the ÉLAN HOMES team if you need help with your listing,
            changes or removal request.
          </p>

          <Link to="/contact">Contact ÉLAN HOMES →</Link>
        </div>

        <p className="curator-listings-demo">
          Demonstration mode: requests are stored in this browser only. They are
          not yet transmitted to the ÉLAN HOMES team.
        </p>
      </section>

      {/* EDIT LISTING MODAL */}

      {modalType === "edit" && selectedListing && (
        <div className="curator-listing-modal-overlay">
          <div className="curator-listing-modal">
            <button
              type="button"
              className="curator-listing-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            <span className="curator-modal-eyebrow">LISTING MANAGEMENT</span>

            <h2>Request Listing Update</h2>

            <p>
              Submit your proposed changes. Your existing published listing will
              remain unchanged until ÉLAN HOMES verifies and approves the
              update.
            </p>

            <form onSubmit={submitUpdateRequest}>
              <label htmlFor="listing-title">Listing Title</label>

              <input
                id="listing-title"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />

              <label htmlFor="listing-location">Location</label>

              <input
                id="listing-location"
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                required
              />

              <label htmlFor="listing-price">Price</label>

              <input
                id="listing-price"
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                required
              />

              <label htmlFor="listing-description">Description</label>

              <textarea
                id="listing-description"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows={5}
              />

              <button type="submit" className="curator-modal-submit">
                SUBMIT FOR VERIFICATION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REMOVAL REQUEST MODAL */}

      {modalType === "remove" && selectedListing && (
        <div className="curator-listing-modal-overlay">
          <div className="curator-listing-modal">
            <button
              type="button"
              className="curator-listing-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            <span className="curator-modal-eyebrow">LISTING MANAGEMENT</span>

            <h2>Request Listing Removal</h2>

            <p>
              You are requesting the removal of{" "}
              <strong>{selectedListing.title}</strong>. ÉLAN HOMES will review
              your request before removing the listing from public view.
            </p>

            <form onSubmit={submitRemovalRequest}>
              <label htmlFor="removal-reason">Reason for removal</label>

              <select
                id="removal-reason"
                value={removalReason}
                onChange={(event) => setRemovalReason(event.target.value)}
                required
              >
                <option value="">Select a reason</option>

                <option value="Property or land sold">
                  Property or land sold
                </option>

                <option value="Owner withdrew the listing">
                  Owner withdrew the listing
                </option>

                <option value="No longer available">No longer available</option>

                <option value="Property unavailable for stays">
                  Property unavailable for stays
                </option>

                <option value="Incorrect listing information">
                  Incorrect listing information
                </option>

                <option value="Other">Other</option>
              </select>

              <label htmlFor="removal-note">Additional information</label>

              <textarea
                id="removal-note"
                value={removalNote}
                onChange={(event) => setRemovalNote(event.target.value)}
                rows={4}
                placeholder="Explain anything else ÉLAN HOMES should know..."
              />

              <div className="curator-removal-warning">
                Submitting this request does not immediately delete your
                listing. ÉLAN HOMES must review and confirm the removal.
              </div>

              <button
                type="submit"
                className="curator-modal-submit curator-modal-danger"
              >
                SUBMIT REMOVAL REQUEST
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}

      {modalType === "success" && (
        <div className="curator-listing-modal-overlay">
          <div className="curator-listing-modal curator-listing-success">
            <span className="curator-modal-eyebrow">ÉLAN HOMES</span>

            <h2>Request Submitted</h2>

            <p>{message}</p>

            <button
              type="button"
              className="curator-modal-submit"
              onClick={closeModal}
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CuratorListings;
