
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (email) {
        // In a real app, this would send a password reset email
        setSubmitted(true);
        toast({
          title: "Password reset link sent",
          description: "Check your email for further instructions",
        });
      } else {
        toast({
          title: "Failed to send reset link",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-sm text-muted-foreground">Enter your email to receive a password reset link</p>
      </div>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full questify-button-primary" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-primary hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-center">
          <p>A password reset link has been sent to <strong>{email}</strong>.</p>
          <p className="text-sm text-muted-foreground">
            Please check your email and follow the instructions to reset your password.
          </p>
          <div className="pt-2">
            <Link to="/login" className="text-primary hover:underline">
              Return to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
