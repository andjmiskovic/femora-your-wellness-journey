import { motion } from "framer-motion";

interface CycleHeroCardProps {
  currentDay: number;
  phaseLabel: string;
  nextEvent: string;
  nextEventDays: number;
}

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function CycleHeroCard({ currentDay, phaseLabel, nextEvent, nextEventDays }: CycleHeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
      className="relative w-full rounded-3xl overflow-hidden gradient-hero p-6 shadow-elevated"
    >
      {/* Decorative circles */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary-foreground/10 blur-sm" />
      <div className="absolute bottom-6 right-12 w-10 h-10 rounded-full bg-primary-foreground/8" />
      <div className="absolute top-1/2 right-6 w-6 h-6 rounded-full bg-primary-foreground/12" />
      
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 font-ui text-[11px] font-medium text-primary-foreground mb-4">
          {phaseLabel}
        </span>
        
        <h2 className="font-display text-5xl font-semibold text-primary-foreground leading-none">
          day {currentDay}
        </h2>
        
        <p className="font-ui text-sm text-primary-foreground/70 mt-3 font-light">
          {nextEvent}<br />
          <span className="font-medium text-primary-foreground">in {nextEventDays} days</span>
        </p>
      </div>
    </motion.div>
  );
}
