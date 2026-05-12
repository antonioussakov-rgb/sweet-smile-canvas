import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/I18nProvider";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsProvider";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Story } from "@/components/site/Story";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { ClinicGallery } from "@/components/site/ClinicGallery";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFAB } from "@/components/site/WhatsAppFAB";
import { ShowcaseVideo } from "@/components/site/VideoSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kryvonis Dental Studio — Cabinet dentaire de luxe à Paris" },
      { name: "description", content: "Studio dentaire d'exception au cœur de Paris. Soins esthétiques, implantologie et orthodontie dans un cadre raffiné." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <SiteSettingsProvider>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <Gallery />
            <About />
            <Story />
            <Reviews />
            <Services />
            <ShowcaseVideo />
            <WhyUs />
            <FAQ />
            <Contact />
            <ClinicGallery />
          </main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </SiteSettingsProvider>
    </I18nProvider>
  );
}
