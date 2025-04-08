
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export const EditBudgetForm = ({ budget, onClose }: { budget: { name: string; budget: number }, onClose?: () => void }) => {
  const [budgetAmount, setBudgetAmount] = useState(budget.budget.toString());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!budgetAmount) {
      toast.error("Please enter a budget amount");
      return;
    }
    
    // Here you would normally update the budget in a database
    console.log('Updated budget:', {
      name: budget.name,
      budget: parseFloat(budgetAmount)
    });
    
    toast.success(`Budget for "${budget.name}" updated successfully`);
    
    if (onClose) onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input value={budget.name} disabled className="bg-muted" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="budget">Monthly Budget Amount ($)</Label>
        <Input
          id="budget"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          required
        />
      </div>
      
      <DialogFooter>
        <Button type="submit" className="success-gradient text-white w-full">
          Update Budget
        </Button>
      </DialogFooter>
    </form>
  );
};
