import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Shield, Globe, Database, Lock, CheckCircle, Zap } from "lucide-react";

export function StandardsSection() {
  const standards = [
    {
      name: "FHIR R4",
      description: "Fast Healthcare Interoperability Resources",
      icon: <Database className="w-8 h-8" />,
      status: "Certified",
      color: "primary"
    },
    {
      name: "SNOMED CT",
      description: "Systematized Nomenclature of Medicine Clinical Terms",
      icon: <Globe className="w-8 h-8" />,
      status: "Compatible",
      color: "accent"
    },
    {
      name: "LOINC",
      description: "Logical Observation Identifiers Names and Codes",
      icon: <CheckCircle className="w-8 h-8" />,
      status: "Integrated",
      color: "muted"
    },
    {
      name: "ISO 22600",
      description: "Health Informatics Security Standards",
      icon: <Lock className="w-8 h-8" />,
      status: "Compliant",
      color: "primary"
    },
    {
      name: "ABHA",
      description: "Ayushman Bharat Health Account",
      icon: <Shield className="w-8 h-8" />,
      status: "Integrated",
      color: "accent"
    },
    {
      name: "ICD-11",
      description: "International Classification of Diseases 11th Revision",
      icon: <Zap className="w-8 h-8" />,
      status: "TM2 Ready",
      color: "muted"
    }
  ];

  const statusColors = {
    "Certified": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    "Compatible": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
    "Integrated": "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
    "Compliant": "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
    "TM2 Ready": "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700"
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, var(--primary) 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, var(--accent) 2px, transparent 2px)`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Standards & Compliance
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Built on internationally recognized healthcare standards for maximum interoperability and security
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {standards.map((standard, index) => (
            <Card key={index} className="border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg group bg-card">
              <CardContent className="p-6 text-center">
                <div 
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    standard.color === 'primary' ? 'bg-primary/10' :
                    standard.color === 'accent' ? 'bg-accent' :
                    'bg-muted'
                  }`}
                >
                  <div className={`${
                    standard.color === 'primary' ? 'text-primary' :
                    standard.color === 'accent' ? 'text-accent-foreground' :
                    'text-muted-foreground'
                  }`}>
                    {standard.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                  {standard.name}
                </h3>
                <p className="text-muted-foreground dark:text-gray-400 text-sm mb-4">
                  {standard.description}
                </p>
                <Badge className={`${statusColors[standard.status]} border`}>
                  {standard.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compliance Highlights */}
        <div className="bg-accent rounded-2xl p-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">Data Security</h3>
              <p className="text-muted-foreground dark:text-gray-400 text-sm">
                End-to-end encryption with HIPAA-level security protocols ensuring patient data protection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">Global Interoperability</h3>
              <p className="text-muted-foreground dark:text-gray-400 text-sm">
                Seamless integration with international healthcare systems and electronic health records
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">Regulatory Compliance</h3>
              <p className="text-muted-foreground dark:text-gray-400 text-sm">
                Full compliance with Ministry of Ayush guidelines and international health data standards
              </p>
            </div>
          </div>
        </div>

        {/* Certification Logos */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground dark:text-gray-400 mb-8">Certified and endorsed by leading healthcare organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['WHO', 'Ministry of Ayush', 'HL7 FHIR', 'SNOMED', 'ICD-11', 'ABHA'].map((org, index) => (
              <div key={index} className="px-6 py-3 border border-border rounded-lg">
                <span className="text-foreground dark:text-white font-medium">{org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}