
import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Realm", path: "/" },
    { icon: BookOpen, label: "Spell Paths", path: "/skill-tree" },
    { icon: Sparkles, label: "Quests", path: "/mission/current" },
    { icon: Trophy, label: "Wizards Hall", path: "/leaderboard" },
    { icon: User, label: "Grimoire", path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-mountain-darkest/80 backdrop-blur-md border-t border-mountain-purple/30 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-lg",
                isActive
                  ? "text-sunset-pink"
                  : "text-white/60 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "neon-glow-red")} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
