
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { Layout } from "@/components/Layout";
import { motion } from 'framer-motion';
import { User, Edit, Package, CreditCard, Activity, TrendingUp, ThumbsUp } from 'lucide-react';
import { getSavedInsights, AnalysisResult } from '@/utils/financeCalculations';

interface UserData {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface TransactionItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [activeTab, setActiveTab] = useState<'profile' | 'transactions' | 'insights'>('profile');
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [insights, setInsights] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('softmanu_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
      });

      // Load mock transactions data
      const mockTransactions = [
        { 
          id: '1', 
          description: 'Grocery Shopping', 
          amount: 78.45, 
          category: 'Food', 
          date: '2025-04-05', 
          type: 'expense' as const
        },
        { 
          id: '2', 
          description: 'Monthly Salary', 
          amount: 3500, 
          category: 'Income', 
          date: '2025-04-01', 
          type: 'income' as const
        },
        { 
          id: '3', 
          description: 'Electricity Bill', 
          amount: 120.34, 
          category: 'Utilities', 
          date: '2025-04-03', 
          type: 'expense' as const
        },
        { 
          id: '4', 
          description: 'Freelance Project', 
          amount: 750, 
          category: 'Income', 
          date: '2025-04-07', 
          type: 'income' as const
        },
      ];
      setTransactions(mockTransactions);
      
      // Load insights
      const savedInsights = getSavedInsights();
      setInsights(savedInsights);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (userData) {
      const updatedUser = {
        ...userData,
        name: formData.name,
        email: formData.email,
      };

      // Update localStorage
      localStorage.setItem('softmanu_user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }
  };

  // Function to get icon based on insight type
  const getInsightIcon = (insight: AnalysisResult) => {
    if (insight.type === 'warning') return <TrendingUp className="h-4 w-4" />;
    if (insight.type === 'success') return <ThumbsUp className="h-4 w-4" />;
    return <ThumbsUp className="h-4 w-4" />;
  };

  if (!userData) {
    return null;
  }

  const initials = userData.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Layout>
      <div className="container py-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold font-cinzel">My Profile</h1>
            <p className="text-muted-foreground font-rowdies">Manage your personal information and view your transactions</p>
          </div>

          <Separator />

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <Card className="md:w-1/4">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt={userData.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-medium">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold font-cinzel">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground font-rowdies">{userData.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'outline'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Personal Info
                  </Button>
                  <Button 
                    variant={activeTab === 'transactions' ? 'default' : 'outline'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('transactions')}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    My Transactions
                  </Button>
                  <Button 
                    variant={activeTab === 'insights' ? 'default' : 'outline'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('insights')}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    My Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="md:w-3/4">
              {activeTab === 'profile' ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-cinzel flex items-center gap-2">
                      <User className="h-5 w-5" /> Personal Information
                    </CardTitle>
                    <CardDescription className="font-rowdies">Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name} 
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isEditing ? (
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="flex-1" 
                          onClick={handleSaveChanges}
                        >
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ) : activeTab === 'transactions' ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-cinzel flex items-center gap-2">
                      <Activity className="h-5 w-5" /> My Transactions
                    </CardTitle>
                    <CardDescription className="font-rowdies">View your recent financial activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.length > 0 ? (
                          transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.description}</TableCell>
                              <TableCell>{transaction.category}</TableCell>
                              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                              <TableCell className={`text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                              No transactions found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/expenses')}
                    >
                      <Package className="mr-2 h-4 w-4" /> View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-cinzel flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" /> My Insights
                    </CardTitle>
                    <CardDescription className="font-rowdies">Personalized financial insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insights.length > 0 ? (
                        insights.map((insight, index) => (
                          <React.Fragment key={insight.id}>
                            <div>
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full ${
                                  insight.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                                  insight.type === 'success' ? 'bg-green-100 text-green-600' :
                                  'bg-blue-100 text-blue-600'
                                }`}>
                                  {getInsightIcon(insight)}
                                </div>
                                <div>
                                  <h3 className="font-medium">{insight.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                                  <p className="text-xs text-muted-foreground mt-1">Generated on: {new Date(insight.date).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                            {index < insights.length - 1 && <Separator />}
                          </React.Fragment>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No insights available yet. Visit the Insights page to generate your financial analysis.</p>
                          <Button 
                            className="mt-4"
                            onClick={() => navigate('/insights')}
                          >
                            Go to Insights
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/insights')}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" /> View All Insights
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Profile;
