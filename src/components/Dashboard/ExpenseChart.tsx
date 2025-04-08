
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = {
  weekly: [
    { name: 'Mon', amount: 120 },
    { name: 'Tue', amount: 75 },
    { name: 'Wed', amount: 220 },
    { name: 'Thu', amount: 130 },
    { name: 'Fri', amount: 310 },
    { name: 'Sat', amount: 190 },
    { name: 'Sun', amount: 95 },
  ],
  monthly: [
    { name: 'Week 1', amount: 710 },
    { name: 'Week 2', amount: 920 },
    { name: 'Week 3', amount: 830 },
    { name: 'Week 4', amount: 1050 },
  ],
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-md">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-finance-green font-semibold">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const ExpenseChart = () => {
  return (
    <Card className="col-span-full lg:col-span-2 hover-scale">
      <CardHeader>
        <CardTitle>Expense Overview</CardTitle>
        <CardDescription>Track your spending patterns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-[200px] grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weekly} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="hsla(160, 100%, 29%, 0.8)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthly} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="hsla(201, 100%, 36%, 0.8)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
