import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import CycleRing from "@/components/CycleRing";
import DailyLog from "@/components/DailyLog";
import { ArrowLeft, Settings, Heart, Sparkles, Bell } from "lucide-react";

const transition = { type: "spring" as const, stiffness: 260, damping: 30 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition },
};

export default function ConceiveDashboard() {
  const { currentCycleDay, cycleLength, setMode } = useAppState();

  const ovulationDay = Math.round(cycleLength * 0.5);
  const fertileStart = ovulationDay - 4;
  const fertileEnd = ovulationDay + 1;
  const isFertile = currentCycleDay >= fertileStart && currentCycleDay <= fertileEnd;
  const isOvulation = currentCycleDay === ovulationDay;

  const probability = isOvulation ? "~33%" : isFertile ? "~20%" : "<5%";

  return (
    <div className="min-h-screen bg-background pb-12">
      <motion.div
        className="max-w-sm mx-auto px-5 pt-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-2">
          <button onClick={() => setMode(null)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <h1 className="font-display text-2xl italic font-light text-foreground">Femora</h1>
          <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </motion.div>

        <motion.p
          variants={item}
          className="font-display text-base italic text-muted-foreground text-center mb-8"
        >
          Precision insights for your journey
        </motion.p>

        {/* Fertility Ring */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <CycleRing
            currentDay={currentCycleDay}
            cycleLength={cycleLength}
            phase={isFertile ? "fertile" : "tracking"}
            phaseLabel={isOvulation ? "Peak Fertility" : isFertile ? "Fertile Window" : "Tracking"}
          />
        </motion.div>

        {/* Conception Probability */}
        <motion.div
          variants={item}
          className="bg-card rounded-luxury p-6 shadow-soft border border-border/50 mb-6 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-accent" strokeWidth={1.5} />
          </div>
          <p className="font-display text-3xl text-foreground">{probability}</p>
          <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
            Conception probability today
          </p>
          {isFertile && (
            <p className="font-ui text-xs text-accent mt-3">
              {isOvulation ? "Today is your peak day" : `Ovulation in ${ovulationDay - currentCycleDay} days`}
            </p>
          )}
        </motion.div>

        {/* AI Insight */}
        <motion.div
          variants={item}
          className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-accent">
              AI Fertility Insight
            </p>
          </div>
          <p className="font-ui text-sm text-foreground/80 leading-relaxed">
            {isFertile
              ? "Your fertile window is active. Based on your patterns, today through the next 2 days offer the highest conception probability."
              : `Your next fertile window opens on Day ${fertileStart}. Focus on balanced nutrition and rest to support your cycle.`}
          </p>
        </motion.div>

        {/* Reminders */}
        <motion.div
          variants={item}
          className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Upcoming
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-ui text-sm text-foreground">Fertile window opens</span>
              <span className="font-ui text-xs text-muted-foreground">
                {isFertile ? "Now" : `Day ${fertileStart}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-sm text-foreground">Ovulation day</span>
              <span className="font-ui text-xs text-muted-foreground">Day {ovulationDay}</span>
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
