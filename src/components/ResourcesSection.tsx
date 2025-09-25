import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  FileText, 
  Github, 
  Code, 
  BookOpen, 
  Download,
  ExternalLink,
  Users,
  Video
} from "lucide-react";

export function ResourcesSection() {
  const resources = [
    {
      title: "API Documentation",
      description: "Comprehensive REST API documentation with examples and interactive testing",
      icon: <FileText className="w-6 h-6" />,
      type: "Documentation",
      link: "#",
      color: "primary"
    },
    {
      title: "GitHub Repository",
      description: "Open source codebase, issues tracking, and community contributions",
      icon: <Github className="w-6 h-6" />,
      type: "Source Code",
      link: "#",
      color: "accent"
    },
    {
      title: "Integration Guide",
      description: "Step-by-step guide for integrating with existing EMR systems",
      icon: <Code className="w-6 h-6" />,
      type: "Guide",
      link: "#",
      color: "muted"
    },
    {
      title: "Use Cases Library",
      description: "Real-world implementation examples and best practices",
      icon: <BookOpen className="w-6 h-6" />,
      type: "Examples",
      link: "#",
      color: "primary"
    }
  ];

  const faqs = [
    {
      question: "How does the NAMASTE to ICD-11 mapping work?",
      answer: "Our system uses AI-powered semantic matching combined with clinical validation to map traditional Ayurveda terminologies to ICD-11 TM2 codes. The mapping process achieves 99.8% accuracy through continuous learning and expert validation."
    },
    {
      question: "Is the API compliant with FHIR R4 standards?",
      answer: "Yes, our API is fully FHIR R4 compliant and supports standard FHIR resources including Patient, Condition, Observation, and Bundle resources with traditional medicine extensions."
    },
    {
      question: "How is patient data security ensured?",
      answer: "We implement end-to-end encryption, OAuth 2.0 authentication, ABHA integration, and follow ISO 22600 health informatics security standards. All data is processed with explicit patient consent."
    },
    {
      question: "Can this integrate with existing EMR systems?",
      answer: "Absolutely. Our FHIR-compliant API can integrate with any EMR system that supports FHIR standards. We provide SDKs and detailed integration guides for popular EMR platforms."
    },
    {
      question: "What languages are supported for terminology?",
      answer: "The system supports Sanskrit, Hindi, English, and major regional Indian languages. All terminologies are available in multiple languages with proper transliteration."
    }
  ];

  return (
    <section id="resources" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Resources & Documentation
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to integrate traditional medicine terminologies into your healthcare systems
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg group cursor-pointer bg-card">
              <CardHeader className="pb-4">
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    resource.color === 'primary' ? 'bg-primary/10' :
                    resource.color === 'accent' ? 'bg-accent' :
                    'bg-muted'
                  }`}
                >
                  <div className={`${
                    resource.color === 'primary' ? 'text-primary' :
                    resource.color === 'accent' ? 'text-accent-foreground' :
                    'text-muted-foreground'
                  }`}>
                    {resource.icon}
                  </div>
                </div>
                <CardTitle className="text-lg text-foreground dark:text-white group-hover:text-primary transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full">
                    {resource.type}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Developer Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground dark:text-white flex items-center gap-2">
                <Download className="w-5 h-5" />
                SDK Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {['JavaScript/Node.js', 'Python', 'Java', 'C#/.NET'].map((sdk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <span className="text-foreground dark:text-white font-medium">{sdk} SDK</span>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  'Getting Started with NAMASTE API',
                  'Implementing Dual Coding in EMRs',
                  'Advanced Analytics Setup',
                  'Security Best Practices'
                ].map((tutorial, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <span className="text-foreground dark:text-white font-medium">{tutorial}</span>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Watch
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-accent rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground dark:text-gray-400">
              Common questions about implementing traditional medicine terminology systems
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-foreground dark:text-white hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Community */}
        <div className="text-center mt-16">
          <Card className="border border-border p-8 inline-block bg-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground dark:text-white">Join Our Developer Community</h4>
                <p className="text-muted-foreground dark:text-gray-400 text-sm">Connect with other developers implementing traditional medicine systems</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Discord Community
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Developer Forum
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}