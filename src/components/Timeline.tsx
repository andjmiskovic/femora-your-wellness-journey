import { motion } from "framer-motion";

interface TimelineEvent {
  date: string;
  dateRange: string;
  label: string;
  color: "rose" | "peach" | "violet" | "sage";
}

interface TimelineProps {
  events: TimelineEvent[];
}

const colorMap = {
  rose: { dot: "bg-primary", badge: "bg-femora-rose-light text-primary", label: "text-primary" },
  peach: { dot: "bg-femora-peach", badge: "bg-femora-peach-light text-femora-peach", label: "text-femora-peach" },
  violet: { dot: "bg-femora-violet", badge: "bg-femora-violet-light text-femora-violet", label: "text-femora-violet" },
  sage: { dot: "bg-femora-sage", badge: "bg-femora-sage-light text-femora-sage", label: "text-femora-sage" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
};

export default function Timeline({ events }: TimelineProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-0">
      <h3 className="font-display text-lg font-medium text-foreground mb-4">Timelines</h3>
      
      {events.map((event, i) => {
        const colors = colorMap[event.color];
        return (
          <motion.div key={i} variants={item} className="flex gap-4 relative">
            {/* Timeline line */}
            <div className="flex flex-col items-center w-14 shrink-0">
              <span className="font-ui text-xs font-medium text-foreground">{event.date}</span>
              <span className="font-ui text-[10px] text-muted-foreground">{event.dateRange}</span>
              {i < events.length - 1 && (
                <div className="w-px flex-1 bg-border mt-2 mb-0" />
              )}
            </div>
            
            {/* Dot */}
            <div className="flex flex-col items-center pt-1">
              <div className={`w-3 h-3 rounded-full ${colors.dot} shrink-0`} />
              {i < events.length - 1 && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>
            
            {/* Content */}
            <div className="pb-6 pt-0 flex-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-ui font-medium ${colors.badge}`}>
                {event.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
