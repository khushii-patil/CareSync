import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  Zap, 
  Search, 
  ArrowRightLeft, 
  Upload, 
  Shield, 
  Clock,
  Database,
  Globe,
  DollarSign
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "FHIR R4 Compliant API",
      description: "Built on industry-standard FHIR specifications for seamless integration with existing healthcare systems.",
      color: "primary"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Auto-complete Value-set Lookup",
      description: "Intelligent search with real-time suggestions for both NAMASTE and ICD-11 terminology codes.",
      color: "accent"
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6" />,
      title: "NAMASTE ↔ TM2 Translation",
      description: "Bidirectional mapping between traditional Ayurveda codes and modern medical terminology.",
      color: "muted"
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Encounter Upload with Dual Coding",
      description: "Upload medical encounters with automatic dual coding for traditional and modern systems.",
      color: "primary"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "OAuth 2.0 ABHA-secured Access",
      description: "Secure authentication integrated with India's Ayushman Bharat Health Account system.",
      color: "accent"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Version Tracking + Consent Metadata",
      description: "Complete audit trail with version control and patient consent management for compliance.",
      color: "muted"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Real-time Data Synchronization",
      description: "Live sync with WHO ICD-API and NAMASTE databases for up-to-date terminology.",
      color: "primary"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-language Support",
      description: "Support for Sanskrit, Hindi, English and regional languages for broader accessibility.",
      color: "accent"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Insurance Claims Support",
      description: "Comprehensive insurance guidance for high-cost treatments with NAMASTE code mapping for claim approvals.",
      color: "primary"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Powerful Features for Modern Healthcare
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive tools to bridge traditional Ayurveda with contemporary medical systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg group bg-card"
            >
              <CardHeader className="pb-4">
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    feature.color === 'primary' ? 'bg-primary/10' :
                    feature.color === 'accent' ? 'bg-accent' :
                    'bg-muted'
                  }`}
                >
                  <div className={`${
                    feature.color === 'primary' ? 'text-primary' :
                    feature.color === 'accent' ? 'text-accent-foreground' :
                    'text-muted-foreground'
                  }`}>
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-lg text-foreground dark:text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-muted-foreground bg-accent px-6 py-3 rounded-full border border-border">
            <span>🌿</span>
            <span>Enabling digital transformation in traditional medicine</span>
            <span>⚕️</span>
          </div>
        </div>
      </div>
    </section>
  );
}