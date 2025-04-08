
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from 'recharts';

const data = [
  { name: 'Housing', value: 1200, color: '#1a3a5f' },
  { name: 'Food', value: 450, color: '#00945e' },
  { name: 'Transport', value: 300, color: '#73c2fb' },
  { name: 'Entertainment', value: 200, color: '#ffc857' },
  { name: 'Utilities', value: 350, color: '#ff6b6b' },
  { name: 'Others', value: 180, color: '#845EC2' },
];

const COLORS = data.map(item => item.color);

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background p-3 border rounded-lg shadow-md">
        <p className="font-medium">{data.name}</p>
        <p className="text-finance-green font-semibold">${data.value}</p>
      </div>
    );
  }

  return null;
};

export const BudgetOverview = () => {
  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
        <CardDescription>Your monthly expenses by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
