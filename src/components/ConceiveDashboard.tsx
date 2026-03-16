import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import DateStrip from "@/components/DateStrip";
import CycleHeroCard from "@/components/CycleHeroCard";
import DailyLog from "@/components/DailyLog";
import { ArrowLeft, Settings, Heart, Sparkles, Bell } from "lucide-react";

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition },
};

export default function ConceiveDashboard() {
  const { currentCycleDay, cycleLength, setMode } = useAppState();

  const ovulationDay = Math.round(cycleLength * 0.5);
  const fertileStart = ovulationDay - 4;
  const fertileEnd = ovulationDay + 1;
  const isFertile = currentCycleDay >= fertileStart && currentCycleDay <= fertileEnd;
  const isOvulation = currentCycleDay === ovulationDay;
  const daysUntilOvulation = Math.max(0, ovulationDay - currentCycleDay);

  const probability = isOvulation ? "~33%" : isFertile ? "~20%" : "<5%";

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
          <button onClick={() => setMode(null)} className="p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <h1 className="font-display text-xl font-medium text-foreground">Femora</h1>
          <button className="p-2 -mr-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
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
            phaseLabel={isFertile ? "Fertile Window" : "Tracking"}
            nextEvent={isOvulation ? "Peak fertility" : "Next ovulation"}
            nextEventDays={isOvulation ? 0 : Math.max(1, daysUntilOvulation)}
          />
        </motion.div>

        {/* Conception Probability */}
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 mb-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-femora-rose-light flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <p className="font-display text-4xl font-semibold text-foreground">{probability}</p>
          <p className="font-ui text-xs text-muted-foreground mt-1 font-light">
            Conception probability today
          </p>
          {isFertile && (
            <p className="font-ui text-xs font-medium text-primary mt-3">
              {isOvulation ? "Today is your peak day ✨" : `Ovulation in ${daysUntilOvulation} days`}
            </p>
          )}
        </motion.div>

        {/* AI Insight */}
        <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border/40 mb-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2} />
            </div>
            <p className="font-ui text-xs font-medium text-primary">AI Fertility Insight</p>
          </div>
          <p className="font-ui text-sm text-foreground/75 leading-relaxed font-light">
            {isFertile
              ? "Your fertile window is active. Today through the next 2 days offer the highest conception probability."
              : `Your next fertile window opens on Day ${fertileStart}. Focus on balanced nutrition and rest.`}
          </p>
        </motion.div>

        {/* Reminders */}
        <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border/40 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="font-ui text-xs font-medium text-muted-foreground">Upcoming</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-ui text-sm text-foreground font-light">Fertile window</span>
              <span className="px-2.5 py-1 rounded-full bg-femora-peach-light font-ui text-[11px] font-medium text-femora-peach">
                {isFertile ? "Now" : `Day ${fertileStart}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-sm text-foreground font-light">Ovulation</span>
              <span className="px-2.5 py-1 rounded-full bg-femora-violet-light font-ui text-[11px] font-medium text-femora-violet">
                Day {ovulationDay}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Daily Log */}
        <motion.div variants={item}>
          <DailyLog />
        </motion.div>
      </motion.div>
    </div>
  );
}
