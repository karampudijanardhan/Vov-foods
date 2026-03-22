import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsAppChat } from "@/utils/whatsapp";

const Support = () => (
  <div className="min-h-screen bg-background">
    <section className="gradient-warm py-12">
      <div className="container text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Support</h1>
        <p className="text-muted-foreground">We're here to help you</p>
      </div>
    </section>

    <section className="container py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: MessageCircle, title: "WhatsApp Chat", desc: "Chat with us instantly", action: () => openWhatsAppChat(), btn: "Start Chat" },
          { icon: Phone, title: "Call Support", desc: "+91 7731983479", action: () => window.open("tel:+917731983479"), btn: "Call Now" },
          { icon: Mail, title: "Email Support", desc: "vovfoods@gmail.com", action: () => window.open("mailto:vovfoods@gmail.com"), btn: "Send Email" },
          { icon: HelpCircle, title: "FAQ", desc: "Find quick answers", action: () => {}, btn: "View FAQ" },
        ].map(({ icon: Icon, title, desc, action, btn }) => (
          <div key={title} className="bg-card rounded-xl p-6 shadow-card text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full gradient-saffron flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
            <Button onClick={action} className="w-full">{btn}</Button>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Support;
