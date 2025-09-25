import { Card, CardContent } from "./ui/card";
import { 
  FileText, 
  RefreshCw, 
  GitBranch, 
  Upload,
  ArrowRight 
} from "lucide-react";

export function WorkflowSection() {
  const steps = [
    {
      step: 1,
      icon: <FileText className="w-8 h-8" />,
      title: "Ingest NAMASTE CSV",
      description: "Import and validate traditional medicine terminologies from official NAMASTE code repositories.",
      details: "Automated parsing, validation, and structuring of Ayurveda terminology data"
    },
    {
      step: 2,
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Sync WHO ICD-API",
      description: "Real-time synchronization with WHO's International Classification of Diseases API for latest updates.",
      details: "Continuous monitoring and updates from global health standards"
    },
    {
      step: 3,
      icon: <GitBranch className="w-8 h-8" />,
      title: "Map Codes (NAMASTE ↔ TM2)",
      description: "Intelligent mapping between traditional Ayurveda codes and ICD-11 Traditional Medicine 2 classifications.",
      details: "AI-powered semantic matching with clinical validation"
    },
    {
      step: 4,
      icon: <Upload className="w-8 h-8" />,
      title: "Upload EMR (FHIR Bundles)",
      description: "Process electronic medical records with automatic dual coding for interoperability.",
      details: "FHIR-compliant data processing with consent management"
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            A streamlined four-step process to enable seamless integration between traditional and modern medical systems
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-muted rounded-full"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Circle */}
                  <div className="relative z-10 mx-auto w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                  
                  {/* Card */}
                  <Card className="border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg bg-card">
                    <CardContent className="p-6">
                      <div className="text-primary mb-4 flex justify-center">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3 text-center">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-400 text-center mb-4">
                        {step.description}
                      </p>
                      <div className="text-sm text-muted-foreground/70 dark:text-gray-500 text-center italic">
                        {step.details}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-6">
                {/* Step Circle */}
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                
                {/* Content */}
                <Card className="flex-1 border border-border bg-card">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                    <div className="text-sm text-muted-foreground/70 dark:text-gray-500 italic">
                      {step.details}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 w-px h-6 bg-border"></div>
              )}
            </div>
          ))}
        </div>

        {/* Process Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-accent rounded-xl border border-border">
            <div className="text-2xl font-bold text-foreground dark:text-white mb-2">99.9%</div>
            <div className="text-muted-foreground dark:text-gray-400">Accuracy in code mapping</div>
          </div>
          <div className="text-center p-6 bg-accent rounded-xl border border-border">
            <div className="text-2xl font-bold text-foreground dark:text-white mb-2">&lt;2s</div>
            <div className="text-muted-foreground dark:text-gray-400">Average processing time</div>
          </div>
          <div className="text-center p-6 bg-accent rounded-xl border border-border">
            <div className="text-2xl font-bold text-foreground dark:text-white mb-2">24/7</div>
            <div className="text-muted-foreground dark:text-gray-400">Continuous synchronization</div>
          </div>
        </div>
      </div>
    </section>
  );
}