import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import CycleRing from "@/components/CycleRing";
import PhaseInsights from "@/components/PhaseInsights";
import DailyLog from "@/components/DailyLog";
import { Settings, ArrowLeft, Sparkles } from "lucide-react";

function getPhaseInfo(day: number, cycleLength: number) {
  const ovulation = Math.round(cycleLength * 0.5);
  const fertileStart = ovulation - 4;
  const fertileEnd = ovulation + 1;

  if (day <= 5) return { phase: "menstrual", label: "Menstrual Phase" };
  if (day <= fertileStart - 1) return { phase: "follicular", label: "Follicular Phase" };
  if (day <= fertileEnd) return { phase: "ovulation", label: "Ovulation Window" };
  return { phase: "luteal", label: "Luteal Phase" };
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
  const { currentCycleDay, cycleLength, setMode } = useAppState();
  const { phase, label } = getPhaseInfo(currentCycleDay, cycleLength);
  const daysUntilPeriod = cycleLength - currentCycleDay;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-12">
      {/* Background mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <motion.div
        className="max-w-md mx-auto px-5 pt-6 relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-1">
          <button onClick={() => setMode(null)} className="p-2.5 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <h1 className="font-display text-xl font-medium text-foreground">Femora</h1>
          <button className="p-2.5 -mr-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Settings className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </motion.div>

        <motion.p variants={item} className="font-ui text-sm text-muted-foreground text-center mb-8 font-light">
          Your body is speaking — we're listening
        </motion.p>

        {/* Cycle Ring */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <CycleRing currentDay={currentCycleDay} cycleLength={cycleLength} phase={phase} phaseLabel={label} />
        </motion.div>

        {/* AI Insight */}
        <motion.div variants={item} className="glass rounded-2xl p-5 shadow-card mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2} />
            </div>
            <p className="font-ui text-xs font-medium text-primary">AI Insight</p>
          </div>
          <p className="font-ui text-sm text-foreground/80 leading-relaxed font-light">
            {daysUntilPeriod <= 3
              ? `Your period is approaching in ${daysUntilPeriod} days. Consider lighter activities and warm drinks.`
              : phase === "ovulation"
              ? "You're in your fertile window. Your energy typically peaks now — great for high-impact tasks."
              : phase === "follicular"
              ? "Rising estrogen is boosting your energy and mood. Great time for creative projects."
              : "Your body is winding down this cycle. Prioritise rest and nourishing meals."}
          </p>
        </motion.div>

        {/* Phase Insights */}
        <motion.div variants={item} className="mb-6">
          <PhaseInsights currentDay={currentCycleDay} cycleLength={cycleLength} daysUntilPeriod={daysUntilPeriod} />
        </motion.div>

        {/* Daily Log */}
        <motion.div variants={item}>
          <DailyLog />
        </motion.div>
      </motion.div>
    </div>
  );
}
