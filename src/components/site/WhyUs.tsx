import { useI18n, Lang, type LocalizedString } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";
import { Cpu, Languages, MapPin, HeartHandshake } from "lucide-react";
import clinicLounge from "@/assets/clinic-lounge.jpg";

const items: { icon: typeof Cpu; title: LocalizedString; body: LocalizedString }[] = [
  { icon: Cpu, title: { fr: "Technologies avancées", ru: "Передовые технологии" }, body: { fr: "Microscope opératoire, scanner 3D, CAD/CAM, anesthésie indolore.", ru: "Операционный микроскоп, 3D-сканер, CAD/CAM, безболезненная анестезия." } },
  { icon: Languages, title: { fr: "Équipe trilingue", ru: "Трёхъязычная команда" }, body: { fr: "Nous parlons français, anglais et russe / ukrainien.", ru: "Мы говорим на французском, английском, русском и украинском." } },
  { icon: MapPin, title: { fr: "Au cœur de Paris 14ᵉ", ru: "В сердце Парижа 14" }, body: { fr: "194 av. du Maine — métro Alésia, ligne 4. Cabinet calme sur cour.", ru: "194 av. du Maine — метро Alésia, линия 4. Тихий кабинет во дворе." } },
  { icon: HeartHandshake, title: { fr: "Suivi personnalisé", ru: "Индивидуальное сопровождение" }, body: { fr: "Plan de traitement clair, devis transparent, suivi post-opératoire.", ru: "Понятный план лечения, прозрачная смета, послеоперационное наблюдение." } },
];

const stats = [
  { v: "4 500+", k: "stats.patients" },
  { v: "20", k: "stats.years" },
  { v: "98%", k: "stats.satisfaction" },
  { v: "4.6/5", k: "stats.rating" },
];

export const WhyUs = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  return (
    <section id="why" className="relative py-24 md:py-36 bg-primary text-primary-foreground overflow-hidden grain">
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: `url(${clinicLounge})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/80" aria-hidden="true" />

      <div className="relative container-luxe">
        <SectionHeader eyebrow={t("why.eyebrow")} title={t("why.title")} light />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title.fr} delay={i * 0.08}>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-14 w-14 border border-accent/40 text-accent mb-5">
                    <Icon className="h-6 w-6 stroke-[1.25]" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{it.title[lang]}</h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">{it.body[lang]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10 border border-primary-foreground/10">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <div className="bg-primary p-8 text-center">
                <div className="font-serif text-4xl md:text-5xl text-accent">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/60">{t(s.k)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
