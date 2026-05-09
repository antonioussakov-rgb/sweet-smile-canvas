import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cabinet.jpg";

export const Hero = () => {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  const img = settings.heroImageUrl || heroImage;
  const title = settings.heroTitle?.[lang] || t("hero.title");
  const subtitle = settings.heroSubtitle?.[lang] || t("hero.subtitle");

  return (
    <section id="hero" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <motion.img
          src={img}
          alt=""
          width={1920}
          height={1080}
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 26, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
          className="h-full w-full object-cover object-center"
          style={{ objectPosition: "center 35%" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-radial)" }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_50%_6%/0.6)] via-transparent to-transparent" />
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
          className="mt-6 max-w-4xl text-foreground font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-light"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="mt-8 max-w-xl text-foreground/85 text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8 h-14 tracking-[0.15em] text-xs uppercase shadow-gold"
          >
            {t("cta.book")}
          </Button>
          <Button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline"
            size="lg"
            className="bg-transparent border-foreground/40 text-foreground hover:bg-foreground/10 hover:text-foreground rounded-none px-8 h-14 tracking-[0.15em] text-xs uppercase"
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
