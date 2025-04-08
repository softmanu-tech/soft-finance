
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Coffee, ShoppingBag, Utensils, ArrowUpRight, Home, Tv } from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Starbucks Coffee",
    amount: "$4.50",
    date: "Today, 10:30 AM",
    category: "Food & Drinks",
    icon: <Coffee className="h-3 w-3" />,
    color: "bg-orange-500",
  },
  {
    id: 2,
    name: "Market Grocery",
    amount: "$32.75",
    date: "Yesterday",
    category: "Groceries",
    icon: <ShoppingBag className="h-3 w-3" />,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Downtown Restaurant",
    amount: "$56.20",
    date: "Sep 12, 2023",
    category: "Dining",
    icon: <Utensils className="h-3 w-3" />,
    color: "bg-red-500",
  },
  {
    id: 4,
    name: "Rent Payment",
    amount: "$1200.00",
    date: "Sep 1, 2023",
    category: "Housing",
    icon: <Home className="h-3 w-3" />,
    color: "bg-blue-500",
  },
  {
    id: 5,
    name: "Netflix Subscription",
    amount: "$15.99",
    date: "Aug 28, 2023",
    category: "Entertainment",
    icon: <Tv className="h-3 w-3" />,
    color: "bg-purple-500",
  },
];

export const RecentTransactions = () => {
  return (
    <Card className="col-span-full md:col-span-1 hover-scale">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>You've made 5 transactions this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Avatar className={`h-8 w-8 ${transaction.color} text-white`}>
                    <AvatarFallback>{transaction.icon}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-semibold">-{transaction.amount}</p>
                  <Badge variant="outline" className="text-[10px]">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
              {index < transactions.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
