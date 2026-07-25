const products = [
  {
    name: "Dhaka Topi",
    description:
      "Traditional Nepali headgear made from hand-spun Dhaka fabric.",
    category: "Textile",
    imageUrl:
      "https://images.unsplash.com/photo-1601614272102-14eb02f1a668?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Maya Gurung",
    artisanLocation: "Palpa",
    artisanStory:
      "I have been weaving Dhaka for 20 years, continuing the legacy of my ancestors.",
    price: 1200,
    priceBreakdown: { artisanCut: 900, materialsCost: 200, platformFee: 100 },
    inStock: true,
    rating: 4.9,
  },
  {
    name: "Pashmina Shawl",
    description:
      "Ultra-soft, luxurious pashmina shawl handwoven in the Himalayas.",
    category: "Textile",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Sita Tamang",
    artisanLocation: "Kathmandu",
    artisanStory:
      "Each shawl is handwoven with care, using wool sourced directly from Himalayan herders.",
    price: 4500,
    priceBreakdown: { artisanCut: 3500, materialsCost: 800, platformFee: 200 },
    inStock: true,
    rating: 4.8,
  },
  {
    name: "Handmade Clay Vase",
    description:
      "Beautifully crafted clay vase using traditional pottery techniques.",
    category: "Pottery",
    imageUrl:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Ram Bahadur Prajapati",
    artisanLocation: "Bhaktapur",
    artisanStory:
      "Pottery is in our blood. My family has been shaping clay in Bhaktapur for five generations.",
    price: 2000,
    priceBreakdown: { artisanCut: 1500, materialsCost: 400, platformFee: 100 },
    inStock: true,
    rating: 4.7,
  },
  {
    name: "Wooden Buddha Statue",
    description:
      "Intricately hand-carved wooden statue of Buddha, symbolizing peace.",
    category: "Wood Craft",
    imageUrl:
      "https://images.unsplash.com/photo-1619478144005-2d4e650cb36b?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Nima Sherpa",
    artisanLocation: "Lalitpur",
    artisanStory:
      "Wood carving is a meditative process for me. Every detail reflects inner peace.",
    price: 3800,
    priceBreakdown: { artisanCut: 3000, materialsCost: 500, platformFee: 300 },
    inStock: true,
    rating: 5.0,
  },
  {
    name: "Mithila Painting",
    description:
      "Vibrant Mithila art depicting traditional scenes on handmade paper.",
    category: "Traditional Art",
    imageUrl:
      "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Sunita Jha",
    artisanLocation: "Janakpur",
    artisanStory:
      "Mithila art is how we tell our stories and express our devotion and daily life.",
    price: 2800,
    priceBreakdown: { artisanCut: 2300, materialsCost: 300, platformFee: 200 },
    inStock: true,
    rating: 4.9,
  },
  {
    name: "Bamboo Doko Basket",
    description: "Durable and lightweight traditional woven bamboo basket.",
    category: "Bamboo Craft",
    imageUrl:
      "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Pemba Rai",
    artisanLocation: "Kaski",
    artisanStory:
      "Sustainably harvested bamboo woven with techniques passed down from my father.",
    price: 1500,
    priceBreakdown: { artisanCut: 1200, materialsCost: 200, platformFee: 100 },
    inStock: true,
    rating: 4.8,
  },
  {
    name: "Handmade Silver Earrings",
    description: "Elegant silver earrings featuring traditional Newari motifs.",
    category: "Jewelry",
    imageUrl:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Laxmi Shakya",
    artisanLocation: "Patan",
    artisanStory:
      "The craft of silver making in Patan is centuries old. I aim to keep this art alive.",
    price: 2200,
    priceBreakdown: { artisanCut: 1500, materialsCost: 500, platformFee: 200 },
    inStock: true,
    rating: 4.9,
  },
  {
    name: "Felt Handbag",
    description:
      "Colorful and eco-friendly felt handbag made from natural wool.",
    category: "Felt Craft",
    imageUrl:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
    artisanName: "Anisha Gurung",
    artisanLocation: "Kathmandu",
    artisanStory:
      "Creating with felt allows for vibrant colors and provides a sustainable living for women in our community.",
    price: 1800,
    priceBreakdown: { artisanCut: 1300, materialsCost: 400, platformFee: 100 },
    inStock: true,
    rating: 4.7,
  },
];

export default products;
