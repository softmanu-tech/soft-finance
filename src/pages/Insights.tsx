
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, ArrowDownRight, TrendingDown, TrendingUp, AlertTriangle, ArrowRight, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FinancialAnalysisForm } from '@/components/Insights/FinancialAnalysisForm';
import { AnalysisResult, getSavedInsights } from '@/utils/financeCalculations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample data for charts
const monthlyData = [
  { month: 'Jan', income: 3200, expenses: 2800 },
  { month: 'Feb', income: 3300, expenses: 2900 },
  { month: 'Mar', income: 3400, expenses: 3000 },
  { month: 'Apr', income: 3500, expenses: 3200 },
  { month: 'May', income: 3300, expenses: 3100 },
  { month: 'Jun', income: 3600, expenses: 3000 },
  { month: 'Jul', income: 3800, expenses: 3300 },
  { month: 'Aug', income: 3500, expenses: 3200 },
  { month: 'Sep', income: 3700, expenses: 2900 },
];

const categoryData = [
  { name: 'Housing', value: 35, color: '#1a3a5f' },
  { name: 'Food', value: 25, color: '#00945e' },
  { name: 'Transportation', value: 15, color: '#73c2fb' },
  { name: 'Entertainment', value: 10, color: '#ffc857' },
  { name: 'Utilities', value: 10, color: '#ff6b6b' },
  { name: 'Others', value: 5, color: '#845EC2' },
];

const Insights = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [insights, setInsights] = useState<AnalysisResult[]>([]);
  
  // Load insights on component mount and when dialog closes
  useEffect(() => {
    loadInsights();
  }, []);
  
  const loadInsights = () => {
    const savedInsights = getSavedInsights();
    setInsights(savedInsights.length > 0 ? savedInsights : [
      {
        id: "1",
        title: "Housing costs are 35% of your budget",
        type: "information",
        description: "This is within the recommended 30-35% range for housing expenses.",
        date: new Date().toISOString().split('T')[0],
        icon: "ThumbsUp"
      },
      {
        id: "2",
        title: "Your spending in Dining increased by 20%",
        type: "warning",
        description: "You've spent $85 more on dining out this month compared to your average.",
        date: new Date().toISOString().split('T')[0],
        icon: "TrendingUp"
      },
      {
        id: "3",
        title: "You're saving 15% of your income",
        type: "success",
        description: "Great job! This meets the recommended minimum saving rate.",
        date: new Date().toISOString().split('T')[0],
        icon: "ThumbsUp"
      },
      {
        id: "4",
        title: "Subscription costs rising",
        type: "warning",
        description: "Your subscription services have increased from $45 to $65 monthly over the past 3 months.",
        date: new Date().toISOString().split('T')[0],
        icon: "TrendingUp"
      },
    ]);
  };
  
  // Handle analysis complete
  const handleAnalysisComplete = () => {
    loadInsights();
  };
  
  // Get icon based on insight type
  const getInsightIcon = (insight: AnalysisResult) => {
    if (insight.type === 'warning') return <TrendingUp className="h-4 w-4" />;
    if (insight.type === 'success') return <ThumbsUp className="h-4 w-4" />;
    return <ThumbsUp className="h-4 w-4" />;
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
            <p className="text-muted-foreground">Understand your financial patterns and behaviors</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-finance-blue to-finance-lightBlue text-white">
                Analyze My Finances
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Financial Analysis</DialogTitle>
                <DialogDescription>
                  Get personalized insights about your financial behavior.
                </DialogDescription>
              </DialogHeader>
              <FinancialAnalysisForm 
                onClose={() => setIsDialogOpen(false)} 
                onAnalysisComplete={handleAnalysisComplete}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Income vs. Expenses</CardTitle>
              <CardDescription>Track your financial balance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#00945e" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2.5}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ff6b6b" 
                      strokeWidth={2.5} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-finance-green mr-2"></div>
                    <span className="text-sm">Income</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-finance-red mr-2"></div>
                    <span className="text-sm">Expenses</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(true)}>
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Where your money goes each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-xs">{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Personal Insights</CardTitle>
            <CardDescription>Tailored observations about your financial behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <React.Fragment key={insight.id}>
                  <div>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        insight.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                        insight.type === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {getInsightIcon(insight)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{insight.title}</h3>
                          <Badge variant={
                            insight.type === 'warning' ? 'outline' : 
                            insight.type === 'success' ? 'secondary' : 'default'
                          } className={
                            insight.type === 'warning' ? 'border-amber-500 text-amber-600' : 
                            insight.type === 'success' ? 'border-green-500 text-green-600' :
                            'border-blue-500 text-blue-600'
                          }>
                            {insight.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Generated on: {new Date(insight.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  {index < insights.length - 1 && <Separator />}
                </React.Fragment>
              ))}
              
              {insights.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No insights available. Generate your first financial analysis!</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Analyze My Finances
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Spending Trend</CardTitle>
                <TrendingUp className="h-5 w-5 text-finance-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <span className="flex items-center gap-1 text-xs">vs last month
                    <ArrowUpRight className="h-3 w-3 text-finance-red" />
                  </span>
                  <p className="text-2xl font-bold">+4.3%</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsDialogOpen(true)}>
                  Details
                </Button>
              </div>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData.slice(monthlyData.length - 5)}>
                    <Bar dataKey="expenses" fill="hsla(0, 100%, 70%, 0.7)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Savings Rate</CardTitle>
                <TrendingUp className="h-5 w-5 text-finance-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <span className="flex items-center gap-1 text-xs">vs last month
                    <ArrowUpRight className="h-3 w-3 text-finance-green" />
                  </span>
                  <p className="text-2xl font-bold">15.2%</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsDialogOpen(true)}>
                  Details
                </Button>
              </div>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData.slice(monthlyData.length - 5)}>
                    <Line 
                      type="monotone" 
                      dataKey={(data) => ((data.income - data.expenses) / data.income) * 100} 
                      stroke="#00945e" 
                      strokeWidth={2.5} 
                      dot={{ fill: "#00945e", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Financial Health</CardTitle>
                <ThumbsUp className="h-5 w-5 text-finance-gold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-8 border-finance-gold mb-2">
                  <span className="text-2xl font-bold">B+</span>
                </div>
                <p className="text-sm text-muted-foreground">Your financial health score</p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Improve Your Score
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;
