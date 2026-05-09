import { Sparkles, Layers, Smile, Activity, Stethoscope, Scissors } from "lucide-react";
import { useI18n, Lang, type LocalizedString } from "@/i18n/I18nProvider";

type Service = { icon: typeof Sparkles; title: LocalizedString; desc: LocalizedString };

export const services: Service[] = [
  {
    icon: Layers,
    title: { fr: "Implants dentaires", ru: "Зубные имплантаты" },
    desc: {
      fr: "Implants premium, planifiés au scanner 3D pour un résultat naturel et durable.",
      ru: "Премиум-имплантаты, планируемые на 3D-сканере — естественный и долговечный результат.",
    },
  },
  {
    icon: Sparkles,
    title: { fr: "Facettes céramiques", ru: "Керамические виниры" },
    desc: {
      fr: "Facettes ultra-fines en céramique, conçues sur mesure pour un sourire harmonieux.",
      ru: "Ультратонкие керамические виниры по индивидуальному дизайну для гармоничной улыбки.",
    },
  },
  {
    icon: Smile,
    title: { fr: "Blanchiment", ru: "Отбеливание" },
    desc: {
      fr: "Protocoles d'éclaircissement professionnels, doux pour l'émail et l'exigence du résultat.",
      ru: "Профессиональные протоколы отбеливания — деликатно для эмали и максимально эффективно.",
    },
  },
  {
    icon: Activity,
    title: { fr: "Orthodontie invisible", ru: "Невидимая ортодонтия" },
    desc: {
      fr: "Aligneurs transparents Invisalign® et solutions discrètes pour adultes et adolescents.",
      ru: "Прозрачные элайнеры Invisalign® и незаметные решения для взрослых и подростков.",
    },
  },
  {
    icon: Stethoscope,
    title: { fr: "Soins conservateurs", ru: "Терапия зубов" },
    desc: {
      fr: "Caries, dévitalisations, restaurations esthétiques sous microscope opératoire.",
      ru: "Лечение кариеса, эндодонтия, эстетические реставрации под операционным микроскопом.",
    },
  },
  {
    icon: Scissors,
    title: { fr: "Chirurgie orale", ru: "Челюстная хирургия" },
    desc: {
      fr: "Extractions complexes, greffes osseuses, chirurgie pré-implantaire.",
      ru: "Сложные удаления, костная пластика, предимплантационная хирургия.",
    },
  },
];

export const useServiceList = () => {
  const { lang } = useI18n();
  return services.map((s) => ({ ...s, title: s.title[lang], desc: s.desc[lang] }));
};
