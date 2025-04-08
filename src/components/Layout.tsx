
import React, { useEffect, useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavMenu } from './NavMenu';
import { UserMenu } from './UserMenu';
import { Button } from "@/components/ui/button";
import { PiggyBank, DollarSign, LineChart, Wallet, BarChart3, Settings, TrendingUp, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSavedInsights, AnalysisResult } from '@/utils/financeCalculations';
import { Badge } from './ui/badge';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { toast } = useToast();
  const [insights, setInsights] = useState<AnalysisResult[]>([]);

  // Load insights on component mount
  useEffect(() => {
    const savedInsights = getSavedInsights();
    // Get the 3 most recent insights
    setInsights(savedInsights.slice(0, 3));
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="flex items-center justify-center py-5 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <PiggyBank className="text-white h-5 w-5" />
              </div>
              <div className="font-poppins font-bold text-xl">SoftManu</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="px-2 py-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 mb-4 bg-accent text-accent-foreground hover:bg-accent/80"
                  onClick={() => {
                    toast({
                      title: "Coming Soon!",
                      description: "This feature will be available in the next update."
                    });
                  }}
                >
                  <DollarSign className="h-4 w-4" /> Add Income
                </Button>
              </div>
              <NavMenu />
            </SidebarGroup>

            {insights.length > 0 && (
              <SidebarGroup>
                <div className="px-4 py-2">
                  <h4 className="text-sm font-medium mb-2">Recent Insights</h4>
                  <div className="space-y-2">
                    {insights.map((insight) => (
                      <div key={insight.id} className="bg-accent/50 rounded-md p-2 text-xs">
                        <div className="flex items-start gap-2">
                          <div className={`p-1 rounded-full ${
                            insight.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                            insight.type === 'success' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {insight.type === 'warning' ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <ThumbsUp className="h-3 w-3" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="font-medium truncate max-w-[150px]">{insight.title}</p>
                              <Badge variant="outline" className="text-[10px] py-0 px-1 h-4">
                                {insight.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => {
                        window.location.href = '/insights';
                      }}
                    >
                      View All Insights
                    </Button>
                  </div>
                </div>
              </SidebarGroup>
            )}
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="justify-start gap-2"
                onClick={() => {
                  toast({
                    title: "Settings",
                    description: "Settings will be available in the next update."
                  });
                }}
              >
                <Settings className="h-4 w-4" /> Settings
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold hidden sm:block">Manage Your Money</h1>
            </div>
            <UserMenu />
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
