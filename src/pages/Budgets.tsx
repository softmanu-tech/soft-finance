
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { Plus, AlertTriangle, Home, ShoppingBag, Car, Coffee, Film, Tv, Wrench } from 'lucide-react';
import { AddBudgetForm } from '@/components/Budgets/AddBudgetForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const budgetCategories = [
  {
    id: 1,
    name: "Housing",
    icon: <Home className="h-5 w-5" />,
    budget: 1200,
    spent: 1200,
    color: "bg-finance-blue",
  },
  {
    id: 2,
    name: "Groceries",
    icon: <ShoppingBag className="h-5 w-5" />,
    budget: 500,
    spent: 350,
    color: "bg-finance-green",
  },
  {
    id: 3,
    name: "Transportation",
    icon: <Car className="h-5 w-5" />,
    budget: 300,
    spent: 220,
    color: "bg-amber-500",
  },
  {
    id: 4,
    name: "Dining Out",
    icon: <Coffee className="h-5 w-5" />,
    budget: 250,
    spent: 210,
    color: "bg-rose-500",
  },
  {
    id: 5,
    name: "Entertainment",
    icon: <Film className="h-5 w-5" />,
    budget: 150,
    spent: 95,
    color: "bg-purple-500",
  },
  {
    id: 6,
    name: "Subscriptions",
    icon: <Tv className="h-5 w-5" />,
    budget: 80,
    spent: 65,
    color: "bg-blue-500",
  },
  {
    id: 7,
    name: "Utilities",
    icon: <Wrench className="h-5 w-5" />,
    budget: 300,
    spent: 280,
    color: "bg-slate-500",
  },
];

const Budgets = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAdjustBudget = (categoryName: string) => {
    toast({
      title: `Adjust ${categoryName} Budget`,
      description: "This feature will be available in the next update."
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
            <p className="text-muted-foreground">Set spending limits and track progress</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="success-gradient text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
                <DialogDescription>
                  Set up a new monthly spending limit for a category.
                </DialogDescription>
              </DialogHeader>
              <AddBudgetForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention Needed</AlertTitle>
          <AlertDescription>
            Your Housing budget has reached 100% of the allocated amount.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {budgetCategories.map((category) => {
            const percentage = Math.round((category.spent / category.budget) * 100);
            const remaining = category.budget - category.spent;
            const isOverBudget = remaining < 0;
            
            return (
              <Card key={category.id} className="hover-scale">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <div className={`text-right ${isOverBudget ? "text-finance-red" : "text-finance-green"}`}>
                      <span className="text-sm font-medium">
                        {isOverBudget ? "Over by " : "Remaining "}
                        ${Math.abs(remaining).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spent: ${category.spent.toFixed(2)}</span>
                      <span>Budget: ${category.budget.toFixed(2)}</span>
                    </div>
                    <Progress 
                      value={percentage > 100 ? 100 : percentage} 
                      className={`h-2 ${percentage > 90 ? "bg-finance-red" : ""}`} 
                    />
                    <div className="text-xs text-right">
                      <span className={percentage > 90 ? "text-finance-red font-medium" : "text-muted-foreground"}>
                        {percentage}% used
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleAdjustBudget(category.name)}
                  >
                    Adjust Budget
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Budgets;
