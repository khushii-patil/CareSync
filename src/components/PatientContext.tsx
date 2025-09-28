import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { User, Edit3, Check, X, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  id: string;
}

interface PatientContextProps {
  onPatientChange?: (patient: PatientInfo) => void;
}

export function PatientContext({ onPatientChange }: PatientContextProps) {
  const [patient, setPatient] = useState<PatientInfo>({
    name: "Anjali Sharma",
    age: "45",
    gender: "Female",
    id: "ABHA-2024-AS-001"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempPatient, setTempPatient] = useState(patient);

  const handleSave = () => {
    setPatient(tempPatient);
    setIsEditing(false);
    onPatientChange?.(tempPatient);
  };

  const handleCancel = () => {
    setTempPatient(patient);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                
                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.div
                      key="display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {patient.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{patient.age} years</span>
                          <span>•</span>
                          <span>{patient.gender}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {patient.id}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <Input
                        value={tempPatient.name}
                        onChange={(e) => setTempPatient({ ...tempPatient, name: e.target.value })}
                        placeholder="Patient Name"
                        className="w-40"
                      />
                      <Input
                        value={tempPatient.age}
                        onChange={(e) => setTempPatient({ ...tempPatient, age: e.target.value })}
                        placeholder="Age"
                        className="w-20"
                        type="number"
                      />
                      <Select
                        value={tempPatient.gender}
                        onValueChange={(value) => setTempPatient({ ...tempPatient, gender: value })}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={tempPatient.id}
                        onChange={(e) => setTempPatient({ ...tempPatient, id: e.target.value })}
                        placeholder="ABHA ID"
                        className="w-40"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Patient
                  </Button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSave}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Session: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}