import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsAppChat } from "@/utils/whatsapp";
import { useState } from "react";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Open the VovFoods app or website, select your favorite food items, add them to cart and confirm your order."
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 20 to 40 minutes depending on your location and store availability."
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support UPI, Debit Card, Credit Card and Cash on Delivery."
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before the restaurant starts preparing your food."
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact us through WhatsApp, Phone Call or Email from this support page."
  }
];

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="gradient-warm py-12">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Support</h1>
          <p className="text-muted-foreground">We're here to help you</p>
        </div>
      </section>

      {/* Support Options */}
      <section className="container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {[
            {
              icon: MessageCircle,
              title: "WhatsApp Chat",
              desc: "Chat with us instantly",
              action: () => openWhatsAppChat(),
              btn: "Start Chat"
            },
            {
              icon: Phone,
              title: "Call Support",
              desc: "+91 7731983479",
              action: () => window.open("tel:+917731983479"),
              btn: "Call Now"
            },
            {
              icon: Mail,
              title: "Email Support",
              desc: "vovfoods@gmail.com",
              action: () => window.open("mailto:vovfoods@gmail.com"),
              btn: "Send Email"
            },
            {
              icon: HelpCircle,
              title: "FAQ",
              desc: "Find quick answers",
              action: () => {
                document
                  .getElementById("faq-section")
                  .scrollIntoView({ behavior: "smooth" });
              },
              btn: "View FAQ"
            }
          ].map(({ icon: Icon, title, desc, action, btn }) => (
            <div
              key={title}
              className="bg-card rounded-xl p-6 shadow-card text-center space-y-4"
            >
              <div className="w-14 h-14 mx-auto rounded-full gradient-saffron flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <h3 className="font-display font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>

              <Button onClick={action} className="w-full">
                {btn}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer bg-card"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <h3 className="font-semibold">{faq.question}</h3>

              {openIndex === index && (
                <p className="text-muted-foreground mt-2">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Support;