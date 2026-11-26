export const ENQUIRY_MESSAGE_TYPES = {
  CUSTOMER_TO_ELAN: "customer_to_elan",
  ELAN_TO_OWNER: "elan_to_owner",
  OWNER_TO_ELAN: "owner_to_elan",
  ELAN_TO_CUSTOMER: "elan_to_customer",
};

export const createEnquiryMessage = ({
  enquiryId,
  senderType,
  message,
} = {}) => {
  if (typeof enquiryId !== "string" || !enquiryId.trim()) {
    throw new Error("A valid enquiry ID is required.");
  }

  const validSenderTypes = Object.values(ENQUIRY_MESSAGE_TYPES);

  if (!validSenderTypes.includes(senderType)) {
    throw new Error("Invalid enquiry message type.");
  }

  if (typeof message !== "string" || !message.trim()) {
    throw new Error("A message cannot be empty.");
  }

  if (!globalThis.crypto?.randomUUID) {
    throw new Error("Secure UUID generation is unavailable.");
  }

  return {
    id: globalThis.crypto.randomUUID(),
    enquiryId,
    senderType,
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };
};

export default createEnquiryMessage;
