import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type AuthView = "login" | "signup" | "forgot";

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function Auth() {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (view === "login") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate("/");
      } else if (view === "signup") {
        const { error } = await signUp(email, password, displayName);
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      } else {
        const { error } = await resetPassword(email);
        if (error) throw error;
        toast.success("Password reset link sent to your email!");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Hero gradient */}
      <div className="relative min-h-[35vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-8 right-6 w-28 h-28 rounded-full bg-primary-foreground/10 blur-sm animate-float" />
        <div className="absolute bottom-16 left-3 w-16 h-16 rounded-full bg-primary-foreground/8 blur-sm animate-float" style={{ animationDelay: "1.5s" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="relative z-10 px-8 pb-8 text-left w-full max-w-md"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-primary-foreground leading-tight">
            {view === "login" && "Welcome back"}
            {view === "signup" && "Create account"}
            {view === "forgot" && "Reset password"}
          </h1>
          <p className="font-ui text-sm text-primary-foreground/70 mt-2 font-light">
            {view === "login" && "Sign in to continue your journey"}
            {view === "signup" && "Start tracking your health today"}
            {view === "forgot" && "We'll send you a reset link"}
          </p>
        </motion.div>
      </div>

      {/* Form section */}
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8 pb-10 flex-1">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.form
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {view === "signup" && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-2xl bg-card border border-border/60 font-ui text-sm
                               placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30
                               transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-11 pr-4 rounded-2xl bg-card border border-border/60 font-ui text-sm
                             placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30
                             transition-all"
                />
              </div>

              {view !== "forgot" && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full h-12 pl-11 pr-12 rounded-2xl bg-card border border-border/60 font-ui text-sm
                               placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30
                               transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {view === "login" && (
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="font-ui text-xs text-primary hover:text-primary/80 transition-colors ml-1"
                >
                  Forgot password?
                </button>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.97 }}
                className="w-full h-12 rounded-2xl gradient-hero font-ui text-sm font-medium text-primary-foreground
                           shadow-glow disabled:opacity-60 transition-all"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Please wait...
                  </span>
                ) : (
                  <>
                    {view === "login" && "Sign in"}
                    {view === "signup" && "Create account"}
                    {view === "forgot" && "Send reset link"}
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-6 text-center">
            {view === "login" && (
              <p className="font-ui text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button onClick={() => setView("signup")} className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Sign up
                </button>
              </p>
            )}
            {view === "signup" && (
              <p className="font-ui text-sm text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setView("login")} className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Sign in
                </button>
              </p>
            )}
            {view === "forgot" && (
              <button
                onClick={() => setView("login")}
                className="inline-flex items-center gap-1.5 font-ui text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
              </button>
            )}
          </div>

          <p className="mt-8 text-[11px] text-muted-foreground/40 text-center font-ui font-light">
            Your data stays private and secure
          </p>
        </div>
      </div>
    </div>
  );
}
