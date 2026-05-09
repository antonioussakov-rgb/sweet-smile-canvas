import { useI18n, Lang, type LocalizedString } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";
import sofa from "@/assets/clinic-sofa.jpg";
import stairs from "@/assets/clinic-stairs.jpg";
import lamp from "@/assets/clinic-lamp.jpg";

const photos: { src: string; alt: LocalizedString }[] = [
  { src: sofa, alt: { fr: "Salon d'attente — canapé en cuir vintage et cheminée d'époque", ru: "Зал ожидания — винтажный кожаный диван и старинный камин" } },
  { src: stairs, alt: { fr: "Escalier haussmannien et bouquet de saison", ru: "Османовская лестница и сезонный букет" } },
  { src: lamp, alt: { fr: "Détail décoration — lampe laiton et œuvre contemporaine", ru: "Деталь интерьера — латунная лампа и современная картина" } },
];

export const ClinicGallery = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  return (
    <section id="clinic" className="relative py-24 md:py-36 bg-secondary grain">
      <div className="container-luxe">
        <SectionHeader
          eyebrow={lang === "fr" ? "Le cabinet" : "Клиника"}
          title={lang === "fr" ? "Un écrin parisien dédié à votre confort." : "Парижский интерьер, созданный для вашего комфорта."}
          subtitle={lang === "fr"
            ? "Niché dans un immeuble haussmannien du 14ᵉ, le cabinet allie élégance d'époque et équipements de pointe."
            : "В историческом османовском здании 14-го округа кабинет сочетает старинную элегантность и передовое оборудование."}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="overflow-hidden shadow-soft group">
              <img
                src={p.src}
                alt={p.alt[lang]}
                loading="lazy"
                className="w-full h-80 md:h-96 object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
