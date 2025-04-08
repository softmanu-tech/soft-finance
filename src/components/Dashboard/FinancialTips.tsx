
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Lightbulb } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const tips = [
  {
    id: 1,
    title: "50/30/20 Rule",
    description: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.",
  },
  {
    id: 2,
    title: "Emergency Fund",
    description: "Aim to save 3-6 months of living expenses for unexpected financial emergencies.",
  },
  {
    id: 3,
    title: "Debt Snowball Method",
    description: "Pay off your smallest debts first to gain momentum and motivation in your debt-free journey.",
  },
];

export const FinancialTips = () => {
  const { toast } = useToast();

  const handleLearnMore = (tipTitle: string) => {
    toast({
      title: `Learn more about ${tipTitle}`,
      description: "Detailed guides will be available in the next update."
    });
  };

  return (
    <Card className="hover-scale">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-finance-gold" />
          <CardTitle>Financial Tips</CardTitle>
        </div>
        <CardDescription>Smart strategies to improve your finances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <React.Fragment key={tip.id}>
              <div className="space-y-2">
                <h3 className="font-medium text-sm">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
                <Button 
                  variant="ghost" 
                  className="h-8 px-2 text-xs" 
                  onClick={() => handleLearnMore(tip.title)}
                >
                  Learn more <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
              {index < tips.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
