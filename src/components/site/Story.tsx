import { useI18n, Lang, type LocalizedString } from "@/i18n/I18nProvider";
import { Reveal, SectionHeader } from "./Reveal";
import drKryvonis from "@/assets/dr-kryvonis.jpg";

const milestones: { year: string; title: LocalizedString; body: LocalizedString }[] = [
  {
    year: "2005 — 2010",
    title: { fr: "Débuts en cliniques privées", ru: "Старт в частных клиниках" },
    body: {
      fr: "Parcours professionnel à Kiev, Sébastopol et Simferopol. Enseignement en réhabilitation esthétique, facettes céramiques, implantologie et endodontie. Publications dans Dental-revue et DentalMarket.",
      ru: "Профессиональный путь в Киеве, Севастополе и Симферополе. Преподавание эстетической реабилитации, керамических виниров, имплантологии и эндодонтии. Публикации в Dental-revue и DentalMarket.",
    },
  },
  {
    year: "2011",
    title: { fr: "Installation en France", ru: "Переезд во Францию" },
    body: { fr: "Début du parcours vers une formation dentaire française.", ru: "Начало пути к французскому стоматологическому образованию." },
  },
  {
    year: "2013",
    title: { fr: "Faculté de médecine — Paris 7", ru: "Медицинский факультет — Paris 7" },
    body: { fr: "Reprise des études à l'Université Paris Diderot.", ru: "Возобновление учёбы в Университете Paris Diderot." },
  },
  {
    year: "2013 — 2017",
    title: { fr: "Études & exercice à Paris", ru: "Учёба и практика в Париже" },
    body: { fr: "Études à Paris 7 et missions cliniques dans plusieurs cabinets dentaires parisiens.", ru: "Обучение в Paris 7 и клиническая практика в парижских кабинетах." },
  },
  {
    year: "2017",
    title: { fr: "Diplôme de chirurgien-dentiste", ru: "Диплом хирурга-стоматолога" },
    body: { fr: "Obtention des diplômes français de chirurgiens-dentistes.", ru: "Получение французских дипломов хирургов-стоматологов." },
  },
  {
    year: "2018",
    title: { fr: "Création de Dental Studio Kryvonis", ru: "Создание Dental Studio Kryvonis" },
    body: { fr: "Ouverture du cabinet à Paris 14ᵉ — une dentisterie moderne, pensée comme une expérience.", ru: "Открытие кабинета в Париже 14 — современная стоматология как настоящий ритуал." },
  },
  {
    year: "2019",
    title: { fr: "Retour à l'enseignement", ru: "Возвращение к преподаванию" },
    body: { fr: "Reprise des activités d'enseignement et de transmission auprès des confrères.", ru: "Возобновление преподавательской деятельности и передачи опыта коллегам." },
  },
];

export const Story = () => {
  const { t, lang: _l } = useI18n(); const lang: "fr" | "ru" = _l === "en" ? "fr" : _l;

  return (
    <section id="story" className="relative py-24 md:py-36 bg-background grain">
      <div className="container-luxe">
        <SectionHeader
          eyebrow={lang === "fr" ? "Notre vision" : "Наше видение"}
          title={lang === "fr"
            ? "Une dentisterie moderne, à votre service."
            : "Современная стоматология — на службе вашему здоровью."}
          subtitle={lang === "fr"
            ? "Dental Studio Kryvonis est née d'une vision : conjuguer technologies les plus avancées et soin profondément humain pour préserver et restaurer votre santé bucco-dentaire."
            : "Dental Studio Kryvonis родилась из видения: объединить самые передовые технологии и по-настоящему человечный подход — чтобы сохранять и восстанавливать здоровье ваших зубов."}
        />

        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="aspect-[4/5] overflow-hidden shadow-luxe mb-8">
                <img src={drKryvonis} alt="Dr. Andrii Kryvonis, fondateur du cabinet" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{lang === "fr" ? "Fondateur" : "Основатель"}</div>
              <h3 className="font-serif text-3xl text-primary mb-3">Dr. Andrii Kryvonis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {lang === "fr"
                  ? "Chirurgien-dentiste diplômé de l'Université Paris Diderot, formateur, conférencier et auteur. Plus de 20 ans d'expérience clinique."
                  : "Хирург-стоматолог, выпускник Университета Paris Diderot, преподаватель, лектор и автор публикаций. Более 20 лет клинической практики."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="relative border-l border-border pl-8 md:pl-10 space-y-10">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[calc(2rem+5px)] md:-left-[calc(2.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
                  <div className="font-serif text-accent text-sm tracking-[0.2em] uppercase">{m.year}</div>
                  <h4 className="mt-2 font-serif text-2xl md:text-3xl text-primary leading-tight">{m.title[lang]}</h4>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl">{m.body[lang]}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
