import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  FileText, 
  Download, 
  Trash2, 
  Copy, 
  Package,
  ChevronRight,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PatientListItem {
  name: string;
  icdCode: string;
  namasteCode: string;
  ayushCode: string;
  addedAt: Date;
}

interface PatientListSidebarProps {
  items: PatientListItem[];
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function PatientListSidebar({ 
  items, 
  onRemoveItem, 
  onClearAll,
  isOpen,
  onToggle 
}: PatientListSidebarProps) {
  const handleExportFHIR = () => {
    const fhirBundle = {
      resourceType: "Bundle",
      id: `patient-conditions-${Date.now()}`,
      type: "collection",
      timestamp: new Date().toISOString(),
      total: items.length,
      entry: items.map((item, index) => ({
        resource: {
          resourceType: "Condition",
          id: `condition-${index + 1}`,
          identifier: [
            {
              system: "http://namaste.gov.in/codes",
              value: item.namasteCode
            },
            {
              system: "http://hl7.org/fhir/sid/icd-11", 
              value: item.icdCode
            },
            {
              system: "http://ayush.gov.in/terminology",
              value: item.ayushCode
            }
          ],
          code: {
            coding: [
              {
                system: "http://hl7.org/fhir/sid/icd-11",
                code: item.icdCode,
                display: item.name
              }
            ],
            text: item.name
          },
          clinicalStatus: {
            coding: [{
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active"
            }]
          },
          recordedDate: item.addedAt.toISOString().split('T')[0]
        }
      }))
    };

    const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-conditions-bundle-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("FHIR Bundle exported successfully!");
  };

  const handleCopyAllCodes = () => {
    const codes = items.map(item => 
      `${item.name}: ICD-11: ${item.icdCode}, NAMASTE: ${item.namasteCode}, AYUSH: ${item.ayushCode}`
    ).join('\n');
    
    navigator.clipboard.writeText(codes);
    toast.success("All codes copied to clipboard!");
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 280 }}
        className="fixed right-0 top-32 z-40"
      >
        <Button
          onClick={onToggle}
          variant="default"
          size="sm"
          className="rounded-l-lg rounded-r-none shadow-lg"
        >
          <Package className="w-4 h-4 mr-1" />
          {items.length}
          <ChevronRight className="w-3 h-3 ml-1 rotate-180" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed right-0 top-20 bottom-0 w-80 z-40 bg-background border-l border-border shadow-xl"
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Patient List</h3>
              <Badge variant="secondary">{items.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                No conditions added yet
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Search and add conditions to build your patient's list
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <motion.div
                key={`${item.namasteCode}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="border-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(index)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ICD-11:</span>
                        <span className="font-mono">{item.icdCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NAMASTE:</span>
                        <span className="font-mono">{item.namasteCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AYUSH:</span>
                        <span className="font-mono">{item.ayushCode}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-2">
                      Added: {item.addedAt.toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyAllCodes}>
                <Copy className="w-3 h-3 mr-1" />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportFHIR}>
                <Download className="w-3 h-3 mr-1" />
                Export FHIR
              </Button>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full"
              onClick={onClearAll}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </Button>
            
            <div className="text-xs text-muted-foreground text-center">
              Ready for EMR integration
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}