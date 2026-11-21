const STORAGE_KEY = "elanSavedListings";

// GET ALL SAVED LISTINGS
export const getSavedListings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not read saved listings:", error);
    return [];
  }
};

// CHECK WHETHER A LISTING IS SAVED
export const isListingSaved = (type, id) => {
  const savedListings = getSavedListings();

  return savedListings.some((item) => item.type === type && item.id === id);
};

// ADD OR REMOVE A SAVED LISTING
export const toggleSavedListing = (type, id) => {
  const savedListings = getSavedListings();

  const alreadySaved = savedListings.some(
    (item) => item.type === type && item.id === id,
  );

  const updatedListings = alreadySaved
    ? savedListings.filter((item) => !(item.type === type && item.id === id))
    : [...savedListings, { type, id }];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedListings));

  return updatedListings;
};
