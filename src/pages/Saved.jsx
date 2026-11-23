import { useState } from "react";
import { Link } from "react-router-dom";
import properties from "../data/properties";
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

  // GET SAVED HOLIDAY STAYS
  const savedStays = savedListings
    .filter((item) => item.type === "stay")
    .map((item) => stays.find((stay) => stay.id === item.id))
    .filter(Boolean);

  const currentListings =
    activeTab === "properties" ? savedProperties : savedStays;

  // REMOVE SAVED LISTING
  const handleRemove = (type, id) => {
    const updatedListings = toggleSavedListing(type, id);
    setSavedListings(updatedListings);
  };

  // FORMAT PROPERTY PRICE
  const formatPropertyPrice = (price) =>
    `KSh ${(price / 1000000).toLocaleString("en-KE", {
      maximumFractionDigits: 1,
    })}M`;

  // FORMAT STAY PRICE
  const formatStayPrice = (price) =>
    `KSh ${price.toLocaleString("en-KE")} / night`;

  return (
    <main className="saved-page">
      <SEO
        title="My Saved Listings | ÉLAN HOMES"
        description="Keep your favourite Kenyan properties for sale and holiday stays together. View and manage your saved ÉLAN HOMES listings."
        noindex={true}
      />

      {/* PAGE HEADER */}
      <section className="saved-hero">
        <div className="saved-hero-content">
          <span>YOUR ELAN HOMES COLLECTION</span>
          <h1>Saved Listings</h1>
          <p>Keep track of the properties and holiday stays you love.</p>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <section className="saved-container">
        {/* PAGE INTRO */}
        <div className="saved-heading">
          <div>
            <span className="saved-label">YOUR COLLECTION</span>
            <h2>Your Favourite Listings</h2>
            <p>
              All your saved properties and holiday accommodation in one place.
            </p>
          </div>

          <div className="saved-total">
            <strong>{savedListings.length}</strong>
            <span>Saved Listings</span>
          </div>
        </div>

        {/* TABS */}
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
            className={activeTab === "stays" ? "active" : ""}
            onClick={() => setActiveTab("stays")}
          >
            Holiday Stays ({savedStays.length})
          </button>
        </div>

        {/* LISTINGS */}
        {currentListings.length > 0 ? (
          <div className="saved-grid">
            {currentListings.map((listing) => {
              const isProperty = activeTab === "properties";

              const listingType = isProperty ? "property" : "stay";

              const detailsLink = isProperty
                ? `/properties/${listing.id}`
                : `/stays/${listing.id}`;

              const image = listing.image || listing.gallery?.[0];

              return (
                <article
                  className="saved-card"
                  key={`${listingType}-${listing.id}`}
                >
                  {/* IMAGE */}
                  <div className="saved-card-image">
                    <img
                      src={image}
                      alt={listing.name}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="saved-card-category">
                      {isProperty ? "PROPERTY" : "HOLIDAY STAY"}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="saved-card-content">
                    <span className="saved-card-type">{listing.type}</span>

                    <h3>{listing.name}</h3>

                    <p className="saved-card-location">
                      <span>⌖</span> {listing.location}
                    </p>

                    {/* FEATURES */}
                    <div className="saved-card-features">
                      {isProperty ? (
                        <>
                          <span>{listing.bedrooms} Bedrooms</span>
                          <span>{listing.bathrooms} Bathrooms</span>
                        </>
                      ) : (
                        <>
                          <span>{listing.guests} Guests</span>
                          <span>{listing.bedrooms} Bedrooms</span>
                        </>
                      )}
                    </div>

                    {/* PRICE */}
                    <div className="saved-card-bottom">
                      <strong className="saved-card-price">
                        {isProperty
                          ? formatPropertyPrice(listing.price)
                          : formatStayPrice(listing.price)}
                      </strong>

                      <button
                        type="button"
                        className="saved-remove-btn"
                        onClick={() => handleRemove(listingType, listing.id)}
                        aria-label={`Remove ${listing.name} from saved listings`}
                      >
                        ♥ Remove
                      </button>
                    </div>

                    {/* VIEW DETAILS */}
                    <Link to={detailsLink} className="saved-view-btn">
                      View Details ↗
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="saved-empty">
            <div className="saved-empty-icon">♡</div>

            <h3>
              {activeTab === "properties"
                ? "No Saved Properties Yet"
                : "No Saved Holiday Stays Yet"}
            </h3>

            <p>
              {activeTab === "properties"
                ? "Explore our property collection and save the homes you love."
                : "Discover beautiful holiday destinations and save your favourite stays."}
            </p>

            <Link
              to={activeTab === "properties" ? "/properties" : "/stays"}
              className="saved-explore-btn"
            >
              {activeTab === "properties"
                ? "Explore Properties"
                : "Explore Holiday Stays"}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
