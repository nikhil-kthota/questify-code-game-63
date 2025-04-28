
import { useState } from "react";
import { Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import XPProgressBar from "@/components/XPProgressBar";

const ProfilePage = () => {
  // Mock data - in a real app, this would come from API
  const userData = {
    name: "Alex Player",
    username: "questmaster42",
    email: "alex@example.com",
    joinedDate: "Jan 2023",
    xp: 2340,
    levelXP: 2000,
    nextLevelXP: 3000,
    level: 12,
    streakDays: 5,
    completedMissions: 27,
    skillsMastered: 8,
    badges: [
      { id: "1", name: "First Steps", description: "Complete your first mission", icon: "🚀", earnedDate: "Jan 15, 2023" },
      { id: "2", name: "Quick Learner", description: "Complete 5 missions in a day", icon: "⚡", earnedDate: "Jan 18, 2023" },
      { id: "3", name: "On Fire", description: "Maintain a 5-day streak", icon: "🔥", earnedDate: "Jan 25, 2023" },
      { id: "4", name: "JavaScript Novice", description: "Complete JS Basics track", icon: "📜", earnedDate: "Feb 3, 2023" },
      { id: "5", name: "Coding Ninja", description: "Solve 10 advanced problems", icon: "🥷", earnedDate: "Mar 12, 2023" },
    ],
    history: [
      { date: "Apr 25, 2023", action: "Completed Mission", detail: "Advanced Functions", xp: 50 },
      { date: "Apr 24, 2023", action: "Earned Badge", detail: "Coding Ninja", xp: 100 },
      { date: "Apr 23, 2023", action: "Completed Mission", detail: "Variables & Data Types", xp: 30 },
      { date: "Apr 20, 2023", action: "Reached Level", detail: "Level 12", xp: 0 },
    ]
  };

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div>
        <h1 className="text-3xl md:text-4xl font-vt323 mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Track your progress and achievements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">{userData.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground mb-4">@{userData.username}</p>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-neon-blue" />
                <span>Level {userData.level}</span>
                <span className="text-muted-foreground ml-1">• Joined {userData.joinedDate}</span>
              </div>
              
              <div className="w-full mt-6">
                <XPProgressBar 
                  currentXP={userData.xp}
                  levelXP={userData.levelXP}
                  nextLevelXP={userData.nextLevelXP}
                  level={userData.level}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 w-full mt-6">
                <div className="text-center p-3 bg-secondary rounded-md">
                  <p className="text-2xl font-bold">{userData.completedMissions}</p>
                  <p className="text-xs text-muted-foreground">Missions</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-md">
                  <p className="text-2xl font-bold">{userData.skillsMastered}</p>
                  <p className="text-xs text-muted-foreground">Skills</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-md">
                  <p className="text-2xl font-bold">{userData.badges.length}</p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-3 md:col-span-2">
          <Tabs defaultValue="badges">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="history">Activity History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Earned Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {userData.badges.map((badge) => (
                      <div 
                        key={badge.id}
                        className="glass-card p-4 flex flex-col items-center text-center"
                      >
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                          <p className="text-xs pt-2">{badge.earnedDate}</p>
                        </div>
                      </div>
                    ))}
                    <div className="glass-card p-4 flex flex-col items-center justify-center border-dashed">
                      <Award className="h-10 w-10 text-muted-foreground mb-2" />
                      <span className="text-sm text-center text-muted-foreground">More badges to unlock</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userData.history.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                          {index < userData.history.length - 1 && (
                            <div className="h-full w-px bg-border"></div>
                          )}
                        </div>
                        <div className="pb-6">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{item.action}</p>
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {item.xp > 0 ? `+${item.xp} XP` : ""}
                            </span>
                          </div>
                          <p className="text-sm">{item.detail}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
