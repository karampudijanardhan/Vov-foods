import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-spice-brown text-cream">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full flex items-center justify-center">
                 <img
    src="https://vovfoods.com/wp-content/uploads/2022/05/vovfoods-logo.png"
    alt="VOV Foods Logo"
    className="h-32 w-auto object-contain"
  />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">VOV FOODS</h3>
                <p className="text-xs opacity-70">TASTE OF VILLAGE FOODS</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Bringing you the authentic taste of homemade pickles, powders, and sweets 
              made with traditional recipes passed down through generations.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "All Products", path: "/products" },
                { name: "Pickles", path: "/category/pickles" },
                { name: "Powders", path: "/category/powders" },
                { name: "Sweets", path: "/category/sweets" },
                { name: "Offers", path: "/offers" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {[
                { name: "Track Order", path: "/track-order" },
                { name: "Find a Store", path: "/find-store" },
                { name: "Support", path: "/support" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                <span className="text-sm opacity-80">
                  3rd Main Rd, Central Avenue, Magunta Layout, Nellore, Andhra Pradesh 524003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-primary" />
                <a href="tel:+917731983479" className="text-sm opacity-80 hover:opacity-100">
                  +91 7731983479
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <a href="janardhankarampudi@gmail.com" className="text-sm opacity-80 hover:opacity-100">
                  janardhankarampudi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-70">
          <p>© 2025 VOV FOODS. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-100">Privacy Policy</a>
            <a href="#" className="hover:opacity-100">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
