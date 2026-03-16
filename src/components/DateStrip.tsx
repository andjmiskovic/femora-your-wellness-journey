import { motion } from "framer-motion";

interface DateStripProps {
  currentDay: number;
  cycleLength: number;
}

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function DateStrip({ currentDay, cycleLength }: DateStripProps) {
  const today = new Date();
  const todayDayOfWeek = today.getDay();
  
  // Generate a week centered around today
  const days = Array.from({ length: 7 }, (_, i) => {
    const offset = i - 3; // center today
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const cycleDay = currentDay + offset;
    
    return {
      dayNum: date.getDate(),
      weekday: WEEKDAYS[date.getDay()],
      isToday: offset === 0,
      cycleDay: cycleDay > 0 && cycleDay <= cycleLength ? cycleDay : null,
    };
  });

  return (
    <div className="flex items-center justify-between gap-1 px-1">
      {days.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, type: "spring" as const, stiffness: 300, damping: 28 }}
          className="flex flex-col items-center gap-1.5 flex-1"
        >
          <span className={`font-ui text-[10px] font-medium tracking-wide ${
            d.isToday ? "text-primary" : "text-muted-foreground/60"
          }`}>
            {d.weekday}
          </span>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-ui font-medium transition-all
            ${d.isToday 
              ? "gradient-primary text-primary-foreground shadow-glow" 
              : "text-foreground hover:bg-secondary"
            }`}>
            {d.dayNum}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
