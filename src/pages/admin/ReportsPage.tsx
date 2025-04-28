
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState("30days");

  // Mock data for skill mastery rates
  const skillMasteryData = [
    { name: "JavaScript Basics", completion: 78, userCount: 980 },
    { name: "Functions & Scope", completion: 65, userCount: 856 },
    { name: "Arrays & Objects", completion: 58, userCount: 792 },
    { name: "Control Flow", completion: 71, userCount: 943 },
    { name: "ES6 Features", completion: 43, userCount: 675 },
    { name: "DOM Manipulation", completion: 39, userCount: 546 },
    { name: "Async JavaScript", completion: 31, userCount: 412 },
  ];

  // Mock data for most failed missions
  const failedMissionsData = [
    { name: "Async/Await Patterns", failRate: 68, attemptCount: 452 },
    { name: "Closure Concepts", failRate: 62, attemptCount: 378 },
    { name: "Complex Array Methods", failRate: 57, attemptCount: 523 },
    { name: "Functional Programming", failRate: 52, attemptCount: 412 },
    { name: "ES6 Class Syntax", failRate: 48, attemptCount: 386 },
  ];

  // Mock data for user engagement
  const userEngagementData = [
    { date: "Apr 25", newUsers: 42, activeUsers: 356 },
    { date: "Apr 24", newUsers: 38, activeUsers: 342 },
    { date: "Apr 23", newUsers: 45, activeUsers: 359 },
    { date: "Apr 22", newUsers: 39, activeUsers: 367 },
    { date: "Apr 21", newUsers: 41, activeUsers: 371 },
    { date: "Apr 20", newUsers: 35, activeUsers: 348 },
    { date: "Apr 19", newUsers: 43, activeUsers: 362 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Monitor platform performance and user engagement</p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="alltime">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="engagement">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="skill-mastery">Skill Mastery</TabsTrigger>
          <TabsTrigger value="problem-areas">Problem Areas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="engagement" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,243</div>
                <p className="text-xs text-muted-foreground">
                  +156 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">876</div>
                <p className="text-xs text-muted-foreground">
                  70.5% of total users
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Daily Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">358</div>
                <p className="text-xs text-muted-foreground">
                  +24 from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted"></div>
                    <span className="text-sm">New Users</span>
                  </div>
                </div>
                <div className="mt-4 h-[200px] flex items-end justify-between">
                  {userEngagementData.map((day) => (
                    <div key={day.date} className="flex flex-col items-center w-full">
                      <div className="flex flex-col items-center gap-1 w-full">
                        <div 
                          className="w-full max-w-[40px] bg-primary" 
                          style={{ height: `${day.activeUsers / 4}px` }}
                        ></div>
                        <div 
                          className="w-full max-w-[40px] bg-muted" 
                          style={{ height: `${day.newUsers * 2}px` }}
                        ></div>
                      </div>
                      <span className="mt-2 text-xs">{day.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Day 1 retention</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Day 7 retention</span>
                    <span className="text-sm font-medium">64%</span>
                  </div>
                  <Progress value={64} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Day 30 retention</span>
                    <span className="text-sm font-medium">48%</span>
                  </div>
                  <Progress value={48} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Day 90 retention</span>
                    <span className="text-sm font-medium">31%</span>
                  </div>
                  <Progress value={31} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skill-mastery" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Mastery Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillMasteryData.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground ml-2">({skill.userCount} users)</span>
                      </div>
                      <span>{skill.completion}%</span>
                    </div>
                    <Progress value={skill.completion} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Completed Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillMasteryData.sort((a, b) => b.completion - a.completion).slice(0, 5).map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-muted-foreground w-6">{index + 1}</span>
                      <div className="flex-1">
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.userCount} users</p>
                      </div>
                      <div>
                        <span className="font-bold">{skill.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lowest Completion Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillMasteryData.sort((a, b) => a.completion - b.completion).slice(0, 5).map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-muted-foreground w-6">{index + 1}</span>
                      <div className="flex-1">
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.userCount} users</p>
                      </div>
                      <div>
                        <span className="font-bold">{skill.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="problem-areas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Failed Missions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {failedMissionsData.map((mission) => (
                  <div key={mission.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{mission.name}</span>
                        <span className="text-muted-foreground ml-2">({mission.attemptCount} attempts)</span>
                      </div>
                      <span>{mission.failRate}% fail rate</span>
                    </div>
                    <Progress value={mission.failRate} className="[&>*]:bg-red-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mission Drop-off Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Started but not completed</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <Progress value={32} className="[&>*]:bg-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quit after first question</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <Progress value={18} className="[&>*]:bg-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Failed then abandoned</span>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    <Progress value={24} className="[&>*]:bg-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Question Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Most Difficult Questions</span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Closure Concepts #3</span>
                      <span className="text-sm">84% incorrect</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Async/Await #5</span>
                      <span className="text-sm">78% incorrect</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Prototypal Inheritance #2</span>
                      <span className="text-sm">76% incorrect</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Complex Array Methods #4</span>
                      <span className="text-sm">72% incorrect</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-2">Generate Detailed Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
