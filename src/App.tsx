import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { LanguageSelector } from "./components/LanguageSelector";
import { Chatbot } from "./components/Chatbot";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";

// Lazy load heavy components to improve initial load time
const AboutSection = lazy(() => import("./components/AboutSection").then(m => ({ default: m.AboutSection })));
const FeaturesSection = lazy(() => import("./components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const WorkflowSection = lazy(() => import("./components/WorkflowSection").then(m => ({ default: m.WorkflowSection })));
const DemoSection = lazy(() => import("./components/DemoSection").then(m => ({ default: m.DemoSection })));
const StandardsSection = lazy(() => import("./components/StandardsSection").then(m => ({ default: m.StandardsSection })));
const AnalyticsSection = lazy(() => import("./components/AnalyticsSection").then(m => ({ default: m.AnalyticsSection })));
const ResourcesSection = lazy(() => import("./components/ResourcesSection").then(m => ({ default: m.ResourcesSection })));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const CTASection = lazy(() => import("./components/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));
const PatientDashboard = lazy(() => import("./components/PatientDashboard").then(m => ({ default: m.PatientDashboard })));
const DoctorDashboard = lazy(() => import("./components/DoctorDashboard").then(m => ({ default: m.DoctorDashboard })));

export interface User {
  email: string;
  type: "doctor" | "patient";
  firstName: string;
}

// Simplified page variants to reduce animation complexity
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, type: "doctor" | "patient") => {
    try {
      // Extract first name from email (everything before @ and . symbols)
      const firstName = email.split('@')[0].split('.')[0];
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      
      setUser({
        email,
        type,
        firstName: capitalizedFirstName
      });
    } catch (error) {
      console.error("Error during login:", error);
      // Fallback to default name if extraction fails
      setUser({
        email,
        type,
        firstName: "User"
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div
                key={`dashboard-${user.type}`}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="min-h-screen bg-background"
              >
                <ErrorBoundary fallback={<LoadingSpinner message="Loading dashboard..." fullScreen />}>
                  <Suspense fallback={<LoadingSpinner message="Loading dashboard..." fullScreen />}>
                    {user.type === "patient" ? (
                      <PatientDashboard user={user} onLogout={handleLogout} />
                    ) : (
                      <DoctorDashboard user={user} onLogout={handleLogout} />
                    )}
                  </Suspense>
                </ErrorBoundary>
                <LanguageSelector />
                <Chatbot />
              </motion.div>
            ) : (
              <motion.div
                key="landing"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="min-h-screen bg-background"
              >
                <Navigation onLogin={handleLogin} />
<<<<<<< HEAD
                <HeroSection />
=======
                <HeroSection onLogin={handleLogin} />
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
                <ErrorBoundary fallback={<LoadingSpinner message="Loading content..." />}>
                  <Suspense fallback={<LoadingSpinner message="Loading content..." />}>
                    <AboutSection />
                    <FeaturesSection />
                    <WorkflowSection />
                    <DemoSection />
                    <StandardsSection />
                    <AnalyticsSection />
                    <ResourcesSection />
                    <TestimonialsSection />
                    <CTASection />
                    <Footer />
                  </Suspense>
                </ErrorBoundary>
                <LanguageSelector />
                <Chatbot />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}