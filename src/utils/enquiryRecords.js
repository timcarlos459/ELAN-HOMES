export const createEnquiryRecord = ({
  category,
  listing,
  customer,
  message = "",
  bookingDetails = null,
}) => {
  const validCategories = ["property", "land", "stay"];

  if (!validCategories.includes(category)) {
    throw new Error("Invalid enquiry category.");
  }

  if (!listing?.id) {
    throw new Error("A valid listing ID is required.");
  }

  if (
    !customer?.fullName?.trim() ||
    !customer?.email?.trim() ||
    !customer?.phone?.trim()
  ) {
    throw new Error("Customer details are incomplete.");
  }

  const normalizedPhone = customer.phone.replace(/[\s()-]/g, "");

  const internationalPhonePattern = /^\+[1-9]\d{7,14}$/;

  if (!internationalPhonePattern.test(normalizedPhone)) {
    throw new Error(
      "Enter a valid international phone number, including the country code.",
    );
  }

  const listingTitle = listing.name || listing.title;

  const listingLocation =
    listing.location ||
    [listing.destination, listing.region].filter(Boolean).join(", ");

  const now = new Date().toISOString();

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

    status: "new",

    communication: {
      ownerNotified: false,
      customerNotified: false,
      messages: [],
    },

    createdAt: now,
    updatedAt: now,
  };
};

export default createEnquiryRecord;
