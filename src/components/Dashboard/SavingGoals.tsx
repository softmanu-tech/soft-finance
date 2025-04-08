
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, Home, Plane, Smartphone, BookOpen } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const goals = [
  {
    id: 1,
    name: "New Car",
    icon: <Car className="h-4 w-4" />,
    current: 12000,
    target: 25000,
    date: "Jun 2024",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Vacation",
    icon: <Plane className="h-4 w-4" />,
    current: 3500,
    target: 5000,
    date: "Dec 2023",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "New Phone",
    icon: <Smartphone className="h-4 w-4" />,
    current: 800,
    target: 1200,
    date: "Nov 2023",
    color: "bg-amber-500",
  },
  {
    id: 4,
    name: "Education",
    icon: <BookOpen className="h-4 w-4" />,
    current: 5000,
    target: 15000,
    date: "Sep 2024",
    color: "bg-purple-500",
  },
];

export const SavingGoals = () => {
  const { toast } = useToast();

  const handleAddFunds = (goalName: string) => {
    toast({
      title: `Add funds to ${goalName}`,
      description: "This feature will be available in the next update."
    });
  };

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>Saving Goals</CardTitle>
        <CardDescription>Track your progress toward financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = Math.round((goal.current / goal.target) * 100);
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${goal.color} flex items-center justify-center text-white`}>
                        {goal.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{goal.name}</h4>
                        <p className="text-xs text-muted-foreground">Target: ${goal.target.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">${goal.current.toLocaleString()}</p>
                      <p className="text-xs text-right text-muted-foreground">by {goal.date}</p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => handleAddFunds(goal.name)}
                    >
                      Add funds
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
