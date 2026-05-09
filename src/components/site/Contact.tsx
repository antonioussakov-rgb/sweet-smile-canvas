import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";
import { services } from "@/data/services";
import { Reveal, SectionHeader } from "./Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  email: z.string().trim().email("Email invalide").max(255),
  service: z.string().min(1, "Veuillez choisir un soin"),
  message: z.string().trim().max(1000).optional(),
});
type FormValues = z.infer<typeof schema>;

export const Contact = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  const { settings } = useSiteSettings();
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    // Open default mail client with prefilled message — production would post to backend.
    const subject = encodeURIComponent(`[RDV] ${data.name} — ${data.service}`);
    const body = encodeURIComponent(
      `Nom: ${data.name}\nTéléphone: ${data.phone}\nEmail: ${data.email}\nSoin: ${data.service}\n\n${data.message ?? ""}`
    );
    window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`;
    toast.success(t("form.success"));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-gradient-ivory grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Reveal>
            <div className="bg-primary text-primary-foreground p-10 md:p-12 h-full flex flex-col">
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

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <Label htmlFor={id} className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</Label>
    <div className="mt-1">{children}</div>
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);
