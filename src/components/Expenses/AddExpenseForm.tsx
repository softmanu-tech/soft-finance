
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
import {
  DialogFooter
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Tag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = [
  "Food & Supplies", 
  "Utilities", 
  "Entertainment", 
  "Transportation", 
  "Food & Drinks", 
  "Shopping", 
  "Healthcare",
  "Education",
  "Other"
];

export const AddExpenseForm = ({ onClose }: { onClose?: () => void }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !category || !date) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to save expense
    setTimeout(() => {
      // Create new transaction object
      const newTransaction = {
        id: Date.now(), // Use timestamp as temporary ID
        name,
        amount: parseFloat(amount),
        category,
        date: date?.toISOString().split('T')[0]
      };
      
      // Here you would normally save the expense to a database
      console.log('New expense:', newTransaction);
      
      // Show success message
      toast.success(`Expense "${name}" added successfully`);
      
      // Reset form
      setName('');
      setAmount('');
      setCategory('');
      setDate(new Date());
      setIsSubmitting(false);
      
      // Close the dialog if a callback was provided
      if (onClose) onClose();
    }, 800); // Small delay to simulate API call
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Expense Name</Label>
        <Input 
          id="name" 
          placeholder="Grocery shopping" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                <div className="flex items-center">
                  <Tag className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>{cat}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <DialogFooter>
        <Button 
          type="submit" 
          className="finance-gradient text-white w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </Button>
      </DialogFooter>
    </form>
  );
};
