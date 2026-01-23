export interface Category {
  id: string;
  name: string;
  slug: "pickles" | "powders" | "sweets";
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Pickles",
    slug: "pickles",
    description: "Authentic homemade pickles with traditional recipes passed down through generations.",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=600&h=400&fit=crop",
    productCount: 15,
  },
  {
    id: "cat2",
    name: "Powders",
    slug: "powders",
    description: "Flavorful spice powders to add authentic taste to your everyday meals.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop",
    productCount: 15,
  },
  {
    id: "cat3",
    name: "Sweets",
    slug: "sweets",
    description: "Traditional Indian sweets made with pure ghee and natural ingredients.",
    image: "https://blog.swiggy.com/wp-content/uploads/2025/05/Img-1-Sweet-Platter-1024x538.webp",
    productCount: 15,
  },
];
