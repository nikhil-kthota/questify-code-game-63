
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
import { Sparkles, CalendarDays, LogOut, Settings, User, BookOpen } from "lucide-react";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="fixed w-full top-0 z-40 border-b border-mountain-purple/30 bg-mountain-darkest/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="h-6 w-6 text-sunset-pink neon-glow-red group-hover:scale-110 transition-transform duration-300" />
            <span className="font-vt323 text-2xl font-bold text-white">Questify</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sunset-pink after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left"
            >
              Realm
            </Link>
            <Link 
              to="/skill-tree" 
              className="text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sunset-pink after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left"
            >
              Spell Paths
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sunset-pink after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left"
            >
              Wizard Hall
            </Link>
            <Link 
              to="/learn" 
              className="text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sunset-pink after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left"
            >
              Level Up
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Daily streak indicator */}
          {profile && (
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-mountain-dark hover:bg-mountain-dark/80 transition-colors cursor-pointer group">
              <CalendarDays className="h-4 w-4 text-sunset-red group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-medium">{profile.streak_days} day streak</span>
            </div>
          )}
          
          {/* XP indicator */}
          {profile && (
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-mountain-dark hover:bg-mountain-dark/80 transition-colors cursor-pointer group">
              <Sparkles className="h-4 w-4 text-mountain-purple group-hover:scale-125 transition-transform" />
              <span className="text-xs font-medium">{profile.xp} XP</span>
            </div>
          )}
          
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent" aria-label="Open user menu">
                  <Avatar className="border-2 border-sunset-pink/50 hover:border-sunset-pink transition-colors duration-300 hover:scale-110 transition-transform">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-sunset-red/80 text-white">
                      {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-mountain-dark border-mountain-purple/30">
                <DropdownMenuLabel>
                  <div className="font-normal">
                    <p className="font-medium">{profile?.username || 'Wizard'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  {profile && (
                    <div className="mt-2 flex items-center text-xs">
                      <Sparkles className="h-3 w-3 mr-1 text-mountain-purple" />
                      <span>Wizard Level {profile.level}</span>
                    </div>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-mountain-purple/20" />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex w-full hover:bg-mountain-purple/20 transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    <span>Grimoire</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer flex w-full hover:bg-mountain-purple/20 transition-colors">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Arcane Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/learn" className="cursor-pointer flex w-full hover:bg-mountain-purple/20 transition-colors">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Level Up</span>
                  </Link>
                </DropdownMenuItem>
                {profile?.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator className="bg-mountain-purple/20" />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer flex w-full hover:bg-mountain-purple/20 transition-colors">
                        <span>Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator className="bg-mountain-purple/20" />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="cursor-pointer hover:bg-sunset-red/20 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Exit Realm</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="relative hover:scale-105 transition-transform">
              <Link to="/login">
                Login
                <div className="absolute inset-0 bg-gradient-to-r from-mountain-purple/20 to-sunset-pink/20 rounded-md filter blur-sm -z-10"></div>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
