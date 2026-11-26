const STORAGE_KEY = "elanSavedListings";

const VALID_TYPES = ["property", "land", "stay"];

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isValidSavedListing = (item) => {
  return (
    item &&
    VALID_TYPES.includes(item.type) &&
    typeof item.id === "string" &&
    UUID_PATTERN.test(item.id)
  );
};

// GET ALL SAVED LISTINGS
export const getSavedListings = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return [];
    }

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    const validListings = parsed.filter(isValidSavedListing);

    // REMOVE DUPLICATES
    return [
      ...new Map(
        validListings.map((item) => [`${item.type}:${item.id}`, item]),
      ).values(),
    ];
  } catch (error) {
    console.error("Could not read saved listings:", error);
    return [];
  }
};

// CHECK WHETHER A LISTING IS SAVED
export const isListingSaved = (type, id) => {
  if (
    !VALID_TYPES.includes(type) ||
    typeof id !== "string" ||
    !UUID_PATTERN.test(id)
  ) {
    return false;
  }

  return getSavedListings().some(
    (item) => item.type === type && item.id === id,
  );
};

// ADD OR REMOVE A SAVED LISTING
export const toggleSavedListing = (type, id) => {
  if (
    !VALID_TYPES.includes(type) ||
    typeof id !== "string" ||
    !UUID_PATTERN.test(id)
  ) {
    return getSavedListings();
  }

  const savedListings = getSavedListings();

  const alreadySaved = savedListings.some(
    (item) => item.type === type && item.id === id,
  );

  const updatedListings = alreadySaved
    ? savedListings.filter((item) => !(item.type === type && item.id === id))
    : [...savedListings, { type, id }];

  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return savedListings;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedListings));
  } catch (error) {
    console.error("Could not save listings:", error);
    return savedListings;
  }

  return updatedListings;
};
