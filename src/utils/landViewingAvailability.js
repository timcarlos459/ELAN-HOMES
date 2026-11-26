/**
 * ÉLAN HOMES — Land Viewing Availability
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

export const getBlockedLandViewingDates = (land) => {
  if (!Array.isArray(land?.blockedViewingDates)) {
    return [];
  }

  return [...new Set(land.blockedViewingDates.filter(isValidDate))];
};

export const isLandViewingDateAvailable = (land, date) => {
  if (!land || !isValidDate(date)) return false;

  const listingStatus = String(land.status || "")
    .toLowerCase()
    .trim();

  const availabilityStatus = String(land.availabilityStatus || "")
    .toLowerCase()
    .trim();

  const isSold =
    listingStatus === "sold" ||
    availabilityStatus === "sold" ||
    land.isSold === true;

  const unavailableStatuses = ["unavailable", "blocked", "not available"];

  const isUnavailable =
    unavailableStatuses.includes(listingStatus) ||
    unavailableStatuses.includes(availabilityStatus);

  if (isSold || isUnavailable) return false;

  return !getBlockedLandViewingDates(land).includes(date);
};
