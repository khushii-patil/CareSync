import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Users,
  Target
} from "lucide-react";

export function AnalyticsSection() {
  const mockData = {
    totalPatients: "125,847",
    activeConditions: "3,429",
    mappingAccuracy: "99.8%",
    monthlyGrowth: "+23%"
  };

  const analyticsFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Morbidity Patterns",
      description: "Track disease patterns in traditional medicine practices across regions"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Treatment Outcomes",
      description: "Monitor effectiveness of Ayurveda treatments with dual-coded data"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Dosha Distribution",
      description: "Analyze constitutional patterns and prevalence across populations"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Insights",
      description: "Live dashboard for Ministry of Ayush and healthcare insurers"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Analytics Dashboard Preview
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive insights for traditional medicine practitioners, policymakers, and healthcare insurers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Mockup */}
          <div className="relative">
            <Card className="border border-border shadow-2xl overflow-hidden bg-card">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Traditional Medicine Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwY2hhcnRzfGVufDF8fHx8MTc1ODI3MDY5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Analytics dashboard with charts and graphs"
                    className="w-full h-[300px] object-cover"
                  />
                  
                  {/* Overlay with sample data */}
                  <div className="absolute inset-0 bg-card/90 p-6 border border-border">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-accent p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground dark:text-gray-400">Total Patients</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground dark:text-white">{mockData.totalPatients}</div>
                      </div>
                      <div className="bg-accent p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground dark:text-gray-400">Active Conditions</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">{mockData.activeConditions}</div>
                      </div>
                    </div>
                    
                    {/* Sample Chart Areas */}
                    <div className="space-y-4">
                      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground dark:text-gray-400 text-sm">Dosha Distribution by Region</span>
                      </div>
                      <div className="h-16 bg-gradient-to-r from-muted/20 to-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground dark:text-gray-400 text-sm">Treatment Effectiveness Trends</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Key Metrics Floating Cards */}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-3">
              <Card className="bg-card shadow-lg border border-border p-4 w-32">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground dark:text-white">{mockData.mappingAccuracy}</div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">Mapping Accuracy</div>
                </div>
              </Card>
              <Card className="bg-card shadow-lg border border-border p-4 w-32">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{mockData.monthlyGrowth}</div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">Monthly Growth</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
                Real-time Insights for Ministry of Ayush & Insurers
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                Our analytics platform provides comprehensive insights into traditional medicine 
                practices, enabling data-driven decisions for policy makers and healthcare providers.
              </p>
            </div>

            <div className="space-y-6">
              {analyticsFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground dark:text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits for Stakeholders */}
            <div className="bg-accent p-6 rounded-xl border border-border">
              <h4 className="font-semibold text-foreground dark:text-white mb-4">Benefits for Stakeholders:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Policy makers: Evidence-based traditional medicine regulation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Insurers: Risk assessment and coverage optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Practitioners: Treatment outcome improvements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}