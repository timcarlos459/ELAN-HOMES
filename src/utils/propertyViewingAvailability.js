/**
 * ÉLAN HOMES — Property Viewing Availability
 *
 * blockedViewingDates is optional.
 * Dates use YYYY-MM-DD format.
 * No blocked dates are invented or added automatically.
 */

const isValidDate = (value) => {
  if (typeof value !== "string") return false;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return false;

  const [, year, month, day] = match;

  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day)
  );
};

export const getBlockedViewingDates = (property) => {
  if (!Array.isArray(property?.blockedViewingDates)) {
    return [];
  }

  return [...new Set(property.blockedViewingDates.filter(isValidDate))];
};

export const isPropertyViewingDateAvailable = (property, date) => {
  if (!property || !isValidDate(date)) return false;

  const listingStatus = String(property.status || "")
    .toLowerCase()
    .trim();

  const availabilityStatus = String(property.availabilityStatus || "")
    .toLowerCase()
    .trim();

  const isSold =
    listingStatus === "sold" ||
    availabilityStatus === "sold" ||
    property.isSold === true;

  const unavailableStatuses = ["unavailable", "blocked", "not available"];

  const isUnavailable =
    unavailableStatuses.includes(listingStatus) ||
    unavailableStatuses.includes(availabilityStatus);

  if (isSold || isUnavailable) return false;

  return !getBlockedViewingDates(property).includes(date);
};
