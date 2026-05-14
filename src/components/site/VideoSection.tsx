import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

interface VideoSectionProps {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Full-screen sticky video section with parallax effect.
 * Reproduces the Madeleine site cinematic format.
 */
export const VideoSection = ({ id, desktopSrc, mobileSrc, eyebrow, title, subtitle }: VideoSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const src = isMobile ? mobileSrc : desktopSrc;

  return (
    <section
      ref={ref}
      id={id}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-background"
    >
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover scale-110"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </motion.div>

      {(eyebrow || title || subtitle) && (
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full container-luxe flex flex-col justify-center items-center text-center"
        >
          {eyebrow && <span className="eyebrow text-accent !text-accent">{eyebrow}</span>}
          {title && (
            <h2 className="mt-6 max-w-4xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] font-light" style={{ color: "#ffffff" }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-8 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{subtitle}</p>
          )}
        </motion.div>
      )}
    </section>
  );
};

/** Convenience wrapper with i18n copy for the second video showcase. */
export const ShowcaseVideo = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  const copy = {
    fr: {
      eyebrow: "L'Art du Sourire",
      title: "Une dentisterie d'exception",
      subtitle: "Technologies de pointe et savoir-faire artisanal au service de votre sourire.",
    },
    ru: {
      eyebrow: "Искусство Улыбки",
      title: "Стоматология высшего класса",
      subtitle: "Передовые технологии и мастерство для вашей улыбки.",
    },
    en: {
      eyebrow: "The Art of the Smile",
      title: "Exceptional dentistry",
      subtitle: "Cutting-edge technology and artisanal craftsmanship at the service of your smile.",
    },
  } as const;
  const c = copy[lang] ?? copy.fr;
  return (
    <VideoSection
      id="showcase"
      desktopSrc="/videos/hero-2.mp4"
      mobileSrc="/videos/hero-2-mobile.mp4"
      eyebrow={c.eyebrow}
      title={c.title}
      subtitle={c.subtitle}
    />
  );
};
