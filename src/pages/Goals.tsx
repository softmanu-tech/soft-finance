
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Plus, ArrowRight, Calendar, DollarSign, Target, Car, Home, Plane, Smartphone, BookOpen, GraduationCap } from 'lucide-react';
import { AddGoalForm } from '@/components/Goals/AddGoalForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const goals = [
  {
    id: 1,
    name: "New Car",
    icon: <Car className="h-5 w-5" />,
    current: 12000,
    target: 25000,
    targetDate: "2024-06-30",
    color: "bg-blue-500",
    monthlyContribution: 750,
  },
  {
    id: 2,
    name: "Vacation",
    icon: <Plane className="h-5 w-5" />,
    current: 3500,
    target: 5000,
    targetDate: "2023-12-15",
    color: "bg-green-500",
    monthlyContribution: 500,
  },
  {
    id: 3,
    name: "New Phone",
    icon: <Smartphone className="h-5 w-5" />,
    current: 800,
    target: 1200,
    targetDate: "2023-11-10",
    color: "bg-amber-500",
    monthlyContribution: 200,
  },
  {
    id: 4,
    name: "Education Fund",
    icon: <GraduationCap className="h-5 w-5" />,
    current: 5000,
    target: 15000,
    targetDate: "2024-09-01",
    color: "bg-purple-500",
    monthlyContribution: 1000,
  },
];

const Goals = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddFunds = (goalName: string) => {
    toast({
      title: `Add Funds to ${goalName}`,
      description: "This feature will be available in the next update."
    });
  };

  const getTimeRemaining = (targetDate: string) => {
    const remaining = new Date(targetDate).getTime() - new Date().getTime();
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    
    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} left`;
    }
    return `${days} day${days > 1 ? 's' : ''} left`;
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Savings Goals</h2>
            <p className="text-muted-foreground">Set financial targets and track your progress</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="accent-gradient text-accent-foreground">
                <Plus className="mr-2 h-4 w-4" /> Create Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Savings Goal</DialogTitle>
                <DialogDescription>
                  Set up a new financial target to work towards.
                </DialogDescription>
              </DialogHeader>
              <AddGoalForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full md:w-[400px] mb-6">
            <TabsTrigger value="active" className="flex-1">Active Goals</TabsTrigger>
            <TabsTrigger value="achieved" className="flex-1">Achieved Goals</TabsTrigger>
            <TabsTrigger value="all" className="flex-1">All Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              {goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100);
                const targetDate = new Date(goal.targetDate).toLocaleDateString();
                const timeRemaining = getTimeRemaining(goal.targetDate);
                
                return (
                  <Card key={goal.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${goal.color} text-white`}>
                            {goal.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{goal.name}</CardTitle>
                            <CardDescription>Target: ${goal.target.toLocaleString()}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-finance-green">
                            ${goal.current.toLocaleString()}
                          </span>
                          <p className="text-xs text-muted-foreground">{timeRemaining}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{progress}% complete</span>
                          <span className="text-muted-foreground">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {targetDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            <DollarSign className="inline h-3 w-3 mr-1" />
                            ${(goal.target - goal.current).toLocaleString()} more needed
                          </span>
                          <span className="text-muted-foreground">
                            <ArrowRight className="inline h-3 w-3 mr-1" />
                            ${goal.monthlyContribution}/month
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 pb-2 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleAddFunds(goal.name)}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Funds
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: `Edit ${goal.name}`,
                            description: "Goal editing will be available in the next update."
                          });
                        }}
                      >
                        Edit Goal
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
              
              <Card className="border-dashed flex flex-col items-center justify-center p-6 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setIsDialogOpen(true)}>
                <div className="rounded-full border-2 border-muted p-3">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-medium">Create New Goal</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Set up a new savings target to track your progress
                </p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="achieved" className="mt-0">
            <div className="text-center py-12">
              <div className="inline-flex rounded-full bg-muted p-4">
                <Target className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No achieved goals yet</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Keep working towards your financial goals. You'll get there soon!
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>Create Your First Goal</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              {goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100);
                
                return (
                  <Card key={goal.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${goal.color} text-white`}>
                            {goal.icon}
                          </div>
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-finance-green">
                            ${goal.current.toLocaleString()}
                          </span>
                          <p className="text-xs text-muted-foreground">of ${goal.target.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={progress} className="h-2" />
                      <div className="text-xs text-right mt-1">
                        <span className="text-muted-foreground">{progress}% complete</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Goals;
