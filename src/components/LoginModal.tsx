import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UserRound, Stethoscope, Eye, EyeOff, Mail, Lock, X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginType: "doctor" | "patient" | null;
  onLogin?: (email: string, type: "doctor" | "patient") => void;
}

export function LoginModal({ isOpen, onClose, loginType, onLogin }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(loginType || "patient");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && loginType) {
      setActiveTab(loginType);
    }
  }, [isOpen, loginType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${activeTab} login submitted`);
    if (onLogin && email) {
      onLogin(email, activeTab);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-xl bg-background/80 transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Wrapper with max height */}
      <div className="relative w-full max-w-md max-h-[100vh] overflow-y-auto">
        <div className="relative overflow-hidden rounded-3xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted/50 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/75 transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="relative p-8 pt-12">
            <div className="mb-8">
              <h2 className="text-3xl text-center text-foreground font-medium tracking-tight">
                Welcome to CareSync
              </h2>
              <p className="text-center text-muted-foreground mt-3 text-base">
                Sign in to access your healthcare portal
              </p>

              {/* ABHA/NDHM Branding */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Sign in with ABHA</p>
                    <p className="text-xs text-muted-foreground">Secured by ABDM Framework</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">IN</span>
                  </div>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  National Digital Health Mission • Ayushman Bharat Digital Mission
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted backdrop-blur-sm border border-border rounded-2xl p-1">
                <TabsTrigger
                  value="patient"
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-sm text-muted-foreground rounded-xl transition-all duration-200"
                >
                  <UserRound className="w-4 h-4 mr-2" />
                  Patient
                </TabsTrigger>
                <TabsTrigger
                  value="doctor"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground rounded-xl transition-all duration-200"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor
                </TabsTrigger>
              </TabsList>

              {/* Patient Form */}
              <TabsContent value="patient" className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="patient-email" className="text-foreground font-medium text-sm">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="patient@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 bg-input-background border border-border backdrop-blur-sm placeholder:text-muted-foreground text-foreground rounded-2xl focus:bg-card focus:border-ring transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="patient-password" className="text-foreground font-medium text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="patient-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 h-12 bg-input-background border border-border backdrop-blur-sm placeholder:text-muted-foreground text-foreground rounded-2xl focus:bg-card focus:border-ring transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#70805D] hover:bg-[#70805D]/90 text-white backdrop-blur-sm rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign In as Patient
                  </Button>
                </form>
              </TabsContent>

              {/* Doctor Form */}
              <TabsContent value="doctor" className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="doctor-email" className="text-foreground font-medium text-sm">
                      Medical License Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="doctor-email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 bg-input-background border border-border backdrop-blur-sm placeholder:text-muted-foreground text-foreground rounded-2xl focus:bg-card focus:border-ring transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="doctor-password" className="text-foreground font-medium text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="doctor-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 h-12 bg-input-background border border-border backdrop-blur-sm placeholder:text-muted-foreground text-foreground rounded-2xl focus:bg-card focus:border-ring transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground backdrop-blur-sm rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign In as Doctor
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
