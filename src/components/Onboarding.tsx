import { motion } from "framer-motion";
import { useAppState, AppMode } from "@/context/AppContext";
import { Heart, Baby, CalendarHeart, ArrowRight } from "lucide-react";

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };

const modes = [
  {
    id: "cycle" as AppMode,
    icon: CalendarHeart,
    title: "Track my cycle",
    description: "Understand your rhythm and predict your phases",
  },
  {
    id: "conceive" as AppMode,
    icon: Heart,
    title: "Trying to conceive",
    description: "Precision fertility insights for your journey",
  },
  {
    id: "pregnancy" as AppMode,
    icon: Baby,
    title: "I am pregnant",
    description: "Week-by-week guidance through your pregnancy",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

export default function Onboarding() {
  const { setMode } = useAppState();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Hero gradient section */}
      <div className="relative flex-1 min-h-[45vh] flex items-end justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-hero" />
        
        {/* Floating circles */}
        <div className="absolute top-12 right-8 w-32 h-32 rounded-full bg-primary-foreground/10 blur-sm animate-float" />
        <div className="absolute bottom-20 left-4 w-20 h-20 rounded-full bg-primary-foreground/8 blur-sm animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "0.8s" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="relative z-10 px-8 pb-10 text-left w-full max-w-md"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground leading-tight">
            Keep track of<br />your health
          </h1>
          <p className="font-ui text-sm text-primary-foreground/75 mt-3 font-light max-w-[260px]">
            Easily and accurately track each phase of your cycle
          </p>
        </motion.div>
      </div>

      {/* Bottom white section */}
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8 pb-10">
        <motion.div
          className="max-w-md mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-5">
            Choose your journey
          </motion.p>

          <div className="space-y-3">
            {modes.map((m) => (
              <motion.button
                key={m.id}
                variants={item}
                whileTap={{ scale: 0.97 }}
                onClick={() => setMode(m.id)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card
                           border border-border/60 text-left group hover:border-primary/30
                           transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-femora-rose-light flex items-center justify-center shrink-0
                                group-hover:bg-primary/15 transition-colors duration-300">
                  <m.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-ui text-[15px] font-medium text-foreground block">{m.title}</span>
                  <span className="font-ui text-xs text-muted-foreground font-light block mt-0.5 truncate">
                    {m.description}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
              </motion.button>
            ))}
          </div>

          <motion.p variants={item} className="mt-8 text-[11px] text-muted-foreground/40 text-center font-ui font-light">
            Your data stays private and secure
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
