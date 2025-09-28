import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Copy, Download, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FHIRModalProps {
  isOpen: boolean;
  onClose: () => void;
  disease: {
    name: string;
    icdCode: string;
    namasteCode: string;
    ayushCode: string;
  };
}

export function FHIRModal({ isOpen, onClose, disease }: FHIRModalProps) {
  const fhirResource = {
    resourceType: "Condition",
    id: `condition-${disease.namasteCode.toLowerCase().replace(/\./g, '-')}`,
    meta: {
      profile: ["http://hl7.org/fhir/StructureDefinition/Condition"],
      lastUpdated: new Date().toISOString(),
      source: "CareSync-NAMASTE-System"
    },
    identifier: [
      {
        use: "official",
        system: "http://namaste.gov.in/codes",
        value: disease.namasteCode
      },
      {
        use: "usual",
        system: "http://hl7.org/fhir/sid/icd-11",
        value: disease.icdCode
      },
      {
        use: "secondary", 
        system: "http://ayush.gov.in/terminology",
        value: disease.ayushCode
      }
    ],
    clinicalStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          code: "active",
          display: "Active"
        }
      ]
    },
    verificationStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
          code: "confirmed",
          display: "Confirmed"
        }
      ]
    },
    code: {
      coding: [
        {
          system: "http://hl7.org/fhir/sid/icd-11",
          code: disease.icdCode,
          display: disease.name
        },
        {
          system: "http://namaste.gov.in/codes",
          code: disease.namasteCode,
          display: disease.name
        },
        {
          system: "http://ayush.gov.in/terminology", 
          code: disease.ayushCode,
          display: disease.name
        }
      ],
      text: disease.name
    },
    subject: {
      reference: "Patient/example-patient",
      display: "Patient Reference"
    },
    recordedDate: new Date().toISOString().split('T')[0],
    extension: [
      {
        url: "http://careSync.gov.in/fhir/StructureDefinition/namaste-compliance",
        valueBoolean: true
      },
      {
        url: "http://careSync.gov.in/fhir/StructureDefinition/ayush-integration",
        valueBoolean: true
      }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(fhirResource, null, 2));
    toast.success("FHIR Resource copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(fhirResource, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fhir-condition-${disease.namasteCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("FHIR Resource downloaded!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-mono text-sm">{`{}`}</span>
              </div>
              <span>FHIR ProblemList Resource</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            View and export the FHIR R4 compliant resource for {disease.name} with NAMASTE, ICD-11, and AYUSH codes integrated.
          </DialogDescription>
        </DialogHeader>
        
        <motion.div 
          className="flex-1 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-muted/30 rounded-lg p-4 border">
            <pre className="text-sm font-mono whitespace-pre-wrap overflow-auto">
              {JSON.stringify(fhirResource, null, 2)}
            </pre>
          </div>
        </motion.div>
        
        <div className="flex-shrink-0 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>✅ FHIR R4 Compliant • ✅ NAMASTE Integrated • ✅ ABDM Ready</span>
            <span>Generated by CareSync v1.0</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}