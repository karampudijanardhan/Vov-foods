export interface Product {
  id: string;
  name: string;
  category: "pickles" | "powders" | "sweets";
  image: string;
  weightOptions: string[];
  prices: Record<string, number>;
  spiceLevel: "mild" | "medium" | "hot";
  shelfLife: string;
  stock: number;
  rating: number;
  badges: string[];
  description: string;
  ingredients?: string[];
}

export const mockProducts: Product[] = [

/* ---------------- VEG PICKLES ---------------- */

{
  id: "p1",
  name: "Mango Pickle (Big Cut)",
  category: "pickles",
  image: "/IMG_3204.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "hot",
  shelfLife: "09 months",
  stock: 60,
  rating: 4.9,
  badges: ["Best Seller","Homemade"],
  description: "Traditional Andhra mango pickle made with mustard and chilli.",
  ingredients: ["Raw Mango","Mustard Powder","Red Chili","Groundnut Oil","Salt"]
},

{
  id: "p2",
  name: "Mango Pickle (Small Cut)",
  category: "pickles",
  image: "/IMG_3205.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "hot",
  shelfLife: "09 months",
  stock: 60,
  rating: 4.8,
  badges: ["Homemade"],
  description: "Traditional small cut mango pickle with authentic Andhra taste.",
  ingredients: ["Raw Mango","Mustard Powder","Red Chili","Groundnut Oil","Salt"]
},

{
  id: "p3",
  name: "Lemon Pickle (Turmeric Style – Pasupu Nimakaya)",
  category: "pickles",
  image: "/c71b6f60-afb4-472c-9af7-d5d78a4883f2.png",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "medium",
  shelfLife: "09 months",
  stock: 50,
  rating: 4.7,
  badges: ["Traditional","No Preservatives"],
  description: "Traditional turmeric lemon pickle with authentic flavor.",
  ingredients: ["Lemon","Turmeric","Red Chili","Mustard","Salt"]
},

{
  id: "p4",
  name: "Lemon Pickle (Spicy – Karam Nimakaya)",
  category: "pickles",
  image: "/a75ed068-928d-46b9-a722-ca4f77524d51.png",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "hot",
  shelfLife: "09 months",
  stock: 42,
  rating: 4.7,
  badges: ["Spicy","Homemade"],
  description: "Hot and spicy lemon pickle Andhra style.",
  ingredients: ["Lemon","Red Chili","Fenugreek","Mustard","Salt"]
},

{
  id: "p5",
  name: "Amla Pickle (Usiri)",
  category: "pickles",
  image: "/d45d6d60-5d7c-496b-ba41-099ee8e8f166.png",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "medium",
  shelfLife: "09 months",
  stock: 48,
  rating: 4.6,
  badges: ["Vitamin C Rich","Healthy"],
  description: "Traditional gooseberry pickle rich in nutrients.",
  ingredients: ["Amla","Mustard","Fenugreek","Turmeric","Salt"]
},

{
  id: "p6",
  name: "Gongura Pickle",
  category: "pickles",
  image: "/7794a68d-08ec-4005-9826-077f0dbdc456.png",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "medium",
  shelfLife: "09 months",
  stock: 67,
  rating: 4.8,
  badges: ["Traditional Recipe"],
  description: "Tangy sorrel leaves pickle famous in Andhra.",
  ingredients: ["Gongura Leaves","Red Chili","Garlic","Sesame Oil","Salt"]
},

{
  id: "p7",
  name: "Garlic Pickle",
  category: "pickles",
  image: "/79a9191e-794c-4593-b56b-7513da9b1f2e.png",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":137,"500g":275,"1kg":550 },
  spiceLevel: "hot",
  shelfLife: "09 months",
  stock: 56,
  rating: 4.8,
  badges: ["Homemade"],
  description: "Spicy garlic pickle made with traditional spices.",
  ingredients: ["Garlic","Red Chili","Mustard","Fenugreek","Salt"]
},

{
  id: "p8",
  name: "Chinthakaya Thokku (Tamarind Pickle)",
  category: "pickles",
  image: "/IMG_3269.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":107,"500g":214,"1kg":429 },
  spiceLevel: "medium",
  shelfLife: "09 months",
  stock: 50,
  rating: 4.7,
  badges: ["Tangy"],
  description: "Tangy tamarind pickle with Andhra spices.",
  ingredients: ["Tamarind","Red Chili","Mustard","Garlic","Salt"]
},

/* ---------------- NON VEG PICKLES ---------------- */

{
  id: "p17",
  name: "Chicken Pickle (With Bone)",
  category: "pickles",
  image: "/IMG_3221.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":275,"500g":550,"1kg":1100 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 65,
  rating: 4.9,
  badges: ["Best Seller","Andhra Style"],
  description: "Traditional Andhra chicken pickle with bone and rich spices.",
  ingredients: ["Chicken","Red Chili","Garlic","Ginger","Groundnut Oil","Salt"]
},

{
  id: "p18",
  name: "Chicken Pickle (Boneless)",
  category: "pickles",
  image: "/ffc5c9a5-a853-40b3-a1de-3b65ec60ded3 (1).png",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":325,"500g":650,"1kg":1300 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 52,
  rating: 4.8,
  badges: ["Premium","Homemade"],
  description: "Boneless chicken pickle made with authentic Andhra spices.",
  ingredients: ["Chicken","Red Chili","Garlic","Mustard","Groundnut Oil","Salt"]
},

{
  id: "p19",
  name: "Country Chicken Pickle (Natu Kodi)",
  category: "pickles",
  image: "/IMG_3223.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":400,"500g":800,"1kg":1600 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 48,
  rating: 4.9,
  badges: ["Village Style","Premium"],
  description: "Authentic village-style country chicken pickle.",
  ingredients: ["Country Chicken","Red Chili","Garlic","Ginger","Mustard","Salt"]
},

{
  id: "p20",
  name: "Prawns Pickle",
  category: "pickles",
  image: "/IMG_3225.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":450,"500g":900,"1kg":1800 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 40,
  rating: 4.8,
  badges: ["Coastal Special","Premium"],
  description: "Coastal style prawns pickle with spicy Andhra masala.",
  ingredients: ["Prawns","Red Chili","Garlic","Vinegar","Groundnut Oil","Salt"]
},

{
  id: "p21",
  name: "Pandu Gappa Fish Pickle",
  category: "pickles",
  image: "/IMG_3223.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":400,"500g":800,"1kg":1600 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 68,
  rating: 4.7,
  badges: ["Coastal Special"],
  description: "Traditional Andhra fish pickle made with pandu gappa fish.",
  ingredients: ["Fish","Red Chili","Garlic","Mustard","Groundnut Oil","Salt"]
},

{
  id: "p22",
  name: "Koramenu Fish Pickle",
  category: "pickles",
  image: "/IMG_3227.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":400,"500g":800,"1kg":1600 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 46,
  rating: 4.7,
  badges: ["Traditional","Andhra Style"],
  description: "Spicy goramenu fish pickle with authentic masala.",
  ingredients: ["Fish","Red Chili","Garlic","Mustard","Groundnut Oil","Salt"]
},

{
  id: "p23",
  name: "Mutton Pickle (Boneless)",
  category: "pickles",
  image: "/IMG_3224.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":450,"500g":900,"1kg":1800 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 60,
  rating: 4.8,
  badges: ["Premium","Rich Taste"],
  description: "Boneless mutton pickle cooked with spicy Andhra masala.",
  ingredients: ["Mutton","Red Chili","Garlic","Ginger","Groundnut Oil","Salt"]
},

{
  id: "p24",
  name: "Mutton Pickle (With Bone)",
  category: "pickles",
  image: "/IMG_3223.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":400,"500g":800,"1kg":1600 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 45,
  rating: 4.7,
  badges: ["Traditional"],
  description: "Traditional Andhra mutton pickle with bone.",
  ingredients: ["Mutton","Red Chili","Garlic","Mustard","Groundnut Oil","Salt"]
},

{
  id: "p25",
  name: "Crab Pickle",
  category: "pickles",
  image: "/IMG_3229.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g":400,"500g":800,"1kg":1600 },
  spiceLevel: "hot",
  shelfLife: "3 months",
  stock: 42,
  rating: 4.8,
  badges: ["Coastal Special","Premium"],
  description: "Spicy coastal crab pickle with authentic Andhra spices.",
  ingredients: ["Crab","Red Chili","Garlic","Mustard","Groundnut Oil","Salt"]
},
//🌶 Masala Powders
{
  id: "pw1",
  name: "Chicken Masala Powder",
  category: "powders",
  image: "/IMG_3230.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600},
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 60,
  rating: 4.8,
  badges: ["Kitchen Essential", "Homemade"],
  description: "Authentic chicken masala powder for rich Andhra style curries.",
  ingredients: ["Coriander", "Red Chili", "Cumin", "Black Pepper", "Cloves", "Cardamom"]
},

{
  id: "pw2",
  name: "Garam Masala Powder",
  category: "powders",
  image: "/IMG_3232.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 200, "500g": 400, "1kg": 800 },
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 65,
  rating: 4.8,
  badges: ["Aromatic", "Homemade"],
  description: "Classic garam masala powder used for Indian cooking.",
  ingredients: ["Cloves", "Cardamom", "Cinnamon", "Cumin", "Black Pepper"]
},

{
  id: "pw3",
  name: "Fish Masala Powder",
  category: "powders",
  image: "/IMG_3233.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 55,
  rating: 4.7,
  badges: ["Coastal Special"],
  description: "Special masala powder for fish curries and fry.",
  ingredients: ["Coriander", "Red Chili", "Turmeric", "Garlic", "Cumin"]
},

{
  id: "pw4",
  name: "Mutton Masala Powder",
  category: "powders",
  image: "/IMG_3234.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 52,
  rating: 4.8,
  badges: ["Rich Flavor"],
  description: "Traditional mutton curry masala powder.",
  ingredients: ["Coriander", "Black Pepper", "Cloves", "Cinnamon", "Red Chili"]
},

{
  id: "pw5",
  name: "Coriander Powder (Dhaniyala Podi)",
  category: "powders",
  image: "/IMG_3235.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 62, "500g": 125, "1kg": 250 },
  spiceLevel: "mild",
  shelfLife: "06 months",
  stock: 70,
  rating: 4.7,
  badges: ["Kitchen Essential"],
  description: "Fresh coriander powder used in daily cooking.",
  ingredients: ["Coriander Seeds"]
},

{
  id: "pw6",
  name: "Rasam Powder",
  category: "powders",
  image: "/WhatsApp Image 2026-03-21 at 13.40.36.jpeg",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 87, "500g": 175, "1kg": 350 },
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 68,
  rating: 4.9,
  badges: ["Kitchen Essential", "Aromatic"],
  description: "Authentic South Indian rasam masala powder.",
  ingredients: ["Coriander", "Cumin", "Pepper", "Red Chili", "Turmeric"]
},

{
  id: "pw7",
  name: "Sambar Powder",
  category: "powders",
  image: "/WhatsApp Image 2026-03-21 at 13.25.32.jpeg",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 125, "500g": 250, "1kg": 500 },
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 60,
  rating: 4.8,
  badges: ["South Indian Classic"],
  description: "Authentic sambar powder for traditional sambar.",
  ingredients: ["Coriander", "Red Chili", "Fenugreek", "Cumin", "Turmeric"]
},

{
  id: "pw8",
  name: "Curry Spice Powder (Kura Karam)",
  category: "powders",
  image: "/IMG_3237.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 112, "500g": 225, "1kg": 450 },
  spiceLevel: "medium",
  shelfLife: "06 months",
  stock: 58,
  rating: 4.7,
  badges: ["Daily Cooking"],
  description: "Traditional Andhra curry spice mix.",
  ingredients: ["Coriander", "Red Chili", "Garlic", "Cumin", "Salt"]
},

{
  id: "pw9",
  name: "Special Pickle Chilli Powder",
  category: "powders",
  image: "/IMG_3238.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "hot",
  shelfLife: "06 months",
  stock: 55,
  rating: 4.8,
  badges: ["Pickle Special"],
  description: "Special chilli powder used for homemade pickles.",
  ingredients: ["Red Chili"]
},

{
  id: "pw10",
  name: "Pure Turmeric Powder",
  category: "powders",
  image: "/IMG_3236.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 125, "500g": 250, "1kg": 500 },
  spiceLevel: "mild",
  shelfLife: "06 months",
  stock: 75,
  rating: 4.9,
  badges: ["Pure", "Organic"],
  description: "Pure turmeric powder with natural color and flavor.",
  ingredients: ["Turmeric"]
},
//🌶 Karam Podis
{
  id: "pw11",
  name: "Drumstick Leaves Karam Podi (Munagaku Karampodi)",
  category: "powders",
  image: "/IMG_3240.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 200, "500g": 400, "1kg": 800 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 50,
  rating: 4.7,
  badges: ["Healthy", "Homemade"],
  description: "Nutritious drumstick leaves karam podi for rice and ghee.",
  ingredients: ["Drumstick Leaves", "Red Chili", "Garlic", "Cumin", "Salt"]
},

{
  id: "pw12",
  name: "Drumstick Leaves Plain Powder (Munagaku Podi)",
  category: "powders",
  image: "/IMG_3241.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 175, "500g": 350, "1kg": 700 },
  spiceLevel: "mild",
  shelfLife: "6 months",
  stock: 48,
  rating: 4.6,
  badges: ["Healthy"],
  description: "Pure drumstick leaves powder rich in nutrients.",
  ingredients: ["Drumstick Leaves"]
},

{
  id: "pw13",
  name: "Curry Leaves Powder (Karivepaku Podi)",
  category: "powders",
  image: "/IMG_3243.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 46,
  rating: 4.7,
  badges: ["Iron Rich"],
  description: "Healthy curry leaves powder for rice and ghee.",
  ingredients: ["Curry Leaves", "Red Chili", "Garlic", "Urad Dal", "Salt"]
},

{
  id: "pw14",
  name: "Tamarind Leaves Powder (Chintha Aku Podi)",
  category: "powders",
  image: "/e95cf652-2e9b-415a-8e71-3e91f6a70051.png",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 200, "500g": 400, "1kg": 800 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 44,
  rating: 4.6,
  badges: ["Tangy"],
  description: "Tangy tamarind leaves powder used with hot rice.",
  ingredients: ["Tamarind Leaves", "Red Chili", "Garlic", "Cumin", "Salt"]
},

{
  id: "pw15",
  name: "Toor Dal Spice Powder (Kandi Karam Podi)",
  category: "powders",
  image: "/559bd86b-bd04-44fc-b76a-6366471fd26f.png",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 52,
  rating: 4.8,
  badges: ["Protein Rich"],
  description: "Classic kandi karam podi for rice with ghee.",
  ingredients: ["Toor Dal", "Red Chili", "Garlic", "Cumin", "Salt"]
},

{
  id: "pw16",
  name: "Roasted Gram Powder (Pappula Podi)",
  category: "powders",
  image: "/e62fbd6f-d456-4d17-ad62-257eb91effd9.png",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "mild",
  shelfLife: "6 months",
  stock: 58,
  rating: 4.7,
  badges: ["Traditional"],
  description: "Roasted gram powder with mild spices.",
  ingredients: ["Roasted Gram", "Red Chili", "Cumin", "Coriander", "Salt"]
},

{
  id: "pw17",
  name: "Tempering Spice Powder (Thalimpu Podi)",
  category: "powders",
  image: "/IMG_3245.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 125, "500g": 250, "1kg": 500 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 42,
  rating: 4.6,
  badges: ["Aromatic"],
  description: "Special tempering spice powder used in Andhra cooking.",
  ingredients: ["Mustard Seeds", "Cumin", "Red Chili", "Garlic", "Salt"]
},

{
  id: "pw18",
  name: "Sesame Seed Karam Podi (Nuvvula Karampodi)",
  category: "powders",
  image: "/IMG_3246.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 162, "500g": 325, "1kg": 650 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 40,
  rating: 4.8,
  badges: ["Nutty Flavor"],
  description: "Sesame seed karam podi with rich taste.",
  ingredients: ["Sesame Seeds", "Red Chili", "Garlic", "Cumin", "Salt"]
},

{
  id: "pw19",
  name: "Flax Seeds Karam Podi (Avisaginjala Karampodi)",
  category: "powders",
  image: "/IMG_3247.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 200, "500g": 400, "1kg": 800 },
  spiceLevel: "medium",
  shelfLife: "6 months",
  stock: 38,
  rating: 4.7,
  badges: ["Healthy"],
  description: "Healthy flax seeds karam podi rich in nutrients.",
  ingredients: ["Flax Seeds", "Red Chili", "Garlic", "Cumin", "Salt"]
},

{
  id: "pw20",
  name: "Black Spice Powder (Nalla Karam Podi)",
  category: "powders",
  image: "/IMG_3248.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 200, "500g": 400, "1kg": 600 },
  spiceLevel: "hot",
  shelfLife: "6 months",
  stock: 45,
  rating: 4.8,
  badges: ["Traditional", "Spicy"],
  description: "Spicy black karam podi with rich Andhra flavor.",
  ingredients: ["Black Sesame", "Red Chili", "Garlic", "Cumin", "Salt"]
},
//🍬 Sweets
{
  id: "s1",
  name: "Mamidi Tandra",
  category: "sweets",
  image: "/IMG_3249.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "mild",
  shelfLife: "3 months",
  stock: 25,
  rating: 4.8,
  badges: ["Traditional", "Andhra Special"],
  description: "Sweet mango fruit leather made from ripe mango pulp.",
  ingredients: ["Mango Pulp", "Sugar"]
},

{
  id: "s2",
  name: "Dry Fruits Putharekulu",
  category: "sweets",
  image: "/IMG_3250.PNG",
  weightOptions: ["250g", "500g","1kg"],
  prices: { "250g": 300, "500g": 600, "1kg": 1200 },
  spiceLevel: "mild",
  shelfLife: "3 months",
  stock: 38,
  rating: 5.0,
  badges: ["Premium", "Andhra Famous"],
  description: "Paper-thin sweet layers filled with dry fruits and ghee.",
  ingredients: ["Rice Starch", "Dry Fruits", "Sugar", "Ghee", "Cardamom"]
},

{
  id: "s3",
  name: "Nethi Bellam Sunnivundalu",
  category: "sweets",
  image: "/IMG_3251.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 200, "500g": 400, "1kg": 800 },
  spiceLevel: "mild",
  shelfLife: "3 months",
  stock: 50,
  rating: 4.9,
  badges: ["Pure Ghee", "Traditional"],
  description: "Traditional Andhra sweet balls made with ghee and jaggery.",
  ingredients: ["Urad Dal", "Jaggery", "Pure Ghee", "Cardamom"]
},

{
  id: "s4",
  name: "Sweet Boondi",
  category: "sweets",
  image: "/IMG_3252.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 112, "500g": 225, "1kg": 450 },
  spiceLevel: "mild",
  shelfLife: "3 months",
  stock: 50,
  rating: 4.7,
  badges: ["Festival Special"],
  description: "Delicious sweet boondi made with gram flour and sugar syrup.",
  ingredients: ["Besan", "Sugar", "Cardamom", "Ghee"]
},
{
  id: "s5",
  name: "Nethi Ariselu",
  category: "sweets",
  image: "/IMG_3254.PNG",
  weightOptions: ["250g", "500g", "1kg"],
  prices: { "250g": 150, "500g": 300, "1kg":600  },
  spiceLevel: "mild",
  shelfLife: "3 months",
  stock: 0,
  rating: 4.7,
  badges: ["Traditional", "Out of Stock"],
  description: "Traditional rice flour sweet made with jaggery and ghee.",
  ingredients: ["Rice Flour", "Jaggery", "Sesame Seeds", "Ghee"]
},


//Hot Snacks
{
  id: "sn1",
  name: "Karaasu",
  category: "sweets",
  image: "/IMG_3255.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 87, "500g": 175, "1kg": 350 },
  spiceLevel: "medium",
  shelfLife: "45 days",
  stock: 40,
  rating: 4.6,
  badges: ["Crunchy","Popular Snack"],
  description: "Crispy and spicy South Indian karasev snack.",
  ingredients: ["Besan", "Rice Flour", "Red Chili", "Garlic", "Salt"]
},

{
  id: "sn2",
  name: "Murukulu",
  category: "sweets",
  image: "/IMG_3257.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 100, "500g": 200, "1kg": 400 },
  spiceLevel: "mild",
  shelfLife: "45 days",
  stock: 50,
  rating: 4.7,
  badges: ["Traditional","Crunchy"],
  description: "Traditional crunchy murukulu snack.",
  ingredients: ["Rice Flour", "Urad Dal Flour", "Sesame Seeds", "Salt"]
},

{
  id: "sn3",
  name: "Pappu Chekkalu",
  category: "sweets",
  image: "/IMG_3258.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 87, "500g": 175, "1kg": 350 },
  spiceLevel: "medium",
  shelfLife: "45 days",
  stock: 45,
  rating: 4.7,
  badges: ["Andhra Snack"],
  description: "Crispy Andhra style pappu chekkalu snack.",
  ingredients: ["Rice Flour", "Chana Dal", "Green Chili", "Curry Leaves", "Salt"]
},

{
  id: "sn4",
  name: "Dal Mixture",
  category: "sweets",
  image: "/IMG_3259.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 100, "500g": 200, "1kg": 400 },
  spiceLevel: "medium",
  shelfLife: "45 days",
  stock: 60,
  rating: 4.6,
  badges: ["Tea Time Snack"],
  description: "Crunchy mixture made with lentils and spices.",
  ingredients: ["Chana Dal", "Peanuts", "Curry Leaves", "Red Chili", "Salt"]
},

{
  id: "sn5",
  name: "Chegodilu",
  category: "sweets",
  image: "/IMG_3260.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 100, "500g": 200, "1kg": 400 },
  spiceLevel: "mild",
  shelfLife: "45 days",
  stock: 35,
  rating: 4.7,
  badges: ["Traditional"],
  description: "Crunchy ring shaped Andhra snack.",
  ingredients: ["Rice Flour", "Sesame Seeds", "Red Chili", "Salt"]
},

{
  id: "sn6",
  name: "Vermicelli Sev (Vampusa)",
  category: "sweets",
  image: "/IMG_3261.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 100, "500g": 200, "1kg": 400 },
  spiceLevel: "medium",
  shelfLife: "45 days",
  stock: 42,
  rating: 4.6,
  badges: ["Crunchy"],
  description: "Crispy vermicelli style sev snack.",
  ingredients: ["Besan", "Rice Flour", "Red Chili", "Salt"]
},
//🍘 Vadiyalu
{
  id: "v1",
  name: "Minapa Vadiyalu",
  category: "sweets",
  image: "/IMG_3262.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "mild",
  shelfLife: "6 months",
  stock: 40,
  rating: 4.7,
  badges: ["Traditional"],
  description: "Sun dried urad dal vadiyalu for frying.",
  ingredients: ["Urad Dal", "Salt"]
},

{
  id: "v2",
  name: "Gummadi Vadiyalu",
  category: "sweets",
  image: "/IMG_3263.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "mild",
  shelfLife: "6 months",
  stock: 35,
  rating: 4.6,
  badges: ["Homemade"],
  description: "Traditional pumpkin vadiyalu.",
  ingredients: ["Pumpkin", "Rice Flour", "Salt"]
},

{
  id: "v3",
  name: "Saggubiyyam Vadiyalu",
  category: "sweets",
  image: "/IMG_3264.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 112, "500g": 225, "1kg": 450 },
  spiceLevel: "mild",
  shelfLife: "6 months",
  stock: 38,
  rating: 4.7,
  badges: ["Traditional"],
  description: "Sago vadiyalu perfect for frying.",
  ingredients: ["Sago", "Green Chili", "Salt"]
},

{
  id: "v4",
  name: "Uppu Mirapakayalu",
  category: "sweets",
  image: "/IMG_3265.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 50, "500g": 100, "1kg": 200 },
  spiceLevel: "hot",
  shelfLife: "6 months",
  stock: 30,
  rating: 4.7,
  badges: ["Spicy"],
  description: "Salted dried chillies for frying.",
  ingredients: ["Green Chili", "Salt"]
},
//⭐ Special Items
{
  id: "sp1",
  name: "Pure Desi Ghee",
  category: "sweets",
  image: "/IMG_3270.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 300, "500g": 600, "1kg": 1200 },
  spiceLevel: "mild",
  shelfLife: "9 months",
  stock: 25,
  rating: 4.9,
  badges: ["Premium","Pure"],
  description: "Pure desi cow ghee made traditionally.",
  ingredients: ["Cow Milk Butter"]
},

{
  id: "sp2",
  name: "Sunnipindi",
  category: "powders",
  image: "/IMG_3267.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 175, "500g": 350, "1kg": 700 },
  spiceLevel: "mild",
  shelfLife: "06 months",
  stock: 35,
  rating: 4.8,
  badges: ["Natural","Traditional"],
  description: "Traditional herbal bath powder used for skincare.",
  ingredients: ["Green Gram", "Turmeric", "Sandalwood", "Herbs"]
},
{
  id: "sp3",
  name: "Natural Honey",
  category: "sweets",
  image: "/IMG_3268.PNG",
  weightOptions: ["250g","500g","1kg"],
  prices: { "250g": 150, "500g": 300, "1kg": 600 },
  spiceLevel: "mild",
  shelfLife: "12 months",
  stock: 40,
  rating: 4.9,
  badges: ["Natural","Pure"],
  description: "Pure natural honey collected from forest sources, rich in nutrients and good for health.",
  ingredients: ["Pure Honey"]
}
];
