import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, User, Mail, Calendar, Camera } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.date_of_birth || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await updateProfile({
        display_name: displayName || null,
        date_of_birth: dateOfBirth || null,
      });
      if (error) throw error;
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative min-h-[28vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-10 right-6 w-24 h-24 rounded-full bg-primary-foreground/10 blur-sm animate-float" />

        <div className="relative z-10 px-6 pb-8 w-full max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm font-ui transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-display text-3xl font-semibold text-primary-foreground">Your profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8 pb-10">
        <div className="max-w-md mx-auto space-y-6">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center -mt-14"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow">
                <User className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border border-border shadow-card
                                 flex items-center justify-center hover:bg-muted transition-colors">
                <Camera className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </motion.div>

          {/* Email (read-only) */}
          <div className="space-y-1.5">
            <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" strokeWidth={1.5} />
              <div className="w-full h-12 pl-11 pr-4 rounded-2xl bg-muted/50 border border-border/40 font-ui text-sm
                              flex items-center text-muted-foreground">
                {user?.email}
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider">Display name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-card border border-border/60 font-ui text-sm
                           placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="font-ui text-xs text-muted-foreground font-medium uppercase tracking-wider">Date of birth</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-card border border-border/60 font-ui text-sm
                           text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Save */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={saving}
            className="w-full h-12 rounded-2xl gradient-hero font-ui text-sm font-medium text-primary-foreground
                       shadow-glow disabled:opacity-60 transition-all"
          >
            {saving ? "Saving..." : "Save changes"}
          </motion.button>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full h-12 rounded-2xl border border-destructive/20 font-ui text-sm font-medium text-destructive
                       hover:bg-destructive/5 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
