import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, MapPin, AlertTriangle, Target, Flag } from "lucide-react";

const topConditionsData = [
  { name: "Hypertension", cases: 2456, namasteCode: "NAM-HTN-001" },
  { name: "Type 2 Diabetes", cases: 1890, namasteCode: "NAM-DM2-001" },
  { name: "Asthma", cases: 1234, namasteCode: "NAM-AST-001" },
  { name: "GERD", cases: 987, namasteCode: "NAM-GRD-001" },
  { name: "Migraine", cases: 756, namasteCode: "NAM-MIG-001" },
  { name: "Allergic Rhinitis", cases: 678, namasteCode: "NAM-ALR-001" },
  { name: "Depression", cases: 543, namasteCode: "NAM-DEP-001" },
  { name: "Osteoarthritis", cases: 432, namasteCode: "NAM-OAR-001" },
];

const unmappedHotspotsData = [
  { region: "Maharashtra", unmapped: 234, total: 2456, percentage: 9.5 },
  { region: "Tamil Nadu", unmapped: 187, total: 2123, percentage: 8.8 },
  { region: "Karnataka", unmapped: 156, total: 1987, percentage: 7.9 },
  { region: "West Bengal", unmapped: 143, total: 1678, percentage: 8.5 },
  { region: "Uttar Pradesh", unmapped: 198, total: 2987, percentage: 6.6 }
];

const ayushIntegrationData = [
  { name: "Fully Mapped", value: 78, color: "#70805D" },
  { name: "Partially Mapped", value: 15, color: "#96A7B6" },
  { name: "Unmapped", value: 7, color: "#55738D" }
];

export function AnalyticsDashboard() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Ministry of Ayush Dashboard</h2>
            <p className="text-sm text-muted-foreground">National Healthcare Terminology Analytics</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          Live Data • Updated {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Mapped Conditions", value: "2,347", change: "+12%", icon: Target, color: "text-green-600" },
          { label: "NAMASTE Codes Generated", value: "1,856", change: "+8%", icon: AlertTriangle, color: "text-blue-600" },
          { label: "Ayush Terms Integrated", value: "934", change: "+15%", icon: TrendingUp, color: "text-purple-600" },
          { label: "Unmapped Hotspots", value: "23", change: "-5%", icon: MapPin, color: "text-orange-600" }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold">{metric.value}</p>
                      <Badge variant={metric.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Diagnosed Conditions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Top 8 Diagnosed Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topConditionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar 
                    dataKey="cases" 
                    fill="var(--primary)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ayush Integration Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#70805D]" />
                AYUSH Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ayushIntegrationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {ayushIntegrationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Unmapped Term Hotspots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Unmapped Term Hotspots by State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unmappedHotspotsData.map((hotspot, index) => (
                <motion.div
                  key={hotspot.region}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{hotspot.region}</p>
                      <p className="text-xs text-muted-foreground">
                        {hotspot.unmapped} unmapped / {hotspot.total} total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={hotspot.percentage > 8 ? "destructive" : "secondary"} className="text-xs">
                      {hotspot.percentage}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Unmapped</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Analytics powered by CareSync • Supporting India's Digital Health Mission</p>
        <p className="mt-1">Data refreshed every 15 minutes • Last update: {new Date().toLocaleString()}</p>
      </motion.div>
    </motion.div>
  );
}