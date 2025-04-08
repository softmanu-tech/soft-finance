
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const EditGoalForm = ({ 
  goal, 
  onClose 
}: { 
  goal: {
    id: number;
    name: string;
    icon: React.ReactNode;
    current: number;
    target: number;
    targetDate: string;
    color: string;
    monthlyContribution: number;
  },
  onClose?: () => void 
}) => {
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.target.toString());
  const [currentAmount, setCurrentAmount] = useState(goal.current.toString());
  const [targetDate, setTargetDate] = useState<Date | undefined>(new Date(goal.targetDate));
  const [monthlyContribution, setMonthlyContribution] = useState(goal.monthlyContribution.toString());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !targetAmount || !targetDate || !monthlyContribution || !currentAmount) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Here you would normally save the goal to a database
    console.log('Updated savings goal:', {
      id: goal.id,
      name,
      target: parseFloat(targetAmount),
      current: parseFloat(currentAmount),
      targetDate: targetDate?.toISOString().split('T')[0],
      monthlyContribution: parseFloat(monthlyContribution)
    });
    
    toast.success(`Savings goal "${name}" updated successfully`);
    
    if (onClose) onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-cinzel">Goal Name</Label>
        <Input 
          id="name" 
          placeholder="Summer Vacation" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="targetAmount" className="font-cinzel">Target Amount ($)</Label>
        <Input
          id="targetAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAmount" className="font-cinzel">Current Amount ($)</Label>
        <Input
          id="currentAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthlyContribution" className="font-cinzel">Monthly Contribution ($)</Label>
        <Input
          id="monthlyContribution"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="targetDate" className="font-cinzel">Target Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !targetDate && "text-muted-foreground",
                "font-rowdies"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {targetDate ? format(targetDate, "PPP") : <span>Pick a target date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={targetDate}
              onSelect={setTargetDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <DialogFooter>
        <Button type="submit" className="accent-gradient text-accent-foreground w-full font-lobster text-lg">
          Update Savings Goal
        </Button>
      </DialogFooter>
    </form>
  );
};
