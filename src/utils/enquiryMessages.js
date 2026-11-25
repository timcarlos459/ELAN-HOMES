export const ENQUIRY_MESSAGE_TYPES = {
  CUSTOMER_TO_ELAN: "customer_to_elan",
  ELAN_TO_OWNER: "elan_to_owner",
  OWNER_TO_ELAN: "owner_to_elan",
  ELAN_TO_CUSTOMER: "elan_to_customer",
};

export const createEnquiryMessage = ({ enquiryId, senderType, message }) => {
  if (!enquiryId) {
    throw new Error("An enquiry ID is required.");
  }

  const validSenderTypes = Object.values(ENQUIRY_MESSAGE_TYPES);

  if (!validSenderTypes.includes(senderType)) {
    throw new Error("Invalid enquiry message type.");
  }

  if (!message?.trim()) {
    throw new Error("A message cannot be empty.");
  }

  return {
    id: crypto.randomUUID(),
    enquiryId,
    senderType,
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };
};

export default createEnquiryMessage;
