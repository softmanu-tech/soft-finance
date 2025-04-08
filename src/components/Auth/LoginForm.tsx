
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    // Simulate login - in a real app, call your API
    console.log('Login attempt:', { email, rememberMe });
    
    // Demo login - any email with password "password123" will work
    if (password === "password123") {
      toast.success("Login successful");
      // Store user info in localStorage for persistence
      localStorage.setItem('softmanu_user', JSON.stringify({ 
        email,
        name: email.split('@')[0],
        isLoggedIn: true
      }));
      navigate('/');
    } else {
      toast.error("Invalid credentials. Try with password: password123");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!resetEmail) {
      toast.error("Please enter your email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate password reset - in a real app, call your API
    setTimeout(() => {
      console.log('Password reset requested for:', resetEmail);
      toast.success(`Password reset instructions sent to ${resetEmail}`);
      setShowForgotPassword(false);
      setResetEmail('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="email" className="font-cinzel">Email</Label>
          <Input 
            id="email" 
            type="email"
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-rowdies"
          />
        </motion.div>
        
        <motion.div className="space-y-2" variants={itemVariants}>
          <div className="flex justify-between">
            <Label htmlFor="password" className="font-cinzel">Password</Label>
            <motion.button 
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-primary hover:underline font-rowdies"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot password?
            </motion.button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="font-rowdies"
          />
        </motion.div>

        <motion.div 
          className="flex items-center space-x-2"
          variants={itemVariants}
        >
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-rowdies"
          >
            Remember me
          </label>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button 
            type="submit" 
            className="w-full finance-gradient text-white font-lobster text-lg"
          >
            Sign In
          </Button>
        </motion.div>

        <motion.p 
          className="text-center text-sm text-muted-foreground font-rowdies"
          variants={itemVariants}
        >
          Don't have an account?{" "}
          <motion.a 
            href="/signup" 
            className="text-primary hover:underline font-rowdies"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign up
          </motion.a>
        </motion.p>
      </motion.form>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-lobster text-2xl">Reset Password</DialogTitle>
            <DialogDescription className="font-rowdies">
              Enter your email address and we'll send you instructions to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="font-cinzel">Email</Label>
              <Input 
                id="reset-email" 
                type="email"
                placeholder="your@email.com" 
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="font-rowdies"
              />
            </div>
            <DialogFooter className="sm:justify-between flex flex-col-reverse sm:flex-row gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="font-rowdies">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="finance-gradient text-white font-lobster"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Instructions"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
