import { motion } from "framer-motion";
import { CalendarDays, Droplets, Heart, TrendingUp } from "lucide-react";

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  accentColor?: string;
}

function InsightCard({ icon, title, value, subtitle, accentColor = "bg-primary/10" }: InsightCardProps) {
  return (
    <div className="glass rounded-2xl p-4 shadow-card flex-1 min-w-[140px]">
      <div className={`w-9 h-9 rounded-xl ${accentColor} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="font-display text-2xl font-medium text-foreground">{value}</p>
      <p className="font-ui text-[11px] text-muted-foreground mt-0.5 font-light">
        {title}
      </p>
      {subtitle && (
        <p className="font-ui text-[11px] font-medium text-primary mt-1">{subtitle}</p>
      )}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
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
    ? currentDay === ovulationDay ? "High" : "Moderate"
    : "Low";

  return (
    <motion.div className="w-full" variants={container} initial="hidden" animate="show">
      <div className="grid grid-cols-2 gap-3">
        <motion.div variants={item}>
          <InsightCard
            icon={<CalendarDays className="w-4 h-4 text-primary" strokeWidth={1.5} />}
            title="Next period"
            value={`${daysUntilPeriod}d`}
            subtitle={daysUntilPeriod <= 3 ? "Approaching" : undefined}
            accentColor="bg-femora-rose-light"
          />
        </motion.div>
        <motion.div variants={item}>
          <InsightCard
            icon={<Heart className="w-4 h-4 text-femora-peach" strokeWidth={1.5} />}
            title="Fertility"
            value={fertilityProbability}
            subtitle={isFertile ? "Fertile window" : undefined}
            accentColor="bg-femora-peach-light"
          />
        </motion.div>
        <motion.div variants={item}>
          <InsightCard
            icon={<Droplets className="w-4 h-4 text-femora-violet" strokeWidth={1.5} />}
            title="Ovulation"
            value={`Day ${ovulationDay}`}
            subtitle={currentDay === ovulationDay ? "Today" : undefined}
            accentColor="bg-femora-violet-light"
          />
        </motion.div>
        <motion.div variants={item}>
          <InsightCard
            icon={<TrendingUp className="w-4 h-4 text-femora-sage" strokeWidth={1.5} />}
            title="Cycle day"
            value={`${currentDay}/${cycleLength}`}
            accentColor="bg-femora-sage-light"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
