import createEnquiryMessage from "./enquiryMessages";

export const addEnquiryMessage = (record, messageData) => {
  if (!record?.id) {
    throw new Error("A valid enquiry record is required.");
  }

  if (!messageData || typeof messageData !== "object") {
    throw new Error("Valid message data is required.");
  }

  if (typeof messageData.message !== "string" || !messageData.message.trim()) {
    throw new Error("Message cannot be empty.");
  }

  const message = createEnquiryMessage({
    enquiryId: record.id,
    senderType: messageData.senderType,
    message: messageData.message.trim(),
  });

  const existingMessages = Array.isArray(record.communication?.messages)
    ? record.communication.messages
    : [];

  return {
    ...record,

    communication: {
      ...record.communication,
      messages: [...existingMessages, message],
    },

    updatedAt: new Date().toISOString(),
  };
};

export const markEnquiryMessageAsRead = (record, messageId) => {
  if (!record?.id || !messageId) {
    throw new Error("An enquiry and message ID are required.");
  }

  const messages = Array.isArray(record.communication?.messages)
    ? record.communication.messages
    : [];

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
