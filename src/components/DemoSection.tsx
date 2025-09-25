import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Code, ArrowRight } from "lucide-react";
import { useState } from "react";

export function DemoSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockResults = [
    {
      namaste: "NAM-001234",
      namasteDesc: "Vata Dosha Imbalance - Nervous System",
      icd11: "TM20.0",
      icd11Desc: "Traditional medicine condition affecting nervous system",
      confidence: 98
    },
    {
      namaste: "NAM-005678",
      namasteDesc: "Pitta Dosha - Digestive Fire Excess",
      icd11: "TM15.2",
      icd11Desc: "Traditional medicine digestive system disorder",
      confidence: 95
    }
  ];

  return (
    <section id="demo" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Interactive Demo
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Experience real-time code mapping between NAMASTE and ICD-11 TM2 systems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Interface */}
          <div className="space-y-8">
            <Card className="border border-border shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-foreground dark:text-white flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Terminology Lookup & Mapping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Interface */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search for Ayurveda condition (e.g., Vata dosha, Agni mandya...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-border focus:border-primary bg-input-background"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Search & Map Codes
                  </Button>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground dark:text-white">Mapping Results:</h4>
                  {mockResults.map((result, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 space-y-3 bg-accent/50">
                      {/* NAMASTE Code */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="border-primary text-primary">
                            NAMASTE: {result.namaste}
                          </Badge>
                          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">{result.namasteDesc}</p>
                        </div>
                      </div>

                      {/* Mapping Arrow */}
                      <div className="flex justify-center">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>

                      {/* ICD-11 Code */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="border-primary text-primary">
                            ICD-11 TM2: {result.icd11}
                          </Badge>
                          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">{result.icd11Desc}</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">
                          {result.confidence}% Match
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Features */}
                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <div className="font-semibold text-foreground dark:text-white">Auto-complete</div>
                      <div className="text-muted-foreground dark:text-gray-400">Real-time suggestions</div>
                    </div>
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <div className="font-semibold text-foreground dark:text-white">Validation</div>
                      <div className="text-muted-foreground dark:text-gray-400">Clinical accuracy check</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Laptop Mockup */}
          <div className="relative">
            <div className="relative bg-gray-900 rounded-t-xl p-2">
              <div className="bg-gray-800 rounded-lg p-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="w-full h-[300px] bg-muted/30 rounded-lg border border-border/20"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-300 rounded-b-xl"></div>
            
            {/* Overlay showing EMR interface */}
            <div className="absolute inset-4 bg-card/95 rounded-lg p-4 shadow-lg border border-border">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-foreground dark:text-white font-semibold">Patient EMR:</span>
                  <span className="text-muted-foreground dark:text-gray-400">Rajesh Kumar (ID: 12345)</span>
                </div>
                <div className="border border-border rounded p-3 space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold text-foreground dark:text-white">Primary Diagnosis:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary text-primary-foreground text-xs">NAM-001234</Badge>
                    <Badge className="bg-primary text-primary-foreground text-xs">ICD-11: TM20.0</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">Vata Dosha Imbalance - Nervous System</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6">
            Try Live Demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}