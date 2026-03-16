import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import CycleRing from "@/components/CycleRing";
import PhaseInsights from "@/components/PhaseInsights";
import DailyLog from "@/components/DailyLog";
import { Settings, ArrowLeft } from "lucide-react";

function getPhaseInfo(day: number, cycleLength: number) {
  const ovulation = Math.round(cycleLength * 0.5);
  const fertileStart = ovulation - 4;
  const fertileEnd = ovulation + 1;

  if (day <= 5) return { phase: "menstrual", label: "Menstrual Phase" };
  if (day <= fertileStart - 1) return { phase: "follicular", label: "Follicular Phase" };
  if (day <= fertileEnd) return { phase: "ovulation", label: "Ovulation Window" };
  return { phase: "luteal", label: "Luteal Phase" };
}

const transition = { type: "spring", stiffness: 260, damping: 30 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition },
};

export default function CycleDashboard() {
  const { currentCycleDay, cycleLength, setMode } = useAppState();
  const { phase, label } = getPhaseInfo(currentCycleDay, cycleLength);
  const daysUntilPeriod = cycleLength - currentCycleDay;

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

        {/* Greeting */}
        <motion.p
          variants={item}
          className="font-display text-base italic text-muted-foreground text-center mb-8"
        >
          Your body is speaking. We're simply listening.
        </motion.p>

        {/* Cycle Ring */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <CycleRing
            currentDay={currentCycleDay}
            cycleLength={cycleLength}
            phase={phase}
            phaseLabel={label}
          />
        </motion.div>

        {/* AI Insight */}
        <motion.div
          variants={item}
          className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 mb-6"
        >
          <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-accent mb-2">
            AI Insight
          </p>
          <p className="font-ui text-sm text-foreground/80 leading-relaxed">
            {daysUntilPeriod <= 3
              ? `Your period is approaching in ${daysUntilPeriod} days. Consider lighter activities and warm drinks.`
              : phase === "ovulation"
              ? "You're in your fertile window. Your energy typically peaks now — schedule high-impact tasks today."
              : phase === "follicular"
              ? "Rising estrogen is boosting your energy and mood. Great time for creative projects."
              : "Your body is winding down this cycle. Prioritise rest and nourishing meals."}
          </p>
        </motion.div>

        {/* Phase Insights */}
        <motion.div variants={item} className="mb-6">
          <PhaseInsights
            currentDay={currentCycleDay}
            cycleLength={cycleLength}
            daysUntilPeriod={daysUntilPeriod}
          />
        </motion.div>

        {/* Daily Log */}
        <motion.div variants={item}>
          <DailyLog />
        </motion.div>
      </motion.div>
    </div>
  );
}
