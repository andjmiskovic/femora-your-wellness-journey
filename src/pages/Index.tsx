import { useAppState } from "@/context/AppContext";
import Onboarding from "@/components/Onboarding";
import CycleDashboard from "@/components/CycleDashboard";
import ConceiveDashboard from "@/components/ConceiveDashboard";
import PregnancyDashboard from "@/components/PregnancyDashboard";

const Index = () => {
  const { mode, onboardingCompleted } = useAppState();

  // Show onboarding only if user hasn't completed it
  if (!onboardingCompleted || !mode) return <Onboarding />;
  if (mode === "cycle") return <CycleDashboard />;
  if (mode === "conceive") return <ConceiveDashboard />;
  if (mode === "pregnancy") return <PregnancyDashboard />;

  return <Onboarding />;
};

export default Index;
