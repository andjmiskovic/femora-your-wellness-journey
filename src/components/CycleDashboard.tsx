import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/context/AppContext";
import DateStrip from "@/components/DateStrip";
import CycleHeroCard from "@/components/CycleHeroCard";
import Timeline from "@/components/Timeline";
import DailyLog from "@/components/DailyLog";
import { Settings, Sparkles } from "lucide-react";

function getPhaseInfo(day: number, cycleLength: number) {
  const ovulation = Math.round(cycleLength * 0.5);
  const fertileStart = ovulation - 4;
  const fertileEnd = ovulation + 1;

  if (day <= 5) return { phase: "menstrual", label: "Period" };
  if (day <= fertileStart - 1) return { phase: "follicular", label: "Follicular" };
  if (day <= fertileEnd) return { phase: "ovulation", label: "Ovulation" };
  return { phase: "luteal", label: "Luteal" };
}

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition },
};

export default function CycleDashboard() {
  const { currentCycleDay, cycleLength } = useAppState();
  const navigate = useNavigate();
  const { phase, label } = getPhaseInfo(currentCycleDay, cycleLength);
  const daysUntilPeriod = cycleLength - currentCycleDay;

  const ovulationDay = Math.round(cycleLength * 0.5);
  const fertileStart = ovulationDay - 4;

  // Generate timeline events
  const today = new Date();
  const formatDate = (daysFromNow: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() + daysFromNow);
    return `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en", { month: "short" }).toLowerCase()}`;
  };

  const nextEvent = phase === "menstrual" ? "Next ovulation" : phase === "follicular" ? "Fertile window" : "Next period";
  const nextEventDays = phase === "menstrual" ? fertileStart - currentCycleDay : phase === "follicular" ? fertileStart - currentCycleDay : daysUntilPeriod;

  const timelineEvents = [
    { date: formatDate(0), dateRange: `Day ${currentCycleDay}`, label: label, color: phase === "menstrual" ? "rose" as const : phase === "ovulation" ? "peach" as const : "violet" as const },
    { date: formatDate(Math.max(0, fertileStart - currentCycleDay)), dateRange: `Day ${fertileStart}-${fertileStart + 5}`, label: "Fertility window", color: "peach" as const },
    { date: formatDate(Math.max(0, ovulationDay - currentCycleDay)), dateRange: `Day ${ovulationDay}`, label: "Ovulation", color: "violet" as const },
    { date: formatDate(daysUntilPeriod), dateRange: `Day 1`, label: "Period", color: "rose" as const },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      <motion.div
        className="max-w-md mx-auto px-5 pt-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-5">
          <h1 className="font-display text-xl font-medium text-foreground">Femora</h1>
          <button onClick={() => navigate("/settings")} className="p-2 -mr-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Settings className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* Date strip */}
        <motion.div variants={item} className="mb-5">
          <DateStrip currentDay={currentCycleDay} cycleLength={cycleLength} />
        </motion.div>

        {/* Hero card */}
        <motion.div variants={item} className="mb-6">
          <CycleHeroCard
            currentDay={currentCycleDay}
            phaseLabel={label}
            nextEvent={nextEvent}
            nextEventDays={Math.max(1, nextEventDays)}
          />
        </motion.div>

        {/* AI Insight */}
        <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border/40 mb-6">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2} />
            </div>
            <p className="font-ui text-xs font-medium text-primary">AI Insight</p>
          </div>
          <p className="font-ui text-sm text-foreground/75 leading-relaxed font-light">
            {daysUntilPeriod <= 3
              ? `Your period is approaching in ${daysUntilPeriod} days. Consider lighter activities and warm drinks.`
              : phase === "ovulation"
              ? "You're in your fertile window. Energy typically peaks now — great for high-impact tasks."
              : phase === "follicular"
              ? "Rising estrogen is boosting your energy and mood. Great time for creative work."
              : "Your body is winding down. Prioritise rest and nourishing meals."}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={item} className="mb-6">
          <Timeline events={timelineEvents} />
        </motion.div>

        {/* Daily Log */}
        <motion.div variants={item}>
          <DailyLog />
        </motion.div>
      </motion.div>
    </div>
  );
}
