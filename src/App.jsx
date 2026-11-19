import { Fragment, useMemo, useState } from "react";
import "./App.css";

// Replace with your official ELAN HOMES WhatsApp number.
// International format without + or spaces.
const ELAN_WHATSAPP_NUMBER = "2547XXXXXXXX";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "ElanAdmin2026!";

/* =================================
   ELAN HOMES DATA
================================= */

const stays = [
  {
    id: 1,
    name: "Luxury Holiday Villa",
    location: "Diani, Kwale County",
    county: "Kwale",
    type: "Villa",
    price: 15000,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    description:
      "A beautiful holiday villa with elegant interiors, spacious living areas and a relaxing atmosphere.",
    facilities: ["Swimming Pool", "Wi-Fi", "Parking", "Kitchen"],
  },
  {
    id: 2,
    name: "Executive City Apartment",
    location: "Kilimani, Nairobi",
    county: "Nairobi",
    type: "Apartment",
    price: 8000,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    description:
      "A stylish executive apartment suitable for business travellers and holiday guests.",
    facilities: ["Wi-Fi", "Security", "Parking", "Gym"],
  },
  {
    id: 3,
    name: "Private Luxury Villa",
    location: "Naivasha, Nakuru County",
    county: "Nakuru",
    type: "Villa",
    price: 20000,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
    description:
      "Enjoy a peaceful getaway in a private villa surrounded by beautiful scenery.",
    facilities: ["Garden", "Wi-Fi", "Parking", "Kitchen"],
  },
  {
    id: 4,
    name: "Coastal Beach Apartment",
    location: "Nyali, Mombasa",
    county: "Mombasa",
    type: "Apartment",
    price: 12000,
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    description:
      "A comfortable coastal apartment for guests looking to enjoy the Kenyan coast.",
    facilities: ["Wi-Fi", "Balcony", "Security", "Parking"],
  },
  {
    id: 5,
    name: "Countryside Holiday Cottage",
    location: "Nanyuki, Laikipia",
    county: "Laikipia",
    type: "Cottage",
    price: 10000,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
    description:
      "A peaceful countryside cottage perfect for relaxing weekends and family escapes.",
    facilities: ["Garden", "Fireplace", "Parking", "Kitchen"],
  },
  {
    id: 6,
    name: "Modern Holiday Home",
    location: "Kisumu City, Kisumu",
    county: "Kisumu",
    type: "Holiday Home",
    price: 9000,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000",
    description:
      "A modern and comfortable home offering a convenient stay in Kisumu.",
    facilities: ["Wi-Fi", "Kitchen", "Parking", "Security"],
  },
];

const properties = [
  {
    id: 1,
    name: "Luxury Family Residence",
    location: "Ruiru, Kiambu",
    type: "House",
    price: 28000000,
    viewingFee: 1000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000",
    bedrooms: 4,
  },
  {
    id: 2,
    name: "Contemporary Luxury Villa",
    location: "Karen, Nairobi",
    type: "Villa",
    price: 220000000,
    viewingFee: 3000,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    bedrooms: 6,
  },
  {
    id: 3,
    name: "Modern City Apartment",
    location: "Kilimani, Nairobi",
    type: "Apartment",
    price: 25000000,
    viewingFee: 2000,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    bedrooms: 3,
  },
];

const landListings = [
  {
    id: 1,
    name: "Residential Development Plot",
    location: "Ruiru, Kiambu",
    size: "50 × 100 ft",
    price: "KSh 3,500,000",
    viewingFee: 1000,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
  },
  {
    id: 2,
    name: "Prime Investment Land",
    location: "Ngong, Kajiado",
    size: "1 Acre",
    price: "KSh 18,000,000",
    viewingFee: 2000,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
  },
  {
    id: 3,
    name: "Agricultural Land",
    location: "Naivasha, Nakuru",
    size: "5 Acres",
    price: "KSh 12,000,000",
    viewingFee: 2000,
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000",
  },
];

const testimonials = [
  {
    name: "Property Buyer",
    role: "Home Buyer",
    review:
      "ELAN HOMES made exploring property opportunities much easier. The platform brings different property options together.",
    rating: 5,
  },
  {
    name: "Holiday Guest",
    role: "Accommodation Guest",
    review:
      "The accommodation directory makes it easier to discover beautiful places to stay around Kenya.",
    rating: 5,
  },
  {
    name: "Property Investor",
    role: "Investor",
    review:
      "A promising platform for discovering real estate and investment opportunities in Kenya.",
    rating: 5,
  },
];

/* =================================
   SHARED HELPERS
================================= */

function formatPrice(price) {
  if (typeof price !== "number") return price;
  return `KSh ${price.toLocaleString("en-KE")}`;
}

function getViewingRequests() {
  try {
    return JSON.parse(localStorage.getItem("elanViewingRequests") || "[]");
  } catch {
    return [];
  }
}

function saveViewingRequests(requests) {
  localStorage.setItem("elanViewingRequests", JSON.stringify(requests));
}

function getBnbBookings() {
  try {
    return JSON.parse(localStorage.getItem("elanBnbBookings") || "[]");
  } catch {
    return [];
  }
}

function saveBnbBookings(bookings) {
  localStorage.setItem("elanBnbBookings", JSON.stringify(bookings));
}

function getAdminNotifications() {
  try {
    return JSON.parse(localStorage.getItem("elanAdminNotifications") || "[]");
  } catch {
    return [];
  }
}

function saveAdminNotifications(notifications) {
  localStorage.setItem("elanAdminNotifications", JSON.stringify(notifications));
}

function getBnbAvailability() {
  try {
    return JSON.parse(localStorage.getItem("elanBnbAvailability") || "[]");
  } catch {
    return [];
  }
}

function saveBnbAvailability(blocks) {
  localStorage.setItem("elanBnbAvailability", JSON.stringify(blocks));
}

function datesOverlap(startA, endA, startB, endB) {
  // Check-out and next check-in on the same date are allowed.
  return startA < endB && endA > startB;
}
function getManagedProperties() {
  try {
    const saved = localStorage.getItem("elanManagedProperties");
    return saved ? JSON.parse(saved) : properties;
  } catch {
    return properties;
  }
}

function saveManagedProperties(updatedProperties) {
  localStorage.setItem(
    "elanManagedProperties",
    JSON.stringify(updatedProperties),
  );
}

/* =================================
   CUSTOMER BNB AVAILABILITY CALENDAR
================================= */

function CustomerBnbAvailabilityCalendar({
  listing,
  availabilityBlocks = [],
  bnbBookings = [],
  checkIn = "",
  checkOut = "",
  onSelectDate = () => {},
}) {
  const [monthDate, setMonthDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const monthLabel = monthDate.toLocaleDateString("en-KE", {
    month: "long",
    year: "numeric",
  });

  function dateKey(day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function getDayStatus(day) {
    const date = dateKey(day);
    if (date < todayKey) return "Past";

    const blocked = availabilityBlocks.some(
      (block) =>
        Number(block.listingId) === Number(listing.id) &&
        block.startDate <= date &&
        date < block.endDate,
    );
    if (blocked) return "Blocked";

    const booked = bnbBookings.some(
      (booking) =>
        Number(booking.listingId) === Number(listing.id) &&
        booking.status === "Confirmed" &&
        booking.checkIn <= date &&
        date < booking.checkOut,
    );
    return booked ? "Booked" : "Available";
  }

  const colors = {
    Available: {
      background: "#eaf3eb",
      borderColor: "#b7d2bb",
      color: "#285b32",
    },
    Booked: { background: "#f8e8e6", borderColor: "#d9a19b", color: "#963c34" },
    Blocked: {
      background: "#eee9df",
      borderColor: "#c9bda8",
      color: "#756247",
    },
    Past: { background: "#f2f2f2", borderColor: "#e2e2e2", color: "#999" },
  };

  return (
    <div
      style={{
        border: "1px solid #e7e2d9",
        borderRadius: 12,
        padding: 18,
        margin: "22px 0",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 5 }}>
            LIVE AVAILABILITY
          </p>
          <h3 style={{ margin: 0 }}>Check Available Dates</h3>
          <p style={{ margin: "6px 0 0", color: "#777", fontSize: 13 }}>
            {listing.name}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setMonthDate(new Date(year, month - 1, 1))}
            style={{
              border: "1px solid #ded8ce",
              background: "#fff",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <strong style={{ minWidth: 130, textAlign: "center" }}>
            {monthLabel}
          </strong>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setMonthDate(new Date(year, month + 1, 1))}
            style={{
              border: "1px solid #ded8ce",
              background: "#fff",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: 5,
          marginTop: 16,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#777",
              padding: "6px 0",
            }}
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstWeekday }, (_, index) => (
          <div key={`blank-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day) => {
            const date = dateKey(day);
            const status = getDayStatus(day);
            const isToday = date === todayKey;
            const isCheckIn = date === checkIn;
            const isCheckOut = date === checkOut;
            const isSelected = isCheckIn || isCheckOut;
            const selectedStyle = isSelected
              ? {
                  background: "#171717",
                  borderColor: "#b89b63",
                  color: "#fff",
                  boxShadow: "0 0 0 2px #b89b63",
                }
              : colors[status];
            const isSelectable = status === "Available";
            return (
              <button
                key={date}
                type="button"
                title={`${date}: ${status}${isCheckIn ? " (Check-in)" : isCheckOut ? " (Check-out)" : ""}`}
                disabled={!isSelectable}
                onClick={() => onSelectDate(date)}
                aria-label={`${date}, ${status}${isCheckIn ? ", selected check-in" : isCheckOut ? ", selected check-out" : ""}`}
                style={{
                  minHeight: 54,
                  border: `1px solid ${selectedStyle.borderColor}`,
                  borderRadius: 7,
                  padding: "6px 3px",
                  background: selectedStyle.background,
                  color: selectedStyle.color,
                  textAlign: "center",
                  outline:
                    isToday && !isSelected ? "2px solid #b89b63" : "none",
                  outlineOffset: -2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 3,
                  cursor: isSelectable ? "pointer" : "not-allowed",
                  opacity: status === "Past" ? 0.65 : 1,
                  fontFamily: "inherit",
                }}
              >
                <strong style={{ fontSize: 13 }}>{day}</strong>
                <span style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.1 }}>
                  {isCheckIn
                    ? "Check-in"
                    : isCheckOut
                      ? "Check-out"
                      : status === "Available"
                        ? "Select"
                        : status}
                </span>
              </button>
            );
          },
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 18px",
          marginTop: 15,
          fontSize: 11,
          color: "#625d55",
        }}
      >
        <span>
          <strong style={{ color: "#397346" }}>●</strong> Available
        </span>
        <span>
          <strong style={{ color: "#b14b42" }}>●</strong> Confirmed booking
        </span>
        <span>
          <strong style={{ color: "#8c7654" }}>●</strong> Unavailable / blocked
        </span>
        <span>
          <strong style={{ color: "#999" }}>●</strong> Past date
        </span>
        <span>
          <strong style={{ color: "#171717" }}>●</strong> Selected dates
        </span>
      </div>
      <p style={{ fontSize: 11, color: "#777", margin: "12px 0 0" }}>
        Select an available date for check-in, then select a later available
        date for check-out. Your booking is only confirmed after our team
        approves your request.
      </p>
    </div>
  );
}

/* =================================
   LISTING DETAILS
================================= */

function ListingDetails({
  listing,
  onBack,
  onBookingSubmit,
  availabilityBlocks = [],
  bnbBookings = [],
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerMessage, setCustomerMessage] = useState(
    "I am interested in this listing. Please share more information.",
  );

  const [viewingDate, setViewingDate] = useState("");
  const [viewingTime, setViewingTime] = useState("");
  const [viewingSubmitted, setViewingSubmitted] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingGuests, setBookingGuests] = useState("1");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [bookingReview, setBookingReview] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const bookingNights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut + "T00:00:00") -
              new Date(checkIn + "T00:00:00")) /
              86400000,
          ),
        )
      : 0;
  const bookingTotal = bookingNights * Number(listing.price || 0);

  const propertyPhotos = [
    listing.image,
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
  ];

  const bnbPhotos = [
    listing.image,
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
  ];

  const landPhotos = [
    listing.image,
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200",
  ];

  const galleryImages =
    listing.listingCategory === "BNB"
      ? bnbPhotos
      : listing.listingCategory === "Land for Sale"
        ? landPhotos
        : propertyPhotos;

  function nextImage() {
    setActiveImageIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  }

  function previousImage() {
    setActiveImageIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  }

  function handleEnquirySubmit(e) {
    e.preventDefault();

    const message = `
ELAN HOMES - CUSTOMER ENQUIRY

Listing: ${listing.name}
Category: ${listing.listingCategory}
Location: ${listing.location}
Price: ${listing.priceLabel || formatPrice(listing.price)}

CUSTOMER DETAILS

Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail || "Not provided"}

ENQUIRY:
${customerMessage}

I would like more information about this listing.
    `;

    if (ELAN_WHATSAPP_NUMBER.includes("X")) {
      alert("Please add your official WhatsApp number in App.jsx first.");
      return;
    }

    const whatsappUrl = `https://wa.me/${ELAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  function handleViewingRequest(e) {
    e.preventDefault();

    const request = {
      id: Date.now(),
      customerName,
      customerPhone,
      listingName: listing.name,
      listingCategory: listing.listingCategory,
      location: listing.location,
      listingPrice: listing.priceLabel || formatPrice(listing.price),
      viewingFee: listing.viewingFee || 0,
      viewingDate,
      viewingTime,
      status: "Pending",
      paymentStatus: "Unpaid",
      createdAt: new Date().toLocaleString(),
    };

    const existingRequests = getViewingRequests();
    existingRequests.push(request);
    saveViewingRequests(existingRequests);

    setViewingSubmitted(true);
  }

  function handleCalendarDateSelect(selectedDate) {
    if (!checkIn || checkOut || selectedDate <= checkIn) {
      setCheckIn(selectedDate);
      setCheckOut("");
      return;
    }

    const conflictsWithBlock = availabilityBlocks.some(
      (block) =>
        Number(block.listingId) === Number(listing.id) &&
        datesOverlap(checkIn, selectedDate, block.startDate, block.endDate),
    );
    const conflictsWithBooking = bnbBookings.some(
      (booking) =>
        Number(booking.listingId) === Number(listing.id) &&
        booking.status === "Confirmed" &&
        datesOverlap(checkIn, selectedDate, booking.checkIn, booking.checkOut),
    );

    if (conflictsWithBlock || conflictsWithBooking) {
      alert(
        "Your selected stay includes unavailable dates. Please choose another check-out date.",
      );
      return;
    }

    setCheckOut(selectedDate);
  }

  function handleBnbBooking(e) {
    e.preventDefault();

    if (!checkIn || !checkOut || checkIn < today || checkOut <= checkIn) {
      alert(
        "Please select a valid check-in and check-out date. Check-out must be after check-in.",
      );
      return;
    }

    const guests = Number(bookingGuests);
    if (!guests || guests < 1 || guests > Number(listing.guests || 1)) {
      alert(`Please select between 1 and ${listing.guests || 1} guests.`);
      return;
    }

    const isManuallyBlocked = availabilityBlocks.some(
      (block) =>
        Number(block.listingId) === Number(listing.id) &&
        datesOverlap(checkIn, checkOut, block.startDate, block.endDate),
    );

    if (isManuallyBlocked) {
      alert("These dates are unavailable. Please choose different dates.");
      return;
    }

    const conflictsWithConfirmedBooking = bnbBookings.some(
      (existing) =>
        Number(existing.listingId) === Number(listing.id) &&
        existing.status === "Confirmed" &&
        datesOverlap(checkIn, checkOut, existing.checkIn, existing.checkOut),
    );

    if (conflictsWithConfirmedBooking) {
      alert("These dates are unavailable. Please choose different dates.");
      return;
    }

    setBookingReview(true);
  }

  function handleConfirmBnbBooking() {
    // Recheck availability at the final confirmation step.
    const nowBlocked = availabilityBlocks.some(
      (block) =>
        Number(block.listingId) === Number(listing.id) &&
        datesOverlap(checkIn, checkOut, block.startDate, block.endDate),
    );
    const nowBooked = bnbBookings.some(
      (existing) =>
        Number(existing.listingId) === Number(listing.id) &&
        existing.status === "Confirmed" &&
        datesOverlap(checkIn, checkOut, existing.checkIn, existing.checkOut),
    );

    if (nowBlocked || nowBooked) {
      setBookingReview(false);
      alert(
        "These dates have just become unavailable. Please choose different dates.",
      );
      return;
    }

    const bookingId = Date.now();
    const reference = `EH-${new Date().getFullYear()}-${String(bookingId).slice(-6)}`;
    const booking = {
      id: bookingId,
      bookingReference: reference,
      listingId: listing.id,
      listingName: listing.name,
      location: listing.location,
      pricePerNight: Number(listing.price || 0),
      checkIn,
      checkOut,
      nights: bookingNights,
      guests: Number(bookingGuests),
      customerName,
      customerPhone,
      customerEmail,
      totalAmount: bookingTotal,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    if (typeof onBookingSubmit === "function") onBookingSubmit(booking);
    setBookingReference(reference);
    setBookingReview(false);
    setBookingSubmitted(true);
  }

  return (
    <div className="app listing-details-page">
      <header className="navbar">
        <a href="#home" className="logo" onClick={onBack}>
          ELAN <span>HOMES</span>
        </a>
        <button className="nav-button" onClick={onBack}>
          ← Back to Listings
        </button>
      </header>

      <main className="listing-details-container">
        <button className="outline-button" onClick={onBack}>
          ← Back to ELAN HOMES
        </button>

        <div className="listing-gallery">
          <div className="gallery-main">
            <img
              src={galleryImages[activeImageIndex]}
              alt={listing.name}
              onClick={() => setLightboxOpen(true)}
            />

            <button
              className="gallery-arrow gallery-previous"
              onClick={previousImage}
            >
              ‹
            </button>

            <button className="gallery-arrow gallery-next" onClick={nextImage}>
              ›
            </button>

            <span className="gallery-counter">
              {activeImageIndex + 1} / {galleryImages.length}
            </span>

            <button
              className="gallery-expand"
              onClick={() => setLightboxOpen(true)}
            >
              ⛶ View Full Image
            </button>
          </div>

          <div className="gallery-thumbnails">
            {galleryImages.map((photo, index) => (
              <button
                key={index}
                className={
                  activeImageIndex === index
                    ? "gallery-thumbnail active"
                    : "gallery-thumbnail"
                }
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={photo} alt={`${listing.name} photo ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {lightboxOpen && (
          <div
            className="gallery-lightbox"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>

            <button
              className="lightbox-arrow"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
            >
              ‹
            </button>

            <img
              src={galleryImages[activeImageIndex]}
              alt={listing.name}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="lightbox-arrow"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              ›
            </button>
          </div>
        )}

        <div className="listing-details-layout">
          <div className="listing-details-information">
            <p className="eyebrow">{listing.listingCategory}</p>
            <h1>{listing.name}</h1>
            <p className="listing-location">⌖ {listing.location}</p>

            <h2 className="listing-price">
              {listing.priceLabel || formatPrice(listing.price)}
              {listing.listingCategory === "BNB" && " / night"}
            </h2>

            <div className="listing-facts">
              {listing.bedrooms && <span>{listing.bedrooms} Bedrooms</span>}
              {listing.bathrooms && <span>{listing.bathrooms} Bathrooms</span>}
              {listing.guests && <span>{listing.guests} Guests</span>}
              {listing.type && <span>{listing.type}</span>}
            </div>

            <div className="listing-description">
              <h3>About This Listing</h3>
              <p>
                {listing.description ||
                  "Contact ELAN HOMES for more information about this listing."}
              </p>
            </div>

            {listing.facilities && (
              <div className="listing-facilities">
                <h3>Facilities & Amenities</h3>
                <div className="facility-list">
                  {listing.facilities.map((facility) => (
                    <span key={facility}>{facility}</span>
                  ))}
                </div>
              </div>
            )}

            {listing.size && (
              <div className="listing-description">
                <h3>Land Size</h3>
                <p>{listing.size}</p>
              </div>
            )}

            <div className="listing-contact-note">
              <strong>Interested in this listing?</strong>
              <p>
                Send us an enquiry for availability, viewing arrangements and
                further information.
              </p>

              <button
                className="dark-button"
                onClick={() =>
                  document
                    .getElementById("listing-enquiry")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Enquire About This Listing →
              </button>
            </div>
          </div>
        </div>

        {/* CUSTOMER ENQUIRY */}

        <section className="enquiry-section" id="listing-enquiry">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Make an Enquiry</h2>
          <p>
            Interested in {listing.name}? Complete the form below and continue
            to WhatsApp to send your enquiry directly to ELAN HOMES.
          </p>

          <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
            <div className="enquiry-field">
              <label htmlFor="customer-name">FULL NAME *</label>
              <input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="enquiry-field">
              <label htmlFor="customer-phone">PHONE NUMBER *</label>
              <input
                id="customer-phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. 0712345678"
                required
              />
            </div>

            <div className="enquiry-field full-width">
              <label htmlFor="customer-email">EMAIL ADDRESS</label>
              <input
                id="customer-email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="enquiry-field full-width">
              <label htmlFor="customer-message">YOUR MESSAGE *</label>
              <textarea
                id="customer-message"
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="enquiry-submit">
              Continue to WhatsApp →
            </button>
          </form>
        </section>

        {/* BNB BOOKING REQUEST */}

        {listing.listingCategory === "BNB" && (
          <section className="enquiry-section">
            <p className="eyebrow">RESERVE YOUR STAY</p>
            <h2>Request a BNB Booking</h2>
            <p>
              Submit your preferred dates and guest details. Your request
              remains pending until ELAN HOMES reviews and confirms it.
            </p>

            <CustomerBnbAvailabilityCalendar
              listing={listing}
              availabilityBlocks={availabilityBlocks}
              bnbBookings={bnbBookings}
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectDate={handleCalendarDateSelect}
            />

            {bookingSubmitted ? (
              <div className="enquiry-success">
                <h3>Booking request received!</h3>
                <p>
                  Your request for {listing.name} has been submitted
                  successfully.
                </p>
                <p>
                  <strong>Reference:</strong> {bookingReference}
                </p>
                <p>
                  <strong>Stay:</strong> {checkIn} to {checkOut} (
                  {bookingNights} night(s))
                </p>
                <p>
                  <strong>Estimated total:</strong> {formatPrice(bookingTotal)}
                </p>
                <p>
                  Your request is pending ELAN HOMES confirmation. Your stay is
                  not confirmed until our team approves it.
                </p>
              </div>
            ) : bookingReview ? (
              <div
                className="booking-review"
                style={{
                  border: "1px solid #d8c7a2",
                  borderRadius: 12,
                  padding: 20,
                  background: "#fbf9f5",
                  marginTop: 18,
                }}
              >
                <p className="eyebrow">FINAL STEP</p>
                <h3 style={{ marginTop: 0 }}>Review Your Booking</h3>
                <p>
                  Please check the details below before sending your booking
                  request.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: 14,
                    margin: "18px 0",
                  }}
                >
                  <div>
                    <small>ACCOMMODATION</small>
                    <p>
                      <strong>{listing.name}</strong>
                    </p>
                    <p>{listing.location}</p>
                  </div>
                  <div>
                    <small>CHECK-IN</small>
                    <p>
                      <strong>{checkIn}</strong>
                    </p>
                  </div>
                  <div>
                    <small>CHECK-OUT</small>
                    <p>
                      <strong>{checkOut}</strong>
                    </p>
                  </div>
                  <div>
                    <small>DURATION</small>
                    <p>
                      <strong>{bookingNights} night(s)</strong>
                    </p>
                  </div>
                  <div>
                    <small>GUESTS</small>
                    <p>
                      <strong>{bookingGuests}</strong>
                    </p>
                  </div>
                  <div>
                    <small>PRICE PER NIGHT</small>
                    <p>
                      <strong>{formatPrice(Number(listing.price || 0))}</strong>
                    </p>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #e5ddcf", paddingTop: 14 }}>
                  <h4>Guest Details</h4>
                  <p>
                    <strong>Name:</strong> {customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customerPhone}
                  </p>
                  <p>
                    <strong>Email:</strong> {customerEmail || "Not provided"}
                  </p>
                </div>
                <div
                  style={{
                    background: "#f0ece4",
                    borderRadius: 8,
                    padding: 16,
                    margin: "18px 0",
                  }}
                >
                  <small>ESTIMATED BOOKING TOTAL</small>
                  <h2 style={{ margin: "6px 0" }}>
                    {formatPrice(bookingTotal)}
                  </h2>
                  <small>
                    {bookingNights} night(s) ×{" "}
                    {formatPrice(Number(listing.price || 0))}. Final price and
                    availability are subject to ELAN HOMES confirmation.
                  </small>
                </div>
                <p style={{ fontSize: 13, color: "#746b5e" }}>
                  Submitting this request does not mean your booking is
                  confirmed. Our team will contact you to confirm availability
                  and the next steps.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 18,
                  }}
                >
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => setBookingReview(false)}
                  >
                    ← Edit Details
                  </button>
                  <button
                    type="button"
                    className="enquiry-submit"
                    onClick={handleConfirmBnbBooking}
                  >
                    Confirm & Submit Request →
                  </button>
                </div>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleBnbBooking}>
                <div className="enquiry-field">
                  <label htmlFor="booking-customer-name">FULL NAME *</label>
                  <input
                    id="booking-customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="enquiry-field">
                  <label htmlFor="booking-customer-phone">PHONE NUMBER *</label>
                  <input
                    id="booking-customer-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0712345678"
                    required
                  />
                </div>
                <div className="enquiry-field full-width">
                  <label htmlFor="booking-customer-email">EMAIL ADDRESS</label>
                  <input
                    id="booking-customer-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="enquiry-field">
                  <label htmlFor="booking-check-in">CHECK-IN *</label>
                  <input
                    id="booking-check-in"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && checkOut <= e.target.value)
                        setCheckOut("");
                    }}
                    required
                  />
                </div>
                <div className="enquiry-field">
                  <label htmlFor="booking-check-out">CHECK-OUT *</label>
                  <input
                    id="booking-check-out"
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
                <div className="enquiry-field">
                  <label htmlFor="booking-guests">NUMBER OF GUESTS *</label>
                  <input
                    id="booking-guests"
                    type="number"
                    min="1"
                    max={listing.guests || 1}
                    value={bookingGuests}
                    onChange={(e) => setBookingGuests(e.target.value)}
                    required
                  />
                  <small>Maximum capacity: {listing.guests || 1} guests</small>
                </div>
                <div className="enquiry-field full-width">
                  <div
                    className="booking-summary"
                    style={{
                      padding: 16,
                      background: "#f5f3ef",
                      borderRadius: 8,
                    }}
                  >
                    <strong>Booking estimate</strong>
                    <p>
                      {bookingNights} night(s) ×{" "}
                      {formatPrice(Number(listing.price || 0))}
                    </p>
                    <h3>Estimated total: {formatPrice(bookingTotal)}</h3>
                    <small>
                      This is an estimate only. Final availability and price
                      will be confirmed by ELAN HOMES.
                    </small>
                  </div>
                </div>
                <button type="submit" className="enquiry-submit">
                  Review Booking →
                </button>
              </form>
            )}
          </section>
        )}

        {/* PROPERTY VIEWING REQUEST */}

        {listing.listingCategory !== "BNB" && (
          <section className="enquiry-section">
            <p className="eyebrow">BOOK A PROPERTY VIEWING</p>
            <h2>Schedule Your Viewing</h2>

            <p>
              Submit a viewing request. ELAN HOMES will review your request
              before sending payment instructions.
            </p>

            <h3>Viewing Fee: {formatPrice(listing.viewingFee || 0)}</h3>

            {viewingSubmitted ? (
              <div className="enquiry-success">
                Your viewing request has been submitted successfully. Please
                wait for ELAN HOMES to approve your appointment. Payment will
                only be requested after approval.
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleViewingRequest}>
                <div className="enquiry-field">
                  <label>FULL NAME *</label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="enquiry-field">
                  <label>PHONE NUMBER *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0712345678"
                    required
                  />
                </div>

                <div className="enquiry-field">
                  <label>PREFERRED VIEWING DATE *</label>
                  <input
                    type="date"
                    value={viewingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setViewingDate(e.target.value)}
                    required
                  />
                </div>

                <div className="enquiry-field">
                  <label>PREFERRED VIEWING TIME *</label>
                  <input
                    type="time"
                    value={viewingTime}
                    onChange={(e) => setViewingTime(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="enquiry-submit">
                  Submit Viewing Request →
                </button>
              </form>
            )}
          </section>
        )}

        <div className="listing-contact">
          <p className="eyebrow">ELAN HOMES</p>
          <h2>Let's Help You Find Your Next Property.</h2>
          <p>
            Discover exceptional properties, land and accommodation across
            Kenya.
          </p>
          <button className="outline-button" onClick={onBack}>
            Explore More Listings →
          </button>
        </div>
      </main>
    </div>
  );
}

/* =================================
   ADMIN LOGIN
================================= */

function BookingTracker({ bookings = [] }) {
  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);

  function handleTrack(e) {
    e.preventDefault();
    const normalizedReference = reference.trim().toUpperCase();
    const normalizedPhone = phone.replace(/\s+/g, "");
    const match = bookings.find((booking) => {
      const bookingRef =
        booking.bookingReference ||
        `EH-${new Date(booking.id).getFullYear()}-${String(booking.id).slice(-6)}`;
      return (
        bookingRef.toUpperCase() === normalizedReference &&
        String(booking.customerPhone || "").replace(/\s+/g, "") ===
          normalizedPhone
      );
    });
    setResult(match || null);
    setSearched(true);
  }

  const status = result?.status || "Pending";
  const statusColor =
    status === "Confirmed"
      ? "#187343"
      : status === "Declined"
        ? "#a12b25"
        : "#9a7434";

  return (
    <section
      className="enquiry-section"
      id="track-booking"
      style={{ maxWidth: 900, margin: "50px auto", padding: 24 }}
    >
      <p className="eyebrow">YOUR STAY, YOUR PEACE OF MIND</p>
      <h2>Track Your BNB Booking</h2>
      <p>
        Enter the booking reference sent after submitting your request and the
        phone number used when booking.
      </p>
      <form className="enquiry-form" onSubmit={handleTrack}>
        <div className="enquiry-field">
          <label htmlFor="track-reference">BOOKING REFERENCE *</label>
          <input
            id="track-reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="e.g. EH-2026-123456"
            required
          />
        </div>
        <div className="enquiry-field">
          <label htmlFor="track-phone">PHONE NUMBER *</label>
          <input
            id="track-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number used for booking"
            required
          />
        </div>
        <button className="enquiry-submit" type="submit">
          Track Booking →
        </button>
      </form>
      {searched && !result && (
        <div
          role="alert"
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 8,
            background: "#f8e8e6",
            color: "#963c34",
          }}
        >
          No booking matched those details. Check your reference and phone
          number and try again.
        </div>
      )}
      {result && (
        <div
          style={{
            marginTop: 22,
            padding: 20,
            border: "1px solid #e7e2d9",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <small>BOOKING REFERENCE</small>
              <h3 style={{ margin: "5px 0" }}>
                {result.bookingReference ||
                  `EH-${new Date(result.id).getFullYear()}-${String(result.id).slice(-6)}`}
              </h3>
            </div>
            <span
              style={{
                padding: "7px 12px",
                borderRadius: 30,
                background: `${statusColor}18`,
                color: statusColor,
                fontWeight: 700,
              }}
            >
              {status}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              marginTop: 18,
            }}
          >
            <div>
              <small>ACCOMMODATION</small>
              <p>
                <strong>{result.listingName}</strong>
              </p>
              <p>{result.location}</p>
            </div>
            <div>
              <small>CHECK-IN</small>
              <p>
                <strong>{result.checkIn}</strong>
              </p>
            </div>
            <div>
              <small>CHECK-OUT</small>
              <p>
                <strong>{result.checkOut}</strong>
              </p>
            </div>
            <div>
              <small>GUESTS</small>
              <p>
                <strong>{result.guests}</strong>
              </p>
            </div>
            <div>
              <small>ESTIMATED TOTAL</small>
              <p>
                <strong>{formatPrice(Number(result.totalAmount || 0))}</strong>
              </p>
            </div>
            <div>
              <small>REQUEST DATE</small>
              <p>
                <strong>{result.createdAt || "—"}</strong>
              </p>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #e7e2d9",
              marginTop: 12,
              paddingTop: 14,
            }}
          >
            {status === "Pending" && (
              <p>
                Your booking request has been received and is awaiting review by
                ELAN HOMES. Your stay is not yet confirmed.
              </p>
            )}
            {status === "Confirmed" && (
              <p>
                Your booking has been confirmed by ELAN HOMES. Please contact
                our team if you need assistance with your stay.
              </p>
            )}
            {status === "Declined" && (
              <p>
                This booking request was declined. Please contact ELAN HOMES if
                you would like help finding alternative dates.
              </p>
            )}
            <small>
              Last updated:{" "}
              {result.updatedAt || result.createdAt || "Awaiting update"}
            </small>
          </div>
        </div>
      )}
    </section>
  );
}

function AdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect username or password.");
    }
  }

  return (
    <div style={adminStyles.page}>
      <div style={adminStyles.loginCard}>
        <h1 style={adminStyles.brand}>
          ELAN <span>HOMES</span>
        </h1>
        <p style={adminStyles.muted}>ADMINISTRATION PORTAL</p>
        <h2>Administrator Login</h2>
        <p style={adminStyles.muted}>
          Sign in to manage property viewings and payments.
        </p>

        <form onSubmit={handleSubmit} style={adminStyles.form}>
          <label style={adminStyles.label}>USERNAME</label>
          <input
            style={adminStyles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          <label style={adminStyles.label}>PASSWORD</label>
          <input
            style={adminStyles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          {error && <p style={{ color: "#b42318", fontSize: 13 }}>{error}</p>}

          <button style={adminStyles.primaryButton} type="submit">
            Sign In →
          </button>
        </form>

        <button style={adminStyles.backButton} onClick={onBack}>
          ← Back to ELAN HOMES
        </button>
      </div>
    </div>
  );
}

/* =================================
   PROPERTY MANAGEMENT
================================= */

function PropertyManager({ properties, onSaveProperties }) {
  const emptyForm = {
    name: "",
    location: "",
    type: "House",
    listingMode: "Sale",
    price: "",
    viewingFee: "1000",
    bedrooms: "",
    image: "",
    description: "",
    status: "Available",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const propertyData = {
      ...form,
      id: editingId || Date.now(),
      price: Number(form.price),
      viewingFee: Number(form.viewingFee),
      bedrooms: Number(form.bedrooms) || 0,
    };

    let updated;

    if (editingId) {
      updated = properties.map((property) =>
        property.id === editingId ? propertyData : property,
      );
    } else {
      updated = [...properties, propertyData];
    }

    onSaveProperties(updated);
    setForm(emptyForm);
    setEditingId(null);

    alert(
      editingId
        ? "Property updated successfully."
        : "Property added successfully.",
    );
  }

  function handleEdit(property) {
    setForm({
      name: property.name || "",
      location: property.location || "",
      type: property.type || "House",
      listingMode: property.listingMode || "Sale",
      price: String(property.price || ""),
      viewingFee: String(property.viewingFee || 1000),
      bedrooms: String(property.bedrooms || ""),
      image: property.image || "",
      description: property.description || "",
      status: property.status || "Available",
    });

    setEditingId(property.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    onSaveProperties(properties.filter((property) => property.id !== id));

    if (editingId === id) {
      setForm(emptyForm);
      setEditingId(null);
    }
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditingId(null);
  }

  const filteredProperties = properties.filter((property) => {
    const term = search.toLowerCase();

    return (
      property.name.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term) ||
      property.type.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div style={adminStyles.panel}>
        <h2>{editingId ? "Edit Property" : "Add New Property"}</h2>

        <p style={adminStyles.muted}>
          Add and manage properties displayed on the ELAN HOMES website.
        </p>

        <form onSubmit={handleSubmit} style={adminStyles.form}>
          <label style={adminStyles.label}>PROPERTY NAME *</label>
          <input
            style={adminStyles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Luxury Family Residence"
            required
          />

          <label style={adminStyles.label}>LOCATION *</label>
          <input
            style={adminStyles.input}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Ruiru, Kiambu"
            required
          />

          <label style={adminStyles.label}>PROPERTY TYPE</label>
          <select
            style={adminStyles.input}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>House</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Maisonette</option>
            <option>Townhouse</option>
            <option>Commercial Property</option>
          </select>

          <label style={adminStyles.label}>LISTING CATEGORY</label>
          <select
            style={adminStyles.input}
            value={form.listingMode}
            onChange={(e) => setForm({ ...form, listingMode: e.target.value })}
          >
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>

          <label style={adminStyles.label}>PRICE IN KSH *</label>
          <input
            style={adminStyles.input}
            type="number"
            min="1"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Enter property price"
            required
          />

          <label style={adminStyles.label}>VIEWING FEE IN KSH</label>
          <input
            style={adminStyles.input}
            type="number"
            min="0"
            value={form.viewingFee}
            onChange={(e) => setForm({ ...form, viewingFee: e.target.value })}
          />

          <label style={adminStyles.label}>NUMBER OF BEDROOMS</label>
          <input
            style={adminStyles.input}
            type="number"
            min="0"
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
            placeholder="e.g. 4"
          />

          <label style={adminStyles.label}>PROPERTY IMAGE URL *</label>
          <input
            style={adminStyles.input}
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Paste an image URL"
            required
          />

          {form.image && (
            <img
              src={form.image}
              alt="Property preview"
              style={{
                width: "100%",
                maxWidth: 300,
                height: 170,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
          )}

          <label style={adminStyles.label}>DESCRIPTION</label>
          <textarea
            style={{
              ...adminStyles.input,
              minHeight: 100,
              resize: "vertical",
            }}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the property..."
          />

          <label style={adminStyles.label}>PROPERTY STATUS</label>
          <select
            style={adminStyles.input}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Available</option>
            <option>Sold</option>
            <option>Rented</option>
          </select>

          <div style={adminStyles.actionGroup}>
            <button style={adminStyles.primaryButton} type="submit">
              {editingId ? "Save Property Changes" : "Add Property"}
            </button>

            {editingId && (
              <button
                type="button"
                style={adminStyles.declineButton}
                onClick={handleCancel}
              >
                Cancel Editing
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={adminStyles.panel}>
        <h2>Property Directory ({properties.length})</h2>

        <input
          style={{ ...adminStyles.input, maxWidth: 420 }}
          placeholder="Search properties or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredProperties.length === 0 ? (
          <p style={adminStyles.muted}>No properties found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={adminStyles.table}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <strong>{property.name}</strong>
                      <br />
                      <small>{property.location}</small>
                    </td>

                    <td>
                      {property.listingMode === "Rent"
                        ? "For Rent"
                        : "For Sale"}
                    </td>

                    <td>
                      {formatPrice(property.price)}
                      {property.listingMode === "Rent" && " / month"}
                    </td>

                    <td>
                      <span style={statusStyle(property.status || "Available")}>
                        {property.status || "Available"}
                      </span>
                    </td>

                    <td>
                      <div style={adminStyles.actionGroup}>
                        <button
                          style={adminStyles.approveButton}
                          onClick={() => handleEdit(property)}
                        >
                          Edit
                        </button>

                        <button
                          style={adminStyles.declineButton}
                          onClick={() => handleDelete(property.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =================================
   BNB AVAILABILITY MANAGEMENT
================================= */

function BnbAvailabilityManager({
  availabilityBlocks,
  onSaveAvailability,
  bnbBookings,
}) {
  const [listingId, setListingId] = useState(String(stays[0]?.id || ""));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("Maintenance");
  const today = new Date().toISOString().split("T")[0];

  function handleAddBlock(e) {
    e.preventDefault();

    if (!listingId || !startDate || !endDate) {
      alert("Please select an accommodation and both dates.");
      return;
    }
    if (startDate < today || endDate <= startDate) {
      alert(
        "Choose a valid date range. The start date cannot be in the past and the end date must be after the start date.",
      );
      return;
    }

    const selectedId = Number(listingId);
    const overlapsExistingBlock = availabilityBlocks.some(
      (block) =>
        Number(block.listingId) === selectedId &&
        datesOverlap(startDate, endDate, block.startDate, block.endDate),
    );
    if (overlapsExistingBlock) {
      alert(
        "This date range overlaps an existing availability block for this accommodation.",
      );
      return;
    }

    const overlapsConfirmedBooking = bnbBookings.some(
      (booking) =>
        Number(booking.listingId) === selectedId &&
        booking.status === "Confirmed" &&
        datesOverlap(startDate, endDate, booking.checkIn, booking.checkOut),
    );
    if (overlapsConfirmedBooking) {
      alert(
        "You cannot block these dates because there is already a confirmed booking.",
      );
      return;
    }

    const selectedStay = stays.find((stay) => stay.id === selectedId);
    const newBlock = {
      id: Date.now(),
      listingId: selectedId,
      listingName: selectedStay?.name || "Accommodation",
      startDate,
      endDate,
      reason,
      createdAt: new Date().toLocaleString(),
    };

    onSaveAvailability([...availabilityBlocks, newBlock]);
    setStartDate("");
    setEndDate("");
    setReason("Maintenance");
    alert("Unavailable dates have been saved.");
  }

  function handleRemoveBlock(id) {
    if (
      !window.confirm(
        "Remove this availability block? The dates may become available for booking requests.",
      )
    )
      return;
    onSaveAvailability(availabilityBlocks.filter((block) => block.id !== id));
  }

  return (
    <div>
      <div style={adminStyles.panel}>
        <h2>Block BNB Availability</h2>
        <p style={adminStyles.muted}>
          Block dates when an accommodation is under maintenance, privately
          reserved or otherwise unavailable. Customers will not be able to
          submit booking requests for blocked dates.
        </p>
        <form onSubmit={handleAddBlock} style={adminStyles.form}>
          <label style={adminStyles.label}>ACCOMMODATION *</label>
          <select
            style={adminStyles.input}
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            required
          >
            {stays.map((stay) => (
              <option key={stay.id} value={stay.id}>
                {stay.name} — {stay.location}
              </option>
            ))}
          </select>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
            }}
          >
            <div>
              <label style={adminStyles.label}>BLOCK FROM *</label>
              <input
                style={adminStyles.input}
                type="date"
                min={today}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={adminStyles.label}>BLOCK UNTIL (CHECK-OUT) *</label>
              <input
                style={adminStyles.input}
                type="date"
                min={startDate || today}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <label style={adminStyles.label}>REASON</label>
          <select
            style={adminStyles.input}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option>Maintenance</option>
            <option>Private Reservation</option>
            <option>Property Renovation</option>
            <option>Owner Occupied</option>
            <option>Other</option>
          </select>
          <button type="submit" style={adminStyles.primaryButton}>
            Save Unavailable Dates →
          </button>
        </form>
      </div>

      <div style={adminStyles.panel}>
        <h2>Current Availability Blocks</h2>
        {availabilityBlocks.length === 0 ? (
          <p style={adminStyles.muted}>
            No dates have been blocked. All listed stays remain open for booking
            requests, subject to confirmation.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={adminStyles.table}>
              <thead>
                <tr>
                  <th>Accommodation</th>
                  <th>Unavailable Dates</th>
                  <th>Reason</th>
                  <th>Added</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availabilityBlocks
                  .slice()
                  .sort((a, b) => a.startDate.localeCompare(b.startDate))
                  .map((block) => (
                    <tr key={block.id}>
                      <td>
                        <strong>{block.listingName}</strong>
                      </td>
                      <td>
                        {block.startDate}
                        <br />
                        <small>to {block.endDate}</small>
                      </td>
                      <td>{block.reason}</td>
                      <td>{block.createdAt || "—"}</td>
                      <td>
                        <button
                          type="button"
                          style={adminStyles.declineButton}
                          onClick={() => handleRemoveBlock(block.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =================================
   BNB AVAILABILITY CALENDAR
================================= */

function BnbAvailabilityCalendar({
  availabilityBlocks = [],
  bnbBookings = [],
}) {
  const [listingId, setListingId] = useState(String(stays[0]?.id || ""));
  const [monthDate, setMonthDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const selectedStay = stays.find((stay) => stay.id === Number(listingId));
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  function dateKey(day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function getDayStatus(day) {
    const date = dateKey(day);
    const block = availabilityBlocks.find(
      (item) =>
        Number(item.listingId) === Number(listingId) &&
        item.startDate <= date &&
        date < item.endDate,
    );
    if (block)
      return { status: "Blocked", detail: block.reason || "Unavailable" };

    const booking = bnbBookings.find(
      (item) =>
        Number(item.listingId) === Number(listingId) &&
        item.status === "Confirmed" &&
        item.checkIn <= date &&
        date < item.checkOut,
    );
    if (booking)
      return {
        status: "Booked",
        detail: `Confirmed booking: ${booking.customerName || "Guest"}`,
      };

    return {
      status: "Available",
      detail: "No confirmed booking or availability block",
    };
  }

  const monthLabel = monthDate.toLocaleDateString("en-KE", {
    month: "long",
    year: "numeric",
  });
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const statuses = days.map((day) => getDayStatus(day).status);
  const bookedCount = statuses.filter((status) => status === "Booked").length;
  const blockedCount = statuses.filter((status) => status === "Blocked").length;
  const availableCount = statuses.filter(
    (status) => status === "Available",
  ).length;

  const cellBase = {
    minHeight: 76,
    border: "1px solid #e7e2d9",
    borderRadius: 7,
    padding: 8,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 6,
    background: "#fff",
    color: "#242424",
  };

  function statusStyle(status) {
    if (status === "Booked")
      return { background: "#f8e8e6", borderColor: "#d9a19b" };
    if (status === "Blocked")
      return { background: "#eee9df", borderColor: "#c9bda8" };
    return { background: "#eaf3eb", borderColor: "#b7d2bb" };
  }

  return (
    <div>
      <div style={adminStyles.panel}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ marginBottom: 6 }}>BNB Availability Calendar</h2>
            <p style={adminStyles.muted}>
              View confirmed bookings and manually blocked dates for each
              accommodation.
            </p>
          </div>
          <select
            aria-label="Choose accommodation"
            style={{ ...adminStyles.input, maxWidth: 330, margin: 0 }}
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
          >
            {stays.map((stay) => (
              <option key={stay.id} value={stay.id}>
                {stay.name} — {stay.location}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            margin: "22px 0 16px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            style={adminStyles.backButton}
            onClick={() => setMonthDate(new Date(year, month - 1, 1))}
          >
            ← Previous
          </button>
          <h3 style={{ margin: 0, textAlign: "center" }}>{monthLabel}</h3>
          <button
            type="button"
            style={adminStyles.backButton}
            onClick={() => setMonthDate(new Date(year, month + 1, 1))}
          >
            Next →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            gap: 5,
            minWidth: 0,
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              style={{
                textAlign: "center",
                padding: "8px 2px",
                fontWeight: 700,
                fontSize: 12,
                color: "#716b60",
              }}
            >
              {day}
            </div>
          ))}
          {Array.from({ length: firstWeekday }, (_, index) => (
            <div key={`empty-${index}`} style={{ minHeight: 76 }} />
          ))}
          {days.map((day) => {
            const date = dateKey(day);
            const info = getDayStatus(day);
            const isToday = date === todayKey;
            return (
              <div
                key={date}
                title={`${date} — ${info.status}${info.detail ? `: ${info.detail}` : ""}`}
                style={{
                  ...cellBase,
                  ...statusStyle(info.status),
                  outline: isToday ? "2px solid #b89b63" : "none",
                  outlineOffset: -2,
                }}
              >
                <strong style={{ fontSize: 14 }}>
                  {day}
                  {isToday ? " · Today" : ""}
                </strong>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    lineHeight: 1.25,
                    overflowWrap: "anywhere",
                  }}
                >
                  {info.status}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 18,
            fontSize: 12,
          }}
        >
          <span>
            <strong style={{ color: "#397346" }}>●</strong> Available
          </span>
          <span>
            <strong style={{ color: "#b14b42" }}>●</strong> Booked
          </span>
          <span>
            <strong style={{ color: "#8c7654" }}>●</strong> Blocked
          </span>
        </div>
      </div>

      <div style={adminStyles.statsGrid}>
        <StatCard title="Available Days" value={availableCount} />
        <StatCard title="Booked Days" value={bookedCount} />
        <StatCard title="Blocked Days" value={blockedCount} />
      </div>

      <div style={adminStyles.panel}>
        <h3>{selectedStay?.name || "Selected accommodation"}</h3>
        <p style={adminStyles.muted}>
          {selectedStay?.location || ""} · Calendar counts cover {monthLabel}{" "}
          only. Check-out dates are not counted as occupied nights.
        </p>
        <p style={{ ...adminStyles.muted, marginBottom: 0 }}>
          Pending booking requests do not appear as booked. Only bookings marked
          Confirmed by an administrator block calendar dates.
        </p>
      </div>
    </div>
  );
}

/* =================================
   ADMIN DASHBOARD
================================= */

function AdminDashboard({
  onLogout,
  properties,
  onSaveProperties,
  bnbBookings,
  onUpdateBnbBooking,
  availabilityBlocks,
  onSaveAvailability,
  notifications = [],
  onMarkNotificationsRead,
}) {
  const [requests, setRequests] = useState(getViewingRequests);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [desktopPermission, setDesktopPermission] = useState(
    typeof Notification !== "undefined"
      ? Notification.permission
      : "unsupported",
  );
  const unreadNotifications = notifications.filter((item) => !item.read);

  function enableDesktopNotifications() {
    if (typeof Notification === "undefined") {
      alert("Desktop notifications are not supported by this browser.");
      return;
    }
    Notification.requestPermission().then((permission) =>
      setDesktopPermission(permission),
    );
  }

  function updateRequest(id, changes) {
    const updated = requests.map((request) =>
      request.id === id ? { ...request, ...changes } : request,
    );

    setRequests(updated);
    saveViewingRequests(updated);
  }

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const paidCount = requests.filter((r) => r.paymentStatus === "Paid").length;

  const totalPaid = requests
    .filter((r) => r.paymentStatus === "Paid")
    .reduce((sum, r) => sum + Number(r.viewingFee || 0), 0);

  const filteredRequests = requests.filter((request) => {
    const term = search.toLowerCase();

    return (
      request.customerName?.toLowerCase().includes(term) ||
      request.listingName?.toLowerCase().includes(term) ||
      request.customerPhone?.toLowerCase().includes(term)
    );
  });

  const tabs = [
    "Overview",
    "Properties",
    "Viewing Requests",
    "BNB Bookings",
    "BNB Availability",
    "BNB Calendar",
    "Notifications",
    "Payments",
  ];
  const pendingBnbCount = bnbBookings.filter(
    (booking) => booking.status === "Pending",
  ).length;
  const confirmedBnbCount = bnbBookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  return (
    <div style={adminStyles.dashboard}>
      <aside style={adminStyles.sidebar}>
        <h2 style={adminStyles.brand}>
          ELAN <span>HOMES</span>
        </h2>
        <p style={adminStyles.sidebarCaption}>ADMIN PANEL</p>

        <div style={{ marginTop: 35 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...adminStyles.sideButton,
                ...(activeTab === tab ? adminStyles.sideButtonActive : {}),
              }}
            >
              {tab === "Overview"
                ? "▦"
                : tab === "Properties"
                  ? "⌂"
                  : tab === "Viewing Requests"
                    ? "▣"
                    : tab === "BNB Bookings"
                      ? "⌂"
                      : tab === "BNB Availability"
                        ? "▣"
                        : tab === "BNB Calendar"
                          ? "▦"
                          : tab === "Notifications"
                            ? "♢"
                            : "KSh"}{" "}
              {tab}
              {tab === "Notifications" && unreadNotifications.length > 0
                ? ` (${unreadNotifications.length})`
                : ""}
            </button>
          ))}
        </div>

        <button style={adminStyles.logoutButton} onClick={onLogout}>
          Sign Out
        </button>
      </aside>

      <main style={adminStyles.dashboardMain}>
        <header style={adminStyles.dashboardHeader}>
          <div>
            <p style={adminStyles.muted}>ELAN HOMES MANAGEMENT</p>
            <h1>{activeTab}</h1>
          </div>
          <span style={adminStyles.adminBadge}>Administrator</span>
        </header>

        {activeTab === "Overview" && (
          <>
            <div style={adminStyles.statsGrid}>
              <StatCard title="Total Requests" value={requests.length} />
              <StatCard title="Pending Approval" value={pendingCount} />
              <StatCard title="Approved" value={approvedCount} />
              <StatCard
                title="Payments Received"
                value={formatPrice(totalPaid)}
              />
            </div>

            <div style={adminStyles.statsGrid}>
              <StatCard
                title="BNB Booking Requests"
                value={bnbBookings.length}
              />
              <StatCard title="Pending BNB Bookings" value={pendingBnbCount} />
              <StatCard
                title="Confirmed BNB Bookings"
                value={confirmedBnbCount}
              />
            </div>

            <div style={adminStyles.panel}>
              <h2>Recent BNB Booking Requests</h2>
              {bnbBookings.length === 0 ? (
                <p style={adminStyles.muted}>
                  No BNB booking requests have been submitted yet.
                </p>
              ) : (
                <BnbBookingTable
                  bookings={bnbBookings.slice().reverse().slice(0, 5)}
                  onUpdate={onUpdateBnbBooking}
                />
              )}
            </div>

            <div style={adminStyles.panel}>
              <h2>Recent Viewing Requests</h2>
              {requests.length === 0 ? (
                <p style={adminStyles.muted}>
                  No viewing requests have been submitted yet.
                </p>
              ) : (
                <RequestTable
                  requests={requests.slice().reverse().slice(0, 5)}
                  updateRequest={updateRequest}
                  showPayment={false}
                />
              )}
            </div>

            <div style={adminStyles.panel}>
              <h2>Business Summary</h2>
              <div style={adminStyles.summaryRow}>
                <span>Pending requests</span>
                <strong>{pendingCount}</strong>
              </div>
              <div style={adminStyles.summaryRow}>
                <span>Approved appointments</span>
                <strong>{approvedCount}</strong>
              </div>
              <div style={adminStyles.summaryRow}>
                <span>Paid viewing requests</span>
                <strong>{paidCount}</strong>
              </div>
              <div style={adminStyles.summaryRow}>
                <span>Outstanding approved fees</span>
                <strong>
                  {formatPrice(
                    requests
                      .filter(
                        (r) =>
                          r.status === "Approved" && r.paymentStatus !== "Paid",
                      )
                      .reduce((sum, r) => sum + Number(r.viewingFee || 0), 0),
                  )}
                </strong>
              </div>
            </div>
          </>
        )}
        {activeTab === "Properties" && (
          <PropertyManager
            properties={properties}
            onSaveProperties={onSaveProperties}
          />
        )}
        {activeTab === "Viewing Requests" && (
          <div style={adminStyles.panel}>
            <h2>Manage Viewing Requests</h2>
            <p style={adminStyles.muted}>
              Review each request and approve or decline the appointment.
            </p>

            <input
              style={{ ...adminStyles.input, maxWidth: 420, marginBottom: 20 }}
              placeholder="Search customer, property or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <RequestTable
              requests={filteredRequests.slice().reverse()}
              updateRequest={updateRequest}
              showPayment={false}
            />
          </div>
        )}

        {activeTab === "BNB Bookings" && (
          <div style={adminStyles.panel}>
            <h2>Manage BNB Booking Requests</h2>
            <p style={adminStyles.muted}>
              Review guest details and requested dates. Confirmed bookings have
              been approved by ELAN HOMES.
            </p>
            <BnbBookingTable
              bookings={bnbBookings.slice().reverse()}
              onUpdate={onUpdateBnbBooking}
            />
          </div>
        )}

        {activeTab === "BNB Availability" && (
          <BnbAvailabilityManager
            availabilityBlocks={availabilityBlocks}
            onSaveAvailability={onSaveAvailability}
            bnbBookings={bnbBookings}
          />
        )}

        {activeTab === "BNB Calendar" && (
          <BnbAvailabilityCalendar
            availabilityBlocks={availabilityBlocks}
            bnbBookings={bnbBookings}
          />
        )}

        {activeTab === "Notifications" && (
          <div style={adminStyles.panel}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ marginBottom: 6 }}>Admin Notifications</h2>
                <p style={adminStyles.muted}>
                  New BNB booking requests are recorded here on this browser.
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  style={adminStyles.sideButton}
                  onClick={enableDesktopNotifications}
                  disabled={desktopPermission === "granted"}
                >
                  {desktopPermission === "granted"
                    ? "Desktop Alerts Enabled"
                    : "Enable Desktop Alerts"}
                </button>
                <button
                  type="button"
                  style={adminStyles.approveButton}
                  onClick={onMarkNotificationsRead}
                  disabled={unreadNotifications.length === 0}
                >
                  Mark All Read
                </button>
              </div>
            </div>
            <p style={adminStyles.muted}>
              Browser permission: {desktopPermission}. Desktop alerts appear
              only when this site is open and the browser allows notifications.
            </p>
            {notifications.length === 0 ? (
              <p style={adminStyles.muted}>
                No notifications yet. New customer booking requests will appear
                here.
              </p>
            ) : (
              notifications
                .slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: 16,
                      marginTop: 12,
                      border: "1px solid #e7e2d9",
                      borderLeft: item.read
                        ? "4px solid #c9c3b8"
                        : "4px solid #b89b63",
                      borderRadius: 8,
                      background: item.read ? "#fff" : "#fbf8f1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <strong>{item.title}</strong>
                      <small>{item.createdAt}</small>
                    </div>
                    <p style={{ margin: "8px 0" }}>{item.message}</p>
                    <small>Reference: {item.bookingReference}</small>
                    {!item.read && (
                      <span
                        style={{
                          marginLeft: 10,
                          color: "#9a7434",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === "Payments" && (
          <div style={adminStyles.panel}>
            <h2>Viewing Fee Payments</h2>
            <p style={adminStyles.muted}>
              Only approved viewing requests can be marked as paid. Confirm the
              payment through your actual M-Pesa records before updating this
              status.
            </p>

            <div style={adminStyles.statsGrid}>
              <StatCard
                title="Payments Received"
                value={formatPrice(totalPaid)}
              />
              <StatCard title="Paid Requests" value={paidCount} />
              <StatCard
                title="Awaiting Payment"
                value={
                  requests.filter(
                    (r) =>
                      r.status === "Approved" && r.paymentStatus !== "Paid",
                  ).length
                }
              />
            </div>

            <RequestTable
              requests={requests.slice().reverse()}
              updateRequest={updateRequest}
              showPayment={true}
            />
          </div>
        )}
      </main>
    </div>
  );
}

/* =================================
   ADMIN DASHBOARD COMPONENTS
================================= */

function StatCard({ title, value }) {
  return (
    <div style={adminStyles.statCard}>
      <p style={adminStyles.muted}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function BnbBookingTable({ bookings, onUpdate }) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  if (!bookings || bookings.length === 0) {
    return <p style={adminStyles.muted}>No BNB booking requests found.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={adminStyles.table}>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Accommodation</th>
            <th>Stay Dates</th>
            <th>Guests</th>
            <th>Nights</th>
            <th>Estimate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => {
            const isExpanded = selectedBookingId === booking.id;

            return (
              <Fragment key={booking.id}>
                <tr>
                  <td>
                    <strong>{booking.customerName}</strong>
                    <br />
                    <small>{booking.customerPhone}</small>
                    <br />
                    <small>{booking.customerEmail || "No email"}</small>
                  </td>

                  <td>
                    {booking.listingName}
                    <br />
                    <small>{booking.location}</small>
                  </td>

                  <td>
                    {booking.checkIn}
                    <br />
                    <small>to {booking.checkOut}</small>
                  </td>

                  <td>{booking.guests}</td>
                  <td>{booking.nights}</td>
                  <td>{formatPrice(Number(booking.totalAmount || 0))}</td>

                  <td>
                    <span style={statusStyle(booking.status)}>
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    <div style={adminStyles.actionGroup}>
                      <button
                        type="button"
                        style={adminStyles.sideButton}
                        onClick={() =>
                          setSelectedBookingId(isExpanded ? null : booking.id)
                        }
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>

                      {booking.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            style={adminStyles.approveButton}
                            onClick={() => onUpdate(booking.id, "Confirmed")}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            style={adminStyles.declineButton}
                            onClick={() => onUpdate(booking.id, "Declined")}
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {booking.status === "Confirmed" && (
                        <>
                          <button
                            type="button"
                            style={adminStyles.approveButton}
                            onClick={() => onUpdate(booking.id, "Completed")}
                          >
                            Complete
                          </button>
                          <button
                            type="button"
                            style={adminStyles.declineButton}
                            onClick={() => onUpdate(booking.id, "Cancelled")}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>

                {isExpanded && (
                  <tr>
                    <td colSpan={8}>
                      <div
                        style={{
                          background: "#f7f4ee",
                          border: "1px solid #e5dccb",
                          borderRadius: 8,
                          padding: 22,
                          color: "#171717",
                          minWidth: 280,
                        }}
                      >
                        <h3 style={{ marginTop: 0 }}>
                          Complete Booking Details
                        </h3>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: 20,
                          }}
                        >
                          <div>
                            <strong>Customer Information</strong>
                            <p>Name: {booking.customerName}</p>
                            <p>Phone: {booking.customerPhone}</p>
                            <p>
                              Email: {booking.customerEmail || "Not provided"}
                            </p>
                          </div>

                          <div>
                            <strong>Accommodation</strong>
                            <p>{booking.listingName}</p>
                            <p>{booking.location}</p>
                            <p>
                              Price per night:{" "}
                              {formatPrice(Number(booking.pricePerNight || 0))}
                            </p>
                          </div>

                          <div>
                            <strong>Stay Information</strong>
                            <p>Check-in: {booking.checkIn}</p>
                            <p>Check-out: {booking.checkOut}</p>
                            <p>Number of nights: {booking.nights}</p>
                            <p>Number of guests: {booking.guests}</p>
                          </div>

                          <div>
                            <strong>Payment Estimate</strong>
                            <h2 style={{ color: "#a4864f" }}>
                              {formatPrice(Number(booking.totalAmount || 0))}
                            </h2>
                            <p>Booking status: {booking.status}</p>
                          </div>
                        </div>

                        <div
                          style={{
                            borderTop: "1px solid #ddd2bf",
                            marginTop: 15,
                            paddingTop: 12,
                          }}
                        >
                          <small style={{ color: "#777" }}>
                            Request submitted:{" "}
                            {booking.createdAt || "Date not available"}
                          </small>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RequestTable({ requests, updateRequest, showPayment = false }) {
  if (!requests || requests.length === 0) {
    return <p style={adminStyles.muted}>No viewing requests found.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={adminStyles.table}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Property</th>
            <th>Viewing Date</th>
            <th>Viewing Time</th>
            <th>Viewing Fee</th>
            <th>Status</th>
            {showPayment && <th>Payment</th>}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>
                <strong>{request.customerName}</strong>
                <br />
                <small>{request.customerPhone}</small>
              </td>

              <td>
                {request.listingName}
                <br />
                <small>{request.location}</small>
              </td>

              <td>{request.viewingDate || "Not specified"}</td>
              <td>{request.viewingTime || "Not specified"}</td>
              <td>{formatPrice(Number(request.viewingFee || 0))}</td>

              <td>
                <span style={statusStyle(request.status)}>
                  {request.status}
                </span>
              </td>

              {showPayment && (
                <td>
                  <span style={statusStyle(request.paymentStatus || "Unpaid")}>
                    {request.paymentStatus || "Unpaid"}
                  </span>
                </td>
              )}

              <td>
                <div style={adminStyles.actionGroup}>
                  {!showPayment && request.status === "Pending" && (
                    <>
                      <button
                        type="button"
                        style={adminStyles.approveButton}
                        onClick={() =>
                          updateRequest(request.id, { status: "Approved" })
                        }
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        style={adminStyles.declineButton}
                        onClick={() =>
                          updateRequest(request.id, { status: "Declined" })
                        }
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {showPayment &&
                    request.status === "Approved" &&
                    request.paymentStatus !== "Paid" && (
                      <button
                        type="button"
                        style={adminStyles.approveButton}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Have you verified that this payment was received?",
                            )
                          ) {
                            updateRequest(request.id, {
                              paymentStatus: "Paid",
                              paidAt: new Date().toLocaleString(),
                            });
                          }
                        }}
                      >
                        Mark as Paid
                      </button>
                    )}

                  {showPayment && request.paymentStatus === "Paid" && (
                    <span style={statusStyle("Paid")}>Payment Received</span>
                  )}

                  {!showPayment && request.status !== "Pending" && (
                    <small style={adminStyles.muted}>No further action</small>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function statusStyle(status) {
  const colors = {
    Pending: { background: "#fff4d6", color: "#8a6500" },
    Approved: { background: "#e7f6ec", color: "#187343" },
    Declined: { background: "#fdebea", color: "#a12b25" },
    Paid: { background: "#e7f6ec", color: "#187343" },
    Unpaid: { background: "#fff4d6", color: "#8a6500" },
    Available: { background: "#e7f6ec", color: "#187343" },
    Sold: { background: "#fdebea", color: "#a12b25" },
    Rented: { background: "#e9e0ce", color: "#715a32" },
    Confirmed: { background: "#e7f6ec", color: "#187343" },
    Completed: { background: "#e9e0ce", color: "#715a32" },
    Cancelled: { background: "#fdebea", color: "#a12b25" },
  };

  return {
    display: "inline-block",
    padding: "6px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    ...(colors[status] || {}),
  };
}

/* =================================
   ADMIN STYLES
================================= */

const adminStyles = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  loginCard: {
    width: "100%",
    maxWidth: 430,
    background: "#fff",
    padding: 38,
    borderRadius: 12,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  },
  brand: {
    fontSize: 24,
    letterSpacing: 3,
    color: "#151515",
    marginBottom: 5,
  },
  muted: {
    color: "#888",
    fontSize: 13,
    lineHeight: 1.6,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 25,
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    border: "1px solid #ddd8ce",
    borderRadius: 5,
    fontSize: 13,
    outline: "none",
    marginBottom: 10,
  },
  primaryButton: {
    padding: 15,
    background: "#171717",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: 700,
    marginTop: 10,
  },
  backButton: {
    border: "none",
    background: "transparent",
    marginTop: 25,
    cursor: "pointer",
    color: "#555",
  },
  dashboard: {
    minHeight: "100vh",
    display: "flex",
    background: "#f5f3ef",
    fontFamily: "Arial, sans-serif",
    color: "#191919",
  },
  sidebar: {
    width: 245,
    flexShrink: 0,
    background: "#171717",
    color: "#fff",
    padding: 25,
    display: "flex",
    flexDirection: "column",
  },
  sidebarCaption: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#b6a078",
    marginTop: 8,
  },
  sideButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "14px 12px",
    marginBottom: 8,
    color: "#ddd",
    background: "transparent",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 13,
  },
  sideButtonActive: {
    background: "#b89b63",
    color: "#171717",
    fontWeight: 700,
  },
  logoutButton: {
    marginTop: "auto",
    padding: 13,
    color: "#fff",
    background: "#333",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  dashboardMain: {
    flex: 1,
    minWidth: 0,
    padding: 30,
    overflowX: "auto",
  },
  dashboardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 30,
  },
  adminBadge: {
    padding: "9px 13px",
    background: "#e9e0ce",
    color: "#715a32",
    borderRadius: 20,
    fontSize: 12,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: 15,
    marginBottom: 25,
  },
  statCard: {
    background: "#fff",
    padding: 22,
    borderRadius: 9,
    border: "1px solid #e8e4dc",
  },
  panel: {
    background: "#fff",
    padding: 24,
    borderRadius: 9,
    marginBottom: 22,
    border: "1px solid #e8e4dc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: 12,
    minWidth: 760,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "13px 0",
    borderBottom: "1px solid #eee",
    fontSize: 13,
  },
  actionGroup: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  approveButton: {
    background: "#187343",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
  },
  declineButton: {
    background: "#a12b25",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
  },
};

/* =================================
   MAIN APPLICATION
================================= */

function App() {
  const [bnbSearch, setBnbSearch] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("All");
  const [bnbCategory, setBnbCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("50000");
  const [selectedBnb, setSelectedBnb] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminPage, setAdminPage] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [managedProperties, setManagedProperties] =
    useState(getManagedProperties);
  const [bnbBookings, setBnbBookings] = useState(getBnbBookings);
  const [adminNotifications, setAdminNotifications] = useState(
    getAdminNotifications,
  );
  const [availabilityBlocks, setAvailabilityBlocks] =
    useState(getBnbAvailability);

  function handleBookingSubmit(booking) {
    setBnbBookings((current) => {
      const updated = [...current, booking];
      saveBnbBookings(updated);
      return updated;
    });

    const notification = {
      id: `booking-${booking.id}`,
      title: "New BNB booking request",
      message: `${booking.customerName} requested ${booking.listingName} for ${booking.checkIn} to ${booking.checkOut}.`,
      bookingReference: booking.bookingReference,
      createdAt: new Date().toLocaleString(),
      read: false,
    };
    setAdminNotifications((current) => {
      const updated = [...current, notification];
      saveAdminNotifications(updated);
      return updated;
    });

    if (
      typeof Notification !== "undefined" &&
      Notification.permission === "granted"
    ) {
      new Notification("ELAN HOMES: New BNB booking", {
        body: `${booking.customerName} · ${booking.listingName} · Ref ${booking.bookingReference}`,
        tag: notification.id,
      });
    }
  }

  function handleMarkNotificationsRead() {
    setAdminNotifications((current) => {
      const updated = current.map((item) => ({ ...item, read: true }));
      saveAdminNotifications(updated);
      return updated;
    });
  }

  function handleUpdateBnbBooking(id, status) {
    const targetBooking = bnbBookings.find((booking) => booking.id === id);
    if (!targetBooking) return;

    if (status === "Confirmed") {
      const blockedConflict = availabilityBlocks.some(
        (block) =>
          Number(block.listingId) === Number(targetBooking.listingId) &&
          datesOverlap(
            targetBooking.checkIn,
            targetBooking.checkOut,
            block.startDate,
            block.endDate,
          ),
      );
      if (blockedConflict) {
        alert(
          "This booking cannot be confirmed because its dates overlap an availability block.",
        );
        return;
      }

      const bookingConflict = bnbBookings.some(
        (booking) =>
          booking.id !== id &&
          Number(booking.listingId) === Number(targetBooking.listingId) &&
          booking.status === "Confirmed" &&
          datesOverlap(
            targetBooking.checkIn,
            targetBooking.checkOut,
            booking.checkIn,
            booking.checkOut,
          ),
      );
      if (bookingConflict) {
        alert(
          "This booking cannot be confirmed because another confirmed booking overlaps these dates.",
        );
        return;
      }
    }

    const updated = bnbBookings.map((booking) =>
      booking.id === id
        ? { ...booking, status, updatedAt: new Date().toLocaleString() }
        : booking,
    );
    setBnbBookings(updated);
    saveBnbBookings(updated);
  }

  function handleSaveAvailability(updatedBlocks) {
    setAvailabilityBlocks(updatedBlocks);
    saveBnbAvailability(updatedBlocks);
  }

  function handleSaveProperties(updatedProperties) {
    setManagedProperties(updatedProperties);
    saveManagedProperties(updatedProperties);
  }

  const filteredStays = useMemo(() => {
    return stays.filter((stay) => {
      const search = bnbSearch.toLowerCase();
      const matchesSearch =
        stay.name.toLowerCase().includes(search) ||
        stay.location.toLowerCase().includes(search) ||
        stay.county.toLowerCase().includes(search);
      const matchesCategory =
        bnbCategory === "All" || stay.type === bnbCategory;
      const matchesPrice = stay.price <= Number(maxPrice);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [bnbSearch, bnbCategory, maxPrice]);

  const filteredProperties = useMemo(() => {
    return managedProperties.filter((property) => {
      const search = propertySearch.toLowerCase();
      const name = (property.name || "").toLowerCase();
      const location = (property.location || "").toLowerCase();
      const matchesSearch = name.includes(search) || location.includes(search);
      const mode = property.listingMode || "Sale";
      const matchesCategory =
        propertyCategory === "All" || mode === propertyCategory;
      const isAvailable = (property.status || "Available") === "Available";
      return matchesSearch && matchesCategory && isAvailable;
    });
  }, [managedProperties, propertySearch, propertyCategory]);

  function scrollToSection(id) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  if (adminPage && !adminLoggedIn) {
    return (
      <AdminLogin
        onLogin={() => setAdminLoggedIn(true)}
        onBack={() => setAdminPage(false)}
      />
    );
  }

  if (adminPage && adminLoggedIn) {
    return (
      <AdminDashboard
        properties={managedProperties}
        onSaveProperties={handleSaveProperties}
        bnbBookings={bnbBookings}
        onUpdateBnbBooking={handleUpdateBnbBooking}
        availabilityBlocks={availabilityBlocks}
        onSaveAvailability={handleSaveAvailability}
        notifications={adminNotifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        onLogout={() => {
          setAdminLoggedIn(false);
          setAdminPage(false);
        }}
      />
    );
  }

  if (selectedListing) {
    return (
      <ListingDetails
        listing={selectedListing}
        onBack={() => setSelectedListing(null)}
        onBookingSubmit={handleBookingSubmit}
        availabilityBlocks={availabilityBlocks}
        bnbBookings={bnbBookings}
      />
    );
  }

  return (
    <div className="app">
      {/* HEADER */}

      <header className="navbar">
        <a href="#home" className="logo">
          ELAN <span>HOMES</span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-open" : ""}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#properties" onClick={() => setMenuOpen(false)}>
            Properties
          </a>
          <a
            href="#bnb-navigator"
            className="bnb-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            ✦ BNB
          </a>
          <a href="#track-booking" onClick={() => setMenuOpen(false)}>
            Track Booking
          </a>
          <a href="#land" onClick={() => setMenuOpen(false)}>
            Land
          </a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>
            Testimonials
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <button
          className="nav-button"
          onClick={() => scrollToSection("bnb-navigator")}
        >
          Explore Stays
        </button>
      </header>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">EXCEPTIONAL LIVING STARTS HERE</p>
          <h1>
            Discover a Place
            <br />
            You'll Love to <span>Call Home.</span>
          </h1>
          <p className="hero-description">
            Discover exceptional properties, luxury accommodation and real
            estate investment opportunities across Kenya.
          </p>

          <div className="hero-actions">
            <button
              className="hero-button"
              onClick={() => scrollToSection("properties")}
            >
              Explore Properties →
            </button>
            <button
              className="hero-outline-button"
              onClick={() => scrollToSection("bnb-navigator")}
            >
              Discover BnBs
            </button>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="intro-strip">
        <div>
          <strong>47</strong>
          <span>Counties to Explore</span>
        </div>
        <div>
          <strong>Properties</strong>
          <span>Buy and Rent</span>
        </div>
        <div>
          <strong>BNB</strong>
          <span>Discover Beautiful Stays</span>
        </div>
        <div>
          <strong>ELAN HOMES</strong>
          <span>Real Estate & Lifestyle</span>
        </div>
      </section>

      {/* PROPERTIES */}

      <section className="properties" id="properties">
        <div className="section-heading">
          <p className="eyebrow">OUR PROPERTY COLLECTION</p>
          <h2>Find Your Dream Property</h2>
          <p>
            Explore exceptional houses, apartments and investment opportunities
            across Kenya.
          </p>
        </div>
        <div className="property-filters">
          <input
            type="search"
            placeholder="Search property name or location..."
            value={propertySearch}
            onChange={(e) => setPropertySearch(e.target.value)}
          />

          <select
            value={propertyCategory}
            onChange={(e) => setPropertyCategory(e.target.value)}
          >
            <option value="All">All Properties</option>
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>

        <div className="property-results-count">
          {filteredProperties.length} available properties found
        </div>
        <div className="property-grid">
          {filteredProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <div className="property-image">
                <img src={property.image} alt={property.name} />
                <span className="property-label">{property.type}</span>
              </div>
              <div className="property-info">
                <h3>{property.name}</h3>
                <p>⌖ {property.location}</p>
                <p>{property.bedrooms} Bedrooms</p>
                <strong>
                  {formatPrice(property.price)}
                  {property.listingMode === "Rent" && " / month"}
                </strong>

                <p>
                  Status: <strong>{property.status || "Available"}</strong>
                </p>

                <button
                  className="dark-button"
                  onClick={() =>
                    setSelectedListing({
                      ...property,
                      listingCategory:
                        property.listingMode === "Rent"
                          ? "Property for Rent"
                          : "Property for Sale",
                      priceLabel:
                        formatPrice(property.price) +
                        (property.listingMode === "Rent" ? " / month" : ""),
                      description:
                        property.description ||
                        "Contact ELAN HOMES for more information about this property.",
                    })
                  }
                >
                  View Property →
                </button>
                {property.status && property.status !== "Available" && (
                  <p className="property-unavailable">
                    This property is currently {property.status.toLowerCase()}.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try another property name, location or category.</p>
            <button
              className="outline-button"
              onClick={() => {
                setPropertySearch("");
                setPropertyCategory("All");
              }}
            >
              Reset Property Filters
            </button>
          </div>
        )}

        <div className="center-action">
          <button
            className="outline-button"
            onClick={() => alert("Full property directory coming soon.")}
          >
            View All Properties →
          </button>
        </div>
      </section>

      {/* BNB */}

      <section className="bnb-navigator" id="bnb-navigator">
        <div className="section-heading">
          <p className="eyebrow">EXCEPTIONAL SHORT STAYS</p>
          <h2>Discover Our BNBs</h2>
          <p>
            Discover exceptional apartments, villas, cottages and holiday homes
            throughout Kenya.
          </p>
        </div>

        <div className="bnb-search">
          <div className="search-field">
            <label>DESTINATION</label>
            <input
              type="search"
              placeholder="Search Nairobi, Diani, Naivasha..."
              value={bnbSearch}
              onChange={(e) => {
                setBnbSearch(e.target.value);
                setSelectedBnb(null);
              }}
            />
          </div>

          <div className="search-field">
            <label>ACCOMMODATION TYPE</label>
            <select
              value={bnbCategory}
              onChange={(e) => {
                setBnbCategory(e.target.value);
                setSelectedBnb(null);
              }}
            >
              <option value="All">All Accommodation</option>
              <option value="Apartment">Apartments</option>
              <option value="Villa">Villas</option>
              <option value="Cottage">Cottages</option>
              <option value="Holiday Home">Holiday Homes</option>
            </select>
          </div>

          <div className="search-field">
            <label>PRICE PER NIGHT</label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="50000">All Prices</option>
              <option value="5000">Up to KSh 5,000</option>
              <option value="10000">Up to KSh 10,000</option>
              <option value="15000">Up to KSh 15,000</option>
              <option value="20000">Up to KSh 20,000</option>
              <option value="30000">Up to KSh 30,000</option>
            </select>
          </div>

          <button
            className="bnb-search-button"
            onClick={() =>
              document
                .getElementById("bnb-results")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Search Stays →
          </button>
        </div>

        <div className="bnb-results-heading" id="bnb-results">
          <div>
            <h3>Explore Our BNBs</h3>
            <p>{filteredStays.length} accommodation options found</p>
          </div>

          <button
            className="reset-button"
            onClick={() => {
              setBnbSearch("");
              setBnbCategory("All");
              setMaxPrice("50000");
              setSelectedBnb(null);
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="stay-grid">
          {filteredStays.map((stay) => (
            <article className="stay-card" key={stay.id}>
              <div className="stay-image">
                <img src={stay.image} alt={stay.name} />
                <span className="bnb-category">{stay.type}</span>
              </div>

              <div className="stay-info">
                <h3>{stay.name}</h3>
                <p>⌖ {stay.location}</p>

                <div className="stay-details">
                  <span>♙ {stay.guests} Guests</span>
                  <span>▣ {stay.bedrooms} Bedrooms</span>
                </div>

                <strong>{formatPrice(stay.price)} / night</strong>

                <button
                  className="dark-button"
                  onClick={() =>
                    setSelectedListing({
                      ...stay,
                      listingCategory: "BNB",
                      priceLabel: formatPrice(stay.price),
                      description:
                        "Explore this BNB stay with ELAN HOMES. Contact our team for availability, pricing and booking arrangements.",
                    })
                  }
                >
                  View Accommodation →
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredStays.length === 0 && (
          <div className="no-results">
            <h3>No accommodation found</h3>
            <p>Try another destination, accommodation type or price range.</p>
          </div>
        )}

        {selectedBnb && (
          <div className="bnb-details" id="bnb-details">
            <button
              className="close-details"
              onClick={() => setSelectedBnb(null)}
            >
              ✕ Close
            </button>
            <div className="bnb-details-layout">
              <img src={selectedBnb.image} alt={selectedBnb.name} />
              <div className="bnb-details-content">
                <p className="eyebrow">ACCOMMODATION DETAILS</p>
                <h2>{selectedBnb.name}</h2>
                <p>{selectedBnb.location}</p>
                <p>{selectedBnb.description}</p>
                <h3>Facilities</h3>
                <div className="facility-list">
                  {selectedBnb.facilities.map((facility) => (
                    <span key={facility}>{facility}</span>
                  ))}
                </div>
                <p>
                  {selectedBnb.bedrooms} Bedrooms · {selectedBnb.bathrooms}{" "}
                  Bathrooms · {selectedBnb.guests} Guests
                </p>
                <strong>{formatPrice(selectedBnb.price)} / night</strong>
                <p className="coming-soon">
                  Online reservations will be available after the booking system
                  is developed.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* LAND */}

      <section className="land-section" id="land">
        <div className="section-heading">
          <p className="eyebrow">INVEST IN LAND</p>
          <h2>Find Land Across Kenya</h2>
          <p>
            Explore residential, agricultural and investment land opportunities.
          </p>
        </div>

        <div className="land-grid">
          {landListings.map((land) => (
            <article className="land-card" key={land.id}>
              <img src={land.image} alt={land.name} />
              <div>
                <h3>{land.name}</h3>
                <p>{land.location}</p>
                <p>Land size: {land.size}</p>
                <strong>{land.price}</strong>

                <button
                  className="dark-button"
                  onClick={() =>
                    setSelectedListing({
                      ...land,
                      listingCategory: "Land for Sale",
                      priceLabel: land.price,
                      description:
                        "Explore this land investment opportunity through ELAN HOMES. Contact our team for more information and viewing arrangements.",
                    })
                  }
                >
                  Explore Land →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="testimonials" id="testimonials">
        <div className="section-heading">
          <p className="eyebrow">CUSTOMER EXPERIENCES</p>
          <h2>What People Say About Us</h2>
          <p>
            Building trust through exceptional property and accommodation
            experiences.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((review, index) => (
            <article className="testimonial-card" key={index}>
              <div className="stars">{"★".repeat(review.rating)}</div>
              <p>"{review.review}"</p>
              <h3>{review.name}</h3>
              <span>{review.role}</span>
              <small>Illustrative review</small>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      <section className="about" id="about">
        <div className="about-content">
          <p className="eyebrow">ABOUT ELAN HOMES</p>
          <h2>
            More Than Just Property.
            <br />A Better Way of Living.
          </h2>

          <p>
            ELAN HOMES is a Kenyan property and accommodation marketplace
            connecting people with exceptional homes, land, commercial
            opportunities and short-stay experiences.
          </p>

          <p>
            Our vision is to make discovering property and accommodation across
            Kenya simple, convenient and inspiring.
          </p>

          <button
            className="hero-button"
            onClick={() => scrollToSection("contact")}
          >
            Connect With Us →
          </button>
        </div>
      </section>

      {/* CUSTOMER BOOKING TRACKER */}
      <BookingTracker bookings={bnbBookings} />

      {/* FOOTER */}

      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div>
            <h2 className="footer-logo">
              ELAN <span>HOMES</span>
            </h2>
            <p>Real Estate · Luxury Stays · Property Management</p>
            <p>Discover exceptional living across Kenya.</p>
          </div>

          <div>
            <h3>Explore</h3>
            <a href="#properties">Properties</a>
            <a href="#bnb-navigator">BNB</a>
            <a href="#land">Land</a>
          </div>

          <div>
            <h3>Company</h3>
            <a href="#about">About Us</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h3>Our Market</h3>
            <p>All 47 Counties</p>
            <p>Kenya</p>
          </div>

          <div>
            <h3>Management</h3>
            <button
              onClick={() => {
                setAdminPage(true);
                setSelectedListing(null);
              }}
              style={{
                background: "transparent",
                border: "1px solid #b89b63",
                color: "#b89b63",
                padding: "10px 15px",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              Admin Login →
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ELAN HOMES. All Rights Reserved.</p>
          <p>Designed for exceptional living.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
