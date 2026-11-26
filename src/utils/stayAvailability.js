/**
 * ÉLAN HOMES — Stay Availability
 *
 * Date format: YYYY-MM-DD
 *
 * Check-in date: included.
 * Check-out date: excluded.
 *
 * Each unavailable date represents one occupied night.
 */

/* =================================
   DATE VALIDATION
================================= */

const isValidDate = (value) => {
  if (typeof value !== "string") return false;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return false;

  const [, year, month, day] = match;

  const numericYear = Number(year);
  const numericMonth = Number(month);
  const numericDay = Number(day);

  const date = new Date(Date.UTC(numericYear, numericMonth - 1, numericDay));

  return (
    date.getUTCFullYear() === numericYear &&
    date.getUTCMonth() === numericMonth - 1 &&
    date.getUTCDate() === numericDay
  );
};

/* =================================
   DATE INCREMENT
================================= */

const addDays = (dateString, days = 1) => {
  if (!isValidDate(dateString) || !Number.isInteger(days)) {
    return null;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  date.setUTCDate(date.getUTCDate() + days);

  const result = date.toISOString().slice(0, 10);

  return isValidDate(result) ? result : null;
};

/* =================================
   UNAVAILABLE DATES
================================= */

export const getUnavailableStayDates = (stay) => {
  if (!stay) return [];

  const bookedDates = Array.isArray(stay.bookedDates) ? stay.bookedDates : [];

  const blockedDates = Array.isArray(stay.blockedDates)
    ? stay.blockedDates
    : [];

  return [...new Set([...bookedDates, ...blockedDates].filter(isValidDate))];
};

/* =================================
   DATE RANGE AVAILABILITY
================================= */

export const isStayDateRangeAvailable = (stay, checkIn, checkOut) => {
  if (!stay || !isValidDate(checkIn) || !isValidDate(checkOut)) {
    return false;
  }

  if (checkOut <= checkIn) return false;

  const unavailableDates = new Set(getUnavailableStayDates(stay));

  let currentDate = checkIn;

  while (currentDate < checkOut) {
    if (unavailableDates.has(currentDate)) {
      return false;
    }

    const nextDate = addDays(currentDate);

    if (!nextDate || nextDate <= currentDate) {
      return false;
    }

    currentDate = nextDate;
  }

  return true;
};

/* =================================
   FIRST UNAVAILABLE NIGHT
================================= */

export const getFirstUnavailableStayDate = (stay, checkIn, checkOut) => {
  if (!stay || !isValidDate(checkIn) || !isValidDate(checkOut)) {
    return null;
  }

  if (checkOut <= checkIn) return null;

  const unavailableDates = new Set(getUnavailableStayDates(stay));

  let currentDate = checkIn;

  while (currentDate < checkOut) {
    if (unavailableDates.has(currentDate)) {
      return currentDate;
    }

    const nextDate = addDays(currentDate);

    if (!nextDate || nextDate <= currentDate) {
      return null;
    }

    currentDate = nextDate;
  }

  return null;
};
