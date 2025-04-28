
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-vt323 font-bold mb-4">404</h1>
        <h2 className="text-2xl font-vt323 mb-6">Quest not found</h2>
        <p className="text-muted-foreground mb-8">The mission you're looking for doesn't exist or has been completed</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button className="questify-button-primary" asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
