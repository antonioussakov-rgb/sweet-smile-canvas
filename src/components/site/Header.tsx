import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useI18n, type Lang } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";
import { Button } from "@/components/ui/button";

const links = [
  { id: "about", key: "nav.about" },
  { id: "services", key: "nav.services" },
  { id: "why", key: "nav.why" },
  { id: "gallery", key: "nav.gallery" },
  { id: "reviews", key: "nav.reviews" },
  { id: "faq", key: "nav.faq" },
  { id: "contact", key: "nav.contact" },
];

const langs: { code: Lang; flag: string }[] = [
  { code: "fr", flag: "🇫🇷" },
  { code: "ru", flag: "🇷🇺" },
  { code: "en", flag: "🇬🇧" },
];

export const Header = () => {
  const { t, lang, setLang } = useI18n();
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentFlag = langs.find((l) => l.code === lang)?.flag ?? "🇫🇷";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 bg-transparent"
    >
      <div className="container-luxe flex items-center justify-between py-4 md:py-5">
        <button onClick={() => go("hero")} className="flex items-baseline gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
          <span className="font-serif text-xl md:text-2xl tracking-wide text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Kryvonis
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Dental Studio
          </span>
        </button>

        <div className="flex items-center gap-3">
          {/* Language flag dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                scrolled ? "border-border bg-background/40" : "border-foreground/50 bg-background/30 backdrop-blur-sm"
              }`}
              aria-label="Language"
              aria-expanded={langOpen}
            >
              <span aria-hidden="true" className="leading-none">{currentFlag}</span>
              <ChevronDown className={`h-3 w-3 text-foreground/70 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 flex flex-col bg-background/95 backdrop-blur-xl border border-border rounded-md shadow-soft overflow-hidden"
                >
                  {langs
                    .filter((l) => l.code !== lang)
                    .map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        className="px-3 py-2 text-base rounded-lg hover:bg-accent/10 focus-visible:outline-none focus-visible:bg-accent/10 leading-none"
                        aria-label={l.code}
                      >
                        <span aria-hidden="true">{l.flag}</span>
                      </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={`tel:${settings.phoneHref}`}
            className={`hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:text-accent ${
              scrolled ? "" : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            }`}
          >
            <Phone className="h-4 w-4 text-accent" /> {settings.phone}
          </a>

          <Button onClick={() => go("contact")} size="sm" className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 disabled:opacity-50 disabled:pointer-events-none rounded-none tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-gold">
            {t("cta.bookShort")}
          </Button>

          <button onClick={() => setOpen(!open)} className={`p-2 text-foreground hover:text-accent focus-visible:outline-none focus-visible:text-accent ${scrolled ? "" : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"}`} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-background border-t border-border"
          >
            <div className="container-luxe py-6 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.id} onClick={() => go(l.id)} className="text-left text-foreground/80 hover:text-accent py-1">
                  {t(l.key)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
