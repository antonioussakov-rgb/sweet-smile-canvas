import { Star, Quote } from "lucide-react";
import { useI18n, type LocalizedString } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";

type Review = { name: string; date: LocalizedString; text: LocalizedString; rating: number };

const RATING = 4.6;
const REVIEW_COUNT = 29;

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

const RatingStars = ({ value, size = "h-4 w-4" }: { value: number; size?: string }) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.25 && value - full < 0.75;
  const totalFull = hasHalf ? full : Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < totalFull) return <Star key={i} className={`${size} fill-accent text-accent`} />;
        if (i === totalFull && hasHalf) {
          return (
            <div key={i} className={`relative ${size}`}>
              <Star className={`${size} text-accent absolute inset-0`} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <Star className={`${size} fill-accent text-accent`} />
              </div>
            </div>
          );
        }
        return <Star key={i} className={`${size} text-accent/30`} />;
      })}
    </div>
  );
};

export const Reviews = () => {
  const { t, lang: _l } = useI18n();
  const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;

  return (
    <section id="reviews" className="relative py-24 md:py-36 bg-secondary grain">
      <div className="container-luxe">
        <SectionHeader eyebrow={t("reviews.eyebrow")} title={t("reviews.title")} />

        {/* Rating hero */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-20 md:mb-24">
            <div className="inline-flex flex-col items-center">
              <span className="eyebrow text-accent !text-accent mb-6">{t("reviews.google")}</span>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-7xl md:text-8xl text-primary leading-none font-light tracking-tight">
                  {RATING.toString().replace(".", ",")}
                </span>
                <span className="font-serif text-3xl md:text-4xl text-muted-foreground font-light">/ 5</span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <RatingStars value={RATING} size="h-5 w-5" />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="h-px w-10 bg-accent" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {REVIEW_COUNT} {lang === "ru" ? "проверенных отзывов" : "avis vérifiés"}
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-6xl mx-auto">
          {reviews.slice(0, 3).map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08}>
              <article className="relative h-full bg-background p-8 md:p-10 flex flex-col">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/20 fill-accent/10" />

                <RatingStars value={r.rating} />

                <blockquote className="mt-6 font-serif text-lg md:text-xl text-primary leading-relaxed flex-1">
                  « {r.text[lang]} »
                </blockquote>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="font-medium text-primary tracking-wide">{r.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-[0.25em] mt-1.5">
                    {r.date[lang]}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
