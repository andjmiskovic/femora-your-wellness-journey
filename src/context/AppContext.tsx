import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export type AppMode = "cycle" | "conceive" | "pregnancy" | null;

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  periodStartDate: Date | null;
  setPeriodStartDate: (date: Date | null) => void;
  cycleLength: number;
  setCycleLength: (length: number) => void;
  currentCycleDay: number;
  onboardingCompleted: boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { profile, updateProfile } = useAuth();
  const [mode, setModeLocal] = useState<AppMode>(null);
  const [periodStartDate, setPeriodStartDateLocal] = useState<Date | null>(null);
  const [cycleLength, setCycleLengthLocal] = useState(28);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sync from profile on load
  useEffect(() => {
    if (profile && !loaded) {
      setModeLocal((profile.tracking_mode as AppMode) || null);
      setCycleLengthLocal(profile.cycle_length || 28);
      setOnboardingCompleted(profile.onboarding_completed || false);
      if (profile.period_start_date) {
        setPeriodStartDateLocal(new Date(profile.period_start_date));
      }
      setLoaded(true);
    }
    if (!profile) {
      setLoaded(false);
    }
  }, [profile]);

  const setMode = (m: AppMode) => {
    setModeLocal(m);
    updateProfile({ tracking_mode: m } as any);
  };

  const setCycleLength = (len: number) => {
    setCycleLengthLocal(len);
    updateProfile({ cycle_length: len } as any);
  };

  const setPeriodStartDate = (date: Date | null) => {
    setPeriodStartDateLocal(date);
    updateProfile({ period_start_date: date ? date.toISOString().split("T")[0] : null } as any);
  };

  const currentCycleDay = periodStartDate
    ? Math.floor((Date.now() - periodStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 1;

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        periodStartDate,
        setPeriodStartDate,
        cycleLength,
        setCycleLength,
        currentCycleDay: Math.min(currentCycleDay, cycleLength),
        onboardingCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be inside AppProvider");
  return ctx;
}
