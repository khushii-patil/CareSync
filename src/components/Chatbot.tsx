import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  Heart,
  Stethoscope,
  Activity
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "greeting" | "question" | "suggestion";
}

const predefinedQuestions = [
  "What are the symptoms of hypertension?",
  "How can I manage diabetes naturally?",
  "Tell me about Ayurvedic treatments",
  "What is the difference between ICD and AYUSH codes?",
  "How do I book an appointment?",
  "What are common side effects of blood pressure medications?"
];

const botResponses: Record<string, string> = {
  "symptoms hypertension": "Common symptoms of hypertension include headaches, shortness of breath, nosebleeds, and dizziness. However, hypertension is often called the 'silent killer' because many people have no symptoms at all. Regular blood pressure monitoring is essential.",
  
  "manage diabetes": "Natural diabetes management includes: 1) Following a low glycemic diet, 2) Regular exercise (30 mins daily), 3) Maintaining healthy weight, 4) Managing stress, 5) Getting adequate sleep. Ayurvedic approaches include bitter gourd juice, fenugreek seeds, and turmeric supplements.",
  
  "ayurvedic treatments": "Ayurvedic treatments focus on balancing the three doshas (Vata, Pitta, Kapha). Common treatments include herbal medicines, panchakarma detox, yoga, meditation, and personalized diet plans. Always consult with a qualified Ayurvedic practitioner.",
  
  "icd ayush codes": "ICD codes are international medical classification codes used globally. AYUSH codes are specific to traditional Indian medicine systems. NAMASTE codes bridge both systems, allowing for dual-coding in CareSync to integrate traditional and modern healthcare.",
  
  "book appointment": "To book an appointment, log in to your CareSync account, go to the 'Appointments' section, select your preferred doctor and time slot. You can choose between in-person or teleconsultation options.",
  
  "default": "Thank you for your question! I'm here to help with healthcare information, CareSync features, and general wellness guidance. For specific medical advice, please consult with your healthcare provider through our platform."
};

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
};

const chatVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your CareSync AI assistant. I can help you with healthcare information, using our platform, and answer questions about traditional and modern medicine. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "greeting"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const generateResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    if (lowercaseMessage.includes("symptom") && lowercaseMessage.includes("hypertension")) {
      return botResponses["symptoms hypertension"];
    } else if (lowercaseMessage.includes("diabetes") && (lowercaseMessage.includes("manage") || lowercaseMessage.includes("natural"))) {
      return botResponses["manage diabetes"];
    } else if (lowercaseMessage.includes("ayurvedic") || lowercaseMessage.includes("ayurveda")) {
      return botResponses["ayurvedic treatments"];
    } else if ((lowercaseMessage.includes("icd") && lowercaseMessage.includes("ayush")) || lowercaseMessage.includes("code")) {
      return botResponses["icd ayush codes"];
    } else if (lowercaseMessage.includes("appointment") || lowercaseMessage.includes("book")) {
      return botResponses["book appointment"];
    } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      return "Hello! How can I help you with your healthcare needs today?";
    } else if (lowercaseMessage.includes("thank")) {
      return "You're welcome! I'm here whenever you need healthcare assistance.";
    } else {
      return botResponses["default"];
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setInputText(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-[90]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 relative"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.div>
            <AnimatePresence>
              {!isOpen && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[85] w-80 sm:w-96"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className={`backdrop-blur-lg border shadow-2xl transition-all duration-300 ${ 
              isMinimized ? "h-16" : "h-96"
            } bg-card border-border`}>
              {/* Chat Header */}
              <motion.div
                className="bg-gradient-to-r from-[#55738D] to-[#96A7B6] text-white p-4 rounded-t-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-sm font-medium">CareSync Assistant</CardTitle>
                      <div className="flex items-center gap-1 text-xs opacity-90">
                        <motion.div 
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span>Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        onClick={() => setIsMinimized(!isMinimized)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 w-8 h-8 p-0"
                      >
                        <motion.div
                          animate={{ rotate: isMinimized ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                        </motion.div>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 w-8 h-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="p-0 flex flex-col h-80">
                      {/* Messages Area */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          <AnimatePresence>
                            {messages.map((message) => (
                              <motion.div
                                key={message.id}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div className={`flex items-start gap-2 max-w-[80%] ${
                                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                                }`}>
                                  <motion.div 
                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                      message.sender === "user" 
                                        ? "bg-[#2A3B27] text-white" 
                                        : "bg-[#55738D] text-white"
                                    }`}
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    {message.sender === "user" ? (
                                      <User className="w-3 h-3" />
                                    ) : (
                                      <Bot className="w-3 h-3" />
                                    )}
                                  </motion.div>
                                  <motion.div 
                                    className={`p-3 rounded-lg break-words ${ // Added break-words for text overflow
                                      message.sender === "user"
                                        ? "bg-[#2A3B27] dark:bg-[#70805D] text-white rounded-br-none"
                                        : "bg-muted text-foreground border border-border rounded-bl-none"
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    <p className="text-sm break-words">{message.text}</p>
                                    <p className={`text-xs mt-1 ${ // Updated for proper dark theme
                                      message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                                    }`}>
                                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                  </motion.div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </ScrollArea>

                      {/* Quick Questions */}
                      <AnimatePresence>
                        {messages.length === 1 && (
                          <motion.div 
                            className="px-4 py-2 border-t border-border bg-muted/30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.5 }}
                          >
                            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                            <div className="flex flex-wrap gap-1">
                              {predefinedQuestions.slice(0, 3).map((question, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.7 + index * 0.1 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    onClick={() => handleQuestionClick(question)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-6 px-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                  >
                                    {question.length > 20 ? question.substring(0, 20) + "..." : question}
                                  </Button>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Input Area */}
                      <motion.div 
                        className="p-4 border-t border-border bg-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex gap-2">
                          <motion.div 
                            className="flex-1"
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Input
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="Type your message..."
                              className="border-[#96A7B6]/30 focus:border-[#55738D]/50 transition-all duration-300"
                            />
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={handleSendMessage}
                              disabled={!inputText.trim()}
                              className="bg-[#55738D] hover:bg-[#55738D]/90 text-white px-3 transition-all duration-300"
                            >
                              <motion.div
                                animate={inputText ? { x: [0, 5, 0] } : {}}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              >
                                <Send className="w-4 h-4" />
                              </motion.div>
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}