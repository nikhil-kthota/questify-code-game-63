
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, CalendarDays, LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "Alex Wizard",
    email: "alex@arcane.realm",
    xp: 2340,
    level: 12,
    avatarUrl: "",
  };

  return (
    <header className="fixed w-full top-0 z-40 border-b border-mountain-purple/30 bg-mountain-darkest/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-sunset-pink neon-glow-red" />
            <span className="font-vt323 text-2xl font-bold text-white">Arcane Quest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Realm
            </Link>
            <Link to="/skill-tree" className="text-white/70 hover:text-white transition-colors">
              Spell Paths
            </Link>
            <Link to="/leaderboard" className="text-white/70 hover:text-white transition-colors">
              Wizards Hall
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Daily streak indicator */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-mountain-dark">
            <CalendarDays className="h-4 w-4 text-sunset-red" />
            <span className="text-xs font-medium">5 day streak</span>
          </div>
          
          {/* XP indicator */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-mountain-dark">
            <Sparkles className="h-4 w-4 text-mountain-purple" />
            <span className="text-xs font-medium">{user.xp} XP</span>
          </div>
          
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0" aria-label="Open user menu">
                <Avatar className="border-2 border-sunset-pink/50">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="bg-sunset-red/80 text-white">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-mountain-dark border-mountain-purple/30">
              <DropdownMenuLabel>
                <div className="font-normal">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <Sparkles className="h-3 w-3 mr-1 text-mountain-purple" />
                  <span>Wizard Level {user.level}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-mountain-purple/20" />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Grimoire</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Arcane Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-mountain-purple/20" />
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer flex w-full">
                  <span>Archmage Portal</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-mountain-purple/20" />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Exit Realm</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
