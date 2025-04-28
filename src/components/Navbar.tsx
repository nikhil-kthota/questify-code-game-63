
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
import { Star, CalendarDays, LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "Alex Player",
    email: "alex@example.com",
    xp: 2340,
    level: 12,
    avatarUrl: "",
  };

  return (
    <header className="fixed w-full top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Star className="h-6 w-6 text-neon-blue" />
            <span className="font-vt323 text-2xl font-bold">Questify</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/skill-tree" className="text-foreground/70 hover:text-foreground transition-colors">
              Skill Tree
            </Link>
            <Link to="/leaderboard" className="text-foreground/70 hover:text-foreground transition-colors">
              Leaderboard
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Daily streak indicator */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
            <CalendarDays className="h-4 w-4 text-neon-red" />
            <span className="text-xs font-medium">5 day streak</span>
          </div>
          
          {/* XP indicator */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
            <Star className="h-4 w-4 text-neon-blue" />
            <span className="text-xs font-medium">{user.xp} XP</span>
          </div>
          
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0" aria-label="Open user menu">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-normal">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <Star className="h-3 w-3 mr-1 text-neon-blue" />
                  <span>Level {user.level}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer flex w-full">
                  <span>Admin Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
