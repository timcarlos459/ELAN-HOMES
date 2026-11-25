const REFERENCE_PREFIX = "ELAN";

export const generateEnquiryReference = (enquiryId) => {
  if (!enquiryId || typeof enquiryId !== "string") {
    throw new Error("A valid enquiry UUID is required.");
  }

  return `${REFERENCE_PREFIX}-${enquiryId.toUpperCase()}`;
};

export const isValidEnquiryReference = (reference) => {
  if (typeof reference !== "string") {
    return false;
  }

  const uuidPattern =
    /^ELAN-[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/;

  return uuidPattern.test(reference);
};

export default generateEnquiryReference;
