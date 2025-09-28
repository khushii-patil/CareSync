import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkles, Copy, Plus, Brain } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AISuggestion {
  name: string;
  icdCode: string;
  namasteCode: string;
  ayushCode: string;
  confidence: number;
  reasoning: string;
}

interface AISuggestionsProps {
  searchTerm: string;
  suggestions: AISuggestion[];
  onSelectSuggestion: (suggestion: AISuggestion) => void;
  onAddToPatientList?: (suggestion: AISuggestion) => void;
}

export function AISuggestions({ 
  searchTerm, 
  suggestions, 
  onSelectSuggestion,
  onAddToPatientList 
}: AISuggestionsProps) {
  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${type} code copied to clipboard!`);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 75) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 90) return "default";
    if (confidence >= 75) return "secondary";
    return "outline";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">No Direct Match Found</h3>
        <p className="text-muted-foreground">
          Our AI analyzed "<span className="font-medium text-foreground">{searchTerm}</span>" and found these likely matches:
        </p>
      </div>

      {/* Suggestions */}
      <div className="grid gap-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={`${suggestion.icdCode}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{suggestion.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={getConfidenceBadgeVariant(suggestion.confidence)}
                        className="text-xs"
                      >
                        <div className={`w-2 h-2 rounded-full mr-1 ${getConfidenceColor(suggestion.confidence)}`} />
                        {suggestion.confidence}% Match
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Suggested
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <p className="text-xs text-muted-foreground">ICD-11</p>
                      <p className="font-mono text-sm">{suggestion.icdCode}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(suggestion.icdCode, "ICD-11")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <p className="text-xs text-muted-foreground">NAMASTE</p>
                      <p className="font-mono text-sm">{suggestion.namasteCode}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(suggestion.namasteCode, "NAMASTE")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <p className="text-xs text-muted-foreground">AYUSH</p>
                      <p className="font-mono text-sm">{suggestion.ayushCode}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(suggestion.ayushCode, "AYUSH")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectSuggestion(suggestion)}
                  >
                    View Details
                  </Button>
                  
                  {onAddToPatientList && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAddToPatientList(suggestion)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Patient List
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          AI suggestions are based on semantic similarity and clinical context. Always verify with clinical judgment.
        </p>
      </div>
    </motion.div>
  );
}