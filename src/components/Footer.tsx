import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Leaf, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Phone,
  MapPin,
  FileText,
  Shield,
  HelpCircle
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "API Documentation", href: "#" },
      { label: "SDK Downloads", href: "#" },
      { label: "Integration Guide", href: "#" },
      { label: "Use Cases", href: "#" },
      { label: "Changelog", href: "#" }
    ],
    developers: [
      { label: "GitHub Repository", href: "#" },
      { label: "Community Forum", href: "#" },
      { label: "Discord Server", href: "#" },
      { label: "Bug Reports", href: "#" },
      { label: "Feature Requests", href: "#" }
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Support", href: "#" },
      { label: "Status Page", href: "#" },
      { label: "Training Videos", href: "#" },
      { label: "Webinars", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Processing", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Security", href: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden dark:from-black dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl font-bold">CareSync</span>
              </div>
              <p className="text-white/80 dark:text-gray-300 leading-relaxed">
                Harmonising Ayurveda with global ICD-11 standards through FHIR-compliant 
                terminology services for modern healthcare interoperability.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>support@caresync.gov.in</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+91-11-2671-4000</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Ministry of Ayush, New Delhi</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-white dark:text-white">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-white/70 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white dark:text-white">Developers</h3>
                <ul className="space-y-3">
                  {footerLinks.developers.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-white/70 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white dark:text-white">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-white/70 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white dark:text-white">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-white/70 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 dark:bg-gray-600" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-white/70 dark:text-gray-400 text-sm">
              <p>© 2024 CareSync. All rights reserved to nexa6.</p>
              <p className="mt-1">Healthcare terminology solutions powered by nexa6.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 p-2">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 p-2">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>

            {/* Compliance Badges */}
            <div className="flex items-center gap-4 text-sm text-white/70 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>FHIR R4</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Government Branding */}
        <div className="border-t border-white/20 dark:border-gray-600 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-4 text-white/80 dark:text-gray-300">
              <div className="text-sm">
                <span className="font-semibold">Ministry of Ayush</span>
                <span className="mx-2">•</span>
                <span>Government of India</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80 dark:text-gray-300">
              <div className="text-sm">
                <span className="font-semibold">ICD-11 TM2</span>
                <span className="mx-2">•</span>
                <span>WHO Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}