export const ENQUIRY_STATUSES = {
  NEW: "new",
  UNDER_REVIEW: "under_review",
  OWNER_CONTACTED: "owner_contacted",
  AWAITING_OWNER: "awaiting_owner",
  RESPONSE_RECEIVED: "response_received",
  CUSTOMER_CONTACTED: "customer_contacted",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const ENQUIRY_STATUS_LABELS = {
  [ENQUIRY_STATUSES.NEW]: "New Enquiry",
  [ENQUIRY_STATUSES.UNDER_REVIEW]: "Under Review",
  [ENQUIRY_STATUSES.OWNER_CONTACTED]: "Owner Contacted",
  [ENQUIRY_STATUSES.AWAITING_OWNER]: "Awaiting Owner Response",
  [ENQUIRY_STATUSES.RESPONSE_RECEIVED]: "Owner Response Received",
  [ENQUIRY_STATUSES.CUSTOMER_CONTACTED]: "Customer Contacted",
  [ENQUIRY_STATUSES.COMPLETED]: "Completed",
  [ENQUIRY_STATUSES.CANCELLED]: "Cancelled",
};

export const getEnquiryStatusLabel = (status) => {
  return ENQUIRY_STATUS_LABELS[status] || "Unknown Status";
};

export const canUpdateEnquiryStatus = (currentStatus, nextStatus) => {
  const allowedTransitions = {
    new: ["under_review", "cancelled"],
    under_review: ["owner_contacted", "cancelled"],
    owner_contacted: ["awaiting_owner", "response_received"],
    awaiting_owner: ["response_received", "cancelled"],
    response_received: ["customer_contacted"],
    customer_contacted: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };

  return allowedTransitions[currentStatus]?.includes(nextStatus) || false;
};
