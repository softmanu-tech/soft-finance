
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { OverviewCard } from '@/components/Dashboard/OverviewCard';
import { ExpenseChart } from '@/components/Dashboard/ExpenseChart';
import { RecentTransactions } from '@/components/Dashboard/RecentTransactions';
import { SavingGoals } from '@/components/Dashboard/SavingGoals';
import { BudgetOverview } from '@/components/Dashboard/BudgetOverview';
import { FinancialTips } from '@/components/Dashboard/FinancialTips';
import { Wallet, PiggyBank, TrendingDown, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AddExpenseForm } from '@/components/Expenses/AddExpenseForm';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      delay: custom * 0.15,
      duration: 0.6,
      ease: [0, 0.71, 0.2, 1.01],
    }
  })
};

const Index = () => {
  const navigate = useNavigate();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = React.useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem('softmanu_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <motion.h2 
                className="text-4xl font-bold tracking-tight font-lobster bg-clip-text text-transparent bg-gradient-to-r from-finance-blue to-finance-lightBlue"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                Dashboard
              </motion.h2>
              <motion.p 
                className="text-muted-foreground font-rowdies mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Welcome back! Here's your financial overview.
              </motion.p>
            </div>
            <motion.div 
              className="mt-4 md:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                className="accent-gradient text-accent-foreground font-lobster text-lg px-6 py-6"
                onClick={() => setIsAddExpenseOpen(true)}
              >
                <DollarSign className="mr-2 h-5 w-5" /> Add New Transaction <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-finance-blue to-finance-lightBlue rounded-full mt-4"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
        
        {/* Add Expense Dialog */}
        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-lobster bg-clip-text text-transparent bg-gradient-to-r from-finance-blue to-finance-lightBlue">
                Add New Transaction
              </DialogTitle>
            </DialogHeader>
            <AddExpenseForm onClose={() => setIsAddExpenseOpen(false)} />
          </DialogContent>
        </Dialog>
        
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 font-cinzel">
          <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={1}>
            <OverviewCard
              title="Total Balance"
              value="$5,240.50"
              description="+$350 from last month"
              icon={<Wallet className="h-4 w-4 text-primary" />}
              className="hover-scale border-l-4 border-primary"
            />
          </motion.div>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={2}>
            <OverviewCard
              title="Monthly Income"
              value="$3,500.00"
              description="Next payment on Sep 30"
              icon={<TrendingUp className="h-4 w-4 text-finance-green" />}
              className="hover-scale border-l-4 border-finance-green"
            />
          </motion.div>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={3}>
            <OverviewCard
              title="Monthly Expenses"
              value="$2,680.25"
              description="75% of your income"
              progress={75}
              icon={<TrendingDown className="h-4 w-4 text-finance-red" />}
              className="hover-scale border-l-4 border-finance-red"
            />
          </motion.div>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={4}>
            <OverviewCard
              title="Total Savings"
              value="$21,350.75"
              description="+$1,200.50 this year"
              icon={<PiggyBank className="h-4 w-4 text-finance-gold" />}
              className="hover-scale border-l-4 border-finance-gold"
            />
          </motion.div>
        </div>
        
        {/* Charts and Lists */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            className="lg:col-span-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <ExpenseChart />
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            <RecentTransactions />
          </motion.div>
        </div>
        
        {/* Additional Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            className="hover-scale"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={7}
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", 
              translateY: -5 
            }}
          >
            <BudgetOverview />
          </motion.div>
          <motion.div 
            className="hover-scale"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={8}
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", 
              translateY: -5 
            }}
          >
            <SavingGoals />
          </motion.div>
          <motion.div 
            className="hover-scale"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={9}
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", 
              translateY: -5 
            }}
          >
            <FinancialTips />
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div 
          className="my-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 text-center font-lobster"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.6, type: "spring", stiffness: 100 }}
          >
            What Our Users Say
          </motion.h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <motion.div 
                key={index}
                className="bg-card p-6 rounded-lg border border-border transition-all"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.7 + index * 0.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                {index === 0 && (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">JD</div>
                      <div>
                        <h4 className="font-bold font-cinzel">Jane Doe</h4>
                        <p className="text-sm text-muted-foreground font-rowdies">Small Business Owner</p>
                      </div>
                    </div>
                    <p className="font-rowdies">"This app helped me track my business expenses and separate them from personal spending. Saved me hours of work!"</p>
                    <div className="mt-4 flex text-amber-500">
                      <span>★★★★★</span>
                    </div>
                  </>
                )}
                {index === 1 && (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">MS</div>
                      <div>
                        <h4 className="font-bold font-cinzel">Mike Smith</h4>
                        <p className="text-sm text-muted-foreground font-rowdies">Student</p>
                      </div>
                    </div>
                    <p className="font-rowdies">"I'm saving for a car while in college, and the goals feature keeps me on track. Highly recommend it!"</p>
                    <div className="mt-4 flex text-amber-500">
                      <span>★★★★★</span>
                    </div>
                  </>
                )}
                {index === 2 && (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">AJ</div>
                      <div>
                        <h4 className="font-bold font-cinzel">Alex Johnson</h4>
                        <p className="text-sm text-muted-foreground font-rowdies">Freelancer</p>
                      </div>
                    </div>
                    <p className="font-rowdies">"As a freelancer with irregular income, this app helps me budget effectively and prepare for tax season."</p>
                    <div className="mt-4 flex text-amber-500">
                      <span>★★★★★</span>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* New animated call to action section */}
        <motion.div 
          className="mt-16 mb-8 p-8 rounded-2xl bg-gradient-to-r from-finance-blue to-finance-lightBlue text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <motion.h3 
                className="text-3xl font-bold mb-2 font-lobster"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                Ready to Take Control of Your Finances?
              </motion.h3>
              <motion.p 
                className="text-white/80 font-rowdies"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.5 }}
              >
                Start tracking, saving, and growing your wealth today with SoftManu.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <Button className="bg-white text-finance-blue hover:bg-white/90 font-lobster text-lg px-8 py-6">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
