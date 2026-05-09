import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "ru" | "en";

type Dict = Record<string, string>;

export type LocalizedString = { fr: string; ru?: string; en?: string };
export const tr = (s: LocalizedString, lang: Lang) => s[lang] ?? s.fr;

const fr: Dict = {
  "nav.about": "À propos",
  "nav.services": "Nos soins",
  "nav.why": "Pourquoi nous",
  "nav.gallery": "Galerie",
  "nav.reviews": "Avis",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "cta.book": "Prendre rendez-vous",
  "cta.bookShort": "Prendre RDV",

  "hero.eyebrow": "Cabinet de dentisterie esthétique · Paris 14ᵉ",
  "hero.title": "L'excellence au service de votre sourire",
  "hero.subtitle": "Une approche douce, précise et entièrement personnalisée — au cœur du 14ᵉ arrondissement de Paris.",
  "hero.scroll": "Découvrir",

  "stats.patients": "Patients accompagnés",
  "stats.years": "Années d'expertise",
  "stats.satisfaction": "Patients satisfaits",
  "stats.rating": "Note Google",

  "about.eyebrow": "À propos du cabinet",
  "about.title": "Une dentisterie d'exception, pensée comme une expérience.",
  "about.body": "Fondé par le Dr. Andrii Kryvonis et le Dr. Kira Sannikova, Kryvonis Dental Studio réunit une équipe d'experts passionnés autour d'une même conviction : conjuguer rigueur médicale, esthétique et confort. Chaque traitement est conçu sur mesure, dans un cadre serein, avec les technologies les plus avancées (microscopie, scanner 3D, CAD/CAM).",
  "about.philosophy": "Notre philosophie : préserver, restaurer, sublimer — sans jamais compromettre la santé.",
  "about.team": "Notre équipe",

  "services.eyebrow": "Nos soins",
  "services.title": "Une expertise complète, des résultats durables.",
  "services.subtitle": "Du soin conservateur à la transformation complète du sourire.",

  "why.eyebrow": "Pourquoi nous choisir",
  "why.title": "Le soin que vous méritez, sans compromis.",

  "gallery.eyebrow": "Avant · Après",
  "gallery.title": "Des transformations naturelles, des sourires retrouvés.",
  "gallery.subtitle": "Glissez le curseur pour découvrir le résultat.",

  "reviews.eyebrow": "Avis patients",
  "reviews.title": "Ils nous ont fait confiance.",
  "reviews.google": "Note moyenne sur Google",

  "faq.eyebrow": "Questions fréquentes",
  "faq.title": "Tout ce que vous devez savoir.",

  "contact.eyebrow": "Contact & rendez-vous",
  "contact.title": "Prenons rendez-vous.",
  "contact.subtitle": "Notre secrétariat vous répond du lundi au samedi, de 9h à 19h.",
  "contact.address": "Adresse",
  "contact.phone": "Téléphone",
  "contact.email": "Email",
  "contact.hours": "Horaires",
  "contact.metro": "Métro Alésia · Ligne 4",
  "form.name": "Nom complet",
  "form.phone": "Téléphone",
  "form.email": "Email",
  "form.service": "Soin souhaité",
  "form.message": "Message (optionnel)",
  "form.submit": "Envoyer ma demande",
  "form.success": "Demande envoyée — nous vous recontactons sous 24h.",
  "form.selectService": "Sélectionnez un soin",

  "footer.tagline": "Cabinet de dentisterie esthétique · Paris 14ᵉ",
  "footer.legal": "Mentions légales",
  "footer.privacy": "Politique de confidentialité",
  "footer.rights": "Tous droits réservés.",
};

const ru: Dict = {
  "nav.about": "О нас",
  "nav.services": "Услуги",
  "nav.why": "Почему мы",
  "nav.gallery": "Галерея",
  "nav.reviews": "Отзывы",
  "nav.faq": "FAQ",
  "nav.contact": "Контакты",
  "cta.book": "Записаться на приём",
  "cta.bookShort": "Записаться",

  "hero.eyebrow": "Стоматология эстетики · Париж 14",
  "hero.title": "Совершенство во имя вашей улыбки",
  "hero.subtitle": "Деликатный, точный и полностью индивидуальный подход — в самом сердце 14-го округа Парижа.",
  "hero.scroll": "Узнать больше",

  "stats.patients": "Пациентов",
  "stats.years": "Лет опыта",
  "stats.satisfaction": "Довольных пациентов",
  "stats.rating": "Рейтинг Google",

  "about.eyebrow": "О клинике",
  "about.title": "Стоматология высочайшего уровня — как настоящий ритуал.",
  "about.body": "Клиника Kryvonis Dental Studio основана докторами Андреем Кривоносом и Кирой Санниковой. Команда экспертов объединена общей идеей: сочетать медицинскую точность, эстетику и комфорт. Каждое лечение разрабатывается индивидуально, с использованием передовых технологий (микроскоп, 3D-сканер, CAD/CAM).",
  "about.philosophy": "Наша философия: сохранить, восстановить, преобразить — никогда не жертвуя здоровьем.",
  "about.team": "Наша команда",

  "services.eyebrow": "Услуги",
  "services.title": "Полный спектр услуг с долгосрочным результатом.",
  "services.subtitle": "От терапевтического лечения до полного преображения улыбки.",

  "why.eyebrow": "Почему мы",
  "why.title": "Уход, которого вы заслуживаете — без компромиссов.",

  "gallery.eyebrow": "До · После",
  "gallery.title": "Естественные преображения и возвращённые улыбки.",
  "gallery.subtitle": "Передвиньте ползунок, чтобы увидеть результат.",

  "reviews.eyebrow": "Отзывы пациентов",
  "reviews.title": "Они нам доверились.",
  "reviews.google": "Средняя оценка в Google",

  "faq.eyebrow": "Частые вопросы",
  "faq.title": "Всё, что вам нужно знать.",

  "contact.eyebrow": "Контакты и запись",
  "contact.title": "Запишитесь на приём.",
  "contact.subtitle": "Регистратура работает с понедельника по субботу, с 9:00 до 19:00.",
  "contact.address": "Адрес",
  "contact.phone": "Телефон",
  "contact.email": "Email",
  "contact.hours": "Часы работы",
  "contact.metro": "Метро Alésia · линия 4",
  "form.name": "Ваше имя",
  "form.phone": "Телефон",
  "form.email": "Email",
  "form.service": "Желаемая услуга",
  "form.message": "Сообщение (по желанию)",
  "form.submit": "Отправить заявку",
  "form.success": "Заявка отправлена — мы свяжемся с вами в течение 24 часов.",
  "form.selectService": "Выберите услугу",

  "footer.tagline": "Стоматология эстетики · Париж 14",
  "footer.legal": "Юридическая информация",
  "footer.privacy": "Политика конфиденциальности",
  "footer.rights": "Все права защищены.",
};

const en: Dict = {
  "nav.about": "About",
  "nav.services": "Treatments",
  "nav.why": "Why us",
  "nav.gallery": "Gallery",
  "nav.reviews": "Reviews",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "cta.book": "Book an appointment",
  "cta.bookShort": "Book now",

  "hero.eyebrow": "Aesthetic dental practice · Paris 14",
  "hero.title": "Excellence in service of your smile",
  "hero.subtitle": "A gentle, precise and fully personalised approach — in the heart of Paris's 14th arrondissement.",
  "hero.scroll": "Discover",

  "stats.patients": "Patients treated",
  "stats.years": "Years of expertise",
  "stats.satisfaction": "Satisfied patients",
  "stats.rating": "Google rating",

  "about.eyebrow": "About the practice",
  "about.title": "Exceptional dentistry, designed as an experience.",
  "about.body": "Founded by Dr. Andrii Kryvonis and Dr. Kira Sannikova, Kryvonis Dental Studio brings together a team of passionate experts united by a single conviction: combining medical precision, aesthetics and comfort. Each treatment is tailor-made, in a serene setting, using the most advanced technologies (microscopy, 3D scanning, CAD/CAM).",
  "about.philosophy": "Our philosophy: preserve, restore, enhance — never at the expense of health.",
  "about.team": "Our team",

  "services.eyebrow": "Our treatments",
  "services.title": "Comprehensive expertise, lasting results.",
  "services.subtitle": "From conservative care to complete smile transformations.",

  "why.eyebrow": "Why choose us",
  "why.title": "The care you deserve, without compromise.",

  "gallery.eyebrow": "Before · After",
  "gallery.title": "Natural transformations, smiles restored.",
  "gallery.subtitle": "Slide the cursor to reveal the result.",

  "reviews.eyebrow": "Patient reviews",
  "reviews.title": "They placed their trust in us.",
  "reviews.google": "Average rating on Google",

  "faq.eyebrow": "Frequently asked questions",
  "faq.title": "Everything you need to know.",

  "contact.eyebrow": "Contact & appointments",
  "contact.title": "Let's book an appointment.",
  "contact.subtitle": "Our reception team is available Monday to Saturday, 9 am to 7 pm.",
  "contact.address": "Address",
  "contact.phone": "Phone",
  "contact.email": "Email",
  "contact.hours": "Opening hours",
  "contact.metro": "Metro Alésia · Line 4",
  "form.name": "Full name",
  "form.phone": "Phone",
  "form.email": "Email",
  "form.service": "Treatment of interest",
  "form.message": "Message (optional)",
  "form.submit": "Send my request",
  "form.success": "Request sent — we'll get back to you within 24 hours.",
  "form.selectService": "Select a treatment",

  "footer.tagline": "Aesthetic dental practice · Paris 14",
  "footer.legal": "Legal notice",
  "footer.privacy": "Privacy policy",
  "footer.rights": "All rights reserved.",
};

const dicts: Record<Lang, Dict> = { fr, ru, en };

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "fr",
  setLang: () => {},
  t: (k) => k,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const t = (k: string) => dicts[lang][k] ?? k;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
