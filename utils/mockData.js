/**
 * Mock data for testing frontend functionality
 * Contains sample bouquets and materials data
 */
const mockBouquets = [
  {
    _id: "1",
    name: "Classic Rose Romance",
    image: "/mockBouquets/pexels-hbozman-1058771.jpg",  // Make sure this file exists
    price: 299,
    materials: [
      { name: "Red Rose", quantity: 12 },
      { name: "Baby's Breath", quantity: 5 }
    ],
    inStockToday: true
  },
  {
    _id: "2",
    name: "Spring Sunshine",
    image: "/mockBouquets/pexels-imagestudio-1488310.jpg", // Make sure this file exists
    price: 199,
    materials: [
      { name: "Sunflower", quantity: 6 },
      { name: "White Daisy", quantity: 8 },
      { name: "Green Leaf", quantity: 4 }
    ],
    inStockToday: true
  },
  {
    _id: "3",
    name: "Purple Dream",
    image: "/mockBouquets/pexels-nietjuh-1883385.jpg",
    price: 259,
    materials: [
      { name: "Purple Hydrangea", quantity: 3 },
      { name: "Lavender", quantity: 10 },
      { name: "White Rose", quantity: 5 }
    ],
    inStockToday: false
  },
  {
    _id: "4",
    name: "White Elegance",
    image: "/mockBouquets/pexels-secret-garden-333350-931147.jpg",
    price: 399,
    materials: [
      { name: "White Rose", quantity: 15 },
      { name: "White Lily", quantity: 3 },
      { name: "Silver Leaf", quantity: 4 }
    ],
    inStockToday: true
  },
  {
    _id: "5",
    name: "Pink Paradise",
    image: "/mockBouquets/pexels-secret-garden-333350-931154.jpg",
    price: 289,
    materials: [
      { name: "Pink Rose", quantity: 8 },
      { name: "Pink Carnation", quantity: 6 },
      { name: "Baby's Breath", quantity: 4 }
    ],
    inStockToday: true
  },
  {
    _id: "6",
    name: "Ocean Breeze",
    image: "/mockBouquets/pexels-secret-garden-333350-931162.jpg",
    price: 329,
    materials: [
      { name: "Blue Hydrangea", quantity: 4 },
      { name: "White Lily", quantity: 3 },
      { name: "Eucalyptus", quantity: 5 }
    ],
    inStockToday: false
  }
]

const mockMaterials = [
  { _id: "m1", name: "Red Rose", description: "Classic red rose", image: "../images/materials/rose.jpg" },
  { _id: "m2", name: "White Rose", description: "Pure white rose", image: "../images/materials/white-rose.jpg" },
  { _id: "m3", name: "Sunflower", description: "Bright yellow sunflower", image: "../images/materials/sunflower.jpg" },
  { _id: "m4", name: "Baby's Breath", description: "Delicate white flowers", image: "../images/materials/babys-breath.jpg" },
  { _id: "m5", name: "Hydrangea", description: "Large clustered flower", image: "../images/materials/hydrangea.jpg" }
]

module.exports = {
  mockBouquets,
  mockMaterials
} 