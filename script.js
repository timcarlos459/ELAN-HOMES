const properties = [
  {
    name: "Luxury Family Home",
    price: "KSh 25,000,000",
    location: "Nairobi, Kenya",
  },
  {
    name: "Modern Villa",
    price: "KSh 45,000,000",
    location: "Karen, Nairobi",
  },
  {
    name: "Executive Apartment",
    price: "KSh 12,000,000",
    location: "Kilimani, Nairobi",
  },
];

const propertyList = document.getElementById("property-list");

properties.forEach((property) => {
  propertyList.innerHTML += `
        <div class="property-card">
            <h3>${property.name}</h3>
            <p>${property.location}</p>
            <strong>${property.price}</strong>
        </div>
    `;
});

// eslint-disable-next-line no-unused-vars
function exploreProperties() {
  document.querySelector(".properties").scrollIntoView({
    behavior: "smooth",
  });
}
