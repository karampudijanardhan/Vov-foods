export interface Category {
  id: string;
  name: string;
  slug:
    | "pickles"
    | "veg-pickles"
    | "nonveg-pickles"
    | "powders"
    | "masala-powders"
    | "karampodi"
    | "sweets"
    | "hot-snacks"
    | "vadiyalu"
    | "special-items";
  description: string;
  image: string;
  width?: number;
  height?: number;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Pickles",
    slug: "pickles",
    description:
      "Authentic homemade pickles prepared using traditional Andhra recipes.",
    image: "/cc28c77d-c543-488c-acef-b4d65feb3d88.png",
    width: 500,
    height: 300,
    productCount: 25,
  },

  {
    id: "cat1a",
    name: "Veg Pickles",
    slug: "veg-pickles",
    description:
      "Traditional vegetarian pickles made with fresh vegetables and spices.",
    image: "/b5d2ae4f-f628-40c9-a858-cc7f0e2ed555.png",
    width: 500,
    height: 300,
    productCount: 16,
  },

  {
    id: "cat1b",
    name: "Non Veg Pickles",
    slug: "nonveg-pickles",
    description:
      "Spicy non-veg pickles including chicken, fish, prawns and mutton.",
    image: "/303225a1-04b3-4fb8-b133-7b3d11daee50.png",
    width: 500,
    height: 300,
    productCount: 9,
  },

  {
    id: "cat2",
    name: "Powders",
    slug: "powders",
    description:
      "Flavorful homemade spice powders to enhance everyday cooking.",
    image: "/c97ab3d5-e06c-4af6-ba02-1e2b37e6bed0.png",
    width: 500,
    height: 300,
    productCount: 20,
  },

  {
    id: "cat2a",
    name: "Masala Powders",
    slug: "masala-powders",
    description:
      "Freshly ground masala powders prepared using traditional ingredients.",
    image: "/3820ecab-99e6-4f6a-910a-a923f856277a.png",
    width: 500,
    height: 300,
    productCount: 10,
  },

  {
    id: "cat2b",
    name: "Karam Podi",
    slug: "karampodi",
    description:
      "Authentic Andhra karam podi perfect with hot rice and ghee.",
    image: "/4d6f22ed-7025-41eb-9020-10cd505cd699.png",
    width: 500,
    height: 300,
    productCount: 10,
  },

  {
    id: "cat3",
    name: "Sweets",
    slug: "sweets",
    description:
      "Traditional Indian sweets made with pure ghee and natural ingredients.",
    image: "/e3d73d83-7c11-46bc-89b6-69253b077398.png",
    width: 500,
    height: 300,
    productCount: 7,
  },

  {
    id: "cat3a",
    name: "Hot Snacks",
    slug: "hot-snacks",
    description:
      "Crispy homemade snacks perfect for tea time and evening cravings.",
    image: "/7195fd33-d997-49a0-ac29-b4177c2d8462.png",
    width: 500,
    height: 300,
    productCount: 6,
  },

  {
    id: "cat3b",
    name: "Vadiyalu",
    slug: "vadiyalu",
    description:
      "Sun-dried traditional vadiyalu ready to fry and serve with meals.",
    image: "/8e44c3fb-a911-43c3-8067-087c99597caa.png",
    width: 500,
    height: 300,
    productCount: 4,
  },

  {
    id: "cat4",
    name: "Special Items",
    slug: "special-items",
    description:
      "Premium homemade products like pure honey and traditional desi ghee.",
    image: "/c8a3adc4-72cf-4c68-9dac-e216199b2462.png",
    width: 500,
    height: 300,
    productCount: 2,
  },
];