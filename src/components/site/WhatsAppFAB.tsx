import { MessageCircle } from "lucide-react";

export const WhatsAppFAB = () => (
  <a
    href="https://wa.me/33767164911?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 group"
  >
    <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
    <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-gold hover:scale-110 transition-transform">
      <MessageCircle className="h-6 w-6" />
    </span>
  </a>
);
