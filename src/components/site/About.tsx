import { useI18n } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";
import { Reveal, SectionHeader } from "./Reveal";
import drKryvonis from "@/assets/dr-kryvonis.jpg";
import drSannikova from "@/assets/dr-sannikova.jpg";
import drZaminskaya from "@/assets/dr-zaminskaya.jpg";
import drVanina from "@/assets/dr-vanina.jpg";
import cabinetReception from "@/assets/cabinet-reception.jpg";
import cabinetSalle from "@/assets/cabinet-salle.jpg";

const team = [
  { img: drKryvonis, name: "Dr. Andrii Kryvonis", role: { fr: "Chirurgien-dentiste · Fondateur", ru: "Хирург-стоматолог · Основатель" }, credit: { fr: "Diplômé de la Faculté de médecine dentaire — Poltava Dental Academy, 2005", ru: "Выпускник стоматологического факультета Полтавской академии, 2005" } },
  { img: drSannikova, name: "Dr. Kira Sannikova", role: { fr: "Dentiste esthétique · Co-fondatrice", ru: "Эстетический стоматолог · Соучредитель" }, credit: { fr: "Spécialiste en facettes céramiques & restauration esthétique", ru: "Специалист по керамическим винирам и эстетической реставрации" } },
  { img: drZaminskaya, name: "Dr. Nadezhda Zaminskaya", role: { fr: "Orthodontiste", ru: "Ортодонт" }, credit: { fr: "Aligneurs invisibles & corrections occlusales", ru: "Невидимые элайнеры и коррекция прикуса" } },
  { img: drVanina, name: "Dr. Elena Vanina", role: { fr: "Dentiste · Soins conservateurs", ru: "Стоматолог · Терапия" }, credit: { fr: "Endodontie & restauration sous microscope", ru: "Эндодонтия и реставрация под микроскопом" } },
];

export const About = () => {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  const body = settings.aboutBody?.[lang] || t("about.body");
  const philo = settings.aboutPhilosophy?.[lang] || t("about.philosophy");
  const img1 = settings.aboutImage1Url || cabinetReception;
  const img2 = settings.aboutImage2Url || cabinetSalle;
  return (
    <section id="about" className="relative py-24 md:py-36 bg-background grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("about.eyebrow")} title={t("about.title")} />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <Reveal>
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>{body}</p>
              <p className="font-serif italic text-2xl text-primary leading-snug border-l-2 border-accent pl-6">
                « {philo} »
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden shadow-luxe">
                <img src={img1} alt="Réception du cabinet" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-[3/4] overflow-hidden shadow-luxe mt-10">
                <img src={img2} alt="Salle de soins du cabinet" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="text-center text-2xl md:text-3xl font-serif text-primary mb-12">{t("about.team")}</h3>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <article className="group">
                <div className="aspect-[3/4] overflow-hidden bg-secondary mb-5">
                  <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="font-serif text-xl text-primary">{m.name}</h4>
                <div className="mt-2 mb-3 h-px w-8 bg-accent" />
                <p className="text-sm text-accent uppercase tracking-widest">{(m.role as Record<string, string>)[lang] ?? m.role.fr}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{(m.credit as Record<string, string>)[lang] ?? m.credit.fr}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
