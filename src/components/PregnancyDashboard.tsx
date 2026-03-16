import { motion } from "framer-motion";
import { useAppState } from "@/context/AppContext";
import { ArrowLeft, Settings, Baby, CalendarCheck, Stethoscope } from "lucide-react";

const transition = { type: "spring", stiffness: 260, damping: 30 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition },
};

export default function PregnancyDashboard() {
  const { setMode } = useAppState();
  const currentWeek = 12; // Would come from state in production

  const trimester = currentWeek <= 12 ? "First" : currentWeek <= 27 ? "Second" : "Third";
  const weeksRemaining = 40 - currentWeek;
  const progress = (currentWeek / 40) * 100;

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
          className="font-display text-base italic text-muted-foreground text-center mb-10"
        >
          Growing beautifully, week by week
        </motion.p>

        {/* Growth Path */}
        <motion.div variants={item} className="mb-8">
          <div className="bg-card rounded-luxury p-6 shadow-soft border border-border/50">
            <div className="text-center mb-6">
              <h2 className="font-display text-5xl italic font-light text-foreground">
                Week {currentWeek}
              </h2>
              <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-accent mt-2">
                {trimester} Trimester
              </p>
              <p className="font-ui text-xs text-muted-foreground mt-1">
                {weeksRemaining} weeks remaining
              </p>
            </div>

            {/* Linear progress */}
            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-femora-sage rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-ui text-[9px] text-muted-foreground">Week 1</span>
              <span className="font-ui text-[9px] text-muted-foreground">Week 40</span>
            </div>
          </div>
        </motion.div>

        {/* Baby size */}
        <motion.div variants={item} className="mb-6">
          <div className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-femora-sage/30 flex items-center justify-center shrink-0">
              <Baby className="w-5 h-5 text-femora-sage" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-lg text-foreground">Size of a lime</p>
              <p className="font-ui text-xs text-muted-foreground">~5.4 cm · ~14 g</p>
            </div>
          </div>
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
            Week {currentWeek} — morning sickness often eases around now. Your energy may start returning. 
            Stay hydrated and consider gentle movement like walking or prenatal yoga.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <button className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 text-left
                             hover:bg-primary/20 transition-colors">
            <CalendarCheck className="w-5 h-5 text-accent mb-3" strokeWidth={1.5} />
            <p className="font-ui text-sm text-foreground">Appointments</p>
            <p className="font-ui text-[10px] text-muted-foreground mt-1">Next: Ultrasound</p>
          </button>
          <button className="bg-card rounded-luxury p-5 shadow-soft border border-border/50 text-left
                             hover:bg-primary/20 transition-colors">
            <Stethoscope className="w-5 h-5 text-accent mb-3" strokeWidth={1.5} />
            <p className="font-ui text-sm text-foreground">Symptom Log</p>
            <p className="font-ui text-[10px] text-muted-foreground mt-1">Track daily</p>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
