import { Instagram, Mail, Phone } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSiteSettings } from "@/contexts/SiteSettingsProvider";

export const Footer = () => {
  const { t } = useI18n();
  const { settings } = useSiteSettings();
  return (
    <footer className="bg-primary text-primary-foreground/80 pt-20 pb-10">
      <div className="container-luxe grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-2xl text-primary-foreground">Kryvonis</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Dental Studio</span>
          </div>
          <p className="text-sm max-w-md leading-relaxed">{t("footer.tagline")}</p>
          <div className="flex gap-3 mt-6">
            <a href="https://instagram.com" aria-label="Instagram" className="h-10 w-10 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={`tel:${settings.phoneHref}`} aria-label="Téléphone" className="h-10 w-10 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
              <Phone className="h-4 w-4" />
            </a>
            <a href={`mailto:${settings.email}`} aria-label="Email" className="h-10 w-10 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {["about", "services", "why", "gallery", "reviews", "faq", "contact"].map((id) => (
              <li key={id}>
                <button onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} className="hover:text-accent">
                  {t(`nav.${id}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Contact</h4>
          <address className="not-italic text-sm space-y-2">
            <div>{settings.address.split("\n").map((l, i) => (<span key={i}>{l}<br /></span>))}</div>
            <a className="block hover:text-accent" href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
            <a className="block hover:text-accent break-all" href={`mailto:${settings.email}`}>{settings.email}</a>
          </address>
        </div>
      </div>

      <div className="container-luxe pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-primary-foreground/50">
        <div>© {new Date().getFullYear()} Kryvonis Dental Studio. {t("footer.rights")}</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent">{t("footer.legal")}</a>
          <a href="#" className="hover:text-accent">{t("footer.privacy")}</a>
        </div>
      </div>
    </footer>
  );
};
