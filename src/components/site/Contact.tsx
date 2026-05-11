import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";
import { Reveal, SectionHeader } from "./Reveal";

export const Contact = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  const { settings } = useSiteSettings();

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-gradient-ivory grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Reveal>
            <div className="bg-primary text-primary-foreground p-6 sm:p-10 md:p-12 h-full flex flex-col">
              <h3 className="font-serif text-3xl mb-8">Kryvonis Dental Studio</h3>

              <div className="space-y-6 text-sm">
                <Info icon={MapPin} label={t("contact.address")}>
                  {settings.address.split("\n").map((l, i) => (<span key={i}>{l}<br /></span>))}
                  <span className="text-accent">{settings.metro}</span>
                </Info>
                <Info icon={Phone} label={t("contact.phone")}>
                  <a className="hover:text-accent" href={`tel:${settings.phoneHref}`}>{settings.phone}</a><br />
                  {settings.phoneSecondary && <a className="hover:text-accent" href={`tel:${settings.phoneSecondary.replace(/\s/g, "")}`}>{settings.phoneSecondary}</a>}
                </Info>
                <Info icon={Mail} label={t("contact.email")}>
                  <a className="hover:text-accent break-all" href={`mailto:${settings.email}`}>{settings.email}</a>
                </Info>
                <Info icon={Clock} label={t("contact.hours")}>
                  {(lang === "ru" ? settings.hoursRu : settings.hours).split("\n").map((l, i) => (<span key={i}>{l}<br /></span>))}
                </Info>
              </div>

              <div className="mt-10 flex-1 min-h-[240px]">
                <iframe
                  title="Map Kryvonis Dental Studio Paris 14"
                  className="w-full h-full border border-primary-foreground/20"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=194+Avenue+du+Maine,+75014+Paris&output=embed"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-background p-10 md:p-12 shadow-luxe h-full flex flex-col items-center justify-center text-center">
              <div className="eyebrow mb-8">{t("contact.phone")}</div>
              <a
                href={`tel:${settings.phoneHref}`}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground hover:text-accent transition-colors tracking-tight"
              >
                {settings.phone}
              </a>
              {settings.phoneSecondary && (
                <a
                  href={`tel:${settings.phoneSecondary.replace(/\s/g, "")}`}
                  className="mt-4 font-serif text-2xl md:text-3xl text-foreground/80 hover:text-accent transition-colors"
                >
                  {settings.phoneSecondary}
                </a>
              )}
              <div className="gold-divider mt-10 mb-8" />
              <a
                href={`tel:${settings.phoneHref}`}
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 h-14 tracking-[0.15em] text-xs uppercase shadow-gold hover:bg-accent/90 transition-colors"
              >
                <Phone className="h-4 w-4" /> {t("cta.bookShort") || t("form.submit")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Info = ({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <Icon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/50 mb-1">{label}</div>
      <div className="text-primary-foreground/90 leading-relaxed">{children}</div>
    </div>
  </div>
);

