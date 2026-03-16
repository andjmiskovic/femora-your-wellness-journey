import { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

type DayType = "period" | "fertile" | "ovulation" | "luteal" | "none";

function getDayType(
  dayOfMonth: number,
  year: number,
  month: number,
  periodStartDate: Date | null,
  cycleLength: number
): DayType {
  if (!periodStartDate) return "none";

  const date = new Date(year, month, dayOfMonth);
  const diffMs = date.getTime() - periodStartDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "none";

  const cycleDay = (diffDays % cycleLength) + 1;
  const ovulationDay = Math.round(cycleLength * 0.5);
  const fertileStart = ovulationDay - 4;
  const fertileEnd = ovulationDay + 1;

  if (cycleDay <= 5) return "period";
  if (cycleDay === ovulationDay) return "ovulation";
  if (cycleDay >= fertileStart && cycleDay <= fertileEnd) return "fertile";
  if (cycleDay > fertileEnd) return "luteal";
  return "none";
}

const typeStyles: Record<DayType, string> = {
  period: "bg-primary text-primary-foreground",
  fertile: "bg-accent/20 text-accent-foreground border border-accent/40",
  ovulation: "bg-accent text-accent-foreground",
  luteal: "bg-secondary text-secondary-foreground",
  none: "text-foreground",
};

export default function CalendarPage() {
  const { periodStartDate, cycleLength } = useAppState();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative min-h-[18vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 px-6 pb-6 w-full max-w-md mx-auto">
          <h1 className="font-display text-3xl font-semibold text-primary-foreground">Calendar</h1>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <h2 className="font-display text-lg font-medium text-foreground">{monthName}</h2>
            <button onClick={nextMonth} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center font-ui text-[11px] text-muted-foreground font-medium uppercase">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const type = getDayType(day, viewYear, viewMonth, periodStartDate, cycleLength);
              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-ui font-medium transition-all
                    ${typeStyles[type]}
                    ${isToday(day) ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {[
              { label: "Period", cls: "bg-primary" },
              { label: "Fertile", cls: "bg-accent/20 border border-accent/40" },
              { label: "Ovulation", cls: "bg-accent" },
              { label: "Today", cls: "ring-2 ring-primary bg-background" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${l.cls}`} />
                <span className="font-ui text-[11px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
