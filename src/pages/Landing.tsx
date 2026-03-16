import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  Brain,
  Baby,
  Shield,
  Star,
  ArrowRight,
  ArrowDown,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import heroWoman from "@/assets/hero-woman.jpg";
import wellnessWoman from "@/assets/wellness-woman.jpg";
import aiWoman from "@/assets/ai-woman.jpg";
import appScreensPreview from "@/assets/app-screens-preview.png";
import appStoreBadges from "@/assets/app-store-badges.png";

const transition = { type: "spring" as const, stiffness: 200, damping: 24 };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: Calendar,
    title: "Cycle Tracking",
    desc: "Track your period, predict your next cycle, and see your fertile window with clear and simple visuals.",
  },
  {
    icon: Brain,
    title: "AI Body Insights",
    desc: "Femora analyses your symptoms, mood, and patterns to give you personalised health insights.",
  },
  {
    icon: Heart,
    title: "Fertility Tracking",
    desc: "Identify ovulation days and understand your fertility window with smart predictions.",
  },
  {
    icon: Baby,
    title: "Pregnancy Mode",
    desc: "Switch to pregnancy mode and track weekly progress, symptoms, and doctor appointments.",
  },
];

const testimonials = [
  {
    quote: "Femora helped me finally understand my cycle.",
    name: "Sarah M.",
    initials: "SM",
  },
  {
    quote: "The insights are incredibly helpful and the design is beautiful.",
    name: "Emily R.",
    initials: "ER",
  },
  {
    quote: "It feels like a personal health companion.",
    name: "Jessica L.",
    initials: "JL",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  const scrollToLearnMore = () => {
    document.getElementById("value-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-ui overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-foreground">Femora</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#ai-section" className="hover:text-foreground transition-colors">AI Insights</a>
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/auth?tab=signup")}
              className="text-sm font-medium px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-28 pb-10 md:pt-36 md:pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-femora-rose-light text-primary text-xs font-medium">
                  <Star className="w-3 h-3" /> AI-Powered Wellness
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] mb-6"
              >
                Understand Your Body with{" "}
                <span className="text-primary">Femora</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-lg mb-8"
              >
                AI-powered women's health tracking that helps you monitor your cycle,
                fertility, symptoms, and pregnancy journey in one safe and elegant app.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/auth?tab=signup")}
                  className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-glow flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
                >
                  Download the App <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToLearnMore}
                  className="px-8 py-4 rounded-full border border-border bg-card text-foreground font-medium text-sm shadow-card flex items-center justify-center gap-2 hover:border-primary/30 transition-colors active:scale-[0.98]"
                >
                  Learn More <ArrowDown className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...transition, delay: 0.3 }}
              className="flex justify-center"
            >
              <img
                src={heroWoman}
                alt="Woman using Femora app on her phone"
                className="w-full max-w-sm rounded-3xl shadow-elevated object-cover aspect-[3/4]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section id="value-section" className="py-12 md:py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={transition}
            >
              <img
                src={wellnessWoman}
                alt="Woman practicing wellness and self-care"
                className="w-full max-w-sm mx-auto rounded-3xl shadow-elevated object-cover aspect-square"
              />
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6"
              >
                Women Deserve Smarter Health Tracking
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground font-light leading-relaxed"
              >
                Understanding your body shouldn't feel confusing. Femora helps women
                track their cycle, recognise patterns, and receive personalised
                insights powered by AI. Whether you want to monitor your period, plan
                for pregnancy, or simply understand your body better, Femora adapts to
                your journey.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4"
            >
              Everything You Need to Understand Your Cycle
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground font-light max-w-xl mx-auto">
              Powerful features designed with simplicity and elegance in mind.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-card border border-border/40 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-femora-rose-light flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APP PREVIEW SECTION */}
      <section className="py-12 md:py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4"
            >
              A Beautiful and Calm Experience
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-light max-w-xl mx-auto mb-12"
            >
              Femora is designed to feel safe, private, and empowering. With its
              minimalist design and gentle colour palette, tracking your health
              becomes part of a calming daily routine.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <img
              src={appScreensPreview}
              alt="Femora app screens showing cycle calendar, dashboard, and AI chat"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-elevated"
            />
          </motion.div>
        </div>
      </section>

      {/* AI SECTION */}
      <section id="ai-section" className="py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6"
              >
                Powered by Intelligent Insights
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground font-light leading-relaxed"
              >
                Femora uses AI to learn from your patterns and provide helpful
                insights about your cycle, symptoms, and fertility. Instead of just
                collecting data, Femora helps you understand what your body is telling
                you.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={transition}
            >
              <img
                src={aiVisualization}
                alt="AI data visualization showing health pattern analysis"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section id="privacy" className="py-20 md:py-28 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-3xl bg-femora-rose-light flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6"
            >
              Your Health Data Stays Private
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-light leading-relaxed max-w-lg mx-auto"
            >
              Femora is designed with privacy and safety in mind. Your personal health
              data is protected, and you always stay in control of your information.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-16"
          >
            Women Love Femora
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border/40 shadow-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground font-light leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-femora-rose-light flex items-center justify-center text-sm font-medium text-primary">
                    {t.initials}
                  </div>
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-primary/5 via-femora-violet-light/30 to-femora-peach-light/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6"
            >
              Start Understanding Your Body Today
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-light leading-relaxed max-w-lg mx-auto mb-10"
            >
              Join thousands of women using Femora to track their health, understand
              their cycle, and feel more confident about their bodies.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => navigate("/auth?tab=signup")}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-glow flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Download Femora <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img
                src={appStoreBadges}
                alt="Download on App Store and Google Play"
                className="h-12 mx-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <span className="font-display text-lg font-semibold text-foreground">Femora</span>
              <p className="text-sm text-muted-foreground font-light mt-2 leading-relaxed">
                Women's Health Companion
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                <li><a href="#" className="hover:text-foreground transition-colors">About Femora</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center">
            <p className="text-xs text-muted-foreground font-light">
              © {new Date().getFullYear()} Femora – Women's Health Companion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
