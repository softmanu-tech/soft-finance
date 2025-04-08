
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OverviewCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  progress?: number;
  className?: string;
}

export const OverviewCard = ({
  title,
  value,
  description,
  icon,
  progress,
  className = "",
}: OverviewCardProps) => {
  return (
    <Card className={`hover-scale ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progress}% of monthly budget</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
