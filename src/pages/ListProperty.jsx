import { useState } from "react";
import SEO from "../components/SEO";
import contactDetails from "../data/contact";
import "./ListProperty.css";

export default function ListProperty() {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyName: "",
    location: "",
    propertyType: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SELECT PROPERTY PHOTOS
  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validImages = selectedFiles.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024,
    );

    if (selectedFiles.length !== validImages.length) {
      alert("Only images up to 5MB each are accepted.");
    }

    const remainingSlots = Math.max(0, 10 - images.length);
    const filesToRead = validImages.slice(0, remainingSlots);

    if (validImages.length > remainingSlots) {
      alert("You can select a maximum of 10 photos.");
    }

    const imagePreviews = await Promise.all(
      filesToRead.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = () => {
              resolve({
                file,
                preview: reader.result,
              });
            };

            reader.onerror = () => resolve(null);

            reader.readAsDataURL(file);
          }),
      ),
    );

    setImages((previousImages) =>
      [...previousImages, ...imagePreviews.filter(Boolean)].slice(0, 10),
    );

    e.target.value = "";
  };

  // REMOVE SELECTED PHOTO
  const removeImage = (indexToRemove) => {
    setImages((previousImages) =>
      previousImages.filter((_, index) => index !== indexToRemove),
    );
  };

  // SUBMIT PROPERTY ENQUIRY
  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `ELAN HOMES - NEW PROPERTY LISTING

PROPERTY OWNER DETAILS

Name: ${formData.ownerName}
Phone: ${formData.phone}
Email: ${formData.email}

PROPERTY DETAILS

Property Name: ${formData.propertyName}
Location: ${formData.location}
Property Type: ${formData.propertyType}
Asking Price: ${formData.price}
Bedrooms: ${formData.bedrooms}
Bathrooms: ${formData.bathrooms}

PROPERTY PHOTOS

Number of photos selected: ${images.length}
Photos will be shared separately during the listing process.

DESCRIPTION:

${formData.description}

I would like to list this property with ELAN HOMES. Please contact me regarding the listing process.`;

    window.open(
      `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className="list-property-page">
      <SEO
        title="List Your Property in Kenya | Partner with ÉLAN HOMES"
        description="List your house, apartment, villa, commercial property, land or holiday accommodation with ÉLAN HOMES. Submit your property details and connect with potential buyers and guests across Kenya."
      />

      {/* HERO */}
      <section className="list-property-hero">
        <div className="list-property-hero-content">
          <span>ELAN HOMES PROPERTY PARTNERS</span>

          <h1>List Your Property With Us.</h1>

          <p>
            Connect your property with buyers, tenants and travellers through
            ELAN HOMES.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="list-property-intro">
        <span className="list-property-eyebrow">PROPERTY OWNERS</span>

        <h2>Let's Showcase Your Property</h2>

        <p>
          Whether you own a residential home, apartment, land, commercial
          property or holiday accommodation, ELAN HOMES welcomes property
          listing enquiries.
        </p>
      </section>

      {/* LISTING FORM */}
      <section className="list-property-main">
        {/* LEFT INFORMATION */}
        <div className="list-property-info">
          <span className="list-property-eyebrow">WHY ELAN HOMES?</span>

          <h2>Reach the Right Audience.</h2>

          <p>
            We help property owners showcase their properties to potential
            buyers, renters and holiday guests.
          </p>

          <div className="listing-benefit">
            <span>01</span>

            <div>
              <h3>Property Exposure</h3>
              <p>
                Showcase your property to people searching for real estate and
                accommodation.
              </p>
            </div>
          </div>

          <div className="listing-benefit">
            <span>02</span>

            <div>
              <h3>Professional Presentation</h3>
              <p>
                Present your property with detailed information and professional
                listing presentation.
              </p>
            </div>
          </div>

          <div className="listing-benefit">
            <span>03</span>

            <div>
              <h3>Enquiry Management</h3>
              <p>
                Connect with potential buyers, tenants and holiday accommodation
                customers.
              </p>
            </div>
          </div>
        </div>

        {/* PROPERTY FORM */}
        <div className="list-property-form-container">
          <span className="list-property-eyebrow">SUBMIT YOUR PROPERTY</span>

          <h2>Property Listing Enquiry</h2>

          <p>Complete the details below to begin your listing enquiry.</p>

          <form className="list-property-form" onSubmit={handleSubmit}>
            {/* OWNER INFORMATION */}
            <h3>Owner Information</h3>

            <input
              type="text"
              name="ownerName"
              placeholder="Full Name"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />

            <div className="list-property-form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PROPERTY INFORMATION */}
            <h3>Property Information</h3>

            <input
              type="text"
              name="propertyName"
              placeholder="Property Name"
              value={formData.propertyName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Property Location (Town / Area)"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Maisonette">Maisonette</option>
              <option value="Commercial Property">Commercial Property</option>
              <option value="Land">Land</option>
              <option value="Holiday Accommodation">
                Holiday Accommodation
              </option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="price"
              placeholder="Asking Price / Rental Price (KSh)"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <div className="list-property-form-row">
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
              />

              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                min="0"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>

            {/* PROPERTY PHOTO UPLOAD */}
            <h3>Property Photos</h3>

            <div className="property-image-upload">
              <label htmlFor="property-images">
                <span className="upload-icon">＋</span>

                <strong>Choose Property Photos</strong>

                <small>
                  Select up to 10 images · JPG, PNG or WEBP · Maximum 5MB each
                </small>
              </label>

              <input
                id="property-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              <p className="image-count">
                {images.length} of 10 photos selected
              </p>

              {/* IMAGE PREVIEWS */}
              {images.length > 0 && (
                <div className="property-image-previews">
                  {images.map((image, index) => (
                    <div
                      className="property-image-preview"
                      key={`${image.file.name}-${index}`}
                    >
                      <img
                        src={image.preview}
                        alt={`Property preview ${index + 1}`}
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PROPERTY DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Describe your property, its features, amenities and other important details..."
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
            />

            {/* SUBMIT */}
            <button type="submit">Submit Property Enquiry ↗</button>

            <small>
              Your submission will open WhatsApp with your property details
              ready to send. Selected photos are not attached automatically.
            </small>
          </form>
        </div>
      </section>
    </main>
  );
}
