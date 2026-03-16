import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/context/AppContext";
import { ArrowLeft, Settings, Baby, CalendarCheck, Stethoscope, Sparkles, MessageCircle } from "lucide-react";

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition },
};

export default function PregnancyDashboard() {
  const { setMode } = useAppState();
  const navigate = useNavigate();
  const currentWeek = 12;

  const trimester = currentWeek <= 12 ? "First" : currentWeek <= 27 ? "Second" : "Third";
  const weeksRemaining = 40 - currentWeek;
  const progress = (currentWeek / 40) * 100;

  return (
    <div className="min-h-screen bg-background pb-12">
      <motion.div
        className="max-w-md mx-auto px-5 pt-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-5">
          <button onClick={() => setMode(null)} className="p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <h1 className="font-display text-xl font-medium text-foreground">Femora</h1>
          <button className="p-2 -mr-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Settings className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* Hero card */}
        <motion.div variants={item} className="mb-6">
          <div className="relative w-full rounded-3xl overflow-hidden gradient-hero p-6 shadow-elevated">
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary-foreground/10 blur-sm" />
            <div className="absolute bottom-6 right-12 w-10 h-10 rounded-full bg-primary-foreground/8" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 font-ui text-[11px] font-medium text-primary-foreground mb-4">
                {trimester} Trimester
              </span>
              
              <h2 className="font-display text-5xl font-semibold text-primary-foreground leading-none">
                Week {currentWeek}
              </h2>
              
              <p className="font-ui text-sm text-primary-foreground/70 mt-3 font-light">
                {weeksRemaining} weeks remaining
              </p>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden mt-5">
                <motion.div
                  className="h-full bg-primary-foreground/80 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-ui text-[10px] text-primary-foreground/50">Week 1</span>
                <span className="font-ui text-[10px] text-primary-foreground/50">Week 40</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Baby size */}
        <motion.div variants={item} className="mb-5">
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-femora-sage-light flex items-center justify-center shrink-0">
              <Baby className="w-5 h-5 text-femora-sage" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-lg font-medium text-foreground">Size of a lime</p>
              <p className="font-ui text-xs text-muted-foreground font-light">~5.4 cm · ~14 g</p>
            </div>
          </div>
        </motion.div>

        {/* About your cycle stats */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 text-center">
            <span className="text-2xl">🤰</span>
            <p className="font-ui text-[10px] text-muted-foreground mt-2 font-light">Current week</p>
            <p className="font-display text-2xl font-semibold text-primary mt-1">{currentWeek}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 text-center">
            <span className="text-2xl">📅</span>
            <p className="font-ui text-[10px] text-muted-foreground mt-2 font-light">Weeks to go</p>
            <p className="font-display text-2xl font-semibold text-femora-violet mt-1">{weeksRemaining}</p>
          </div>
        </motion.div>

        {/* AI Insight */}
        <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border/40 mb-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2} />
            </div>
            <p className="font-ui text-xs font-medium text-primary">AI Insight</p>
          </div>
          <p className="font-ui text-sm text-foreground/75 leading-relaxed font-light">
            Week {currentWeek} — morning sickness often eases around now. Your energy may start returning. 
            Stay hydrated and consider gentle movement like walking or prenatal yoga.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          <button onClick={() => navigate("/appointments")} className="bg-card rounded-2xl p-4 shadow-card border border-border/40 text-left
                             hover:border-primary/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-femora-peach-light flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5 text-femora-peach" strokeWidth={1.5} />
            </div>
            <p className="font-ui text-xs font-medium text-foreground">Appointments</p>
          </button>
          <button onClick={() => navigate("/log")} className="bg-card rounded-2xl p-4 shadow-card border border-border/40 text-left
                             hover:border-primary/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-femora-violet-light flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 text-femora-violet" strokeWidth={1.5} />
            </div>
            <p className="font-ui text-xs font-medium text-foreground">Symptom Log</p>
          </button>
          <button onClick={() => navigate("/ai-chat")} className="bg-card rounded-2xl p-4 shadow-card border border-border/40 text-left
                             hover:border-primary/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-femora-sage-light flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5 text-femora-sage" strokeWidth={1.5} />
            </div>
            <p className="font-ui text-xs font-medium text-foreground">AI Chat</p>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
