import { motion } from "framer-motion";
import DailyLog from "@/components/DailyLog";

export default function LogPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative min-h-[18vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 px-6 pb-6 w-full max-w-md mx-auto">
          <h1 className="font-display text-3xl font-semibold text-primary-foreground">Daily Log</h1>
        </div>
      </div>
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DailyLog />
        </motion.div>
      </div>
    </div>
  );
}
