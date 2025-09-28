import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Quote, Star } from "lucide-react";
<<<<<<< HEAD
=======
import { ImageWithFallback } from "./figma/ImageWithFallback";
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      title: "Senior Ayurveda Physician",
      organization: "All India Institute of Ayurveda",
<<<<<<< HEAD
=======
      image: "https://images.unsplash.com/photo-1581842343131-e75c90429bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0cmFkaXRpb25hbCUyMG1lZGljaW5lJTIwcHJhY3RpdGlvbmVyJTIwYXl1cnZlZGF8ZW58MXx8fHwxNzU4MzQ5MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
      quote: "This platform has revolutionized how we document and share traditional medicine practices. The seamless integration with modern EMR systems helps us bridge the gap between ancient wisdom and contemporary healthcare.",
      rating: 5,
      category: "Clinical Practice"
    },
    {
      name: "Rajesh Kumar",
      title: "EMR Integration Specialist",
      organization: "Apollo Hospitals",
<<<<<<< HEAD
=======
      image: "",
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
      quote: "The FHIR compliance and dual coding capabilities have made it incredibly easy to integrate traditional medicine data into our existing systems. The API documentation is excellent and support is outstanding.",
      rating: 5,
      category: "Technical Integration"
    },
    {
      name: "Dr. Meera Nair",
      title: "Health Policy Researcher",
      organization: "Ministry of Ayush",
<<<<<<< HEAD
=======
      image: "",
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
      quote: "The analytics dashboard provides invaluable insights for policy-making. We can now track traditional medicine usage patterns and outcomes at a national level, enabling evidence-based decision making.",
      rating: 5,
      category: "Policy & Analytics"
    },
    {
      name: "Amit Patel",
      title: "Chief Technology Officer",
      organization: "HealthTech Solutions",
<<<<<<< HEAD
=======
      image: "",
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
      quote: "Implementation was surprisingly smooth. The comprehensive SDK and excellent documentation helped our team integrate the NAMASTE API within weeks. The security features are robust and ABHA integration is flawless.",
      rating: 5,
      category: "Implementation"
    }
  ];

  const achievements = [
    { metric: "50,000+", label: "Healthcare Providers" },
    { metric: "1M+", label: "Patient Records" },
    { metric: "99.8%", label: "Mapping Accuracy" },
    { metric: "24/7", label: "System Uptime" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Ayurveda practitioners, clinicians, and technology leaders share their experiences with our platform
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-2">
                {achievement.metric}
              </div>
              <div className="text-muted-foreground dark:text-gray-400">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg bg-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground dark:text-gray-300 leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
<<<<<<< HEAD
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
=======
                    {testimonial.image ? (
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">{testimonial.title}</div>
                    <div className="text-sm text-muted-foreground/70 dark:text-gray-500">{testimonial.organization}</div>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    {testimonial.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Case Study */}
        <Card className="border border-border bg-accent">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-primary text-primary-foreground mb-4">Success Story</Badge>
                <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
                  Nationwide Implementation Success
                </h3>
                <p className="text-muted-foreground dark:text-gray-300 leading-relaxed mb-6">
                  The All India Institute of Ayurveda successfully implemented our dual-coding system 
                  across 15 centers, resulting in a 40% improvement in research data quality and 
                  enabling participation in international traditional medicine studies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground dark:text-gray-400">Integrated with existing EMR systems in 3 weeks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground dark:text-gray-400">Trained 200+ practitioners on dual coding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground dark:text-gray-400">Achieved 99.5% data quality compliance</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-center text-primary-foreground">
                    <div className="text-3xl font-bold">15</div>
                    <div className="text-sm">Centers</div>
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-gray-300 italic">
                  "A transformative solution for traditional medicine digitization"
                </p>
                <p className="text-sm text-muted-foreground/70 dark:text-gray-500 mt-2">
                  - Dr. Rajesh Kotecha, Secretary, Ministry of Ayush
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}