
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login to Questify</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials below to continue your quest</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="transition-all focus:ring-2 focus:ring-mountain-purple hover:border-mountain-purple"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="transition-all focus:ring-2 focus:ring-mountain-purple hover:border-mountain-purple"
          />
        </div>

        <Button type="submit" className="w-full questify-button-primary relative hover:scale-[1.03] transition-all" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-mountain-purple/20 to-sunset-pink/20 rounded-md filter blur-sm -z-10"></div>
        </Button>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/register" className="text-primary hover:underline hover:text-primary/80 transition-all">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
