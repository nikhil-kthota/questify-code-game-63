
import { useState } from "react";
import { Medal, Sparkles, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LeaderboardPage = () => {
  // Mock data for weekly and all-time leaderboards
  const weeklyLeaders = [
    { id: 1, name: "Alex Stargazer", username: "alexs", xp: 850, streak: 7, avatarUrl: "" },
    { id: 2, name: "Maria Moonshadow", username: "mariam", xp: 720, streak: 5, avatarUrl: "" },
    { id: 3, name: "Sam Spellweaver", username: "sams", xp: 690, streak: 7, avatarUrl: "" },
    { id: 4, name: "Li Arcanblade", username: "lia", xp: 610, streak: 4, avatarUrl: "" },
    { id: 5, name: "Jordan Firemind", username: "jordanf", xp: 580, streak: 3, avatarUrl: "" },
    { id: 6, name: "Priya Stormbinder", username: "priyas", xp: 550, streak: 6, avatarUrl: "" },
    { id: 7, name: "Luca Mistwalker", username: "lucam", xp: 520, streak: 2, avatarUrl: "" },
    { id: 8, name: "Emma Frostward", username: "emmaf", xp: 490, streak: 5, avatarUrl: "" },
    { id: 9, name: "Aiden Runeshaper", username: "aidenr", xp: 460, streak: 4, avatarUrl: "" },
    { id: 10, name: "Sophie Lightbringer", username: "sophiel", xp: 430, streak: 3, avatarUrl: "" },
  ];

  const allTimeLeaders = [
    { id: 1, name: "Maria Moonshadow", username: "mariam", xp: 12450, streak: 5, avatarUrl: "" },
    { id: 2, name: "Sam Spellweaver", username: "sams", xp: 11320, streak: 7, avatarUrl: "" },
    { id: 3, name: "Alex Stargazer", username: "alexs", xp: 10890, streak: 7, avatarUrl: "" },
    { id: 4, name: "Li Arcanblade", username: "lia", xp: 9750, streak: 4, avatarUrl: "" },
    { id: 5, name: "Sophie Lightbringer", username: "sophiel", xp: 9320, streak: 3, avatarUrl: "" },
    { id: 6, name: "Priya Stormbinder", username: "priyas", xp: 8780, streak: 6, avatarUrl: "" },
    { id: 7, name: "Jordan Firemind", username: "jordanf", xp: 8240, streak: 3, avatarUrl: "" },
    { id: 8, name: "Emma Frostward", username: "emmaf", xp: 7890, streak: 5, avatarUrl: "" },
    { id: 9, name: "Luca Mistwalker", username: "lucam", xp: 7320, streak: 2, avatarUrl: "" },
    { id: 10, name: "Aiden Runeshaper", username: "aidenr", xp: 6980, streak: 4, avatarUrl: "" },
  ];

  const currentUserId = 1; // For highlighting the current user

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="glass-card p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-vt323 mb-2">Wizards Hall</h1>
        <p className="text-lg">Compare your magical prowess with other wizards across the realm</p>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-mountain-dark border border-mountain-purple/30">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-mountain-purple data-[state=active]:text-white">This Moon</TabsTrigger>
          <TabsTrigger value="alltime" className="data-[state=active]:bg-mountain-purple data-[state=active]:text-white">All Cycles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="mt-6">
          <Card className="game-panel">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-sunset-pink">Weekly Mana Leaders</CardTitle>
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
                      <p className="text-xs text-white/70">{weeklyLeaders[1].xp} Mana</p>
                    </div>
                  </div>
                  
                  {/* First place */}
                  <div className="flex flex-col items-center floating-element">
                    <Avatar className="h-20 w-20 border-2 border-[#FFD700] neon-glow">
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
                      <p className="text-sm text-white/70">{weeklyLeaders[0].xp} Mana</p>
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
                      <p className="text-xs text-white/70">{weeklyLeaders[2].xp} Mana</p>
                    </div>
                  </div>
                </div>
                
                {/* Rest of leaderboard */}
                <div className="space-y-2">
                  {weeklyLeaders.slice(3).map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center p-3 rounded-lg ${
                        user.id === currentUserId ? "bg-mountain-purple/20" : ""
                      }`}
                    >
                      <span className="text-white/60 w-6 text-center">{index + 4}</span>
                      <Avatar className="h-10 w-10 mx-4 border border-mountain-purple/30">
                        <AvatarFallback className="bg-mountain-dark">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-white/60">@{user.username}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-sunset-red" />
                          <span className="text-sm">{user.streak}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-mountain-purple" />
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
          <Card className="game-panel">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-sunset-pink">All-Time Mana Leaders</CardTitle>
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
                      <p className="text-xs text-white/70">{allTimeLeaders[1].xp.toLocaleString()} Mana</p>
                    </div>
                  </div>
                  
                  {/* First place */}
                  <div className="flex flex-col items-center floating-element">
                    <Avatar className="h-20 w-20 border-2 border-[#FFD700] neon-glow">
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
                      <p className="text-sm text-white/70">{allTimeLeaders[0].xp.toLocaleString()} Mana</p>
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
                      <p className="text-xs text-white/70">{allTimeLeaders[2].xp.toLocaleString()} Mana</p>
                    </div>
                  </div>
                </div>
                
                {/* Rest of leaderboard */}
                <div className="space-y-2">
                  {allTimeLeaders.slice(3).map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center p-3 rounded-lg ${
                        user.id === currentUserId ? "bg-mountain-purple/20" : ""
                      }`}
                    >
                      <span className="text-white/60 w-6 text-center">{index + 4}</span>
                      <Avatar className="h-10 w-10 mx-4 border border-mountain-purple/30">
                        <AvatarFallback className="bg-mountain-dark">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-white/60">@{user.username}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-sunset-red" />
                          <span className="text-sm">{user.streak}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-mountain-purple" />
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
