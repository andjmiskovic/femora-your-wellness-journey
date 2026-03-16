import { motion } from "framer-motion";
import { useAppState, AppMode } from "@/context/AppContext";
import { Heart, Baby, CalendarHeart } from "lucide-react";

const transition = { type: "spring", stiffness: 260, damping: 30 };

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
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition },
};

export default function Onboarding() {
  const { setMode } = useAppState();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-sm flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Brand */}
        <motion.div variants={item} className="mb-16 text-center">
          <h1 className="font-display text-5xl italic font-light text-foreground tracking-tight">
            Femora
          </h1>
          <p className="font-ui text-xs uppercase tracking-[0.25em] text-muted-foreground mt-3">
            Align with your rhythm
          </p>
        </motion.div>

        {/* Prompt */}
        <motion.p
          variants={item}
          className="font-display text-xl text-foreground/80 text-center mb-10 italic"
        >
          What brings you here today?
        </motion.p>

        {/* Mode Cards */}
        <div className="w-full space-y-4">
          {modes.map((m) => (
            <motion.button
              key={m.id}
              variants={item}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMode(m.id)}
              className="w-full flex items-center gap-5 p-6 rounded-luxury bg-card shadow-soft 
                         border border-border/50 text-left transition-colors
                         hover:bg-primary/20 active:bg-primary/30 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center shrink-0
                              group-hover:bg-primary/50 transition-colors">
                <m.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-display text-lg text-foreground block">{m.title}</span>
                <span className="font-ui text-xs text-muted-foreground mt-0.5 block">
                  {m.description}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          variants={item}
          className="mt-12 text-[10px] text-muted-foreground/60 text-center font-ui uppercase tracking-[0.15em]"
        >
          Your data stays private and secure
        </motion.p>
      </motion.div>
    </div>
  );
}
