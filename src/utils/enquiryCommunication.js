import createEnquiryMessage from "./enquiryMessages";

export const addEnquiryMessage = (record, messageData) => {
  if (!record?.id) {
    throw new Error("A valid enquiry record is required.");
  }

  const message = createEnquiryMessage({
    enquiryId: record.id,
    senderType: messageData.senderType,
    message: messageData.message,
  });

  const now = new Date().toISOString();

  return {
    ...record,

    communication: {
      ...record.communication,
      messages: [...(record.communication?.messages || []), message],
    },

    updatedAt: now,
  };
};

export const markEnquiryMessageAsRead = (record, messageId) => {
  if (!record?.id || !messageId) {
    throw new Error("An enquiry and message ID are required.");
  }

  const messages = record.communication?.messages || [];

  const messageExists = messages.some((message) => message.id === messageId);

  if (!messageExists) {
    throw new Error("Message not found.");
  }

  return {
    ...record,

    communication: {
      ...record.communication,

      messages: messages.map((message) =>
        message.id === messageId ? { ...message, read: true } : message,
      ),
    },

    updatedAt: new Date().toISOString(),
  };
};

export default addEnquiryMessage;
