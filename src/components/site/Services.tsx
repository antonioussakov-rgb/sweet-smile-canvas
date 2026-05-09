import { useI18n } from "@/i18n/I18nProvider";
import { useServiceList } from "@/data/services";
import { Reveal, SectionHeader } from "./Reveal";

export const Services = () => {
  const { t } = useI18n();
  const list = useServiceList();
  return (
    <section id="services" className="relative py-24 md:py-36 bg-gradient-ivory grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("services.eyebrow")} title={t("services.title")} subtitle={t("services.subtitle")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {list.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <article className="group bg-background h-full p-10 transition-all duration-500 hover:bg-primary hover:shadow-luxe">
                  <Icon className="h-10 w-10 text-accent stroke-[1.25] group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="mt-6 font-serif text-2xl text-primary group-hover:text-primary-foreground transition-colors">{s.title}</h3>
                  <div className="my-4 h-px w-8 bg-accent" />
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">{s.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
