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
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const fertileStart = Math.round(cycleLength * 0.36);
  const fertileEnd = Math.round(cycleLength * 0.57);
  const isFertile = currentDay >= fertileStart && currentDay <= fertileEnd;

  return (
    <motion.div
      className="relative w-56 h-56 flex items-center justify-center"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={transition}
    >
      {/* Glow */}
      <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-700 ${isFertile ? 'opacity-40' : 'opacity-15'}`}
           style={{ background: 'var(--gradient-primary)' }} />

      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 224 224">
        {/* Track */}
        <circle cx="112" cy="112" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--femora-rose))" />
            <stop offset="100%" stopColor="hsl(var(--femora-violet))" />
          </linearGradient>
          <linearGradient id="fertileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--femora-peach))" />
            <stop offset="100%" stopColor="hsl(var(--femora-rose))" />
          </linearGradient>
        </defs>

        {/* Progress arc */}
        <motion.circle
          cx="112" cy="112" r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ ...transition, duration: 1.2 }}
        />

        {/* Fertile window */}
        <circle
          cx="112" cy="112" r={radius}
          fill="none"
          stroke="url(#fertileGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(circumference * (fertileEnd - fertileStart)) / cycleLength} ${circumference}`}
          strokeDashoffset={-(circumference * fertileStart) / cycleLength}
          opacity={0.4}
        />

        {/* Current position dot */}
        <circle
          cx={112 + radius * Math.cos(2 * Math.PI * progress - Math.PI / 2)}
          cy={112 + radius * Math.sin(2 * Math.PI * progress - Math.PI / 2)}
          r="5"
          fill="hsl(var(--primary))"
          className="drop-shadow-lg"
        />
      </svg>

      {/* Center */}
      <div className="text-center z-10">
        <p className="font-ui text-xs font-light text-muted-foreground mb-1">Day</p>
        <h2 className="font-display text-5xl font-medium text-foreground leading-none">
          {currentDay}
        </h2>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
          <p className="font-ui text-[11px] font-medium text-primary">
            {phaseLabel}
          </p>
        </div>
        <p className="font-ui text-[11px] text-muted-foreground mt-2 font-light">
          of {cycleLength} days
        </p>
      </div>
    </motion.div>
  );
}
