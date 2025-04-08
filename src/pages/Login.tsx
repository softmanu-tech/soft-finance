
import React from 'react';
import { LoginForm } from '@/components/Auth/LoginForm';
import { PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - illustration */}
      <motion.div 
        className="flex-1 bg-gradient-to-br from-finance-blue via-finance-lightBlue to-blue-300 p-10 flex flex-col justify-center items-center text-white hidden md:flex"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md">
          <motion.div 
            className="mb-8 flex justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PiggyBank className="text-finance-blue h-12 w-12" />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold mb-6 font-lobster text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            SoftManu Finance
          </motion.h1>
          <motion.p 
            className="text-xl mb-6 font-rowdies text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Take control of your finances with our powerful money management tools
          </motion.p>
          <div className="space-y-4">
            {[1, 2, 3].map((num, index) => (
              <motion.div 
                key={num}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <span className="font-bold">{num}</span>
                </motion.div>
                <p className="font-cinzel">
                  {num === 1 ? "Track your expenses with ease" : 
                   num === 2 ? "Set and manage budgets" : 
                   "Achieve your financial goals"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Right side - form */}
      <motion.div 
        className="flex-1 p-6 md:p-10 flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div 
            className="text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="mb-6 flex justify-center md:hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-finance-blue flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <PiggyBank className="text-white h-10 w-10" />
              </motion.div>
            </motion.div>
            <motion.h2 
              className="text-3xl font-extrabold font-lobster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome Back!
            </motion.h2>
            <motion.p 
              className="mt-2 text-muted-foreground font-rowdies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Sign in to continue to your dashboard
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-card p-8 rounded-xl shadow-lg border border-border/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <LoginForm />
          </motion.div>
          
          <motion.div 
            className="text-center text-sm text-muted-foreground font-rowdies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
