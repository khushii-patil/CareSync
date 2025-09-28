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
  FileText, 
  AlertTriangle,
  Clock,
  Heart,
<<<<<<< HEAD
  User
} from "lucide-react";
import { User as UserType } from "../App";
import { DiseaseDetail } from "./DiseaseDetail";
=======
  User,
  Download
} from "lucide-react";
import { User as UserType } from "../App";
import { DiseaseDetail } from "./DiseaseDetail";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner@2.0.3";
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1

interface Disease {
  id: string;
  name: string;
  icdCode: string;
  namasteCode: string;
  ayushCode: string;
  diagnosedDate: string;
  status: "active" | "resolved" | "chronic";
  severity: "low" | "medium" | "high";
}

interface PatientDashboardProps {
  user: UserType;
  onLogout: () => void;
}

// Mock patient data
const mockDiseases: Disease[] = [
  {
    id: "1",
    name: "Hypertension",
    icdCode: "I10",
    namasteCode: "NAM-HYP-001",
    ayushCode: "AYU-RAKTA-CHAPA",
    diagnosedDate: "2023-06-15",
    status: "chronic",
    severity: "medium"
  },
  {
    id: "2", 
    name: "Type 2 Diabetes Mellitus",
    icdCode: "E11",
    namasteCode: "NAM-DM2-001",
    ayushCode: "AYU-MADHUMEHA",
    diagnosedDate: "2022-03-20",
    status: "chronic",
    severity: "high"
  },
  {
    id: "3",
    name: "Seasonal Allergic Rhinitis",
    icdCode: "J30.1",
    namasteCode: "NAM-SAR-001", 
    ayushCode: "AYU-PRATISHYAYA",
    diagnosedDate: "2024-09-10",
    status: "active",
    severity: "low"
  },
  {
    id: "4",
    name: "Migraine without Aura",
    icdCode: "G43.0",
    namasteCode: "NAM-MIG-001",
    ayushCode: "AYU-ARDHAVABHEDAKA",
    diagnosedDate: "2021-11-08",
    status: "resolved",
    severity: "medium"
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

export function PatientDashboard({ user, onLogout }: PatientDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

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
    disease.ayushCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[#70805D] text-white";
      case "chronic": return "bg-[#2A3B27] text-white";
      case "resolved": return "bg-[#96A7B6] text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

<<<<<<< HEAD
=======
  const handleDownloadMedicalReport = () => {
    const reportData = {
      patient: {
        name: user.firstName,
        email: user.email
      },
      medicalHistory: filteredDiseases,
      generatedDate: new Date().toISOString(),
      summary: {
        totalConditions: filteredDiseases.length,
        activeConditions: filteredDiseases.filter(d => d.status === "active").length,
        chronicConditions: filteredDiseases.filter(d => d.status === "chronic").length,
        resolvedConditions: filteredDiseases.filter(d => d.status === "resolved").length
      },
      namasteCompliance: true,
      fhirCompliant: true
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-report-${user.firstName}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Medical report downloaded successfully!");
  };

>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
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
            userType="patient"
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header 
        variants={itemVariants}
<<<<<<< HEAD
        className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-40"
=======
        className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-[100]"
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
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
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground font-medium">{user.firstName}</span>
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
            {getGreeting()}, {user.firstName}! 👋
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome to your personal health dashboard. Track your medical history and stay informed about your health journey.
          </motion.p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: FileText, color: "var(--primary-blue)", label: "Total Conditions", value: mockDiseases.length },
            { icon: Activity, color: "var(--primary-green)", label: "Active Conditions", value: mockDiseases.filter(d => d.status === "active").length },
            { icon: Heart, color: "var(--primary-green)", label: "Chronic Conditions", value: mockDiseases.filter(d => d.status === "chronic").length },
            { icon: Clock, color: "var(--primary-blue)", label: "Resolved", value: mockDiseases.filter(d => d.status === "resolved").length }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
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

        {/* Medical History */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CardTitle className="text-2xl text-foreground">Medical History</CardTitle>
                </motion.div>
                <motion.div 
                  className="relative max-w-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conditions, codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input-background border-border focus:border-ring transition-all duration-300 focus:shadow-md"
                  />
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <AnimatePresence>
                  {filteredDiseases.map((disease, index) => (
                    <motion.div
                      key={disease.id}
                      variants={itemVariants}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover="hover"
                      onClick={() => setSelectedDisease(disease)}
                      className="cursor-pointer"
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
                                  {disease.name}
                                </motion.h3>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <Badge className={getStatusColor(disease.status)}>
                                    {disease.status}
                                  </Badge>
                                </motion.div>
                                <motion.div 
                                  className={`flex items-center gap-1 ${getSeverityColor(disease.severity)}`}
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="text-sm capitalize">{disease.severity}</span>
                                </motion.div>
                              </div>
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
                                    key={item.label}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    <span className="text-muted-foreground">{item.label}: </span>
                                    <span className="text-foreground font-mono">{item.code}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </div>
                            <motion.div 
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Calendar className="w-4 h-4" />
                              {new Date(disease.diagnosedDate).toLocaleDateString()}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredDiseases.length === 0 && (
                  <motion.div 
                    className="text-center py-8 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    No conditions found matching your search.
                  </motion.div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
<<<<<<< HEAD
=======

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>

      {/* Download Report Button - Fixed Position */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={handleDownloadMedicalReport}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </motion.div>
      </div>
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
    </motion.div>
  );
}