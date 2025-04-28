
import { useState } from "react";
import { Medal, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LeaderboardPage = () => {
  // Mock data for weekly and all-time leaderboards
  const weeklyLeaders = [
    { id: 1, name: "Alex Johnson", username: "alexj", xp: 850, streak: 7, avatarUrl: "" },
    { id: 2, name: "Maria Garcia", username: "mgarcia", xp: 720, streak: 5, avatarUrl: "" },
    { id: 3, name: "Sam Taylor", username: "staylor", xp: 690, streak: 7, avatarUrl: "" },
    { id: 4, name: "Li Wei", username: "liwei", xp: 610, streak: 4, avatarUrl: "" },
    { id: 5, name: "Jordan Smith", username: "jsmith", xp: 580, streak: 3, avatarUrl: "" },
    { id: 6, name: "Priya Patel", username: "ppatel", xp: 550, streak: 6, avatarUrl: "" },
    { id: 7, name: "Luca Romano", username: "lromano", xp: 520, streak: 2, avatarUrl: "" },
    { id: 8, name: "Emma Wilson", username: "ewilson", xp: 490, streak: 5, avatarUrl: "" },
    { id: 9, name: "Aiden Chen", username: "achen", xp: 460, streak: 4, avatarUrl: "" },
    { id: 10, name: "Sophie Müller", username: "smuller", xp: 430, streak: 3, avatarUrl: "" },
  ];

  const allTimeLeaders = [
    { id: 1, name: "Maria Garcia", username: "mgarcia", xp: 12450, streak: 5, avatarUrl: "" },
    { id: 2, name: "Sam Taylor", username: "staylor", xp: 11320, streak: 7, avatarUrl: "" },
    { id: 3, name: "Alex Johnson", username: "alexj", xp: 10890, streak: 7, avatarUrl: "" },
    { id: 4, name: "Li Wei", username: "liwei", xp: 9750, streak: 4, avatarUrl: "" },
    { id: 5, name: "Sophie Müller", username: "smuller", xp: 9320, streak: 3, avatarUrl: "" },
    { id: 6, name: "Priya Patel", username: "ppatel", xp: 8780, streak: 6, avatarUrl: "" },
    { id: 7, name: "Jordan Smith", username: "jsmith", xp: 8240, streak: 3, avatarUrl: "" },
    { id: 8, name: "Emma Wilson", username: "ewilson", xp: 7890, streak: 5, avatarUrl: "" },
    { id: 9, name: "Luca Romano", username: "lromano", xp: 7320, streak: 2, avatarUrl: "" },
    { id: 10, name: "Aiden Chen", username: "achen", xp: 6980, streak: 4, avatarUrl: "" },
  ];

  const currentUserId = 1; // For highlighting the current user

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div>
        <h1 className="text-3xl md:text-4xl font-vt323 mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">See how you stack up against other learners</p>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-center">Weekly XP Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Top 3 leaders with medals */}
                <div className="flex justify-center items-end gap-4 mb-8">
                  {/* Second place */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 border-2 border-[#C0C0C0]">
                      <AvatarFallback className="bg-[#C0C0C0]/20 text-[#C0C0C0]">
                        {weeklyLeaders[1].name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Medal className="h-4 w-4 text-[#C0C0C0]" />
                        <span className="font-bold">2nd</span>
                      </div>
                      <p className="text-sm font-medium">{weeklyLeaders[1].name}</p>
                      <p className="text-xs text-muted-foreground">{weeklyLeaders[1].xp} XP</p>
                    </div>
                  </div>
                  
                  {/* First place */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-2 border-[#FFD700]">
                      <AvatarFallback className="bg-[#FFD700]/20 text-[#FFD700]">
                        {weeklyLeaders[0].name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Medal className="h-5 w-5 text-[#FFD700]" />
                        <span className="font-bold">1st</span>
                      </div>
                      <p className="font-medium">{weeklyLeaders[0].name}</p>
                      <p className="text-sm text-muted-foreground">{weeklyLeaders[0].xp} XP</p>
                    </div>
                  </div>
                  
                  {/* Third place */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 border-2 border-[#CD7F32]">
                      <AvatarFallback className="bg-[#CD7F32]/20 text-[#CD7F32]">
                        {weeklyLeaders[2].name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Medal className="h-4 w-4 text-[#CD7F32]" />
                        <span className="font-bold">3rd</span>
                      </div>
                      <p className="text-sm font-medium">{weeklyLeaders[2].name}</p>
                      <p className="text-xs text-muted-foreground">{weeklyLeaders[2].xp} XP</p>
                    </div>
                  </div>
                </div>
                
                {/* Rest of leaderboard */}
                <div className="space-y-2">
                  {weeklyLeaders.slice(3).map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center p-3 rounded-lg ${
                        user.id === currentUserId ? "bg-primary/10" : ""
                      }`}
                    >
                      <span className="text-muted-foreground w-6 text-center">{index + 4}</span>
                      <Avatar className="h-10 w-10 mx-4">
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-neon-red" />
                          <span className="text-sm">{user.streak}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-neon-blue" />
                          <span className="text-sm font-bold">{user.xp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alltime" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-center">All-Time XP Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Top 3 leaders with medals */}
                <div className="flex justify-center items-end gap-4 mb-8">
                  {/* Second place */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 border-2 border-[#C0C0C0]">
                      <AvatarFallback className="bg-[#C0C0C0]/20 text-[#C0C0C0]">
                        {allTimeLeaders[1].name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Medal className="h-4 w-4 text-[#C0C0C0]" />
                        <span className="font-bold">2nd</span>
                      </div>
                      <p className="text-sm font-medium">{allTimeLeaders[1].name}</p>
                      <p className="text-xs text-muted-foreground">{allTimeLeaders[1].xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                  
                  {/* First place */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-2 border-[#FFD700]">
                      <AvatarFallback className="bg-[#FFD700]/20 text-[#FFD700]">
                        {allTimeLeaders[0].name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Medal className="h-5 w-5 text-[#FFD700]" />
                        <span className="font-bold">1st</span>
                      </div>
                      <p className="font-medium">{allTimeLeaders[0].name}</p>
                      <p className="text-sm text-muted-foreground">{allTimeLeaders[0].xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                  
                  {/* Third place */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 border-2 border-[#CD7F32]">
                      <AvatarFallback className="bg-[#CD7F32]/20 text-[#CD7F32]">
                        {allTimeLeaders[2].name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Medal className="h-4 w-4 text-[#CD7F32]" />
                        <span className="font-bold">3rd</span>
                      </div>
                      <p className="text-sm font-medium">{allTimeLeaders[2].name}</p>
                      <p className="text-xs text-muted-foreground">{allTimeLeaders[2].xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                </div>
                
                {/* Rest of leaderboard */}
                <div className="space-y-2">
                  {allTimeLeaders.slice(3).map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center p-3 rounded-lg ${
                        user.id === currentUserId ? "bg-primary/10" : ""
                      }`}
                    >
                      <span className="text-muted-foreground w-6 text-center">{index + 4}</span>
                      <Avatar className="h-10 w-10 mx-4">
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-neon-red" />
                          <span className="text-sm">{user.streak}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-neon-blue" />
                          <span className="text-sm font-bold">{user.xp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;
