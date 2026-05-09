import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";
import before from "@/assets/smile-before.jpg";
import after from "@/assets/smile-after.jpg";

export const Gallery = () => {
  const { t } = useI18n();

  return (
    <section id="gallery" className="relative py-24 md:py-36 bg-background grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} />
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            <div className="relative overflow-hidden shadow-luxe aspect-[4/3]">
              <img src={before} alt="Sourire avant traitement" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="relative overflow-hidden shadow-luxe aspect-[4/3]">
              <img src={after} alt="Sourire après traitement" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
