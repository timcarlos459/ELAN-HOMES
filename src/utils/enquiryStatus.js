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

export const ALLOWED_ENQUIRY_TRANSITIONS = {
  [ENQUIRY_STATUSES.NEW]: [
    ENQUIRY_STATUSES.UNDER_REVIEW,
    ENQUIRY_STATUSES.CANCELLED,
  ],

  [ENQUIRY_STATUSES.UNDER_REVIEW]: [
    ENQUIRY_STATUSES.OWNER_CONTACTED,
    ENQUIRY_STATUSES.CANCELLED,
  ],

  [ENQUIRY_STATUSES.OWNER_CONTACTED]: [
    ENQUIRY_STATUSES.AWAITING_OWNER,
    ENQUIRY_STATUSES.RESPONSE_RECEIVED,
    ENQUIRY_STATUSES.CANCELLED,
  ],

  [ENQUIRY_STATUSES.AWAITING_OWNER]: [
    ENQUIRY_STATUSES.RESPONSE_RECEIVED,
    ENQUIRY_STATUSES.CANCELLED,
  ],

  [ENQUIRY_STATUSES.RESPONSE_RECEIVED]: [
    ENQUIRY_STATUSES.CUSTOMER_CONTACTED,
    ENQUIRY_STATUSES.CANCELLED,
  ],

  [ENQUIRY_STATUSES.CUSTOMER_CONTACTED]: [
    ENQUIRY_STATUSES.COMPLETED,
    ENQUIRY_STATUSES.CANCELLED,
  ],

  [ENQUIRY_STATUSES.COMPLETED]: [],
  [ENQUIRY_STATUSES.CANCELLED]: [],
};

export const getEnquiryStatusLabel = (status) => {
  return ENQUIRY_STATUS_LABELS[status] || "Unknown Status";
};

export const getNextEnquiryStatuses = (currentStatus) => {
  return ALLOWED_ENQUIRY_TRANSITIONS[currentStatus] || [];
};

export const canUpdateEnquiryStatus = (currentStatus, nextStatus) => {
  return getNextEnquiryStatuses(currentStatus).includes(nextStatus);
};

// UPDATE ENQUIRY STATUS AND RECORD HISTORY
export const updateEnquiryRecordStatus = (record, nextStatus, note = "") => {
  if (!record?.id || !record.status) {
    throw new Error("A valid enquiry record is required.");
  }

  if (!canUpdateEnquiryStatus(record.status, nextStatus)) {
    throw new Error("This enquiry status change is not allowed.");
  }

  if (typeof note !== "string") {
    throw new Error("The status note must be text.");
  }

  const now = new Date().toISOString();

  const statusHistory = Array.isArray(record.statusHistory)
    ? record.statusHistory
    : [];

  return {
    ...record,

    status: nextStatus,

    statusHistory: [
      ...statusHistory,
      {
        status: nextStatus,
        timestamp: now,
        note: note.trim(),
      },
    ],

    updatedAt: now,
  };
};
