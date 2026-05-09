import { motion } from "framer-motion";
import { ReactNode } from "react";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <Reveal>
      <span className="eyebrow">{eyebrow}</span>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 className={`mt-5 font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] ${light ? "text-primary-foreground" : "text-primary"}`}>
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.2}>
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{subtitle}</p>
      </Reveal>
    )}
    <Reveal delay={0.25}>
      <div className="gold-divider mt-8" />
    </Reveal>
  </div>
);
