
import React from 'react';
import { SignupForm } from '@/components/Auth/SignupForm';
import { PiggyBank, ShieldCheck, LineChart, Lock } from 'lucide-react';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - form */}
      <div className="flex-1 p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mb-6 flex justify-center md:hidden">
              <div className="w-16 h-16 rounded-full bg-finance-gold flex items-center justify-center">
                <PiggyBank className="text-black h-10 w-10" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold font-lobster">Create Your Account</h2>
            <p className="mt-2 text-muted-foreground font-rowdies">Start your journey to financial freedom</p>
          </div>
          
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border/50">
            <SignupForm />
          </div>
          
          <div className="text-center text-sm text-muted-foreground font-rowdies">
            By creating an account, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      {/* Right side - benefits */}
      <div className="flex-1 bg-gradient-to-br from-finance-gold via-amber-400 to-yellow-200 p-10 flex flex-col justify-center items-center hidden md:flex text-black">
        <div className="max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <PiggyBank className="text-finance-gold h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 font-lobster text-center">Join SoftManu Finance</h1>
          <p className="text-xl mb-8 font-rowdies text-center">
            Create an account and get access to all our premium features
          </p>
          
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start">
              <div className="mr-4 p-2 bg-finance-gold rounded-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold font-cinzel">Secure & Private</h3>
                <p className="text-sm font-rowdies">Your financial data is encrypted and never shared with third parties</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start">
              <div className="mr-4 p-2 bg-finance-gold rounded-md">
                <LineChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold font-cinzel">Advanced Analytics</h3>
                <p className="text-sm font-rowdies">Get insights into your spending patterns and saving opportunities</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start">
              <div className="mr-4 p-2 bg-finance-gold rounded-md">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold font-cinzel">Free Forever</h3>
                <p className="text-sm font-rowdies">All core features are free to use, no hidden costs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
