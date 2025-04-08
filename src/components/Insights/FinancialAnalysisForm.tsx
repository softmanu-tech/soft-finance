
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { BarChart, PieChart, LineChart, Calendar } from 'lucide-react';
import { toast } from "sonner";
import { 
  AnalysisType, 
  TimeRange, 
  ChartType, 
  generateInsights, 
  saveAnalysisResults 
} from '@/utils/financeCalculations';

export const FinancialAnalysisForm = ({ onClose, onAnalysisComplete }: { 
  onClose?: () => void;
  onAnalysisComplete?: () => void;
}) => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('comprehensive');
  const [timeRange, setTimeRange] = useState<TimeRange>('3months');
  const [chartType, setChartType] = useState<ChartType>('mixed');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Log the analysis request
    console.log('Financial analysis request:', {
      analysisType,
      timeRange,
      chartType
    });
    
    toast.success("Financial analysis initiated");
    
    // Simulate API call/processing time
    setTimeout(() => {
      try {
        // Generate insights based on request parameters
        const insights = generateInsights({
          analysisType,
          timeRange,
          chartType
        });
        
        // Save insights to localStorage
        const saveSuccessful = saveAnalysisResults(insights);
        
        if (saveSuccessful) {
          toast.success(`Analysis complete! ${insights.length} insights generated.`);
          // Call the callback if provided
          if (onAnalysisComplete) onAnalysisComplete();
          // Close the dialog if needed
          if (onClose) onClose();
        } else {
          toast.error("There was a problem saving your analysis results.");
        }
      } catch (error) {
        console.error("Analysis error:", error);
        toast.error("An error occurred during analysis");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="analysisType">Analysis Type</Label>
        <Select value={analysisType} onValueChange={(value) => setAnalysisType(value as AnalysisType)}>
          <SelectTrigger id="analysisType">
            <SelectValue placeholder="Select analysis type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spending">Spending Analysis</SelectItem>
            <SelectItem value="income">Income Analysis</SelectItem>
            <SelectItem value="savings">Savings Performance</SelectItem>
            <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="timeRange">Time Range</Label>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <SelectTrigger id="timeRange">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="chartType">Chart Type</Label>
        <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
          <SelectTrigger id="chartType">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Bar Charts</span>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Line Charts</span>
              </div>
            </SelectItem>
            <SelectItem value="pie">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>Pie Charts</span>
              </div>
            </SelectItem>
            <SelectItem value="mixed">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Mixed Visualizations</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <DialogFooter>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-finance-blue to-finance-lightBlue text-white w-full"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Generate Insights"}
        </Button>
      </DialogFooter>
    </form>
  );
};
