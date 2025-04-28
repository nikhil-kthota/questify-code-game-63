
import { Link } from "react-router-dom";
import { Award, ChevronRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DailyGoalCard from "@/components/DailyGoalCard";
import XPProgressBar from "@/components/XPProgressBar";

const HomePage = () => {
  // Mock data - in a real app, this would come from API
  const userData = {
    name: "Alex",
    xp: 2340,
    levelXP: 2000,
    nextLevelXP: 3000,
    level: 12,
    dailyXP: 45,
    dailyGoal: 100,
    streakDays: 5,
    currentTrack: {
      id: "1",
      name: "JavaScript Basics",
      progress: 35,
    },
    currentMission: {
      id: "m2",
      name: "Functions & Scope",
      estimatedTime: "15 min",
    },
    recentBadges: [
      { id: "b1", name: "First Steps", icon: "🚀" },
      { id: "b2", name: "Quick Learner", icon: "⚡" }
    ]
  };

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div>
        <h1 className="text-3xl md:text-4xl font-vt323 mb-2">
          Welcome back, <span className="text-primary">{userData.name}</span>!
        </h1>
        <p className="text-muted-foreground">Ready to continue your learning journey today?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Goal Card */}
        <DailyGoalCard 
          currentXP={userData.dailyXP} 
          targetXP={userData.dailyGoal} 
          streakDays={userData.streakDays}
        />

        {/* Current Mission Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-vt323">Current Mission</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{userData.currentMission.estimatedTime}</span>
              </div>
            </div>
            
            <p className="text-lg mb-6 font-medium">
              {userData.currentMission.name}
            </p>
            
            <div className="flex justify-end">
              <Button asChild>
                <Link to={`/mission/${userData.currentMission.id}`} className="flex items-center gap-1">
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-vt323 mb-4">Your Progress</h3>
        <XPProgressBar 
          currentXP={userData.xp}
          levelXP={userData.levelXP}
          nextLevelXP={userData.nextLevelXP}
          level={userData.level}
        />
      </div>
      
      {/* Current Skill Track */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-vt323">Current Skill Track</h3>
          <Link to="/skill-tree" className="text-primary text-sm flex items-center gap-1">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-2">{userData.currentTrack.name}</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{userData.currentTrack.progress}%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${userData.currentTrack.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-vt323">Recent Badges</h3>
          <Link to="/profile" className="text-primary text-sm flex items-center gap-1">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {userData.recentBadges.map((badge) => (
            <div 
              key={badge.id}
              className="glass-card p-4 flex flex-col items-center justify-center aspect-square"
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <span className="text-sm text-center font-medium">{badge.name}</span>
            </div>
          ))}
          <div className="glass-card p-4 flex flex-col items-center justify-center aspect-square border-dashed">
            <Award className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm text-center text-muted-foreground">More to unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
