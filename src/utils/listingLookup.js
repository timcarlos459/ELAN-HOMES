import properties from "../data/properties";
import landListings from "../data/land";
import stays from "../data/stays";

const listingCollections = {
  property: properties,
  land: landListings,
  stay: stays,
};

export const getListingById = (category, id) => {
  const collection = listingCollections[category];

  if (!collection || typeof id !== "string" || !id.trim()) {
    return null;
  }

  return collection.find((listing) => listing.id === id) || null;
};

export const getListingsByCategory = (category) => {
  return listingCollections[category] || [];
};

export const getAllListings = () => {
  return [
    ...properties.map((listing) => ({
      ...listing,
      category: "property",
    })),

    ...landListings.map((listing) => ({
      ...listing,
      category: "land",
    })),

    ...stays.map((listing) => ({
      ...listing,
      category: "stay",
    })),
  ];
};

export default listingCollections;
