
import React from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Link, useLocation } from 'react-router-dom';
import { PieChart, LineChart, Home, Wallet, Target, Lightbulb } from 'lucide-react';

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: Wallet,
  },
  {
    title: "Budgets",
    path: "/budgets",
    icon: PieChart,
  },
  {
    title: "Savings Goals",
    path: "/goals",
    icon: Target,
  },
  {
    title: "Insights",
    path: "/insights",
    icon: Lightbulb,
  },
];

export const NavMenu = () => {
  const location = useLocation();
  
  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild className={location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}>
            <Link to={item.path}>
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
