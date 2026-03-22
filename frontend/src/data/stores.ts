export interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  openHours: string;
  mapLink: string;
}

export const stores: Store[] = [
  {
    id: "store1",
    name: "VOV FOODS - NELLORE",
    city: "NELLORE",
    address: "3rd Main Rd, Central Avenue, Magunta Layout, Nellore, Andhra Pradesh 524003",
    phone: "+91 7731983479",
    openHours: "10:00 AM - 8:00 PM (Mon-Sun)",
    mapLink: "https://share.google/ocogzaY3q923fNKjO",
  },
  {
    id: "store2",
    name: "VOV FOODS- Sullurupeta",
    city: "Sullurupeta",
    address: "Gnt Rd,Indirnagar,Sulllurupeta,Andhra Pradesh 524121",
    phone: "+91 7731983479",
    openHours: "10:00 AM - 8:00 PM (Mon-Sun)",
    mapLink: "https://maps.app.goo.gl/tPkDiQ3sYaUqbXVz9",
  },
  {
    id: "store3",
    name: "VOV FOODS - Nellore",
    city: "Nellore",
    address: "Gayathri Nagar, Nellore, Andhra Pradesh 524004",
    phone: "+91 7731983479",
    openHours: "10:00 AM - 8:00 PM (Mon-Sat)",
    mapLink: "https://maps.app.goo.gl/QANGvfrY8CY6zHhA6",
  },
  {
    id: "store4",
    name: "VOV FOODS-Tirupati",
    city: "Tirupati",
    address: "Coming Soon",
    phone: "+91 7731983479",
    openHours: "10:00 AM - 8:00 PM (Mon-Sun)",
    mapLink: "Coming Soon",
  },
 
];
