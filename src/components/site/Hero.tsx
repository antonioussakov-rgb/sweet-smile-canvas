import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  const { settings } = useSiteSettings();
  const title = settings.heroTitle?.[lang] || t("hero.title");
  const subtitle = settings.heroSubtitle?.[lang] || t("hero.subtitle");

  return (
    <section id="hero" className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <video
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-radial)" }} />
      </div>

      <div className="relative z-10 h-full container-luxe flex flex-col justify-center pt-24 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="eyebrow text-accent !text-accent"
        >
          {t("hero.eyebrow")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 max-w-4xl font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1] font-light tracking-tight"
          style={{ fontFamily: '"Pinyon Script", "Cormorant Garamond", serif', fontWeight: 400, color: "#1A1918" }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="mt-8 max-w-xl text-lg leading-relaxed"
          style={{ color: "#4A4845" }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-4"
        >
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8 h-14 tracking-[0.15em] text-xs uppercase shadow-gold"
          >
            {t("cta.book")}
          </Button>
          <Button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent border-foreground/40 text-foreground hover:bg-foreground/10 hover:text-foreground rounded-none px-8 h-14 tracking-[0.15em] text-xs uppercase"
          >
            {t("nav.services")}
          </Button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, opacity: { duration: 1 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-foreground/80 flex flex-col items-center gap-2"
        aria-label={t("hero.scroll")}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t("hero.scroll")}</span>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
};
