import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/context/AppContext";
import {
  ArrowLeft, Moon, Sun, Bell, BellOff, Calendar,
  ChevronRight, Minus, Plus, Smartphone, Droplets, Heart
} from "lucide-react";
import { toast } from "sonner";

type Theme = "light" | "dark" | "system";

export default function Settings() {
  const navigate = useNavigate();
  const { cycleLength, setCycleLength, mode, setMode } = useAppState();

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("femora-theme") as Theme) || "light";
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("femora-notifications");
    return saved ? JSON.parse(saved) : { periodReminder: true, fertileWindow: true, dailyLog: false };
  });

  useEffect(() => {
    localStorage.setItem("femora-theme", theme);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(sys);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("femora-notifications", JSON.stringify(notifications));
  }, [notifications]);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev: typeof notifications) => ({ ...prev, [key]: !prev[key] }));
  };

  const adjustCycleLength = (delta: number) => {
    const next = Math.min(45, Math.max(21, cycleLength + delta));
    setCycleLength(next);
  };

  const themes: { id: Theme; icon: typeof Sun; label: string }[] = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "system", icon: Smartphone, label: "System" },
  ];

  const modes: { id: typeof mode; icon: typeof Calendar; label: string }[] = [
    { id: "cycle", icon: Calendar, label: "Track cycle" },
    { id: "conceive", icon: Heart, label: "Conceive" },
    { id: "pregnancy", icon: Droplets, label: "Pregnancy" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative min-h-[22vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-6 right-8 w-20 h-20 rounded-full bg-primary-foreground/10 blur-sm animate-float" />
        <div className="relative z-10 px-6 pb-7 w-full max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-3 inline-flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm font-ui transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-display text-3xl font-semibold text-primary-foreground">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8 pb-10">
        <div className="max-w-md mx-auto space-y-8">

          {/* Theme */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h2 className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3">Appearance</h2>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200
                    ${theme === t.id
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border/60 bg-card hover:border-primary/30"
                    }`}
                >
                  <t.icon className={`w-5 h-5 ${theme === t.id ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.5} />
                  <span className={`font-ui text-xs font-medium ${theme === t.id ? "text-primary" : "text-muted-foreground"}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.section>

          {/* Cycle Length */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3">Cycle length</h2>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/60 shadow-card">
              <span className="font-ui text-sm text-foreground">Average cycle</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustCycleLength(-1)}
                  className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Minus className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                </button>
                <span className="font-display text-xl font-semibold text-foreground w-10 text-center">{cycleLength}</span>
                <button
                  onClick={() => adjustCycleLength(1)}
                  className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Plus className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                </button>
                <span className="font-ui text-xs text-muted-foreground">days</span>
              </div>
            </div>
          </motion.section>

          {/* Tracking Mode */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3">Tracking mode</h2>
            <div className="space-y-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id); toast.success(`Switched to ${m.label}`); }}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200
                    ${mode === m.id
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border/60 bg-card hover:border-primary/30"
                    }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors
                    ${mode === m.id ? "bg-primary/15" : "bg-muted"}`}>
                    <m.icon className={`w-4 h-4 ${mode === m.id ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.5} />
                  </div>
                  <span className={`font-ui text-sm font-medium ${mode === m.id ? "text-foreground" : "text-muted-foreground"}`}>
                    {m.label}
                  </span>
                  {mode === m.id && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-3">Notifications</h2>
            <div className="space-y-2">
              {[
                { key: "periodReminder" as const, label: "Period reminder", desc: "Get notified before your period starts" },
                { key: "fertileWindow" as const, label: "Fertile window", desc: "Know when you're most fertile" },
                { key: "dailyLog" as const, label: "Daily log reminder", desc: "Reminder to log your symptoms" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleNotification(item.key)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 shadow-card text-left"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors
                    ${notifications[item.key] ? "bg-primary/15" : "bg-muted"}`}>
                    {notifications[item.key]
                      ? <Bell className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      : <BellOff className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-ui text-sm font-medium text-foreground block">{item.label}</span>
                    <span className="font-ui text-xs text-muted-foreground font-light block mt-0.5">{item.desc}</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-0.5
                    ${notifications[item.key] ? "bg-primary" : "bg-muted"}`}>
                    <div className={`w-5 h-5 rounded-full bg-primary-foreground shadow-sm transition-transform duration-200
                      ${notifications[item.key] ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>
              ))}
            </div>
          </motion.section>

          <p className="text-[11px] text-muted-foreground/40 text-center font-ui font-light pt-2">
            Femora v1.0 · Your data stays private
          </p>
        </div>
      </div>
    </div>
  );
}
