import { useState } from "react";
import SEO from "../components/SEO";
import contactDetails from "../data/contact";
import "./ListProperty.css";

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
  const [imageError, setImageError] = useState("");

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // SELECT PROPERTY PHOTOS
  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setImageError("");

    const validImages = selectedFiles.filter(
      (file) =>
        ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE,
    );

    if (selectedFiles.length !== validImages.length) {
      setImageError(
        "Some files were rejected. Please select JPG, PNG or WEBP images up to 5MB each.",
      );
    }

    const remainingSlots = Math.max(0, MAX_IMAGES - images.length);
    const filesToRead = validImages.slice(0, remainingSlots);

    if (validImages.length > remainingSlots) {
      setImageError("You can select a maximum of 10 property photos.");
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
      [...previousImages, ...imagePreviews.filter(Boolean)].slice(
        0,
        MAX_IMAGES,
      ),
    );

    // Allow the same file to be selected again later.
    e.target.value = "";
  };

  // REMOVE SELECTED PHOTO
  const removeImage = (indexToRemove) => {
    setImages((previousImages) =>
      previousImages.filter((_, index) => index !== indexToRemove),
    );

    setImageError("");
  };

  // SUBMIT PROPERTY ENQUIRY
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contactDetails.whatsappNumber) {
      alert("Our WhatsApp contact is currently unavailable.");
      return;
    }

    const message = `ELAN HOMES - NEW PROPERTY LISTING ENQUIRY

OWNER INFORMATION

Name: ${formData.ownerName}
Phone: ${formData.phone}
Email: ${formData.email}

PROPERTY INFORMATION

Property Name: ${formData.propertyName}
Location: ${formData.location}
Property Type: ${formData.propertyType}
Asking Price: KSh ${formData.price}
Bedrooms: ${formData.bedrooms || "Not specified"}
Bathrooms: ${formData.bathrooms || "Not specified"}

PROPERTY PHOTOS

Number of photos selected: ${images.length}

Note: Photos will be shared separately during the listing review process.

PROPERTY DESCRIPTION

${formData.description}

LISTING POLICY

I understand that submitting a property listing is free. My property will be reviewed by ELAN HOMES and will only appear publicly after approval.

I would like to begin the property listing process. Please contact me with the next steps.`;

    const whatsappUrl = `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="list-property-page">
      <SEO
        title="List Your Property in Kenya | Partner with ÉLAN HOMES"
        description="Submit your house, apartment, villa, townhouse or commercial property for sale with ÉLAN HOMES. Property listing submissions are free and subject to approval."
      />

      {/* HERO */}
      <section className="list-property-hero">
        <div className="list-property-hero-content">
          <span>ELAN HOMES PROPERTY PARTNERS</span>

          <h1>List Your Property With Us.</h1>

          <p>
            Showcase your property to buyers searching for real estate
            opportunities across Kenya.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="list-property-intro">
        <span className="list-property-eyebrow">PROPERTY OWNERS</span>

        <h2>Let's Showcase Your Property</h2>

        <p>
          Whether you own a residential house, apartment, villa, townhouse or
          commercial property, ELAN HOMES welcomes property listing submissions.
        </p>

        <div className="list-property-policy-notice">
          <strong>FREE PROPERTY LISTING SUBMISSION</strong>

          <p>
            Submitting your property is free. Every listing is reviewed and must
            be approved by ELAN HOMES before appearing publicly. Optional paid
            promotion may be available for approved properties.
          </p>
        </div>
      </section>

      {/* LISTING FORM */}
      <section className="list-property-main">
        {/* LEFT INFORMATION */}
        <div className="list-property-info">
          <span className="list-property-eyebrow">WHY ELAN HOMES?</span>

          <h2>Reach the Right Audience.</h2>

          <p>
            We help property owners showcase their properties to potential
            buyers through a professionally presented property marketplace.
          </p>

          <div className="listing-benefit">
            <span>01</span>

            <div>
              <h3>Property Exposure</h3>

              <p>
                Showcase your property to people searching for homes and real
                estate opportunities.
              </p>
            </div>
          </div>

          <div className="listing-benefit">
            <span>02</span>

            <div>
              <h3>Professional Presentation</h3>

              <p>
                Present your property with detailed descriptions, photographs
                and important specifications.
              </p>
            </div>
          </div>

          <div className="listing-benefit">
            <span>03</span>

            <div>
              <h3>Enquiry Management</h3>

              <p>
                Receive enquiries through the ELAN HOMES communication system.
              </p>
            </div>
          </div>

          <div className="listing-benefit">
            <span>04</span>

            <div>
              <h3>Optional Property Promotion</h3>

              <p>
                Approved property listings may qualify for optional paid
                promotional placement.
              </p>
            </div>
          </div>
        </div>

        {/* PROPERTY FORM */}
        <div className="list-property-form-container">
          <span className="list-property-eyebrow">SUBMIT YOUR PROPERTY</span>

          <h2>Property Listing Enquiry</h2>

          <p>
            Complete the details below to begin your property listing
            submission.
          </p>

          <form className="list-property-form" onSubmit={handleSubmit}>
            {/* OWNER INFORMATION */}
            <h3>Owner Information</h3>

            <input
              type="text"
              name="ownerName"
              placeholder="Full Name"
              value={formData.ownerName}
              onChange={handleChange}
              autoComplete="name"
              maxLength={100}
              required
            />

            <div className="list-property-form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                maxLength={20}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={150}
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
              maxLength={120}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Property Location (Town / Area)"
              value={formData.location}
              onChange={handleChange}
              maxLength={150}
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
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Asking Price (KSh)"
              value={formData.price}
              onChange={handleChange}
              min="1"
              step="1"
              required
            />

            <div className="list-property-form-row">
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                min="0"
                step="1"
                value={formData.bedrooms}
                onChange={handleChange}
              />

              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                min="0"
                step="1"
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
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
              />

              <p className="image-count">
                {images.length} of 10 photos selected
              </p>

              {imageError && (
                <p className="image-error" role="alert">
                  {imageError}
                </p>
              )}

              {/* IMAGE PREVIEWS */}
              {images.length > 0 && (
                <div className="property-image-previews">
                  {images.map((image, index) => (
                    <div
                      className="property-image-preview"
                      key={`${image.file.name}-${image.file.lastModified}-${index}`}
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
            <h3>Property Description</h3>

            <textarea
              name="description"
              placeholder="Describe your property, its features, amenities, condition and other important details..."
              rows="6"
              value={formData.description}
              onChange={handleChange}
              maxLength={3000}
              required
            />

            {/* LISTING POLICY */}
            <div className="list-property-submission-notice">
              <strong>Before submitting</strong>

              <p>
                Property listing submission is free. Your details will be
                reviewed by ELAN HOMES. Submission does not guarantee
                publication. Only approved listings will appear on the website.
              </p>
            </div>

            {/* SUBMIT */}
            <button type="submit">Submit Property Enquiry ↗</button>

            <small>
              This currently opens WhatsApp with your property details. Selected
              photos are not attached automatically. A secure owner listing
              portal and photo upload system will be introduced separately.
            </small>
          </form>
        </div>
      </section>
    </main>
  );
}
