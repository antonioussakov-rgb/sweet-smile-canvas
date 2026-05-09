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
  const { t, lang } = useI18n();
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
            <form onSubmit={handleSubmit(onSubmit)} className="bg-background p-10 md:p-12 shadow-luxe space-y-5">
              <Field id="name" label={t("form.name")} error={errors.name?.message}>
                <Input id="name" {...register("name")} className="rounded-none border-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 h-11" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field id="phone" label={t("form.phone")} error={errors.phone?.message}>
                  <Input id="phone" type="tel" {...register("phone")} className="rounded-none border-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 h-11" />
                </Field>
                <Field id="email" label={t("form.email")} error={errors.email?.message}>
                  <Input id="email" type="email" {...register("email")} className="rounded-none border-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 h-11" />
                </Field>
              </div>
              <Field id="service" label={t("form.service")} error={errors.service?.message}>
                <select
                  id="service"
                  {...register("service")}
                  className="w-full bg-transparent border-0 border-b border-border focus:outline-none focus:border-accent h-11 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>{t("form.selectService")}</option>
                  {services.map((s) => (
                    <option key={s.title.fr} value={s.title[lang]}>{s.title[lang]}</option>
                  ))}
                </select>
              </Field>
              <Field id="message" label={t("form.message")} error={errors.message?.message}>
                <Textarea id="message" rows={4} {...register("message")} className="rounded-none border-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 resize-none" />
              </Field>

              <Button
                type="submit"
                disabled={isSubmitting || sent}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-none h-14 tracking-[0.15em] text-xs uppercase shadow-gold"
              >
                {sent ? <><Check className="h-4 w-4 mr-2" /> {t("form.success")}</> : t("form.submit")}
              </Button>
            </form>
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
