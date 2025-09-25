import { Button } from "./ui/button";
import { ArrowRight, Play, Leaf } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden dark:from-black dark:via-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Leaf className="w-10 h-10" />
            </div>
          </div>

          {/* Headlines */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ready to enable Ayurveda–ICD
              <br />
              <span className="text-primary-foreground/80 dark:text-blue-300">interoperability?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join thousands of healthcare providers who are bridging traditional medicine with modern standards. 
              Start your integration journey today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-12 py-6 text-xl font-semibold dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Get Started
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-12 py-6 text-xl font-semibold dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-black"
            >
              <Play className="w-6 h-6 mr-3" />
              Request a Demo
            </Button>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/20 dark:border-gray-600">
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary-foreground/80 dark:text-blue-300">Free Trial</div>
              <div className="text-white/80 dark:text-gray-400">30-day full access</div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary-foreground/80 dark:text-blue-300">24/7 Support</div>
              <div className="text-white/80 dark:text-gray-400">Expert assistance</div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary-foreground/80 dark:text-blue-300">Quick Setup</div>
              <div className="text-white/80 dark:text-gray-400">Integration in hours</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12">
            <p className="text-white/60 dark:text-gray-500 mb-6">Trusted by leading healthcare organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                'All India Institute of Ayurveda',
                'Apollo Hospitals',
                'Ministry of Ayush',
                'AIIMS',
                'Fortis Healthcare'
              ].map((org, index) => (
                <div key={index} className="text-white/80 dark:text-gray-400 font-medium">
                  {org}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-8 text-center">
            <p className="text-white/70 dark:text-gray-400 text-lg">
              Questions? Contact our specialists at{' '}
              <a href="mailto:support@namaste-api.gov.in" className="text-primary-foreground/80 dark:text-blue-300 hover:underline">
                support@namaste-api.gov.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}