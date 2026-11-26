import { ENQUIRY_STATUSES } from "./enquiryStatus";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const INTERNATIONAL_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createEnquiryRecord = ({
  category,
  listing,
  customer,
  message = "",
  bookingDetails = null,
} = {}) => {
  // VALIDATE CATEGORY
  const validCategories = ["property", "land", "stay"];

  if (!validCategories.includes(category)) {
    throw new Error("Invalid enquiry category.");
  }

  // VALIDATE LISTING
  if (typeof listing?.id !== "string" || !UUID_PATTERN.test(listing.id)) {
    throw new Error("A valid listing UUID is required.");
  }

  // VALIDATE CUSTOMER DETAILS
  if (
    typeof customer?.fullName !== "string" ||
    typeof customer?.email !== "string" ||
    typeof customer?.phone !== "string" ||
    !customer.fullName.trim() ||
    !customer.email.trim() ||
    !customer.phone.trim()
  ) {
    throw new Error("Customer details are incomplete.");
  }

  const fullName = customer.fullName.trim();
  const email = customer.email.trim().toLowerCase();
  const normalizedPhone = customer.phone.replace(/[\s()-]/g, "");

  if (!EMAIL_PATTERN.test(email)) {
    throw new Error("Enter a valid email address.");
  }

  if (!INTERNATIONAL_PHONE_PATTERN.test(normalizedPhone)) {
    throw new Error(
      "Enter a valid international phone number, including the country code.",
    );
  }

  // VALIDATE MESSAGE
  if (typeof message !== "string") {
    throw new Error("The enquiry message must be text.");
  }

  // VALIDATE BOOKING DETAILS
  if (
    bookingDetails !== null &&
    (typeof bookingDetails !== "object" || Array.isArray(bookingDetails))
  ) {
    throw new Error("Invalid booking details.");
  }

  if (!globalThis.crypto?.randomUUID) {
    throw new Error("Secure UUID generation is unavailable.");
  }

  // LISTING INFORMATION
  const listingTitle = listing.name || listing.title || "Untitled Listing";

  const listingLocation =
    listing.location ||
    [listing.destination, listing.region].filter(Boolean).join(", ");

  // TIMESTAMPS
  const now = new Date().toISOString();

  // INITIAL STATUS
  const initialStatus = ENQUIRY_STATUSES.NEW;

  // CREATE ENQUIRY RECORD
  return {
    id: globalThis.crypto.randomUUID(),

    category,

    enquiryType: category === "stay" && bookingDetails ? "booking" : "general",

    listing: {
      id: listing.id,
      title: listingTitle,
      location: listingLocation,
      ownerId: listing.ownerId || null,
    },

    customer: {
      fullName,
      email,
      phone: normalizedPhone,
    },

    message: message.trim(),

    bookingDetails: category === "stay" ? bookingDetails : null,

    status: initialStatus,

    statusHistory: [
      {
        status: initialStatus,
        timestamp: now,
        note: "Enquiry created.",
      },
    ],

    communication: {
      ownerNotified: false,
      customerNotified: false,
      notificationHistory: [],
      messages: [],
    },

    createdAt: now,
    updatedAt: now,
  };
};

export default createEnquiryRecord;
