import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import { ChevronLeft, ChevronRight, Sparkles, X, Droplets, DropletOff, StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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

function getCycleDay(
  dayOfMonth: number,
  year: number,
  month: number,
  periodStartDate: Date | null,
  cycleLength: number
): number | null {
  if (!periodStartDate) return null;
  const date = new Date(year, month, dayOfMonth);
  const diffMs = date.getTime() - periodStartDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return null;
  return (diffDays % cycleLength) + 1;
}

const dotColors: Record<DayType, string> = {
  period: "bg-primary",
  fertile: "bg-accent/60",
  ovulation: "bg-accent",
  luteal: "bg-secondary-foreground/30",
  none: "",
};

const phaseLabels: Record<DayType, string> = {
  period: "Period",
  fertile: "Fertile Window",
  ovulation: "Ovulation Day",
  luteal: "Luteal Phase",
  none: "No Data",
};

const phaseDescriptions: Record<DayType, string> = {
  period: "Your body is shedding the uterine lining. Rest, stay hydrated, and be gentle with yourself.",
  fertile: "You're approaching ovulation — your fertility is higher. Great time for conception if planning.",
  ovulation: "An egg is released today. This is your peak fertility day. Energy is typically high.",
  luteal: "Post-ovulation phase. You may notice mood shifts and pre-menstrual symptoms towards the end.",
  none: "Track your period start date to see personalised cycle insights here.",
};

const aiAdvice: Record<DayType, string[]> = {
  period: [
    "Iron-rich foods like spinach and lentils can help replenish what you lose during your period.",
    "Gentle yoga or walking can ease cramps better than staying still.",
    "Warm compresses on your lower abdomen can provide natural relief from cramps.",
  ],
  fertile: [
    "Your body temperature may slightly rise — this is a sign of increased fertility.",
    "Cervical mucus changes to a clear, stretchy texture during your fertile window.",
    "Energy and libido often peak during this phase — harness it for creative work too!",
  ],
  ovulation: [
    "Today is ideal for conception. Your body is at its most fertile.",
    "You might notice a slight twinge on one side — that's ovulation pain, completely normal.",
    "Your skin may glow more today thanks to peak estrogen levels!",
  ],
  luteal: [
    "Progesterone rises now, which can cause bloating and fatigue. Be kind to yourself.",
    "Complex carbs and magnesium-rich foods can help stabilise your mood.",
    "If you notice breast tenderness or irritability, it's your hormones preparing for the next cycle.",
  ],
  none: [
    "Start tracking your period to receive personalised AI-powered health insights.",
  ],
};

export default function CalendarPage() {
  const { periodStartDate, cycleLength, setPeriodStartDate } = useAppState();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showNoteInput, setShowNoteInput] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en", { month: "long", year: "numeric" });

  const prevMonth = () => {
    setSelectedDay(null);
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    setSelectedDay(null);
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const noteKey = (day: number) => `${viewYear}-${viewMonth}-${day}`;

  const selectedType = selectedDay ? getDayType(selectedDay, viewYear, viewMonth, periodStartDate, cycleLength) : "none";
  const selectedCycleDay = selectedDay ? getCycleDay(selectedDay, viewYear, viewMonth, periodStartDate, cycleLength) : null;

  const getRandomAdvice = (type: DayType) => {
    const tips = aiAdvice[type];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const [currentAdvice, setCurrentAdvice] = useState("");

  useEffect(() => {
    if (selectedDay) {
      setCurrentAdvice(getRandomAdvice(selectedType));
      setShowNoteInput(false);
    }
  }, [selectedDay, selectedType]);

  const handleMarkPeriodStart = () => {
    if (selectedDay) {
      const newDate = new Date(viewYear, viewMonth, selectedDay);
      setPeriodStartDate(newDate);
    }
  };

  const handleMarkPeriodEnd = () => {
    // Reset period tracking
    setPeriodStartDate(null);
  };

  const handleSaveNote = (text: string) => {
    if (selectedDay) {
      const key = noteKey(selectedDay);
      if (text.trim()) {
        setNotes(prev => ({ ...prev, [key]: text }));
      } else {
        setNotes(prev => {
          const n = { ...prev };
          delete n[key];
          return n;
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative min-h-[14vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 px-6 pb-5 w-full max-w-md mx-auto">
          <h1 className="font-display text-2xl font-semibold text-primary-foreground">Calendar</h1>
          <p className="font-ui text-xs text-primary-foreground/70 mt-0.5">Tap a date for insights</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-background rounded-t-[2rem] -mt-5 relative z-10 px-5 pt-6">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
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
              <div key={d} className="text-center font-ui text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
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
              const hasNote = !!notes[noteKey(day)];
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-ui font-medium transition-all active:scale-95
                    ${isSelected
                      ? "bg-primary text-primary-foreground shadow-glow scale-105"
                      : isToday(day)
                        ? "ring-2 ring-primary ring-offset-1 ring-offset-background text-foreground"
                        : "text-foreground hover:bg-secondary/60"
                    }
                  `}
                >
                  <span className="leading-none">{day}</span>
                  {/* Phase dot */}
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {type !== "none" && !isSelected && (
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[type]}`} />
                    )}
                    {hasNote && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-5 justify-center">
            {[
              { label: "Period", cls: "bg-primary" },
              { label: "Fertile", cls: "bg-accent/60" },
              { label: "Ovulation", cls: "bg-accent" },
              { label: "Today", cls: "ring-2 ring-primary bg-background" },
              { label: "Note", cls: "bg-foreground/30" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded-full ${l.cls}`} />
                <span className="font-ui text-[10px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Selected Day Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedDay && (
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="mt-6 space-y-4"
              >
                {/* Phase Info Card */}
                <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-display text-base font-medium text-foreground">
                        {new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en", { weekday: "long", day: "numeric", month: "short" })}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${dotColors[selectedType] || "bg-muted"}`} />
                        <span className="font-ui text-xs text-muted-foreground">{phaseLabels[selectedType]}</span>
                        {selectedCycleDay && (
                          <span className="font-ui text-[10px] text-muted-foreground/60">· Day {selectedCycleDay}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="font-ui text-sm text-foreground/70 leading-relaxed font-light">
                    {phaseDescriptions[selectedType]}
                  </p>
                </div>

                {/* AI Advice Card */}
                <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2} />
                    </div>
                    <p className="font-ui text-xs font-medium text-primary">AI Insight</p>
                  </div>
                  <p className="font-ui text-sm text-foreground/75 leading-relaxed font-light">
                    {currentAdvice}
                  </p>
                </div>

                {/* Period Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={handleMarkPeriodStart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 text-primary font-ui text-sm font-medium hover:bg-primary/20 transition-all active:scale-[0.97]"
                  >
                    <Droplets className="w-4 h-4" strokeWidth={1.5} />
                    Period Started
                  </button>
                  <button
                    onClick={handleMarkPeriodEnd}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-ui text-sm font-medium hover:bg-secondary/80 transition-all active:scale-[0.97]"
                  >
                    <DropletOff className="w-4 h-4" strokeWidth={1.5} />
                    Period Ended
                  </button>
                </div>

                {/* Notes */}
                <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StickyNote className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                      <p className="font-ui text-xs font-medium text-foreground">Notes</p>
                    </div>
                    {!showNoteInput && (
                      <button
                        onClick={() => setShowNoteInput(true)}
                        className="font-ui text-xs text-primary hover:underline"
                      >
                        {notes[noteKey(selectedDay)] ? "Edit" : "Add note"}
                      </button>
                    )}
                  </div>

                  {showNoteInput ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="How are you feeling today?"
                        defaultValue={notes[noteKey(selectedDay)] || ""}
                        className="bg-secondary/50 border-border/40 rounded-xl text-sm font-ui resize-none"
                        rows={3}
                        onChange={(e) => handleSaveNote(e.target.value)}
                      />
                      <button
                        onClick={() => setShowNoteInput(false)}
                        className="w-full py-2.5 rounded-xl gradient-primary text-primary-foreground font-ui text-xs font-medium shadow-glow transition-all hover:shadow-elevated active:scale-[0.97]"
                      >
                        Save Note
                      </button>
                    </div>
                  ) : notes[noteKey(selectedDay)] ? (
                    <p className="font-ui text-sm text-foreground/70 leading-relaxed font-light italic">
                      "{notes[noteKey(selectedDay)]}"
                    </p>
                  ) : (
                    <p className="font-ui text-xs text-muted-foreground/60 font-light">
                      No notes for this day yet.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
