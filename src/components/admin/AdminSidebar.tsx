
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  LayoutGrid, 
  FileText, 
  Award, 
  Users, 
  BarChart, 
  Settings,
  Menu,
  Star,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: LayoutGrid, label: "Skill Tracks", path: "/admin/skill-tracks" },
    { icon: FileText, label: "Missions", path: "/admin/missions" },
    { icon: FileText, label: "Question Bank", path: "/admin/question-bank" },
    { icon: BookOpen, label: "Learning Content", path: "/admin/learning-content" },
    { icon: Award, label: "Badges", path: "/admin/badges" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BarChart, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" }
  ];

  return (
    <aside 
      className={cn(
        "h-full bg-sidebar border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && (
          <Link to="/admin" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Star className="h-6 w-6 text-neon-blue animate-pulse-glow" />
            <span className="font-vt323 text-2xl font-bold">Questify</span>
            <span className="text-xs font-semibold uppercase text-muted-foreground ml-1">Admin</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/admin" className="w-full flex justify-center hover:scale-110 transition-transform">
            <Star className="h-6 w-6 text-neon-blue animate-pulse-glow" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hover:bg-mountain-purple/20 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-1 py-4">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-4 transition-all duration-300",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:translate-x-1"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "animate-pulse-glow" : "")} />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Link to="/" className={cn(
          "flex items-center py-2 px-4 text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground rounded-md transition-all duration-300 hover:translate-x-1",
          collapsed && "justify-center px-0"
        )}>
          {collapsed ? (
            <Home className="h-5 w-5" />
          ) : (
            <>
              <Home className="h-5 w-5 shrink-0" />
              <span className="ml-3">Back to App</span>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
