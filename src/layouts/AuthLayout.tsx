
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const AuthLayout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect values
  const moveX = mousePosition.x / 50;
  const moveY = mousePosition.y / 50;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-mountain-darkest to-mountain-dark">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-[10%] left-[15%] w-40 h-40 bg-mountain-purple/10 rounded-full blur-3xl"
          style={{ transform: `translate(${moveX * -1}px, ${moveY * -1}px)` }}
        />
        <div 
          className="absolute bottom-[20%] right-[10%] w-60 h-60 bg-sunset-pink/10 rounded-full blur-3xl"
          style={{ transform: `translate(${moveX}px, ${moveY}px)` }}
        />
        <div 
          className="absolute top-[40%] right-[30%] w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl"
          style={{ transform: `translate(${moveX * 0.5}px, ${moveY * -0.5}px)` }}
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 group">
            <Sparkles className="h-8 w-8 text-sunset-pink neon-glow-red group-hover:rotate-12 transition-transform duration-500" />
            <h1 className="text-5xl font-vt323 font-bold bg-clip-text text-transparent bg-gradient-to-r from-mountain-purple to-sunset-pink">Questify</h1>
          </div>
          <p className="text-muted-foreground hover:text-white transition-colors duration-300">
            Forge your skills, level up your knowledge
          </p>
        </div>
        <div className="glass-card p-8 backdrop-blur-md bg-mountain-dark/50 border border-white/10 rounded-lg shadow-lg hover:shadow-mountain-purple/20 transition-shadow duration-300">
          <Outlet />
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#be4bdb' : i % 3 === 1 ? '#e64980' : '#4dabf7',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthLayout;
