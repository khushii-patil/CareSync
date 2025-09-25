import { Button } from "./ui/button";
import { ArrowRight, Heart, Shield, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-accent rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-muted rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full border border-border">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground font-medium">Welcome to the Future of Healthcare</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight dark:text-white">
              Your Health Journey Starts Here
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed dark:text-gray-300">
              Experience seamless healthcare with CareSync - where traditional Ayurveda meets modern medicine. Connect with doctors, track your health history, and access personalized care all in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg"
            >
              Learn More About CareSync
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground dark:text-white">Secure & Private</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Your data protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground dark:text-white">Holistic Care</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Traditional + Modern</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground dark:text-white">Instant Access</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">24/7 availability</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image Space */}
        <div className="relative">
          <div className="relative z-10">
            <div className="w-full h-[500px] bg-muted/30 rounded-[13px] shadow-2xl border border-border/20"></div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl -z-10"></div>
          <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-tr from-muted/20 to-secondary/40 rounded-2xl -z-20"></div>
        </div>
      </div>
    </section>
  );
}