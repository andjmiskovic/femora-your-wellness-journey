import { createContext, useContext, useState, ReactNode } from "react";

export type AppMode = "cycle" | "conceive" | "pregnancy" | null;

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  periodStartDate: Date | null;
  setPeriodStartDate: (date: Date | null) => void;
  cycleLength: number;
  setCycleLength: (length: number) => void;
  currentCycleDay: number;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>(null);
  const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState(28);

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
