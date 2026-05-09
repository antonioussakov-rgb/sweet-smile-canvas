import { useI18n, Lang, type LocalizedString } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs: { q: LocalizedString; a: LocalizedString }[] = [
  {
    q: { fr: "Quels sont les tarifs des soins ?", ru: "Какова стоимость лечения?" },
    a: {
      fr: "Chaque traitement est précédé d'un bilan complet et d'un devis transparent. Les facettes débutent à 850 €, les implants dentaires à partir de 1 800 € (pose + couronne céramique selon le cas).",
      ru: "Перед лечением мы проводим полную диагностику и составляем прозрачную смету. Стоимость виниров — от 850 €, имплантация — от 1 800 € (имплант + керамическая коронка).",
    },
  },
  {
    q: { fr: "Acceptez-vous la Sécurité sociale et les mutuelles ?", ru: "Принимаете ли вы социальное страхование?" },
    a: { fr: "Oui, le cabinet est conventionné. Nous délivrons une facture détaillée pour votre mutuelle et proposons le tiers payant lorsque c'est possible.", ru: "Да, кабинет работает по конвенции. Мы предоставляем подробный счёт для страховой компании и при возможности оформляем прямой расчёт." },
  },
  {
    q: { fr: "Les soins sont-ils douloureux ?", ru: "Болезненны ли процедуры?" },
    a: { fr: "Nous utilisons des protocoles d'anesthésie modernes (sans douleur à l'injection) et la sédation consciente sur demande. La quasi-totalité de nos patients témoignent d'une expérience confortable.", ru: "Мы применяем современные протоколы анестезии (безболезненные инъекции) и седацию по желанию. Почти все наши пациенты отмечают комфортное лечение." },
  },
  {
    q: { fr: "Combien de temps dure un traitement par facettes ?", ru: "Сколько длится лечение винирами?" },
    a: { fr: "Comptez 2 à 3 rendez-vous sur 2 à 3 semaines : étude esthétique numérique, mock-up, puis pose finale. Durée de vie : 10 à 15 ans avec un entretien adapté.", ru: "Обычно 2–3 визита в течение 2–3 недель: цифровое моделирование, mock-up и финальная установка. Срок службы — 10–15 лет при должном уходе." },
  },
  {
    q: { fr: "Parlez-vous d'autres langues ?", ru: "На каких языках вы говорите?" },
    a: { fr: "Notre équipe parle français, anglais, russe et ukrainien — pour un accueil confortable et clair quel que soit votre profil.", ru: "Наша команда говорит на французском, английском, русском и украинском языках — для вашего полного комфорта." },
  },
  {
    q: { fr: "Comment prendre rendez-vous ?", ru: "Как записаться на приём?" },
    a: { fr: "Via le formulaire en bas de page, par téléphone au 07 67 16 49 11 ou par email Dr.KRYVONIS@gmail.com. Réponse sous 24h ouvrées.", ru: "Через форму внизу страницы, по телефону 07 67 16 49 11 или по email Dr.KRYVONIS@gmail.com. Мы отвечаем в течение 24 часов." },
  },
];

export const FAQ = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  return (
    <section id="faq" className="relative py-24 md:py-36 bg-background grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
        <Reveal>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-serif text-xl text-primary py-6 hover:text-accent hover:no-underline">
                  {f.q[lang]}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {f.a[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};
