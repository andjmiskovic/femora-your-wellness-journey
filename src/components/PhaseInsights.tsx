import { motion } from "framer-motion";
import { CalendarDays, Droplets, Heart, TrendingUp } from "lucide-react";

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}

function InsightCard({ icon, title, value, subtitle }: InsightCardProps) {
  return (
    <div className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 flex-1 min-w-[140px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="font-display text-2xl text-foreground">{value}</p>
      <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
        {title}
      </p>
      {subtitle && (
        <p className="font-ui text-xs text-accent mt-1">{subtitle}</p>
      )}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 30 } },
};

interface PhaseInsightsProps {
  currentDay: number;
  cycleLength: number;
  daysUntilPeriod: number;
}

export default function PhaseInsights({ currentDay, cycleLength, daysUntilPeriod }: PhaseInsightsProps) {
  const ovulationDay = Math.round(cycleLength * 0.5);
  const fertileStart = ovulationDay - 4;
  const fertileEnd = ovulationDay + 1;
  const isFertile = currentDay >= fertileStart && currentDay <= fertileEnd;

  const fertilityProbability = isFertile
    ? currentDay === ovulationDay
      ? "High"
      : "Moderate"
    : "Low";

  return (
    <motion.div
      className="w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-2 gap-3">
        <motion.div variants={item}>
          <InsightCard
            icon={<CalendarDays className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            title="Next period"
            value={`${daysUntilPeriod}d`}
            subtitle={daysUntilPeriod <= 3 ? "Approaching" : undefined}
          />
        </motion.div>
        <motion.div variants={item}>
          <InsightCard
            icon={<Heart className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            title="Fertility"
            value={fertilityProbability}
            subtitle={isFertile ? "Fertile window" : undefined}
          />
        </motion.div>
        <motion.div variants={item}>
          <InsightCard
            icon={<Droplets className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            title="Ovulation"
            value={`Day ${ovulationDay}`}
            subtitle={currentDay === ovulationDay ? "Today" : undefined}
          />
        </motion.div>
        <motion.div variants={item}>
          <InsightCard
            icon={<TrendingUp className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            title="Cycle day"
            value={`${currentDay}/${cycleLength}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
