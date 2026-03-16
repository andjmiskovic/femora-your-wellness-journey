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
    gradient: "from-femora-rose to-femora-violet",
    bgLight: "bg-femora-rose-light",
  },
  {
    id: "conceive" as AppMode,
    icon: Heart,
    title: "Trying to conceive",
    description: "Precision fertility insights for your journey",
    gradient: "from-femora-peach to-femora-rose",
    bgLight: "bg-femora-peach-light",
  },
  {
    id: "pregnancy" as AppMode,
    icon: Baby,
    title: "I am pregnant",
    description: "Week-by-week guidance through your pregnancy",
    gradient: "from-femora-sage to-femora-violet",
    bgLight: "bg-femora-sage-light",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition },
};

export default function Onboarding() {
  const { setMode } = useAppState();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 gradient-mesh opacity-80" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-femora-violet/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-femora-peach/5 blur-3xl animate-pulse-soft" />

      <motion.div
        className="w-full max-w-md flex flex-col items-center relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Brand */}
        <motion.div variants={item} className="mb-14 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-6">
            <Heart className="w-7 h-7 text-primary-foreground" strokeWidth={1.5} fill="currentColor" />
          </div>
          <h1 className="font-display text-5xl font-medium text-foreground tracking-tight">
            Femora
          </h1>
          <p className="font-ui text-sm text-muted-foreground mt-3 font-light">
            Your body, beautifully understood
          </p>
        </motion.div>

        {/* Prompt */}
        <motion.p
          variants={item}
          className="font-display text-xl text-foreground text-center mb-10 italic"
        >
          What brings you here?
        </motion.p>

        {/* Mode Cards */}
        <div className="w-full space-y-3">
          {modes.map((m) => (
            <motion.button
              key={m.id}
              variants={item}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode(m.id)}
              className="w-full flex items-center gap-4 p-5 rounded-2xl glass shadow-card
                         text-left group relative overflow-hidden"
            >
              {/* Hover gradient reveal */}
              <div className={`absolute inset-0 bg-gradient-to-r ${m.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
              
              <div className={`w-12 h-12 rounded-xl ${m.bgLight} flex items-center justify-center shrink-0
                              group-hover:scale-105 transition-transform duration-300`}>
                <m.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <span className="font-ui text-[15px] font-medium text-foreground block">{m.title}</span>
                <span className="font-ui text-xs text-muted-foreground mt-0.5 block font-light">
                  {m.description}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          variants={item}
          className="mt-14 text-xs text-muted-foreground/50 text-center font-ui font-light"
        >
          Your data stays private and secure
        </motion.p>
      </motion.div>
    </div>
  );
}
