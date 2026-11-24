const STORAGE_KEY = "elanSavedListings";

// GET ALL SAVED LISTINGS
export const getSavedListings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        ["property", "stay"].includes(item.type) &&
        typeof item.id === "string" &&
        item.id.trim() !== "",
    );
  } catch (error) {
    console.error("Could not read saved listings:", error);
    return [];
  }
};

// CHECK WHETHER A LISTING IS SAVED
export const isListingSaved = (type, id) => {
  if (typeof id !== "string" || !id.trim()) return false;

  const savedListings = getSavedListings();

  return savedListings.some((item) => item.type === type && item.id === id);
};

// ADD OR REMOVE A SAVED LISTING
export const toggleSavedListing = (type, id) => {
  if (
    !["property", "stay"].includes(type) ||
    typeof id !== "string" ||
    !id.trim()
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedListings));
  } catch (error) {
    console.error("Could not save listings:", error);
    return savedListings;
  }

  return updatedListings;
};
