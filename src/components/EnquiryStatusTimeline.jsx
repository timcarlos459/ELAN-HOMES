import { getEnquiryStatusLabel } from "../utils/enquiryStatus";

import "./EnquiryStatusTimeline.css";

function EnquiryStatusTimeline({ record }) {
  if (!record) {
    return null;
  }

  const history = Array.isArray(record.statusHistory)
    ? record.statusHistory
    : [];

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Date unavailable";
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <section className="enquiry-timeline">
      <div className="enquiry-timeline-heading">
        <span>REQUEST PROGRESS</span>
        <h2>Enquiry Status</h2>
        <p>Follow the progress of your request with ÉLAN HOMES.</p>
      </div>

      {history.length === 0 ? (
        <div className="enquiry-timeline-empty">
          <p>No status updates are available yet.</p>
          <span>
            Updates will appear here as ÉLAN HOMES processes your request.
          </span>
        </div>
      ) : (
        <div className="enquiry-timeline-list">
          {history.map((item, index) => (
            <div
              className="enquiry-timeline-item"
              key={`${item.status}-${item.timestamp || index}-${index}`}
            >
              <div className="enquiry-timeline-marker">
                <span />

                {index !== history.length - 1 && (
                  <div className="enquiry-timeline-line" />
                )}
              </div>

              <div className="enquiry-timeline-content">
                <h3>{getEnquiryStatusLabel(item.status)}</h3>

                <time>{formatTimestamp(item.timestamp)}</time>

                {item.note && <p>{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EnquiryStatusTimeline;
