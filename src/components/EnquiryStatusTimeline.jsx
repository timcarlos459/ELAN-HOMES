import { getEnquiryStatusLabel } from "../utils/enquiryStatus";

import "./EnquiryStatusTimeline.css";

function EnquiryStatusTimeline({ record }) {
  if (!record) {
    return null;
  }

  const history = record.statusHistory || [];

  return (
    <section className="enquiry-timeline">
      <div className="enquiry-timeline-heading">
        <span>REQUEST PROGRESS</span>
        <h2>Enquiry Status</h2>
        <p>Follow the progress of your request with ÉLAN HOMES.</p>
      </div>

      <div className="enquiry-timeline-list">
        {history.map((item, index) => (
          <div
            className="enquiry-timeline-item"
            key={`${item.status}-${item.timestamp}-${index}`}
          >
            <div className="enquiry-timeline-marker">
              <span />
              {index !== history.length - 1 && (
                <div className="enquiry-timeline-line" />
              )}
            </div>

            <div className="enquiry-timeline-content">
              <h3>{getEnquiryStatusLabel(item.status)}</h3>

              <time dateTime={item.timestamp}>
                {new Date(item.timestamp).toLocaleString("en-KE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>

              {item.note && <p>{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EnquiryStatusTimeline;
