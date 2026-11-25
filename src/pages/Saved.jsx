import { useState } from "react";
import { Link } from "react-router-dom";
import properties from "../data/properties";
import landListings from "../data/land";
import stays from "../data/stays";
import { getSavedListings, toggleSavedListing } from "../utils/savedListings";
import SEO from "../components/SEO";
import "./Saved.css";

export default function Saved() {
  const [savedListings, setSavedListings] = useState(() => getSavedListings());

  const [activeTab, setActiveTab] = useState("properties");

  // GET SAVED PROPERTIES
  const savedProperties = savedListings
    .filter((item) => item.type === "property")
    .map((item) => properties.find((property) => property.id === item.id))
    .filter(Boolean);

  // GET SAVED LAND
  const savedLand = savedListings
    .filter((item) => item.type === "land")
    .map((item) => landListings.find((land) => land.id === item.id))
    .filter(Boolean);

  // GET SAVED HOLIDAY STAYS
  const savedStays = savedListings
    .filter((item) => item.type === "stay")
    .map((item) => stays.find((stay) => stay.id === item.id))
    .filter(Boolean);

  // SELECT ACTIVE CATEGORY
  const currentListings =
    activeTab === "properties"
      ? savedProperties
      : activeTab === "land"
        ? savedLand
        : savedStays;

  // REMOVE SAVED LISTING
  const handleRemove = (type, id) => {
    const updatedListings = toggleSavedListing(type, id);
    setSavedListings(updatedListings);
  };

  // FORMAT PROPERTY PRICE
  const formatPropertyPrice = (price) =>
    `KSh ${(Number(price) / 1000000).toLocaleString("en-KE", {
      maximumFractionDigits: 1,
    })}M`;

  // FORMAT LAND PRICE
  const formatLandPrice = (price) => {
    const amount = Number(price);

    if (!Number.isFinite(amount)) return "Price on request";

    if (amount >= 1000000) {
      return `KSh ${(amount / 1000000).toLocaleString("en-KE", {
        maximumFractionDigits: 2,
      })}M`;
    }

    return `KSh ${amount.toLocaleString("en-KE")}`;
  };

  // FORMAT STAY PRICE
  const formatStayPrice = (price) =>
    `KSh ${Number(price).toLocaleString("en-KE")} / night`;

  // CATEGORY DETAILS
  const getListingDetails = (listing) => {
    if (activeTab === "properties") {
      return {
        name: listing.name,
        category: "PROPERTY",
        type: listing.type || "Property",
        location: listing.location,
        image: listing.image || listing.gallery?.[0],
        features: [
          listing.bedrooms ? `${listing.bedrooms} Bedrooms` : null,
          listing.bathrooms ? `${listing.bathrooms} Bathrooms` : null,
        ].filter(Boolean),
        price: formatPropertyPrice(listing.price),
        link: `/properties/${listing.id}`,
        savedType: "property",
      };
    }

    if (activeTab === "land") {
      return {
        name: listing.name || listing.title,
        category: "LAND",
        type: listing.type || listing.landType || "Land",
        location: listing.location,
        image: listing.image || listing.gallery?.[0],
        features: [
          listing.size || listing.area || listing.landSize || null,
          listing.zoning || listing.landUse || null,
        ].filter(Boolean),
        price: formatLandPrice(listing.price),
        link: `/land/${listing.id}`,
        savedType: "land",
      };
    }

    return {
      name: listing.name,
      category: "HOLIDAY STAY",
      type: listing.type || "Stay",
      location: listing.location,
      image: listing.image || listing.gallery?.[0],
      features: [
        listing.guests ? `${listing.guests} Guests` : null,
        listing.bedrooms ? `${listing.bedrooms} Bedrooms` : null,
      ].filter(Boolean),
      price: formatStayPrice(listing.price),
      link: `/stays/${listing.id}`,
      savedType: "stay",
    };
  };

  const emptyState = {
    properties: {
      title: "No Saved Properties Yet",
      description:
        "Explore our property collection and save the homes you love.",
      link: "/properties",
      button: "Explore Properties",
    },
    land: {
      title: "No Saved Land Yet",
      description:
        "Explore available land listings and save the plots that interest you.",
      link: "/land",
      button: "Explore Land",
    },
    stays: {
      title: "No Saved Holiday Stays Yet",
      description:
        "Discover beautiful holiday destinations and save your favourite stays.",
      link: "/stays",
      button: "Explore Holiday Stays",
    },
  };

  const empty = emptyState[activeTab];

  return (
    <main className="saved-page">
      <SEO
        title="My Saved Listings | ÉLAN HOMES"
        description="Keep your favourite Kenyan properties, land listings and holiday stays together. View and manage your saved ÉLAN HOMES listings."
        noindex={true}
      />

      {/* PAGE HEADER */}
      <section className="saved-hero">
        <div className="saved-hero-content">
          <span>YOUR ÉLAN HOMES COLLECTION</span>
          <h1>Saved Listings</h1>
          <p>Keep track of the properties, land and holiday stays you love.</p>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <section className="saved-container">
        <div className="saved-heading">
          <div>
            <span className="saved-label">YOUR COLLECTION</span>
            <h2>Your Favourite Listings</h2>
            <p>
              Your saved properties, land and holiday accommodation in one
              place.
            </p>
          </div>

          <div className="saved-total">
            <strong>{savedListings.length}</strong>
            <span>Saved Listings</span>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="saved-tabs">
          <button
            type="button"
            className={activeTab === "properties" ? "active" : ""}
            onClick={() => setActiveTab("properties")}
          >
            Properties ({savedProperties.length})
          </button>

          <button
            type="button"
            className={activeTab === "land" ? "active" : ""}
            onClick={() => setActiveTab("land")}
          >
            Land ({savedLand.length})
          </button>

          <button
            type="button"
            className={activeTab === "stays" ? "active" : ""}
            onClick={() => setActiveTab("stays")}
          >
            Holiday Stays ({savedStays.length})
          </button>
        </div>

        {/* SAVED LISTINGS */}
        {currentListings.length > 0 ? (
          <div className="saved-grid">
            {currentListings.map((listing) => {
              const details = getListingDetails(listing);

              return (
                <article
                  className="saved-card"
                  key={`${details.savedType}-${listing.id}`}
                >
                  <div className="saved-card-image">
                    {details.image ? (
                      <img
                        src={details.image}
                        alt={details.name}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="saved-card-no-image">
                        Image unavailable
                      </div>
                    )}

                    <span className="saved-card-category">
                      {details.category}
                    </span>
                  </div>

                  <div className="saved-card-content">
                    <span className="saved-card-type">{details.type}</span>

                    <h3>{details.name}</h3>

                    <p className="saved-card-location">
                      <span>⌖</span> {details.location}
                    </p>

                    <div className="saved-card-features">
                      {details.features.length > 0 ? (
                        details.features.map((feature, index) => (
                          <span key={`${listing.id}-${index}`}>{feature}</span>
                        ))
                      ) : (
                        <span>Listing details available</span>
                      )}
                    </div>

                    <div className="saved-card-bottom">
                      <strong className="saved-card-price">
                        {details.price}
                      </strong>

                      <button
                        type="button"
                        className="saved-remove-btn"
                        onClick={() =>
                          handleRemove(details.savedType, listing.id)
                        }
                        aria-label={`Remove ${details.name} from saved listings`}
                      >
                        ♥ Remove
                      </button>
                    </div>

                    <Link to={details.link} className="saved-view-btn">
                      View Details ↗
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="saved-empty">
            <div className="saved-empty-icon">♡</div>

            <h3>{empty.title}</h3>

            <p>{empty.description}</p>

            <Link to={empty.link} className="saved-explore-btn">
              {empty.button}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
