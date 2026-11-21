const stays = [
  // =====================================
  // COASTAL REGION
  // =====================================

  {
    id: 1,
    name: "Luxury Beachfront Villa",
    location: "Diani Beach, Kwale",
    region: "Coastal Region",
    destination: "Kwale",
    type: "Villa",
    price: 18000,
    currency: "KES",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    ],
    description:
      "A beautiful holiday villa offering a relaxing coastal escape with spacious interiors and a luxurious atmosphere.",
    amenities: [
      "Swimming Pool",
      "Wi-Fi",
      "Air Conditioning",
      "Kitchen",
      "Beach Access",
      "Parking",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 2,
    name: "Mombasa Luxury Apartment",
    location: "Nyali, Mombasa",
    region: "Coastal Region",
    destination: "Mombasa",
    type: "Apartment",
    price: 9500,
    currency: "KES",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    ],
    description:
      "A modern coastal apartment designed for comfortable family holidays and relaxing weekend stays.",
    amenities: [
      "Swimming Pool",
      "Wi-Fi",
      "Air Conditioning",
      "Kitchen",
      "Security",
      "Parking",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 3,
    name: "Watamu Ocean Retreat",
    location: "Watamu, Kilifi",
    region: "Coastal Region",
    destination: "Kilifi",
    type: "Villa",
    price: 22000,
    currency: "KES",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    ],
    description:
      "A peaceful ocean-inspired retreat for guests seeking privacy, comfort and a memorable coastal holiday.",
    amenities: ["Swimming Pool", "Wi-Fi", "Garden", "Kitchen", "Beach Access"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 4,
    name: "Lamu Heritage Villa",
    location: "Lamu Island, Lamu",
    region: "Coastal Region",
    destination: "Lamu",
    type: "Villa",
    price: 16000,
    currency: "KES",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    ],
    description:
      "A charming island-style villa inspired by coastal architecture and relaxed Swahili living.",
    amenities: ["Wi-Fi", "Terrace", "Kitchen", "Garden", "Ocean Views"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  // =====================================
  // NAIROBI
  // =====================================

  {
    id: 5,
    name: "Westlands Executive Apartment",
    location: "Westlands, Nairobi",
    region: "Nairobi",
    destination: "Westlands",
    type: "Apartment",
    price: 8500,
    currency: "KES",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    ],
    description:
      "A contemporary city apartment ideal for business travellers, couples and short city breaks.",
    amenities: [
      "Wi-Fi",
      "Swimming Pool",
      "Gym",
      "Kitchen",
      "Security",
      "Parking",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 6,
    name: "Karen Garden Residence",
    location: "Karen, Nairobi",
    region: "Nairobi",
    destination: "Karen",
    type: "Villa",
    price: 22000,
    currency: "KES",
    guests: 10,
    bedrooms: 5,
    bathrooms: 5,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    ],
    description:
      "A spacious garden residence offering a peaceful setting for families and group holidays.",
    amenities: [
      "Garden",
      "Swimming Pool",
      "Wi-Fi",
      "Kitchen",
      "Parking",
      "Security",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 7,
    name: "Runda Luxury Residence",
    location: "Runda, Nairobi",
    region: "Nairobi",
    destination: "Runda",
    type: "Villa",
    price: 28000,
    currency: "KES",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
    ],
    description:
      "An elegant private residence with spacious living areas for premium short-term accommodation.",
    amenities: [
      "Wi-Fi",
      "Garden",
      "Swimming Pool",
      "Kitchen",
      "Security",
      "Parking",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  // =====================================
  // RIFT VALLEY
  // =====================================

  {
    id: 8,
    name: "Naivasha Lakeside Retreat",
    location: "Naivasha, Rift Valley",
    region: "Rift Valley",
    destination: "Naivasha",
    type: "Cottage",
    price: 12000,
    currency: "KES",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    ],
    description:
      "A countryside escape for guests looking to enjoy nature, fresh air and a relaxing stay in Naivasha.",
    amenities: ["Garden", "Wi-Fi", "Fireplace", "Kitchen", "Parking"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 9,
    name: "Maasai Mara Safari Lodge",
    location: "Maasai Mara, Narok",
    region: "Rift Valley",
    destination: "Narok / Maasai Mara",
    type: "Lodge",
    price: 28000,
    currency: "KES",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1000",
    ],
    description:
      "A safari-inspired lodge experience surrounded by the natural beauty of Kenya's wildlife country.",
    amenities: [
      "Restaurant",
      "Wi-Fi",
      "Safari Activities",
      "Outdoor Lounge",
      "Parking",
    ],
    checkIn: "12:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 10,
    name: "Nakuru Countryside Cottage",
    location: "Nakuru, Rift Valley",
    region: "Rift Valley",
    destination: "Nakuru",
    type: "Cottage",
    price: 9500,
    currency: "KES",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    ],
    description:
      "A comfortable countryside cottage for families and travellers exploring Nakuru.",
    amenities: ["Garden", "Wi-Fi", "Kitchen", "Parking", "Outdoor Seating"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  // =====================================
  // CENTRAL
  // =====================================

  {
    id: 11,
    name: "Nyeri Mountain View Cottage",
    location: "Nyeri, Central",
    region: "Central",
    destination: "Nyeri",
    type: "Cottage",
    price: 11000,
    currency: "KES",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    ],
    description:
      "A cosy mountain-side getaway for guests seeking fresh air, quiet surroundings and scenic views.",
    amenities: ["Garden", "Wi-Fi", "Fireplace", "Kitchen", "Parking"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 12,
    name: "Limuru Countryside Estate",
    location: "Limuru, Kiambu",
    region: "Central",
    destination: "Limuru",
    type: "Estate",
    price: 20000,
    currency: "KES",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    ],
    description:
      "A countryside estate designed for peaceful family escapes, private gatherings and weekend retreats.",
    amenities: ["Garden", "Wi-Fi", "Kitchen", "Fireplace", "Parking"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  // =====================================
  // EASTERN
  // =====================================

  {
    id: 13,
    name: "Embu Highland Retreat",
    location: "Embu, Eastern",
    region: "Eastern",
    destination: "Embu",
    type: "Cottage",
    price: 10000,
    currency: "KES",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
    ],
    description:
      "A peaceful highland retreat suited to couples and families looking for a quiet break.",
    amenities: ["Garden", "Wi-Fi", "Kitchen", "Parking", "Outdoor Seating"],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },

  // =====================================
  // KAJIADO
  // =====================================

  {
    id: 14,
    name: "Amboseli Safari Retreat",
    location: "Amboseli, Kajiado",
    region: "Kajiado",
    destination: "Amboseli",
    type: "Lodge",
    price: 25000,
    currency: "KES",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1000",
    ],
    description:
      "A nature-inspired safari retreat for travellers exploring Amboseli and its surrounding landscapes.",
    amenities: [
      "Restaurant",
      "Wi-Fi",
      "Outdoor Lounge",
      "Safari Activities",
      "Parking",
    ],
    checkIn: "12:00",
    checkOut: "10:00",
    status: "demo",
  },

  {
    id: 15,
    name: "Kitengela Family Villa",
    location: "Kitengela, Kajiado",
    region: "Kajiado",
    destination: "Kitengela",
    type: "Villa",
    price: 14000,
    currency: "KES",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    ],
    description:
      "A spacious family villa offering a comfortable base for group stays and weekend escapes.",
    amenities: [
      "Garden",
      "Wi-Fi",
      "Kitchen",
      "Parking",
      "Swimming Pool",
      "Security",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    status: "demo",
  },
];

export default stays;
