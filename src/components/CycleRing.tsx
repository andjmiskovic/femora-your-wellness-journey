import { motion } from "framer-motion";

interface CycleRingProps {
  currentDay: number;
  cycleLength: number;
  phase: string;
  phaseLabel: string;
}

const transition = { type: "spring" as const, stiffness: 260, damping: 30 };

export default function CycleRing({ currentDay, cycleLength, phase, phaseLabel }: CycleRingProps) {
  const progress = currentDay / cycleLength;
  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference * (1 - progress);

  // Fertile window (days 10-16 for a 28-day cycle)
  const fertileStart = Math.round(cycleLength * 0.36);
  const fertileEnd = Math.round(cycleLength * 0.57);
  const isFertile = currentDay >= fertileStart && currentDay <= fertileEnd;

  return (
    <motion.div
      className="relative w-64 h-64 flex items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={transition}
    >
      {/* Glow behind ring during fertile window */}
      {isFertile && (
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
      )}

      {/* SVG Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
        {/* Background ring */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        {/* Progress ring */}
        <motion.circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ ...transition, duration: 1.2 }}
        />
        {/* Fertile window arc */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(circumference * (fertileEnd - fertileStart)) / cycleLength} ${circumference}`}
          strokeDashoffset={-(circumference * fertileStart) / cycleLength}
          opacity={0.5}
        />
      </svg>

      {/* Center content */}
      <div className="text-center z-10">
        <h2 className="font-display text-4xl italic font-light text-foreground">
          Day {currentDay}
        </h2>
        <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-accent mt-2">
          {phaseLabel}
        </p>
        <p className="font-ui text-xs text-muted-foreground mt-1">
          of {cycleLength}
        </p>
      </div>
    </motion.div>
  );
}
