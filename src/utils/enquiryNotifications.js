export const ENQUIRY_NOTIFICATION_RECIPIENTS = {
  OWNER: "owner",
  CUSTOMER: "customer",
};

export const markEnquiryNotificationSent = (record, recipient) => {
  if (!record?.id) {
    throw new Error("A valid enquiry record is required.");
  }

  if (!Object.values(ENQUIRY_NOTIFICATION_RECIPIENTS).includes(recipient)) {
    throw new Error("Invalid notification recipient.");
  }

  const now = new Date().toISOString();

  const communication = record.communication || {};

  const notificationHistory = communication.notificationHistory || [];

  return {
    ...record,

    communication: {
      ...communication,

      ownerNotified:
        recipient === ENQUIRY_NOTIFICATION_RECIPIENTS.OWNER
          ? true
          : communication.ownerNotified || false,

      customerNotified:
        recipient === ENQUIRY_NOTIFICATION_RECIPIENTS.CUSTOMER
          ? true
          : communication.customerNotified || false,

      notificationHistory: [
        ...notificationHistory,
        {
          id: crypto.randomUUID(),
          recipient,
          sentAt: now,
        },
      ],
    },

    updatedAt: now,
  };
};

export default markEnquiryNotificationSent;
