import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  phone: string;
  phoneSecondary: string;
  phoneHref: string;
  email: string;
  address: string;
  metro: string;
  hours: string;
  hoursRu: string;
  heroTitle: { fr: string; ru: string };
  heroSubtitle: { fr: string; ru: string };
  aboutBody: { fr: string; ru: string };
  aboutPhilosophy: { fr: string; ru: string };
  heroImageUrl: string;
  aboutImage1Url: string;
  aboutImage2Url: string;
};

const defaults: SiteSettings = {
  phone: "07 67 16 49 11",
  phoneSecondary: "09 54 57 20 32",
  phoneHref: "+33767164911",
  email: "Dr.KRYVONIS@gmail.com",
  address: "194 Avenue du Maine\n75014 Paris, France",
  metro: "Métro Alésia · Ligne 4",
  hours: "Lun – Sam · 9h – 19h\nDim · fermé",
  hoursRu: "Пн – Сб · 9:00 – 19:00\nВс · закрыто",
  heroTitle: { fr: "L'excellence au service de votre sourire", ru: "Совершенство во имя вашей улыбки" },
  heroSubtitle: { fr: "", ru: "" },
  aboutBody: { fr: "", ru: "" },
  aboutPhilosophy: { fr: "", ru: "" },
  heroImageUrl: "",
  aboutImage1Url: "",
  aboutImage2Url: "",
};

const Ctx = createContext<{ settings: SiteSettings; loading: boolean }>({ settings: defaults, loading: true });

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("data").eq("id", "main").maybeSingle();
      if (active && data?.data) setSettings({ ...defaults, ...(data.data as Partial<SiteSettings>) });
      if (active) setLoading(false);
    };
    load();

    const channel = supabase
      .channel("site_settings_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, (payload) => {
        const newRow = (payload.new as { data?: Partial<SiteSettings> })?.data;
        if (newRow) setSettings({ ...defaults, ...newRow });
      })
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return <Ctx.Provider value={{ settings, loading }}>{children}</Ctx.Provider>;
};

export const useSiteSettings = () => useContext(Ctx);
