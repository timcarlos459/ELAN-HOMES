import { ENQUIRY_STATUSES } from "./enquiryStatus";

export const createEnquiryRecord = ({
  category,
  listing,
  customer,
  message = "",
  bookingDetails = null,
}) => {
  // VALIDATE CATEGORY
  const validCategories = ["property", "land", "stay"];

  if (!validCategories.includes(category)) {
    throw new Error("Invalid enquiry category.");
  }

  // VALIDATE LISTING
  if (!listing?.id) {
    throw new Error("A valid listing ID is required.");
  }

  // VALIDATE CUSTOMER DETAILS
  if (
    !customer?.fullName?.trim() ||
    !customer?.email?.trim() ||
    !customer?.phone?.trim()
  ) {
    throw new Error("Customer details are incomplete.");
  }

  // NORMALISE AND VALIDATE PHONE NUMBER
  const normalizedPhone = customer.phone.replace(/[\s()-]/g, "");

  const internationalPhonePattern = /^\+[1-9]\d{7,14}$/;

  if (!internationalPhonePattern.test(normalizedPhone)) {
    throw new Error(
      "Enter a valid international phone number, including the country code.",
    );
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
    id: crypto.randomUUID(),

    category,

    enquiryType: category === "stay" && bookingDetails ? "booking" : "general",

    listing: {
      id: listing.id,
      title: listingTitle,
      location: listingLocation,
      ownerId: listing.ownerId || null,
    },

    customer: {
      fullName: customer.fullName.trim(),
      email: customer.email.trim().toLowerCase(),
      phone: normalizedPhone,
    },

    message: (message || "").trim(),

    bookingDetails: category === "stay" ? bookingDetails : null,

    status: initialStatus,

    // STATUS TRACKING HISTORY
    statusHistory: [
      {
        status: initialStatus,
        timestamp: now,
        note: "Enquiry created.",
      },
    ],

    // CENTRAL COMMUNICATION TRACKING
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
