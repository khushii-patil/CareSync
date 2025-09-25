import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Leaf, 
  LogOut, 
  Search, 
  Calendar, 
  Activity, 
  AlertTriangle,
  Users,
  BookOpen,
  Stethoscope,
  Copy,
  Plus,
  BarChart3
} from "lucide-react";
import { User as UserType } from "../App";
import { DiseaseDetail } from "./DiseaseDetail";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { AISuggestions } from "./AISuggestions";
import { FHIRModal } from "./FHIRModal";
import { PatientListSidebar } from "./PatientListSidebar";
import { toast } from "sonner@2.0.3";

interface Disease {
  id: string;
  name: string;
  icdCode: string;
  namasteCode: string;
  ayushCode: string;
  description: string;
  prevalence: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  conditions: string[];
  status: "stable" | "critical" | "improving";
}

interface DoctorDashboardProps {
  user: UserType;
  onLogout: () => void;
}

// Mock disease database
const mockDiseases: Disease[] = [
  {
    id: "1",
    name: "Hypertension",
    icdCode: "I10",
    namasteCode: "NAM-HYP-001",
    ayushCode: "AYU-RAKTA-CHAPA",
    description: "Essential hypertension",
    prevalence: "High - affects 25% of adults"
  },
  {
    id: "2",
    name: "Type 2 Diabetes Mellitus", 
    icdCode: "E11",
    namasteCode: "NAM-DM2-001",
    ayushCode: "AYU-MADHUMEHA",
    description: "Non-insulin-dependent diabetes mellitus",
    prevalence: "Common - affects 8% of population"
  },
  {
    id: "3",
    name: "Migraine without Aura",
    icdCode: "G43.0", 
    namasteCode: "NAM-MIG-001",
    ayushCode: "AYU-ARDHAVABHEDAKA",
    description: "Recurrent headache disorder",
    prevalence: "Moderate - affects 12% of adults"
  },
  {
    id: "4",
    name: "Asthma",
    icdCode: "J45",
    namasteCode: "NAM-AST-001",
    ayushCode: "AYU-TAMAKA-SHWASA",
    description: "Chronic respiratory condition",
    prevalence: "Common - affects 8% of children, 7% adults"
  },
  {
    id: "5",
    name: "Gastroesophageal Reflux Disease",
    icdCode: "K21.9",
    namasteCode: "NAM-GRD-001", 
    ayushCode: "AYU-AMLAPITTA",
    description: "Chronic acid reflux condition",
    prevalence: "Very Common - affects 20% of adults"
  }
];

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Raj Patel",
    age: 45,
    lastVisit: "2024-09-15",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    status: "stable"
  },
  {
    id: "2", 
    name: "Priya Sharma",
    age: 32,
    lastVisit: "2024-09-18",
    conditions: ["Migraine", "Anxiety"],
    status: "improving"
  },
  {
    id: "3",
    name: "Amit Kumar",
    age: 28,
    lastVisit: "2024-09-20",
    conditions: ["Asthma"],
    status: "critical"
  },
  {
    id: "4",
    name: "Sneha Gupta",
    age: 38,
    lastVisit: "2024-09-12",
    conditions: ["GERD", "Hypertension"],
    status: "stable"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [activeTab, setActiveTab] = useState("diseases");
  const [showFHIRModal, setShowFHIRModal] = useState(false);
  const [selectedFHIRDisease, setSelectedFHIRDisease] = useState<Disease | null>(null);
  const [patientListItems, setPatientListItems] = useState<any[]>([]);
  const [showPatientList, setShowPatientList] = useState(false);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Filter diseases based on search
  const filteredDiseases = mockDiseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.icdCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.namasteCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.ayushCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter patients based on search
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "bg-green-500 text-white";
      case "improving": return "bg-blue-500 text-white";
      case "critical": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  // Check if we should show AI suggestions (no exact matches but search term exists)
  const shouldShowAISuggestions = searchTerm.length > 2 && filteredDiseases.length === 0;

  // Mock AI suggestions
  const aiSuggestions = [
    {
      name: "Essential Hypertension",
      icdCode: "I10.1",
      namasteCode: "NAM-HTN-002",
      ayushCode: "AYU-RAKTA-ADHIKYA",
      confidence: 92,
      reasoning: "Based on semantic similarity with cardiovascular symptoms"
    },
    {
      name: "Secondary Hypertension",  
      icdCode: "I15.9",
      namasteCode: "NAM-HTN-003",
      ayushCode: "AYU-VATA-RAKTA",
      confidence: 85,
      reasoning: "Related condition with similar clinical presentation"
    },
    {
      name: "Hypertensive Heart Disease",
      icdCode: "I11.9", 
      namasteCode: "NAM-HTN-004",
      ayushCode: "AYU-HRIDAYA-VIKARA",
      confidence: 78,
      reasoning: "Complication of hypertension matching search pattern"
    }
  ];

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${type} code copied to clipboard!`);
  };

  const handleAddToPatientList = (disease: Disease | any) => {
    const newItem = {
      name: disease.name,
      icdCode: disease.icdCode,
      namasteCode: disease.namasteCode,
      ayushCode: disease.ayushCode,
      addedAt: new Date()
    };
    setPatientListItems(prev => [...prev, newItem]);
    toast.success(`${disease.name} added to patient list!`);
  };

  const handleRemoveFromPatientList = (index: number) => {
    setPatientListItems(prev => prev.filter((_, i) => i !== index));
    toast.success("Item removed from patient list");
  };

  const handleClearPatientList = () => {
    setPatientListItems([]);
    toast.success("Patient list cleared");
  };

  const handleViewFHIR = (disease: Disease) => {
    setSelectedFHIRDisease(disease);
    setShowFHIRModal(true);
  };

  if (selectedDisease) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="disease-detail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <DiseaseDetail 
            disease={selectedDisease} 
            onBack={() => setSelectedDisease(null)}
            userType="doctor"
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <motion.div 
        className="min-h-screen bg-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.header 
          variants={itemVariants}
          className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">CareSync</span>
              </motion.div>
              
              <div className="flex items-center gap-4">
                <motion.div 
                  className="hidden sm:flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Stethoscope className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">Dr. {user.firstName}</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 
              className="text-3xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {getGreeting()}, Dr. {user.firstName}! 🩺
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Access your medical knowledge base, search disease codes, and manage patient records all in one place.
            </motion.p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { icon: Users, color: "var(--primary-blue)", label: "Total Patients", value: mockPatients.length },
              { icon: BookOpen, color: "var(--primary-blue)", label: "Disease Codes", value: mockDiseases.length },
              { icon: AlertTriangle, color: "red", label: "Critical Patients", value: mockPatients.filter(p => p.status === "critical").length },
              { icon: Activity, color: "var(--light-blue)", label: "Stable Patients", value: mockPatients.filter(p => p.status === "stable").length }
            ].map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                variants={itemVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                          style={{ backgroundColor: `${stat.color}15` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                        </motion.div>
                        <div>
                          <motion.p 
                            className="text-2xl font-bold text-foreground"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                          >
                            {stat.value}
                          </motion.p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <CardTitle className="text-2xl text-foreground">Medical Information</CardTitle>
                  </motion.div>
                  <motion.div 
                    className="relative max-w-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={activeTab === "diseases" ? "Search diseases, codes..." : "Search patients..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-input-background border-border focus:border-ring transition-all duration-300 focus:shadow-md"
                    />
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <TabsList className="grid w-full grid-cols-3 bg-muted rounded-lg">
                      <TabsTrigger 
                        value="diseases"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Disease Database
                      </TabsTrigger>
                      <TabsTrigger 
                        value="patients"
                        className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Patient Records
                      </TabsTrigger>
                      <TabsTrigger 
                        value="analytics"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </TabsTrigger>
                    </TabsList>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <TabsContent value="diseases" className="mt-6">
                      <motion.div 
                        key={`diseases-content-${searchTerm}`}
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                      >
                        <AnimatePresence>
                          {filteredDiseases.map((disease, index) => (
                            <motion.div
                              key={`disease-${disease.id}`}
                              variants={itemVariants}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover="hover"
                            >
                              <motion.div variants={cardHoverVariants}>
                                <div className="p-4 bg-accent/50 rounded-lg border border-border hover:border-ring hover:shadow-md transition-all duration-300">
                                  <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                      <motion.h3 
                                        className="font-semibold text-foreground text-lg cursor-pointer"
                                        whileHover={{ color: "var(--primary)" }}
                                        transition={{ duration: 0.2 }}
                                        onClick={() => setSelectedDisease(disease)}
                                      >
                                        {disease.name}
                                      </motion.h3>
                                      <div className="flex items-center gap-2">
                                        <motion.div
                                          whileHover={{ scale: 1.1 }}
                                          transition={{ type: "spring", stiffness: 400 }}
                                        >
                                          <Badge className="bg-muted text-muted-foreground">{disease.prevalence?.split(' - ')[0]}</Badge>
                                        </motion.div>
                                      </div>
                                    </div>
                                    
                                    <p className="text-muted-foreground text-sm">{disease.description}</p>
                                    
                                    <motion.div 
                                      className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
                                      variants={containerVariants}
                                    >
                                      {[
                                        { label: "ICD-11", code: disease.icdCode },
                                        { label: "NAMASTE", code: disease.namasteCode },
                                        { label: "AYUSH", code: disease.ayushCode }
                                      ].map((item, idx) => (
                                        <motion.div
                                          key={`${disease.id}-${item.label}-${idx}`}
                                          className="flex items-center justify-between p-2 bg-muted/50 rounded"
                                          variants={itemVariants}
                                          whileHover={{ x: 5 }}
                                          transition={{ type: "spring", stiffness: 400 }}
                                        >
                                          <div>
                                            <span className="text-muted-foreground text-xs">{item.label}</span>
                                            <p className="text-foreground font-mono text-sm">{item.code}</p>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleCopyCode(item.code, item.label);
                                            }}
                                            className="h-8 w-8 p-0"
                                          >
                                            <Copy className="w-3 h-3" />
                                          </Button>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                    
                                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                      <p className="text-xs text-muted-foreground">{disease.prevalence}</p>
                                      
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewFHIR(disease);
                                          }}
                                        >
                                          <span className="text-xs mr-1">{`{}`}</span>
                                          FHIR
                                        </Button>
                                        
                                        <Button
                                          variant="default"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToPatientList(disease);
                                          }}
                                        >
                                          <Plus className="w-3 h-3 mr-1" />
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {/* Show AI Suggestions when no direct matches */}
                        {shouldShowAISuggestions && activeTab === "diseases" && (
                          <AISuggestions
                            searchTerm={searchTerm}
                            suggestions={aiSuggestions}
                            onSelectSuggestion={(suggestion) => {
                              const mockDisease = {
                                id: 'ai-' + Date.now(),
                                name: suggestion.name,
                                icdCode: suggestion.icdCode,
                                namasteCode: suggestion.namasteCode,
                                ayushCode: suggestion.ayushCode,
                                description: `AI suggested condition based on search: ${searchTerm}`,
                                prevalence: "AI Suggested"
                              };
                              setSelectedDisease(mockDisease);
                            }}
                            onAddToPatientList={handleAddToPatientList}
                          />
                        )}
                        
                        {filteredDiseases.length === 0 && !shouldShowAISuggestions && (
                          <motion.div 
                            className="text-center py-8 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            No diseases found matching your search.
                          </motion.div>
                        )}
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="patients" className="mt-6">
                      <motion.div 
                        key={`patients-content-${searchTerm}`}
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                      >
                        <AnimatePresence>
                          {filteredPatients.map((patient, index) => (
                            <motion.div
                              key={`patient-${patient.id}`}
                              variants={itemVariants}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover="hover"
                            >
                              <motion.div variants={cardHoverVariants}>
                                <div className="p-4 bg-accent/50 rounded-lg border border-border hover:border-ring hover:shadow-md transition-all duration-300">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <motion.h3 
                                          className="font-semibold text-foreground"
                                          whileHover={{ color: "var(--primary)" }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          {patient.name}
                                        </motion.h3>
                                        <Badge className={getStatusColor(patient.status)}>
                                          {patient.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <span>Age: {patient.age}</span>
                                        <span>Last Visit: {patient.lastVisit}</span>
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {patient.conditions.map((condition, idx) => (
                                          <Badge key={`${patient.id}-condition-${idx}`} variant="outline" className="text-xs">
                                            {condition}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button variant="outline" size="sm">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Schedule
                                      </Button>
                                      <Button variant="default" size="sm">
                                        <Activity className="w-3 h-3 mr-1" />
                                        View Records
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {filteredPatients.length === 0 && (
                          <motion.div 
                            className="text-center py-8 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            No patients found matching your search.
                          </motion.div>
                        )}
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="analytics" className="mt-6">
                      <motion.div 
                        key={`analytics-content-${activeTab}`}
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                      >
                        <AnalyticsDashboard />
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* FHIR Modal */}
      {showFHIRModal && selectedFHIRDisease && (
        <FHIRModal
          disease={selectedFHIRDisease}
          onClose={() => setShowFHIRModal(false)}
        />
      )}

      {/* Patient List Sidebar */}
      <PatientListSidebar
        isOpen={showPatientList}
        onClose={() => setShowPatientList(false)}
        items={patientListItems}
        onRemoveItem={handleRemoveFromPatientList}
        onClearAll={handleClearPatientList}
      />
    </>
  );
}