import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState, AppMode } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Heart, Baby, CalendarHeart, ArrowRight, ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

const modes = [
  { id: "cycle" as AppMode, icon: CalendarHeart, title: "Track my cycle", description: "Understand your rhythm and predict your phases" },
  { id: "conceive" as AppMode, icon: Heart, title: "Trying to conceive", description: "Precision fertility insights for your journey" },
  { id: "pregnancy" as AppMode, icon: Baby, title: "I am pregnant", description: "Week-by-week guidance through your pregnancy" },
];

export default function Onboarding() {
  const { setMode, setCycleLength, setPeriodStartDate } = useAppState();
  const { profile, updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [selectedMode, setSelectedMode] = useState<AppMode>(null);
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.date_of_birth || "");
  const [cycleLengthVal, setCycleLengthVal] = useState(28);
  const [lastPeriod, setLastPeriod] = useState("");

  const handleFinish = async () => {
    // Save everything
    await updateProfile({
      display_name: displayName || null,
      date_of_birth: dateOfBirth || null,
      onboarding_completed: true,
    } as any);

    if (selectedMode !== "pregnancy") {
      setCycleLength(cycleLengthVal);
      if (lastPeriod) setPeriodStartDate(new Date(lastPeriod));
    }
    setMode(selectedMode);
  };

  const totalSteps = selectedMode === "pregnancy" ? 3 : 4;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Hero gradient */}
      <div className="relative flex-shrink-0 min-h-[35vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-12 right-8 w-32 h-32 rounded-full bg-primary-foreground/10 blur-sm animate-float" />
        <div className="absolute bottom-20 left-4 w-20 h-20 rounded-full bg-primary-foreground/8 blur-sm animate-float" style={{ animationDelay: "1.5s" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="relative z-10 px-8 pb-10 text-left w-full max-w-md"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground leading-tight">
            {step === 0 ? "Welcome to\nFemora" : step === 1 ? "About you" : step === 2 ? "Your journey" : "Your cycle"}
          </h1>
          <p className="font-ui text-sm text-primary-foreground/75 mt-3 font-light max-w-[280px]">
            {step === 0 ? "Let's get to know you" : step === 1 ? "Tell us a bit about yourself" : step === 2 ? "Choose how you want to track" : "Set your cycle details"}
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8 pb-10 flex-1 flex flex-col">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          {/* Progress */}
          <div className="flex gap-1.5 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0: Name & DOB */}
            {step === 0 && (
              <motion.div key="step0" variants={container} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-4 flex-1">
                <motion.div variants={item} className="space-y-1.5">
                  <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider">Your name</label>
                  <Input
                    placeholder="Enter your name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="rounded-xl h-12"
                  />
                </motion.div>
                <motion.div variants={item} className="space-y-1.5">
                  <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider">Date of birth</label>
                  <Input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    className="rounded-xl h-12"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 1: Mode selection */}
            {step === 1 && (
              <motion.div key="step1" variants={container} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-3 flex-1">
                <motion.p variants={item} className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-widest mb-2">
                  Choose your journey
                </motion.p>
                {modes.map((m) => (
                  <motion.button
                    key={m.id}
                    variants={item}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedMode(m.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left group transition-all duration-300
                      ${selectedMode === m.id
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "bg-card shadow-card border-border/60 hover:border-primary/30"
                      }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                      ${selectedMode === m.id ? "bg-primary/15" : "bg-femora-rose-light group-hover:bg-primary/15"}`}>
                      <m.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-ui text-[15px] font-medium text-foreground block">{m.title}</span>
                      <span className="font-ui text-xs text-muted-foreground font-light block mt-0.5 truncate">{m.description}</span>
                    </div>
                    {selectedMode === m.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Cycle details (skip for pregnancy) */}
            {step === 2 && selectedMode !== "pregnancy" && (
              <motion.div key="step2" variants={container} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-5 flex-1">
                <motion.div variants={item}>
                  <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 block">Average cycle length</label>
                  <div className="flex items-center justify-center gap-5 p-5 rounded-2xl bg-card border border-border/60 shadow-card">
                    <button
                      onClick={() => setCycleLengthVal(Math.max(21, cycleLengthVal - 1))}
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                    </button>
                    <span className="font-display text-4xl font-semibold text-foreground w-16 text-center">{cycleLengthVal}</span>
                    <button
                      onClick={() => setCycleLengthVal(Math.min(45, cycleLengthVal + 1))}
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                    </button>
                    <span className="font-ui text-sm text-muted-foreground">days</span>
                  </div>
                </motion.div>

                <motion.div variants={item} className="space-y-1.5">
                  <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider">Last period start date</label>
                  <Input
                    type="date"
                    value={lastPeriod}
                    onChange={e => setLastPeriod(e.target.value)}
                    className="rounded-xl h-12"
                  />
                  <p className="font-ui text-[11px] text-muted-foreground font-light">Approximate is fine — you can adjust later</p>
                </motion.div>
              </motion.div>
            )}

            {/* Final step: Summary */}
            {((step === 2 && selectedMode === "pregnancy") || (step === 3 && selectedMode !== "pregnancy")) && (
              <motion.div key="final" variants={container} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div variants={item} className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mb-5 shadow-glow">
                  {selectedMode === "cycle" && <CalendarHeart className="w-8 h-8 text-primary-foreground" />}
                  {selectedMode === "conceive" && <Heart className="w-8 h-8 text-primary-foreground" />}
                  {selectedMode === "pregnancy" && <Baby className="w-8 h-8 text-primary-foreground" />}
                </motion.div>
                <motion.h2 variants={item} className="font-display text-2xl font-semibold text-foreground mb-2">
                  You're all set{displayName ? `, ${displayName}` : ""}!
                </motion.h2>
                <motion.p variants={item} className="font-ui text-sm text-muted-foreground font-light max-w-xs">
                  {selectedMode === "pregnancy"
                    ? "Your pregnancy dashboard is ready. Let's track your journey together."
                    : selectedMode === "conceive"
                    ? "Your fertility tracking is set up. We'll help you understand your fertile windows."
                    : "Your cycle tracking is ready. Let's understand your body together."}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" className="rounded-xl flex-1" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            )}

            {((step === 2 && selectedMode === "pregnancy") || (step === 3 && selectedMode !== "pregnancy")) ? (
              <Button className="rounded-xl flex-1" onClick={handleFinish}>
                Get Started <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                className="rounded-xl flex-1"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !selectedMode}
              >
                Continue <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>

          <p className="mt-6 text-[11px] text-muted-foreground/40 text-center font-ui font-light">
            Your data stays private and secure
          </p>
        </div>
      </div>
    </div>
  );
}
