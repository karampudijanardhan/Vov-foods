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
    openHours: "9:00 AM - 9:00 PM (Mon-Sun)",
    mapLink: "https://share.google/ocogzaY3q923fNKjO",
  },
  {
    id: "store2",
    name: "VOV FOODS- Hyderabad",
    city: "Hyderabad",
    address: "Plot 45, Jubilee Hills Road No. 5, Hyderabad - 500033",
    phone: "+91 7731983479",
    openHours: "10:00 AM - 10:00 PM (Mon-Sun)",
    mapLink: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
  },
  {
    id: "store3",
    name: "VOV FOODS - Guntur",
    city: "Guntur",
    address: "Near Arundalpet Circle, Main Road, Guntur - 522001",
    phone: "+91 7731983479",
    openHours: "8:00 AM - 8:00 PM (Mon-Sat)",
    mapLink: "https://maps.google.com/?q=Arundalpet+Guntur",
  },
  {
    id: "store4",
    name: "VOV FOODS",
    city: "Visakhapatnam",
    address: "Dwarakanagar Main Road, Opposite RTC Complex, Vizag - 530016",
    phone: "+91 7731983479",
    openHours: "9:00 AM - 9:00 PM (Mon-Sun)",
    mapLink: "https://maps.google.com/?q=Dwarakanagar+Visakhapatnam",
  },
 
];
