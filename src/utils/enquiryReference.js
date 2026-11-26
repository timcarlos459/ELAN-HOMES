const REFERENCE_PREFIX = "ELAN";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const generateEnquiryReference = (enquiryId) => {
  if (typeof enquiryId !== "string" || !UUID_PATTERN.test(enquiryId)) {
    throw new Error("A valid enquiry UUID is required.");
  }

  return `${REFERENCE_PREFIX}-${enquiryId.toUpperCase()}`;
};

export const isValidEnquiryReference = (reference) => {
  if (typeof reference !== "string") {
    return false;
  }

  const referencePattern =
    /^ELAN-[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

  return referencePattern.test(reference);
};

export default generateEnquiryReference;
