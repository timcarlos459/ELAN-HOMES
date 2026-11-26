export const ENQUIRY_NOTIFICATION_RECIPIENTS = {
  OWNER: "owner",
  CUSTOMER: "customer",
};

export const markEnquiryNotificationSent = (record, recipient) => {
  if (!record?.id) {
    throw new Error("A valid enquiry record is required.");
  }

  const validRecipients = Object.values(ENQUIRY_NOTIFICATION_RECIPIENTS);

  if (!validRecipients.includes(recipient)) {
    throw new Error("Invalid notification recipient.");
  }

  if (!globalThis.crypto?.randomUUID) {
    throw new Error("Secure UUID generation is unavailable.");
  }

  const now = new Date().toISOString();

  const communication = record.communication || {};

  const notificationHistory = Array.isArray(communication.notificationHistory)
    ? communication.notificationHistory
    : [];

  return {
    ...record,

    communication: {
      ...communication,

      ownerNotified:
        recipient === ENQUIRY_NOTIFICATION_RECIPIENTS.OWNER
          ? true
          : Boolean(communication.ownerNotified),

      customerNotified:
        recipient === ENQUIRY_NOTIFICATION_RECIPIENTS.CUSTOMER
          ? true
          : Boolean(communication.customerNotified),

      notificationHistory: [
        ...notificationHistory,
        {
          id: globalThis.crypto.randomUUID(),
          recipient,
          sentAt: now,
        },
      ],
    },

    updatedAt: now,
  };
};

export default markEnquiryNotificationSent;
