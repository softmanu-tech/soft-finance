
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
import { Home, ShoppingBag, Car, Coffee, Film, Tv, Wrench } from 'lucide-react';
import { toast } from "sonner";

// Budget category icons mapping
const categoryIcons = {
  "Housing": <Home className="h-5 w-5" />,
  "Groceries": <ShoppingBag className="h-5 w-5" />,
  "Transportation": <Car className="h-5 w-5" />,
  "Dining Out": <Coffee className="h-5 w-5" />,
  "Entertainment": <Film className="h-5 w-5" />,
  "Subscriptions": <Tv className="h-5 w-5" />,
  "Utilities": <Wrench className="h-5 w-5" />
};

type CategoryIconsType = keyof typeof categoryIcons;

export const AddBudgetForm = ({ onClose }: { onClose?: () => void }) => {
  const [name, setName] = useState<CategoryIconsType | ''>('');
  const [budget, setBudget] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !budget) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Here you would normally save the budget to a database
    console.log('New budget:', {
      name,
      budget: parseFloat(budget)
    });
    
    toast.success(`Budget for "${name}" created successfully`);
    
    // Reset form
    setName('');
    setBudget('');
    
    if (onClose) onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category</Label>
        <Select value={name} onValueChange={(value) => setName(value as CategoryIconsType)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <SelectItem key={category} value={category}>
                <div className="flex items-center gap-2">
                  <div className="text-muted-foreground">
                    {icon}
                  </div>
                  <span>{category}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="budget">Monthly Budget Amount ($)</Label>
        <Input
          id="budget"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </div>
      
      <DialogFooter>
        <Button type="submit" className="success-gradient text-white w-full">
          Create Budget
        </Button>
      </DialogFooter>
    </form>
  );
};
