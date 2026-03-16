import { useState } from "react";
import { motion } from "framer-motion";

interface SymptomSliderProps {
  label: string;
  icon: string;
  value: number;
  onChange: (val: number) => void;
}

function SymptomSlider({ label, icon, value, onChange }: SymptomSliderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg w-8 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between mb-1.5">
          <span className="font-ui text-xs font-light text-muted-foreground">{label}</span>
          <span className="font-ui text-[11px] font-medium text-primary">{value > 0 ? `${value}/5` : "—"}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={0}
            max={5}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-1.5 appearance-none rounded-full bg-border/80 cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-glow
                       [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) ${(value / 5) * 100}%, hsl(var(--border)) ${(value / 5) * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const symptoms = [
  { key: "mood", label: "Mood", icon: "😊" },
  { key: "energy", label: "Energy", icon: "⚡" },
  { key: "cramps", label: "Cramps", icon: "💫" },
  { key: "hunger", label: "Cravings", icon: "🍓" },
  { key: "bleeding", label: "Flow", icon: "💧" },
];

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function DailyLog() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(symptoms.map((s) => [s.key, 0]))
  );
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => setSaved(true);

  const hasInput = Object.values(values).some((v) => v > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="w-full glass rounded-2xl p-6 shadow-card"
    >
      <h3 className="font-display text-lg font-medium text-foreground mb-5">Daily Log</h3>

      <div className="space-y-4">
        {symptoms.map((s) => (
          <SymptomSlider
            key={s.key}
            label={s.label}
            icon={s.icon}
            value={values[s.key]}
            onChange={(val) => handleChange(s.key, val)}
          />
        ))}
      </div>

      {hasInput && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={transition}
          onClick={handleSave}
          className="mt-6 w-full py-3.5 rounded-xl gradient-primary text-primary-foreground
                     font-ui text-sm font-medium tracking-wide shadow-glow
                     transition-all duration-300 hover:shadow-elevated"
        >
          {saved ? "Saved ✓" : "Log Today"}
        </motion.button>
      )}
    </motion.div>
  );
}
