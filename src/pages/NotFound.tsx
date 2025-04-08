
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6 animate-pulse-soft">
        <PiggyBank className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-2">Page not found</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="finance-gradient text-white px-8">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
