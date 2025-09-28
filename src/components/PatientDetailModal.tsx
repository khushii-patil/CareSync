import { useState } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  User, 
  FileText, 
  Calendar, 
  Copy, 
  Download, 
  Edit3, 
  Save, 
  X,
  Phone,
  Mail,
  MapPin,
  Heart,
  Stethoscope,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  conditions: string[];
  status: "stable" | "critical" | "improving";
  email?: string;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
}

interface MedicalRecord {
  id: string;
  date: string;
  type: "consultation" | "lab" | "prescription" | "surgery";
  title: string;
  description: string;
  doctor: string;
  files?: string[];
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: "checkup" | "follow-up" | "emergency" | "consultation";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  onUpdate?: (patient: Patient) => void;
  userType: "doctor" | "patient";
}

export function PatientDetailModal({ isOpen, onClose, patient, onUpdate, userType }: PatientDetailModalProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);

  // Mock medical records
  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      date: "2024-09-20",
      type: "consultation",
      title: "Regular Checkup",
      description: "Patient reported feeling well. Blood pressure stable. Continued current medication regimen.",
      doctor: "Dr. Sarah Johnson",
      files: ["blood_test_results.pdf", "x_ray_chest.jpg"]
    },
    {
      id: "2", 
      date: "2024-09-15",
      type: "lab",
      title: "Blood Work - Comprehensive Panel",
      description: "Complete blood count, lipid panel, and glucose levels. All values within normal range.",
      doctor: "Dr. Michael Chen",
      files: ["lab_results_sept.pdf"]
    },
    {
      id: "3",
      date: "2024-09-01",
      type: "prescription",
      title: "Medication Adjustment",
      description: "Increased dosage of antihypertensive medication. Patient to monitor blood pressure daily.",
      doctor: "Dr. Sarah Johnson"
    }
  ]);

  // Mock appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: "2024-10-15",
      time: "10:00 AM",
      type: "follow-up",
      status: "scheduled",
      notes: "Follow-up for blood pressure monitoring"
    },
    {
      id: "2",
      date: "2024-09-20",
      time: "2:30 PM", 
      type: "checkup",
      status: "completed",
      notes: "Regular checkup completed"
    },
    {
      id: "3",
      date: "2024-11-01",
      time: "9:00 AM",
      type: "consultation",
      status: "scheduled",
      notes: "Consultation for medication review"
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    type: "checkup" as Appointment["type"],
    notes: ""
  });

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedPatient);
    }
    setIsEditing(false);
    toast.success("Patient information updated successfully!");
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setIsEditing(false);
  };

  const handleDownloadReport = () => {
    // Generate medical report data
    const reportData = {
      patient: editedPatient,
      medicalRecords: medicalRecords,
      appointments: appointments,
      generatedDate: new Date().toISOString(),
      generatedBy: userType === "doctor" ? "Dr. System" : "Patient Portal"
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-report-${editedPatient.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Medical report downloaded successfully!");
  };

  const handleDownloadFHIR = () => {
    const fhirBundle = {
      resourceType: "Bundle",
      id: `patient-bundle-${editedPatient.id}`,
      meta: {
        lastUpdated: new Date().toISOString(),
        source: "CareSync-NAMASTE-System"
      },
      type: "collection",
      entry: [
        {
          resource: {
            resourceType: "Patient",
            id: editedPatient.id,
            identifier: [
              {
                use: "usual",
                system: "http://namaste.gov.in/patient-id",
                value: `PAT-${editedPatient.id}`
              }
            ],
            name: [
              {
                use: "official",
                text: editedPatient.name
              }
            ],
            telecom: [
              {
                system: "phone",
                value: editedPatient.phone || "Not provided",
                use: "home"
              },
              {
                system: "email", 
                value: editedPatient.email || "Not provided",
                use: "home"
              }
            ],
            gender: "unknown",
            birthDate: new Date(new Date().getFullYear() - editedPatient.age, 0, 1).toISOString().split('T')[0],
            address: [
              {
                use: "home",
                text: editedPatient.address || "Not provided"
              }
            ]
          }
        },
        ...medicalRecords.map(record => ({
          resource: {
            resourceType: "Condition",
            id: record.id,
            subject: {
              reference: `Patient/${editedPatient.id}`
            },
            code: {
              text: record.title
            },
            recordedDate: record.date,
            note: [
              {
                text: record.description
              }
            ]
          }
        }))
      ]
    };

    const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fhir-bundle-${editedPatient.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("FHIR bundle downloaded successfully!");
  };

  const handleAddAppointment = () => {
    if (!newAppointment.date || !newAppointment.time) {
      toast.error("Please fill in date and time for the appointment");
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: "scheduled"
    };

    setAppointments(prev => [...prev, appointment]);
    setNewAppointment({ date: "", time: "", type: "checkup", notes: "" });
    toast.success("Appointment scheduled successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "bg-green-500 text-white";
      case "improving": return "bg-blue-500 text-white";
      case "critical": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "lab": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "prescription": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "surgery": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{editedPatient.name}</DialogTitle>
                <DialogDescription>
                  Patient ID: {editedPatient.id} • Comprehensive medical record management
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadFHIR}>
                <FileText className="w-4 h-4 mr-2" />
                FHIR Bundle
              </Button>
              {userType === "doctor" && (
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Exit Edit" : "Edit"}
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted rounded-lg mb-6">
              <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="w-4 h-4 mr-2" />
                Patient Info
              </TabsTrigger>
              <TabsTrigger value="records" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                <FileText className="w-4 h-4 mr-2" />
                Medical Records
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editedPatient.name}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing || userType !== "doctor"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={editedPatient.age}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                          disabled={!isEditing || userType !== "doctor"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedPatient.email || ""}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing || userType !== "doctor"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editedPatient.phone || ""}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing || userType !== "doctor"}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={editedPatient.address || ""}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing || userType !== "doctor"}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Medical Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={getStatusColor(editedPatient.status)}>{editedPatient.status}</Badge>
                    </div>
                    <div>
                      <Label>Current Conditions</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {editedPatient.conditions.map((condition, index) => (
                          <Badge key={index} variant="outline">{condition}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bloodType">Blood Type</Label>
                        <Input
                          id="bloodType"
                          value={editedPatient.bloodType || ""}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, bloodType: e.target.value }))}
                          disabled={!isEditing || userType !== "doctor"}
                          placeholder="e.g., A+"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          value={editedPatient.emergencyContact || ""}
                          onChange={(e) => setEditedPatient(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          disabled={!isEditing || userType !== "doctor"}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isEditing && userType === "doctor" && (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="records" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {medicalRecords.map((record) => (
                  <Card key={record.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(record.type)}>{record.type}</Badge>
                            <span className="text-sm text-muted-foreground">{record.date}</span>
                          </div>
                          <h4 className="font-semibold mb-2">{record.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                          <p className="text-xs text-muted-foreground">Attending: {record.doctor}</p>
                          {record.files && record.files.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Attachments:</p>
                              <div className="flex flex-wrap gap-1">
                                {record.files.map((file, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {file}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {userType === "doctor" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Schedule New Appointment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="appointmentDate">Date</Label>
                          <Input
                            id="appointmentDate"
                            type="date"
                            value={newAppointment.date}
                            onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="appointmentTime">Time</Label>
                          <Input
                            id="appointmentTime"
                            type="time"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="appointmentType">Type</Label>
                          <Select 
                            value={newAppointment.type} 
                            onValueChange={(value: Appointment["type"]) => setNewAppointment(prev => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checkup">Regular Checkup</SelectItem>
                              <SelectItem value="follow-up">Follow-up</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="appointmentNotes">Notes</Label>
                        <Textarea
                          id="appointmentNotes"
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Additional notes for the appointment..."
                        />
                      </div>
                      <Button onClick={handleAddAppointment}>
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Appointment
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Appointment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getAppointmentStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <span className="text-sm font-medium">{appointment.type}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span>{appointment.date} at {appointment.time}</span>
                            </div>
                            {appointment.notes && (
                              <p className="mt-1">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.status === "scheduled" && userType === "doctor" && (
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}