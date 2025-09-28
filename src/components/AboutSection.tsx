import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Quote } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Illustration */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1656428964836-78d54bf76231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzU4MzQ5MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Medical technology and digital health"
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl"></div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
                Bridging Ancient Wisdom with Modern Standards
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
                <p>
                  Our microservice seamlessly integrates India's NAMASTE codes with WHO International 
                  Terminologies of Ayurveda and ICD-11 TM2, creating the first comprehensive bridge 
                  between traditional medicine and global healthcare standards.
                </p>
                <p>
                  Built on FHIR R4 specifications, we enable healthcare providers to maintain dual 
                  coding systems while ensuring complete interoperability with existing electronic 
                  medical records and global health information systems.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative bg-gradient-to-r from-accent to-accent/70 p-8 rounded-2xl border-l-4 border-primary">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <blockquote className="text-xl italic text-foreground dark:text-white font-medium">
                "Empowering Traditional Medicine in the Digital Age"
              </blockquote>
              <div className="mt-4 text-muted-foreground dark:text-gray-400">
                Enabling Ayurveda practitioners to participate fully in the global healthcare ecosystem
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <h3 className="font-semibold text-foreground dark:text-white">NAMASTE Integration</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Full support for India's traditional medicine codes</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <h3 className="font-semibold text-foreground dark:text-white">Global Standards</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">WHO and ICD-11 TM2 compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}