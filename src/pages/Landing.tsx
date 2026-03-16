import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar, Bell, Shield, Sparkles, ArrowRight } from "lucide-react";

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition },
};

const features = [
  { icon: Calendar, title: "Cycle Tracking", desc: "Intelligent predictions powered by your unique patterns" },
  { icon: Heart, title: "Fertility Insights", desc: "Know your fertile window with precision timing" },
  { icon: Bell, title: "Smart Reminders", desc: "Gentle notifications before your period and fertile days" },
  { icon: Shield, title: "Private & Secure", desc: "Your data is encrypted and never shared" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <div className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute top-12 right-10 w-32 h-32 rounded-full bg-primary-foreground/10 blur-xl animate-pulse" />
        <div className="absolute bottom-32 left-8 w-20 h-20 rounded-full bg-primary-foreground/8 blur-lg" />

        <motion.div
          className="relative z-10 px-6 pb-12 w-full max-w-md mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle text-primary-foreground/90 text-xs font-ui font-medium mb-4">
              <Sparkles className="w-3 h-3" /> AI-Powered Wellness
            </div>
          </motion.div>
          <motion.h1 variants={item} className="font-display text-5xl font-semibold text-primary-foreground leading-[1.1] mb-4">
            Femora
          </motion.h1>
          <motion.p variants={item} className="font-ui text-base text-primary-foreground/80 font-light leading-relaxed max-w-xs">
            Your cycle, beautifully understood. Track, predict, and thrive with luxury precision.
          </motion.p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-[2.5rem] -mt-8 relative z-10">
        <motion.div
          className="px-6 pt-10 pb-10 max-w-md mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* CTA Buttons */}
          <motion.div variants={item} className="space-y-3 mb-12">
            <button
              onClick={() => navigate("/auth?tab=signup")}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-ui font-medium text-sm shadow-glow flex items-center justify-center gap-2 hover:opacity-95 transition-opacity active:scale-[0.98]"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="w-full py-4 rounded-2xl bg-card border border-border/60 text-foreground font-ui font-medium text-sm shadow-card hover:border-primary/30 transition-colors active:scale-[0.98]"
            >
              I already have an account
            </button>
          </motion.div>

          {/* Features */}
          <motion.div variants={item}>
            <h2 className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-4">
              Why Femora
            </h2>
          </motion.div>
          <div className="space-y-3">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/40 shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-ui text-sm font-medium text-foreground">{f.title}</h3>
                  <p className="font-ui text-xs text-muted-foreground font-light mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.p variants={item} className="text-center text-[11px] text-muted-foreground/40 font-ui font-light mt-10">
            Femora v1.0 · Your data stays private
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
