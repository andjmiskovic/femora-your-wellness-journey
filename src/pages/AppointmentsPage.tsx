import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useAppState } from "@/context/AppContext";
import { Plus, Calendar, Clock, MapPin, Trash2, X, Stethoscope, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  title: string;
  appointment_type: string;
  date: string;
  time: string | null;
  location: string | null;
  notes: string | null;
}

const typeConfig: Record<string, { icon: typeof Stethoscope; color: string; bg: string }> = {
  general: { icon: Stethoscope, color: "text-primary", bg: "bg-femora-rose-light" },
  pap_smear: { icon: Stethoscope, color: "text-femora-violet", bg: "bg-femora-violet-light" },
  ultrasound: { icon: Baby, color: "text-femora-peach", bg: "bg-femora-peach-light" },
  prenatal: { icon: Baby, color: "text-femora-sage", bg: "bg-femora-sage-light" },
  checkup: { icon: Stethoscope, color: "text-primary", bg: "bg-femora-rose-light" },
};

const typeLabels: Record<string, string> = {
  general: "General Gyno",
  pap_smear: "Pap Smear",
  ultrasound: "Ultrasound",
  prenatal: "Prenatal Visit",
  checkup: "Check-up",
};

const transition = { type: "spring" as const, stiffness: 300, damping: 28 };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition } };

export default function AppointmentsPage() {
  const { user } = useAuth();
  const { mode } = useAppState();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [appointmentType, setAppointmentType] = useState("general");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  async function fetchAppointments() {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: true });
    if (!error && data) setAppointments(data);
    setLoading(false);
  }

  async function handleAdd() {
    if (!title || !date || !user) return;
    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      title,
      appointment_type: appointmentType,
      date,
      time: time || null,
      location: location || null,
      notes: notes || null,
    });
    if (error) {
      toast({ title: "Error", description: "Could not save appointment", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Appointment added" });
      setTitle(""); setDate(""); setTime(""); setLocation(""); setNotes("");
      setAppointmentType("general"); setShowForm(false);
      fetchAppointments();
    }
  }

  async function handleDelete(id: string) {
    await supabase.from("appointments").delete().eq("id", id);
    fetchAppointments();
  }

  const upcoming = appointments.filter(a => new Date(a.date) >= new Date(new Date().toDateString()));
  const past = appointments.filter(a => new Date(a.date) < new Date(new Date().toDateString()));

  const availableTypes = mode === "pregnancy"
    ? ["prenatal", "ultrasound", "general", "checkup"]
    : ["general", "pap_smear", "ultrasound", "checkup"];

  return (
    <div className="min-h-screen bg-background pb-24">
      <motion.div className="max-w-md mx-auto px-5 pt-5" variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-semibold text-foreground">Appointments</h1>
          <Button size="sm" className="rounded-xl gap-1.5" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> Add
          </Button>
        </motion.div>

        {/* Add Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-ui text-sm font-medium text-foreground">New Appointment</p>
                  <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <Input placeholder="Title (e.g. Annual check-up)" value={title} onChange={e => setTitle(e.target.value)} className="rounded-xl" />

                <div className="flex flex-wrap gap-2">
                  {availableTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setAppointmentType(t)}
                      className={`px-3 py-1.5 rounded-full font-ui text-xs transition-all ${
                        appointmentType === t
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {typeLabels[t]}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl" />
                  <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="rounded-xl" />
                </div>

                <Input placeholder="Location (optional)" value={location} onChange={e => setLocation(e.target.value)} className="rounded-xl" />
                <Textarea placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} className="rounded-xl min-h-[60px]" />

                <Button className="w-full rounded-xl" onClick={handleAdd} disabled={!title || !date}>
                  Save Appointment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming */}
        <motion.div variants={item} className="mb-6">
          <h2 className="font-ui text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Upcoming</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : upcoming.length === 0 ? (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 text-center">
              <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" strokeWidth={1.5} />
              <p className="font-ui text-sm text-muted-foreground font-light">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(appt => {
                const cfg = typeConfig[appt.appointment_type] || typeConfig.general;
                const Icon = cfg.icon;
                return (
                  <motion.div key={appt.id} variants={item} className="bg-card rounded-2xl p-4 shadow-card border border-border/40 flex gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-ui text-sm font-medium text-foreground truncate">{appt.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-ui text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(appt.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                        </span>
                        {appt.time && (
                          <span className="font-ui text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {appt.time}
                          </span>
                        )}
                      </div>
                      {appt.location && (
                        <span className="font-ui text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {appt.location}
                        </span>
                      )}
                      {appt.notes && <p className="font-ui text-xs text-muted-foreground mt-1 font-light">{appt.notes}</p>}
                    </div>
                    <button onClick={() => handleDelete(appt.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Past */}
        {past.length > 0 && (
          <motion.div variants={item}>
            <h2 className="font-ui text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Past</h2>
            <div className="space-y-3">
              {past.map(appt => {
                const cfg = typeConfig[appt.appointment_type] || typeConfig.general;
                const Icon = cfg.icon;
                return (
                  <div key={appt.id} className="bg-card/60 rounded-2xl p-4 border border-border/30 flex gap-3 opacity-60">
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-ui text-sm font-medium text-foreground truncate">{appt.title}</p>
                      <span className="font-ui text-[11px] text-muted-foreground">
                        {new Date(appt.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <button onClick={() => handleDelete(appt.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
