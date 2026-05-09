import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useI18n, Lang, type LocalizedString } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";

type Review = { name: string; date: LocalizedString; text: LocalizedString; rating: number };

const reviews: Review[] = [
  {
    name: "Liudmyla Solodzhuk",
    date: { fr: "il y a un an", ru: "год назад" },
    rating: 5,
    text: {
      fr: "Je tiens à exprimer ma sincère gratitude à toute l'équipe pour son professionnalisme, son attention et la qualité exceptionnelle des soins. Approche attentive, délicate, et traitement totalement indolore.",
      ru: "Хочу выразить искреннюю благодарность всей команде за профессионализм, внимание и исключительное качество ухода. Деликатный подход и абсолютно безболезненное лечение.",
    },
  },
  {
    name: "Olga",
    date: { fr: "il y a un an", ru: "год назад" },
    rating: 5,
    text: {
      fr: "Après de nombreuses années à chercher un dentiste de confiance, j'ai enfin découvert la clinique Kryvonis. Tous les clichés des soins flous sont un lointain souvenir.",
      ru: "После долгих лет поисков надёжного стоматолога, я наконец нашла клинику Kryvonis. Все стереотипы о непонятном лечении остались в прошлом.",
    },
  },
  {
    name: "Ines Falmet",
    date: { fr: "il y a 10 mois", ru: "10 месяцев назад" },
    rating: 5,
    text: {
      fr: "Le Dr. Kryvonis est un homme exceptionnel. Bien plus qu'un simple médecin, c'est un véritable maître dans son domaine, doté d'un talent hors du commun et d'une sensibilité incroyable.",
      ru: "Доктор Кривонос — исключительный человек. Намного больше, чем просто врач — настоящий мастер своего дела, талантливый и невероятно чуткий.",
    },
  },
  {
    name: "Michael Miroshkin",
    date: { fr: "il y a 9 mois", ru: "9 месяцев назад" },
    rating: 5,
    text: {
      fr: "L'équipement de la clinique est exceptionnel (microscopes, technologie de pointe), l'expertise des médecins est de premier ordre et la décoration intérieure est magnifique.",
      ru: "Оборудование клиники исключительное (микроскопы, передовые технологии), уровень врачей — высший класс, а интерьер просто великолепен.",
    },
  },
  {
    name: "Natalia Kolodinskaya",
    date: { fr: "il y a 8 mois", ru: "8 месяцев назад" },
    rating: 5,
    text: {
      fr: "Les meilleurs médecins et le meilleur service. Cela vaut chaque centime, et vous pouvez être sûr que même une opération compliquée sera effectuée avec précision.",
      ru: "Лучшие врачи и лучший сервис. Стоит каждой копейки — даже сложная операция будет выполнена идеально.",
    },
  },
  {
    name: "Lioubov Stoupnikova",
    date: { fr: "il y a 3 ans", ru: "3 года назад" },
    rating: 5,
    text: {
      fr: "Très professionnel, rapidité et clarté des explications. L'accueil est agréable, les appareils neufs, hygiène parfaite. Je recommande chaleureusement cette clinique.",
      ru: "Очень профессионально, быстро и понятно. Приятный приём, новое оборудование, идеальная гигиена. От души рекомендую эту клинику.",
    },
  },
];

export const Reviews = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % reviews.length);
  const prev = () => setI((i - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  });

  const r = reviews[i];

  return (
    <section id="reviews" className="relative py-24 md:py-36 bg-secondary grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("reviews.eyebrow")} title={t("reviews.title")} />

        <Reveal>
          <div className="max-w-4xl mx-auto bg-background p-10 md:p-16 shadow-luxe relative">
            <Quote className="absolute -top-6 left-10 h-16 w-16 text-accent/30 fill-accent/10" />

            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: r.rating }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>

            <blockquote className="font-serif text-2xl md:text-3xl text-primary leading-snug min-h-[10rem]">
              « {r.text[lang]} »
            </blockquote>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <div className="font-medium text-primary">{r.name}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{r.date[lang]}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prev} aria-label="prev" className="h-10 w-10 border border-border hover:border-accent hover:text-accent transition-colors flex items-center justify-center">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={next} aria-label="next" className="h-10 w-10 border border-border hover:border-accent hover:text-accent transition-colors flex items-center justify-center">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-1 mt-6">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-0.5 transition-all ${idx === i ? "w-8 bg-accent" : "w-4 bg-border"}`}
                  aria-label={`Avis ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-accent text-accent" />)}
            </div>
            <span>4,6 / 5 · {t("reviews.google")} (29)</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
