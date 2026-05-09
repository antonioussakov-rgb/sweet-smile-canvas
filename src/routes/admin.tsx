import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Save, Upload, X } from "lucide-react";
import type { SiteSettings } from "@/contexts/SiteSettingsProvider";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administration — Kryvonis Dental Studio" }] }),
  component: AdminPage,
});

const empty: SiteSettings = {
  phone: "", phoneSecondary: "", phoneHref: "", email: "",
  address: "", metro: "", hours: "", hoursRu: "",
  heroTitle: { fr: "", ru: "" },
  heroSubtitle: { fr: "", ru: "" },
  aboutBody: { fr: "", ru: "" },
  aboutPhilosophy: { fr: "", ru: "" },
  heroImageUrl: "", aboutImage1Url: "", aboutImage2Url: "",
};

const PASSWORD_KEY = "kryvonis_admin_pwd";

function AdminPage() {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(empty);
  const [saving, setSaving] = useState(false);

  const callApi = async (action: string, payload?: unknown, pwd?: string) => {
    const { data, error } = await supabase.functions.invoke("admin-api", {
      body: { password: pwd ?? sessionStorage.getItem(PASSWORD_KEY), action, payload },
    });
    if (error) throw new Error(error.message);
    if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
    return data;
  };

  useEffect(() => {
    if (!supabaseConfigured) { setChecking(false); return; }
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (!saved) { setChecking(false); return; }
    callApi("verify", undefined, saved)
      .then(() => { setAuthed(true); loadSettings(); })
      .catch(() => sessionStorage.removeItem(PASSWORD_KEY))
      .finally(() => setChecking(false));
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from("site_settings").select("data").eq("id", "main").maybeSingle();
    if ((data as { data?: Partial<SiteSettings> } | null)?.data) {
      setSettings({ ...empty, ...((data as { data: Partial<SiteSettings> }).data) });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await callApi("verify", undefined, password);
      sessionStorage.setItem(PASSWORD_KEY, password);
      setAuthed(true);
      loadSettings();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(PASSWORD_KEY);
    nav({ to: "/" });
  };

  const save = async () => {
    setSaving(true);
    try {
      await callApi("save", settings);
      toast.success("Modifications enregistrées.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File, key: "heroImageUrl" | "aboutImage1Url" | "aboutImage2Url") => {
    try {
      const buf = await file.arrayBuffer();
      const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const res = await callApi("upload", { fileBase64: b64, fileName: file.name, contentType: file.type }) as { url: string };
      setSettings((s) => ({ ...s, [key]: res.url }));
      toast.success("Image téléchargée.");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-serif text-3xl">Administration</h1>
          <p className="text-muted-foreground">Activez Lovable Cloud pour utiliser le panneau d'administration (base de données, authentification, stockage des images).</p>
        </div>
      </div>
    );
  }

  if (checking) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Chargement…</div>;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card border border-border p-8 space-y-5">
          <h1 className="font-serif text-2xl text-foreground">Administration</h1>
          <p className="text-sm text-muted-foreground">Entrez le mot de passe pour modifier le site.</p>
          <div>
            <Label>Mot de passe</Label>
            <Input type="password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Se connecter</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl">Panneau d'administration</h1>
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? "…" : "Enregistrer"}</Button>
            <Button variant="outline" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
          </div>
        </header>

        <div className="space-y-10">
          <Section title="Coordonnées">
            <Field label="Téléphone (affiché)" value={settings.phone} onChange={(v) => setSettings({ ...settings, phone: v })} />
            <Field label="Téléphone (lien tel:)" value={settings.phoneHref} onChange={(v) => setSettings({ ...settings, phoneHref: v })} />
            <Field label="Téléphone secondaire" value={settings.phoneSecondary} onChange={(v) => setSettings({ ...settings, phoneSecondary: v })} />
            <Field label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} />
          </Section>

          <Section title="Adresse & accès">
            <Area label="Adresse" value={settings.address} onChange={(v) => setSettings({ ...settings, address: v })} />
            <Field label="Métro / accès" value={settings.metro} onChange={(v) => setSettings({ ...settings, metro: v })} />
          </Section>

          <Section title="Horaires">
            <Area label="Horaires (FR)" value={settings.hours} onChange={(v) => setSettings({ ...settings, hours: v })} />
            <Area label="Horaires (RU)" value={settings.hoursRu} onChange={(v) => setSettings({ ...settings, hoursRu: v })} />
          </Section>

          <Section title="Hero">
            <Field label="Titre (FR)" value={settings.heroTitle.fr} onChange={(v) => setSettings({ ...settings, heroTitle: { ...settings.heroTitle, fr: v } })} />
            <Field label="Titre (RU)" value={settings.heroTitle.ru} onChange={(v) => setSettings({ ...settings, heroTitle: { ...settings.heroTitle, ru: v } })} />
            <Area label="Sous-titre (FR)" value={settings.heroSubtitle.fr} onChange={(v) => setSettings({ ...settings, heroSubtitle: { ...settings.heroSubtitle, fr: v } })} />
            <Area label="Sous-titre (RU)" value={settings.heroSubtitle.ru} onChange={(v) => setSettings({ ...settings, heroSubtitle: { ...settings.heroSubtitle, ru: v } })} />
          </Section>

          <Section title="Photos">
            <ImageField label="Image Hero" value={settings.heroImageUrl} onUpload={(f) => uploadImage(f, "heroImageUrl")} onClear={() => setSettings({ ...settings, heroImageUrl: "" })} />
            <ImageField label="À propos #1" value={settings.aboutImage1Url} onUpload={(f) => uploadImage(f, "aboutImage1Url")} onClear={() => setSettings({ ...settings, aboutImage1Url: "" })} />
            <ImageField label="À propos #2" value={settings.aboutImage2Url} onUpload={(f) => uploadImage(f, "aboutImage2Url")} onClear={() => setSettings({ ...settings, aboutImage2Url: "" })} />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border p-6 space-y-4">
      <h2 className="font-serif text-xl text-foreground">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ImageField({ label, value, onUpload, onClear }: { label: string; value: string; onUpload: (f: File) => void; onClear: () => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex items-center gap-3">
        {value ? (
          <div className="relative">
            <img src={value} alt="" className="h-20 w-20 object-cover" />
            <button type="button" onClick={onClear} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1"><X className="h-3 w-3" /></button>
          </div>
        ) : null}
        <label className="cursor-pointer inline-flex items-center gap-2 border border-border px-3 py-2 hover:bg-muted">
          <Upload className="h-4 w-4" /> Téléverser
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
        </label>
      </div>
    </div>
  );
}
