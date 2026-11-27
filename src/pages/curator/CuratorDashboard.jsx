
import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import "./CuratorDashboard.css";

// TEMPORARY DEVELOPMENT PREVIEW
// Change to false when previewing is finished.
const CURATOR_PREVIEW_MODE = true;

const STORAGE_KEY = "elanCuratorApplication";

const dashboardSections = [
  {
    title: "My Listings",
    description: "Manage your land, properties and stays listings.",
    link: "/curator/listings",
  },
  {
    title: "Customer Enquiries",
    description:
      "View enquiry updates and provide information to the ÉLAN HOMES team. All client communication is handled by ÉLAN HOMES.",
    link: "/curator/enquiries",
  },
  {
    title: "Stay Bookings",
    description:
      "View booking updates and provide availability and accommodation information to ÉLAN HOMES.",
    link: "/curator/bookings",
  },
  {
    title: "Earnings & Payouts",
    description: "Track your earnings, commissions and payment history.",
    link: "/curator/earnings",
  },
  {
    title: "My Profile",
    description: "Manage your curator information.",
    link: "/curator/profile",
  },
  {
    title: "Curator Agreement",
    description: "Review your agreement with ÉLAN HOMES.",
    link: "/curator/agreement",
  },
  {
    title: "Curator–Client Agreement",
    description:
      "Review the agreement governing client services across Land, Properties and Stays.",
    link: "/curator/client-agreement",
  },
  {
    title: "Request Client Agreement",
    description:
      "Submit Land, Properties or Stays transaction details to ÉLAN HOMES for preparation of a client agreement.",
    link: "/curator/agreement-requests",
  },
];

const approvalSteps = [
  {
    number: "01",
    title: "Complete your profile",
    description:
      "Provide your contact information and the details relevant to your selected listing categories.",
  },
  {
    number: "02",
    title: "Application review",
    description:
      "ÉLAN HOMES will review your application and may request supporting information where necessary.",
  },
  {
    number: "03",
    title: "Agreement and approval",
    description:
      "Review and accept the Curator–ÉLAN HOMES Agreement before your operational access is activated.",
  },
  {
    number: "04",
    title: "Start managing listings",
    description:
      "Once approved, manage your authorised listings and provide the ÉLAN HOMES team with the information needed to serve clients.",
  },
];

function getSavedApplication() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function CuratorDashboard() {
  const [application] = useState(getSavedApplication);

  const applicationStatus = application?.status || null;

  const hasApplication = [
    "pending",
    "under_review",
    "approved",
    "rejected",
    "suspended",
  ].includes(applicationStatus);

  const isApproved = applicationStatus === "approved";
  const hasDraft = applicationStatus === "draft";

  const statusLabels = {
    pending: "Pending Approval",
    under_review: "Under Review",
    approved: "Approved",
    rejected: "Application Requires Attention",
    suspended: "Account Suspended",
  };

  const getApplicationHeading = () => {
    switch (applicationStatus) {
      case "pending":
        return "Your curator account is awaiting approval.";
      case "under_review":
        return "Your application is being reviewed.";
      case "rejected":
        return "Your application requires attention.";
      case "suspended":
        return "Your curator access is currently restricted.";
      default:
        return "";
    }
  };

  const getApplicationMessage = () => {
    switch (applicationStatus) {
      case "pending":
        return "Thank you for applying to become an ÉLAN HOMES Curator. Your application has been submitted and is awaiting review. You can prepare your profile, but publishing listings and managing bookings are not yet available.";
      case "under_review":
        return "The ÉLAN HOMES team is reviewing your application. We will provide an update when the review is complete.";
      case "rejected":
        return "Please contact the ÉLAN HOMES team for clarification about your application and any available next steps.";
      case "suspended":
        return "Please contact the ÉLAN HOMES team for information about your account status and any steps required.";
      default:
        return "";
    }
  };

  return (
    <main className="curator-dashboard">
      <SEO
        title="Curator Dashboard | ÉLAN HOMES"
        description="Manage your ÉLAN HOMES curator profile, listings, bookings, enquiries and agreements."
        noindex={true}
      />

      {/* HEADER */}
      <section className="curator-dashboard-header">
        <span className="curator-eyebrow">ÉLAN HOMES PARTNER PORTAL</span>

        <h1>Curator Dashboard</h1>

        <p>
          Your workspace for managing property, land and accommodation listings
          in partnership with ÉLAN HOMES.
        </p>
      </section>

      <section className="curator-dashboard-content">
        {/* PREVIEW MODE NOTICE */}
        {CURATOR_PREVIEW_MODE && (
          <div
            style={{
              background: "#171717",
              color: "#d6b574",
              borderLeft: "4px solid #c49a52",
              padding: "18px 22px",
              marginBottom: "25px",
              lineHeight: 1.7,
            }}
          >
            <strong>CURATOR PREVIEW MODE ACTIVE</strong>
            <p style={{ color: "#eee", margin: "6px 0 0", fontSize: "13px" }}>
              You can open the curator service sections to preview their
              development. This does not approve your account or activate
              real operational permissions.
            </p>
          </div>
        )}

        {/* ACCOUNT OVERVIEW */}
        <div className="curator-dashboard-welcome">
          <div>
            <span className="curator-account-label">CURATOR ACCOUNT</span>

            <h2>Welcome to ÉLAN HOMES</h2>

            <p>
              Your curator workspace and application information will be
              managed here.
            </p>
          </div>

          {hasApplication && (
            <span
              className={`curator-status ${
                isApproved ? "approved" : "pending"
              }`}
            >
              {statusLabels[applicationStatus]}
            </span>
          )}
        </div>

        {/* CENTRAL COMMUNICATION POLICY */}
        <section className="curator-communication-notice">
          <span className="curator-notice-eyebrow">
            ÉLAN HOMES COMMUNICATION POLICY
          </span>

          <h2>All client communication is handled by ÉLAN HOMES.</h2>

          <p>
            ÉLAN HOMES is the central communication channel between clients
            and curators. All client enquiries, responses, viewing
            arrangements, booking confirmations, changes and complaints are
            handled directly by the ÉLAN HOMES team.
          </p>

          <p>
            As a curator, you are responsible for providing ÉLAN HOMES with
            accurate listing information, availability, prices, viewing
            schedules and other relevant updates. The ÉLAN HOMES team will
            communicate the relevant information to clients.
          </p>
        </section>

        {/* NO APPLICATION */}
        {!hasApplication && (
          <section className="curator-application-notice">
            <span className="curator-notice-eyebrow">
              BECOME AN ÉLAN HOMES CURATOR
            </span>

            <h2>
              {hasDraft
                ? "Your curator profile draft is saved."
                : "Ready to become an ÉLAN HOMES Curator?"}
            </h2>

            <p>
              {hasDraft
                ? "You have saved a profile draft. Continue completing your information when you are ready to submit your curator application."
                : "Complete your curator profile and submit an application to begin the approval process. Your account will only show an approval status after you submit your application."}
            </p>

            <Link className="curator-application-link" to="/curator/profile">
              {hasDraft ? "CONTINUE PROFILE →" : "COMPLETE CURATOR PROFILE →"}
            </Link>
          </section>
        )}

        {/* APPLICATION STATUS */}
        {hasApplication && !isApproved && (
          <section className="curator-application-notice">
            <span className="curator-notice-eyebrow">
              YOUR APPLICATION STATUS
            </span>

            <h2>{getApplicationHeading()}</h2>

            <p>{getApplicationMessage()}</p>

            {applicationStatus === "pending" && (
              <div className="curator-permissions">
                <div>
                  <span className="curator-permission-icon">✓</span>
                  <span>Prepare your curator profile</span>
                </div>

                <div>
                  <span className="curator-permission-icon">✓</span>
                  <span>Review the application process</span>
                </div>

                <div>
                  <span className="curator-permission-icon restricted">—</span>
                  <span>Publishing listings is not yet available</span>
                </div>

                <div>
                  <span className="curator-permission-icon restricted">—</span>
                  <span>Managing bookings is not yet available</span>
                </div>
              </div>
            )}
          </section>
        )}

        {/* APPROVED STATUS */}
        {isApproved && (
          <section className="curator-application-notice approved">
            <span className="curator-notice-eyebrow">YOUR ACCOUNT STATUS</span>

            <h2>Your ÉLAN HOMES Curator account is approved!</h2>

            <p>
              Congratulations! Your curator application has been approved.
              You can now access your authorised curator tools and manage
              your approved listing categories, subject to your accepted
              agreement.
            </p>

            <p>
              Remember that all communication with clients remains the
              responsibility of ÉLAN HOMES. Please provide the ÉLAN HOMES
              team with timely and accurate information so clients receive
              the correct updates.
            </p>
          </section>
        )}

        {/* APPROVAL JOURNEY */}
        {!isApproved && (
          <section className="curator-approval-journey">
            <div className="curator-section-heading">
              <span>YOUR JOURNEY</span>

              <h2>How to become an approved curator</h2>

              <p>
                Complete these steps before you begin operating on ÉLAN HOMES.
              </p>
            </div>

            <div className="curator-approval-steps">
              {approvalSteps.map((step) => (
                <article className="curator-approval-step" key={step.number}>
                  <span>{step.number}</span>

                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* DASHBOARD SERVICES */}
        <section className="curator-dashboard-sections">
          <div className="curator-section-heading">
            <span>YOUR WORKSPACE</span>

            <h2>Curator Services</h2>

            <p>
              {CURATOR_PREVIEW_MODE
                ? "Preview your curator workspace sections. Some pages are still being developed."
                : "Your management tools will become available according to your account approval status."}
            </p>
          </div>

          <div className="curator-dashboard-grid">
            {dashboardSections.map((section) => {
              const isProfile = section.title === "My Profile";

              const isAgreement =
                section.title === "Curator Agreement" ||
                section.title === "Curator–Client Agreement";

              const isAgreementRequest =
                section.title === "Request Client Agreement";

              const available =
                CURATOR_PREVIEW_MODE ||
                isApproved ||
                isProfile ||
                isAgreement ||
                isAgreementRequest;

              return (
                <article
                  className={`curator-dashboard-card ${
                    available ? "" : "locked"
                  } ${isAgreementRequest ? "agreement-request-card" : ""}`}
                  key={section.link}
                >
                  <h3>{section.title}</h3>

                  <p>{section.description}</p>

                  {available ? (
                    <Link to={section.link}>
                      {CURATOR_PREVIEW_MODE && !isApproved
                        ? "Preview section →"
                        : "Open section →"}
                    </Link>
                  ) : (
                    <span className="curator-locked-label">
                      Available after approval
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* SUPPORT */}
        <section className="curator-dashboard-support">
          <h2>Need assistance?</h2>

          <p>
            Contact the ÉLAN HOMES team for application support, listing
            updates, client enquiries, booking coordination or any other
            operational assistance.
          </p>

          <Link to="/contact">Contact ÉLAN HOMES →</Link>
        </section>
      </section>
    </main>
  );
}

export default CuratorDashboard;
