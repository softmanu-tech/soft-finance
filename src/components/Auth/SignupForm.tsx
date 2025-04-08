
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    // Simulate signup - in a real app, call your API
    console.log('Signup attempt:', { name, email });
    
    toast.success("Account created successfully!");
    // Store user info in localStorage for persistence
    localStorage.setItem('softmanu_user', JSON.stringify({ 
      email,
      name,
      isLoggedIn: true
    }));
    navigate('/');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-cinzel">Full Name</Label>
        <Input 
          id="name" 
          placeholder="John Doe" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>

      <div className="space-y-2">
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="font-cinzel">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="font-cinzel">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="font-rowdies"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreeTerms} 
          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
        />
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-rowdies"
        >
          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>
      
      <Button type="submit" className="w-full accent-gradient text-black font-lobster text-lg">
        Create Account
      </Button>

      <p className="text-center text-sm text-muted-foreground font-rowdies">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline font-rowdies">Sign in</a>
      </p>
    </form>
  );
};
