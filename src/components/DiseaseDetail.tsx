import { 
  ArrowLeft, 
  Leaf, 
  AlertTriangle, 
  Shield, 
  Activity,
  FileText,
  Stethoscope,
  Heart,
  Zap,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Disease {
  id: string;
  name: string;
  icdCode: string;
  namasteCode: string;
  ayushCode: string;
  description?: string;
  prevalence?: string;
  diagnosedDate?: string;
  status?: string;
  severity?: string;
}

interface DiseaseDetailProps {
  disease: Disease;
  onBack: () => void;
  userType: "doctor" | "patient";
}

// Comprehensive disease information
const diseaseInfo: Record<string, any> = {
  "Hypertension": {
    causes: [
      "Genetic predisposition",
      "High sodium intake",
      "Lack of physical activity",
      "Obesity",
      "Excessive alcohol consumption",
      "Chronic stress",
      "Age-related arterial stiffening"
    ],
    ayurvedicCauses: [
      "Vata dosha imbalance",
      "Excessive consumption of salty, sour foods",
      "Mental stress and anxiety",
      "Irregular lifestyle patterns",
      "Suppression of natural urges"
    ],
    modernCures: [
      "ACE inhibitors (Lisinopril, Enalapril)",
      "Beta-blockers (Metoprolol, Atenolol)",
      "Calcium channel blockers (Amlodipine)",
      "Diuretics (Hydrochlorothiazide)",
      "Lifestyle modifications (diet, exercise)",
      "Sodium restriction (<2g/day)",
      "Regular blood pressure monitoring"
    ],
    ayurvedicCures: [
      "Sarpagandha (Rauwolfia serpentina) - 500mg twice daily",
      "Arjuna (Terminalia arjuna) bark powder - 3g with water",
      "Garlic (Lasuna) supplements",
      "Brahmi (Bacopa monnieri) for stress management",
      "Pranayama and meditation",
      "Shirodhara therapy",
      "Abhyanga (oil massage) with warm sesame oil"
    ],
    damageLevel: "Medium to High",
    complications: [
      "Heart attack",
      "Stroke", 
      "Kidney damage",
      "Vision problems",
      "Heart failure"
    ],
    insurance: {
      hasInsurance: true,
      claimEligibility: "High",
      estimatedCost: "₹2,50,000 - ₹8,00,000 annually",
      coverageDetails: [
        "Hospitalization for cardiovascular emergencies",
        "Regular BP monitoring equipment",
        "Specialist consultations (Cardiologist)",
        "Diagnostic tests (ECG, Echocardiogram)",
        "Prescription medications coverage",
        "Lifestyle modification programs"
      ],
      claimProcess: [
        "Get pre-authorization for planned treatments",
        "Submit NAMASTE code N.HTN.001 for documentation",
        "Include ICD-11 code for international recognition",
        "Maintain treatment records for reimbursement",
        "Use network hospitals for cashless treatment"
      ],
      recommendedPolicies: [
        "Aditya Birla Activ Health Enhanced - ₹15,000/year",
        "Star Health Comprehensive - ₹12,000/year",
        "HDFC ERGO myHealth Suraksha - ₹18,000/year"
      ]
    }
  },
  "Type 2 Diabetes Mellitus": {
    causes: [
      "Insulin resistance",
      "Genetic factors",
      "Obesity",
      "Sedentary lifestyle",
      "High-carbohydrate diet",
      "Age (>45 years)",
      "Metabolic syndrome"
    ],
    ayurvedicCauses: [
      "Kapha dosha excess",
      "Excessive sweet consumption",
      "Sedentary lifestyle (lack of vyayama)",
      "Improper digestion (agnimandya)",
      "Genetic predisposition (beeja dosha)"
    ],
    modernCures: [
      "Metformin (500-2000mg daily)",
      "Sulfonylureas (Glipizide, Glyburide)",
      "DPP-4 inhibitors (Sitagliptin)",
      "SGLT-2 inhibitors (Empagliflozin)",
      "Insulin therapy (if needed)",
      "Blood glucose monitoring",
      "Dietary carbohydrate control",
      "Regular exercise (150min/week)"
    ],
    ayurvedicCures: [
      "Bitter gourd (Karela) juice - 30ml daily",
      "Fenugreek seeds (Methi) - soaked overnight",
      "Turmeric (Haridra) - 500mg twice daily",
      "Gymnema sylvestre (Gurmar) - 400mg",
      "Triphala churna - 3g at bedtime",
      "Yoga and pranayama",
      "Panchakarma detox therapy"
    ],
    damageLevel: "High",
    complications: [
      "Diabetic retinopathy",
      "Diabetic nephropathy",
      "Diabetic neuropathy",
      "Cardiovascular disease",
      "Poor wound healing"
    ],
    insurance: {
      hasInsurance: true,
      claimEligibility: "Very High",
      estimatedCost: "₹3,00,000 - ₹12,00,000 annually",
      coverageDetails: [
        "Blood glucose monitoring supplies",
        "Insulin and other medications",
        "Diabetic complications treatment",
        "Regular eye and kidney checkups",
        "Foot care and wound management",
        "Nutritionist consultations"
      ],
      claimProcess: [
        "Pre-authorization for insulin pumps/CGM",
        "Submit NAMASTE code N.DM2.001 for documentation", 
        "Include HbA1c reports for claim verification",
        "Maintain medication purchase receipts",
        "Use ABHA number for easier processing"
      ],
      recommendedPolicies: [
        "Star Health Diabetes Safe - ₹20,000/year",
        "Care Health Diabetes Cover - ₹25,000/year",
        "Bajaj Allianz Critical Illness - ₹18,200/year"
      ]
    }
  },
  "Seasonal Allergic Rhinitis": {
    causes: [
      "Pollen exposure",
      "Environmental allergens",
      "Dust mites",
      "Mold spores",
      "Pet dander",
      "Genetic predisposition",
      "Immune system hypersensitivity"
    ],
    ayurvedicCauses: [
      "Kapha dosha accumulation",
      "Weak ojas (immunity)",
      "Ama (toxins) in the body",
      "Seasonal weather changes",
      "Poor digestion"
    ],
    modernCures: [
      "Antihistamines (Cetirizine, Loratadine)",
      "Nasal corticosteroids (Fluticasone)",
      "Decongestants (Pseudoephedrine)",
      "Allergen avoidance",
      "Nasal saline irrigation",
      "Air purifiers",
      "Allergy shots (immunotherapy)"
    ],
    ayurvedicCures: [
      "Haridra (Turmeric) with warm milk",
      "Ginger tea with honey",
      "Nasya with Anu taila",
      "Steam inhalation with eucalyptus",
      "Trikatu churna before meals",
      "Local honey consumption",
      "Pranayama (breathing exercises)"
    ],
    damageLevel: "Low",
    complications: [
      "Chronic sinusitis",
      "Sleep disturbance",
      "Reduced quality of life",
      "Asthma development",
      "Secondary infections"
    ]
  },
  "Migraine without Aura": {
    causes: [
      "Hormonal changes",
      "Stress and anxiety",
      "Certain foods (chocolate, wine)",
      "Sleep disturbances",
      "Weather changes",
      "Bright lights or loud sounds",
      "Genetic predisposition"
    ],
    ayurvedicCauses: [
      "Vata dosha imbalance",
      "Pitta dosha excess",
      "Mental stress and worry",
      "Irregular eating patterns",
      "Suppression of natural urges",
      "Excessive heat exposure"
    ],
    modernCures: [
      "Triptans (Sumatriptan, Rizatriptan)",
      "NSAIDs (Ibuprofen, Naproxen)",
      "Preventive medications (Propranolol)",
      "Anti-emetics for nausea",
      "Rest in dark, quiet room",
      "Cold or hot compress",
      "Stress management"
    ],
    ayurvedicCures: [
      "Brahmi ghrita - 1 tsp with warm milk",
      "Saraswatarishta - 20ml twice daily",
      "Head massage with coconut oil",
      "Shiropichu therapy",
      "Meditation and yoga",
      "Avoid trigger foods",
      "Regular sleep schedule"
    ],
    damageLevel: "Medium",
    complications: [
      "Chronic daily headaches",
      "Medication overuse headaches",
      "Depression and anxiety",
      "Sleep disorders",
      "Reduced productivity"
    ]
  }
};

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

export function DiseaseDetail({ disease, onBack, userType }: DiseaseDetailProps) {
  const info = diseaseInfo[disease.name] || {
    causes: ["Information not available"],
    ayurvedicCauses: ["Information not available"],
    modernCures: ["Consult healthcare provider"],
    ayurvedicCures: ["Consult Ayurvedic practitioner"],
    damageLevel: "Unknown",
    complications: ["Consult healthcare provider"]
  };

  const getDamageLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

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
        className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {userType === "doctor" ? "Dashboard" : "Health Records"}
                </Button>
              </motion.div>
            </motion.div>
            
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
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disease Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <motion.h1 
              className="text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {disease.name}
            </motion.h1>
            {disease.status && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <Badge className="bg-muted text-muted-foreground text-lg px-3 py-1">
                  {disease.status}
                </Badge>
              </motion.div>
            )}
          </div>
          
          {/* Code Information */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
            variants={containerVariants}
          >
            {[
              { icon: FileText, color: "var(--primary-blue)", label: "ICD-11 Code", code: disease.icdCode },
              { icon: Activity, color: "var(--light-blue)", label: "NAMASTE Code", code: disease.namasteCode },
              { icon: Heart, color: "var(--primary-green)", label: "AYUSH Code", code: disease.ayushCode }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-8 h-8" style={{ color: item.color }} />
                        </motion.div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <motion.p 
                            className="text-xl font-mono font-bold text-foreground"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {item.code}
                          </motion.p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Damage Level Alert */}
          <motion.div 
            className={`p-4 rounded-lg border-2 ${getDamageLevelColor(info.damageLevel)} mb-6`}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-6 h-6" />
              </motion.div>
              <div>
                <p className="font-semibold">Damage Level: {info.damageLevel}</p>
                <p className="text-sm opacity-80">
                  {info.damageLevel === "High" && "Requires immediate medical attention and long-term management"}
                  {info.damageLevel === "Medium" && "Needs proper medical care and lifestyle modifications"}
                  {info.damageLevel === "Low" && "Generally manageable with proper care and prevention"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Detailed Information Tabs */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <Tabs defaultValue="causes" className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-muted rounded-lg">
                    <TabsTrigger value="causes" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all duration-300">
                      <Zap className="w-4 h-4 mr-2" />
                      Causes
                    </TabsTrigger>
                    <TabsTrigger value="modern-treatment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Modern Treatment
                    </TabsTrigger>
                    <TabsTrigger value="ayurvedic-treatment" className="data-[state=active]:bg-[#70805D] data-[state=active]:text-white transition-all duration-300">
                      <Heart className="w-4 h-4 mr-2" />
                      Ayurvedic Treatment
                    </TabsTrigger>
                    <TabsTrigger value="complications" className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300">
                      <Shield className="w-4 h-4 mr-2" />
                      Complications
                    </TabsTrigger>
                    {info.insurance && (
                      <TabsTrigger value="insurance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#55738D] data-[state=active]:to-[#70805D] data-[state=active]:text-white transition-all duration-300">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Insurance
                      </TabsTrigger>
                    )}
                  </TabsList>
                </motion.div>

                <AnimatePresence mode="wait">
                  <TabsContent value="causes" className="mt-6">
                    <motion.div 
                      key="causes-tab"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                      <motion.div variants={cardHoverVariants} whileHover="hover">
                        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="text-primary flex items-center gap-2">
                              <Stethoscope className="w-5 h-5" />
                              Modern Medicine Perspective
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.ul 
                              className="space-y-3"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {info.causes.map((cause: string, index: number) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start gap-3"
                                  variants={itemVariants}
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-card-foreground">{cause}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div variants={cardHoverVariants} whileHover="hover">
                        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="text-[#70805D] flex items-center gap-2">
                              <Heart className="w-5 h-5" />
                              Ayurvedic Perspective
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.ul 
                              className="space-y-3"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {info.ayurvedicCauses.map((cause: string, index: number) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start gap-3"
                                  variants={itemVariants}
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-2 h-2 bg-[#70805D] rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-card-foreground">{cause}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="modern-treatment" className="mt-6">
                    <motion.div
                      key="modern-treatment-tab"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div variants={cardHoverVariants} whileHover="hover">
                        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="text-primary flex items-center gap-2">
                              <Stethoscope className="w-5 h-5" />
                              Modern Medical Treatment
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.div 
                              className="grid gap-4"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {info.modernCures.map((cure: string, index: number) => (
                                <motion.div 
                                  key={index} 
                                  className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg border border-border hover:border-primary/40 transition-all duration-300"
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-card-foreground">{cure}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="ayurvedic-treatment" className="mt-6">
                    <motion.div
                      key="ayurvedic-treatment-tab"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div variants={cardHoverVariants} whileHover="hover">
                        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="text-[#70805D] flex items-center gap-2">
                              <Heart className="w-5 h-5" />
                              Ayurvedic Treatment
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.div 
                              className="grid gap-4"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {info.ayurvedicCures.map((cure: string, index: number) => (
                                <motion.div 
                                  key={index} 
                                  className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg border border-border hover:border-[#70805D]/40 transition-all duration-300"
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-2 h-2 bg-[#70805D] rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-card-foreground">{cure}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="complications" className="mt-6">
                    <motion.div
                      key="complications-tab"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div variants={cardHoverVariants} whileHover="hover">
                        <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5" />
                              Potential Complications
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.div 
                              className="grid gap-4"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {info.complications.map((complication: string, index: number) => (
                                <motion.div 
                                  key={index} 
                                  className="flex items-start gap-3 p-3 bg-white/60 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300"
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                                  <span className="text-red-700 dark:text-red-300">{complication}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  {info.insurance && (
                    <TabsContent value="insurance" className="mt-6">
                      <motion.div
                        key="insurance-tab"
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <motion.div variants={cardHoverVariants} whileHover="hover">
                          <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                              <CardTitle className="text-foreground flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                Insurance Coverage & Claims
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {/* Overview */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <motion.div
                                  className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-lg border border-green-200 dark:border-green-800"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <p className="text-sm text-green-700 dark:text-green-300 mb-1">Coverage Status</p>
                                  <Badge className="bg-green-500 text-white">
                                    {info.insurance.hasInsurance ? "Available" : "Not Available"}
                                  </Badge>
                                </motion.div>
                                <motion.div
                                  className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Claim Eligibility</p>
                                  <Badge className={`${
                                    info.insurance.claimEligibility === "Very High" ? "bg-red-500" :
                                    info.insurance.claimEligibility === "High" ? "bg-orange-500" :
                                    info.insurance.claimEligibility === "Medium" ? "bg-yellow-500" :
                                    "bg-green-500"
                                  } text-white`}>
                                    {info.insurance.claimEligibility}
                                  </Badge>
                                </motion.div>
                                <motion.div
                                  className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Estimated Annual Cost</p>
                                  <p className="font-semibold text-purple-900 dark:text-purple-100">
                                    {info.insurance.estimatedCost}
                                  </p>
                                </motion.div>
                              </div>

                              {/* Coverage Details */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Shield className="w-4 h-4" />
                                  What's Covered
                                </h4>
                                <motion.div 
                                  className="grid gap-3"
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="visible"
                                >
                                  {info.insurance.coverageDetails.map((detail: string, index: number) => (
                                    <motion.div 
                                      key={index} 
                                      className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300"
                                      variants={itemVariants}
                                      whileHover={{ scale: 1.02, x: 5 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                    >
                                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-green-700 dark:text-green-300">{detail}</span>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>

                              {/* Claim Process */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  Claim Process
                                </h4>
                                <motion.div 
                                  className="grid gap-3"
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="visible"
                                >
                                  {info.insurance.claimProcess.map((step: string, index: number) => (
                                    <motion.div 
                                      key={index} 
                                      className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300"
                                      variants={itemVariants}
                                      whileHover={{ scale: 1.02, x: 5 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                    >
                                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                      </div>
                                      <span className="text-blue-700 dark:text-blue-300">{step}</span>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>

                              {/* Recommended Policies */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Heart className="w-4 h-4" />
                                  Recommended Insurance Policies
                                </h4>
                                <motion.div 
                                  className="grid gap-3"
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="visible"
                                >
                                  {info.insurance.recommendedPolicies.map((policy: string, index: number) => (
                                    <motion.div 
                                      key={index} 
                                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/10 to-[#70805D]/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300"
                                      variants={itemVariants}
                                      whileHover={{ scale: 1.02, x: 5 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                    >
                                      <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                      <span className="text-foreground font-medium">{policy}</span>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>

                              {/* Disclaimer */}
                              <motion.div 
                                className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                  <strong>Disclaimer:</strong> Insurance coverage varies by provider and policy. Consult with your insurance provider for accurate coverage details and claims procedures. CareSync's NAMASTE code system helps streamline the claim process.
                                </p>
                              </motion.div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </TabsContent>
                  )}
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Patient-specific information */}
        {userType === "patient" && disease.diagnosedDate && (
          <motion.div variants={itemVariants} className="mt-6">
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-foreground">Your Medical Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Diagnosis Date</p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(disease.diagnosedDate).toLocaleDateString()}
                      </p>
                    </motion.div>
                    {disease.severity && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">Severity Level</p>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Badge className={`text-sm ${
                            disease.severity === "high" ? "bg-red-500" :
                            disease.severity === "medium" ? "bg-yellow-500" :
                            "bg-green-500"
                          } text-white`}>
                            {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                          </Badge>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}