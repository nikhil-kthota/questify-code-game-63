
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-vt323 font-bold mb-2">Questify</h1>
          <p className="text-muted-foreground">Forge your skills, level up your knowledge</p>
        </div>
        <div className="glass-card p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
