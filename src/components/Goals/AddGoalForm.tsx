
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Car, Plane, Smartphone, GraduationCap, Home, BookOpen, Briefcase } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Savings goal type icons mapping
const goalIcons = {
  "New Car": <Car className="h-5 w-5" />,
  "Vacation": <Plane className="h-5 w-5" />,
  "New Phone": <Smartphone className="h-5 w-5" />,
  "Education": <GraduationCap className="h-5 w-5" />,
  "Home": <Home className="h-5 w-5" />,
  "Books": <BookOpen className="h-5 w-5" />,
  "Business": <Briefcase className="h-5 w-5" />
};

type GoalIconsType = keyof typeof goalIcons;

export const AddGoalForm = ({ onClose }: { onClose?: () => void }) => {
  const [name, setName] = useState('');
  const [goalType, setGoalType] = useState<GoalIconsType | ''>('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState<Date | undefined>(new Date());
  const [monthlyContribution, setMonthlyContribution] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !goalType || !targetAmount || !targetDate || !monthlyContribution) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Here you would normally save the goal to a database
    console.log('New savings goal:', {
      name,
      goalType,
      targetAmount: parseFloat(targetAmount),
      targetDate: targetDate?.toISOString().split('T')[0],
      monthlyContribution: parseFloat(monthlyContribution)
    });
    
    toast.success(`Savings goal "${name}" created successfully`);
    
    // Reset form
    setName('');
    setGoalType('');
    setTargetAmount('');
    setTargetDate(new Date());
    setMonthlyContribution('');
    
    if (onClose) onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Goal Name</Label>
        <Input 
          id="name" 
          placeholder="Summer Vacation" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="goalType">Goal Type</Label>
        <Select value={goalType} onValueChange={(value) => setGoalType(value as GoalIconsType)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select goal type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(goalIcons).map(([type, icon]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center gap-2">
                  <div className="text-muted-foreground">
                    {icon}
                  </div>
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="targetAmount">Target Amount ($)</Label>
        <Input
          id="targetAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
        <Input
          id="monthlyContribution"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="targetDate">Target Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !targetDate && "text-muted-foreground"
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
        <Button type="submit" className="accent-gradient text-accent-foreground w-full">
          Create Savings Goal
        </Button>
      </DialogFooter>
    </form>
  );
};
