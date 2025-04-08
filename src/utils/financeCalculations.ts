
import { toast } from "sonner";

export type AnalysisType = 'spending' | 'income' | 'savings' | 'comprehensive';
export type TimeRange = '1month' | '3months' | '6months' | '1year';
export type ChartType = 'bar' | 'line' | 'pie' | 'mixed';

export interface AnalysisResult {
  id: string;
  title: string;
  type: 'warning' | 'success' | 'information';
  description: string;
  date: string;
  chartData?: any;
}

export interface AnalysisRequest {
  analysisType: AnalysisType;
  timeRange: TimeRange;
  chartType: ChartType;
}

// Mock data for monthly spending/income
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

// Mock data for category breakdown
const categoryData = [
  { name: 'Housing', value: 35, color: '#1a3a5f' },
  { name: 'Food', value: 25, color: '#00945e' },
  { name: 'Transportation', value: 15, color: '#73c2fb' },
  { name: 'Entertainment', value: 10, color: '#ffc857' },
  { name: 'Utilities', value: 10, color: '#ff6b6b' },
  { name: 'Others', value: 5, color: '#845EC2' },
];

// Generate random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Format current date
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Calculate average monthly savings rate
const calculateSavingsRate = (data: typeof monthlyData) => {
  const totalIncome = data.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = data.reduce((sum, month) => sum + month.expenses, 0);
  return totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
};

// Calculate monthly spending growth rate
const calculateSpendingGrowth = (data: typeof monthlyData) => {
  if (data.length < 2) return 0;
  const firstMonth = data[0].expenses;
  const lastMonth = data[data.length - 1].expenses;
  return ((lastMonth - firstMonth) / firstMonth) * 100;
};

// Generate insights based on analysis type
export const generateInsights = (request: AnalysisRequest): AnalysisResult[] => {
  const { analysisType, timeRange } = request;
  const results: AnalysisResult[] = [];
  const currentDate = getCurrentDate();
  
  // Filter data based on time range
  let filteredData = monthlyData;
  if (timeRange === '1month') filteredData = monthlyData.slice(-1);
  else if (timeRange === '3months') filteredData = monthlyData.slice(-3);
  else if (timeRange === '6months') filteredData = monthlyData.slice(-6);
  
  // Generate insights based on analysis type
  if (analysisType === 'spending' || analysisType === 'comprehensive') {
    const spendingGrowth = calculateSpendingGrowth(filteredData);
    
    results.push({
      id: generateId(),
      title: `Your spending ${spendingGrowth > 0 ? 'increased' : 'decreased'} by ${Math.abs(spendingGrowth).toFixed(1)}%`,
      type: spendingGrowth > 10 ? 'warning' : spendingGrowth < 0 ? 'success' : 'information',
      description: `Your monthly expenses have ${spendingGrowth > 0 ? 'grown' : 'reduced'} compared to the previous period.`,
      date: currentDate,
      chartData: filteredData
    });
    
    results.push({
      id: generateId(),
      title: "Housing costs are 35% of your budget",
      type: "information",
      description: "This is within the recommended 30-35% range for housing expenses.",
      date: currentDate,
      chartData: categoryData
    });
  }
  
  if (analysisType === 'income' || analysisType === 'comprehensive') {
    const lastMonthIncome = filteredData[filteredData.length - 1].income;
    const prevMonthIncome = filteredData[filteredData.length - 2]?.income || lastMonthIncome;
    const incomeChange = ((lastMonthIncome - prevMonthIncome) / prevMonthIncome) * 100;
    
    results.push({
      id: generateId(),
      title: `Your income ${incomeChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(incomeChange).toFixed(1)}%`,
      type: incomeChange >= 0 ? 'success' : 'warning',
      description: `Your monthly income has ${incomeChange > 0 ? 'grown' : 'reduced'} compared to the previous period.`,
      date: currentDate,
      chartData: filteredData
    });
  }
  
  if (analysisType === 'savings' || analysisType === 'comprehensive') {
    const savingsRate = calculateSavingsRate(filteredData);
    
    results.push({
      id: generateId(),
      title: `You're saving ${savingsRate.toFixed(1)}% of your income`,
      type: savingsRate >= 15 ? 'success' : savingsRate >= 10 ? 'information' : 'warning',
      description: savingsRate >= 15 
        ? "Great job! This meets the recommended minimum saving rate."
        : "Consider increasing your savings to reach the recommended 15-20% of income.",
      date: currentDate,
      chartData: filteredData
    });
  }
  
  // Add a recommendation for all analysis types
  results.push({
    id: generateId(),
    title: "Subscription costs review recommended",
    type: "information",
    description: "Review your subscription services to identify potential savings opportunities.",
    date: currentDate
  });
  
  return results;
};

// Mock function to save analysis results to localStorage
export const saveAnalysisResults = (results: AnalysisResult[]) => {
  try {
    // Get existing insights or initialize empty array
    const existingInsights = JSON.parse(localStorage.getItem('financial_insights') || '[]');
    
    // Add new insights to the beginning
    const updatedInsights = [...results, ...existingInsights].slice(0, 10); // Keep only 10 most recent
    
    // Save back to localStorage
    localStorage.setItem('financial_insights', JSON.stringify(updatedInsights));
    
    return true;
  } catch (error) {
    console.error("Error saving analysis results:", error);
    toast.error("Failed to save analysis results");
    return false;
  }
};

// Get saved insights from localStorage
export const getSavedInsights = (): AnalysisResult[] => {
  try {
    return JSON.parse(localStorage.getItem('financial_insights') || '[]');
  } catch (error) {
    console.error("Error retrieving insights:", error);
    return [];
  }
};
