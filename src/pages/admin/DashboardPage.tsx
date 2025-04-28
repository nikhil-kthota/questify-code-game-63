
import { BarChart, Clock, Star, Users, Award, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardPage = () => {
  // Mock data - in a real app, this would come from analytics API
  const stats = [
    {
      title: "Total Users",
      value: "1,243",
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Missions",
      value: "45",
      icon: Award,
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Skill Tracks",
      value: "12",
      icon: Activity,
      change: "0%",
      changeType: "neutral"
    },
    {
      title: "Badges Issued",
      value: "3,872",
      icon: Star,
      change: "+22%",
      changeType: "positive"
    }
  ];

  const trackCompletions = [
    { name: "JavaScript Basics", percentage: 78 },
    { name: "React Fundamentals", percentage: 62 },
    { name: "Data Structures", percentage: 45 },
    { name: "CSS Mastery", percentage: 39 },
    { name: "Backend Development", percentage: 28 }
  ];

  const mostActiveUsers = [
    { name: "Alex Johnson", xp: 2870, streak: 12 },
    { name: "Maria Garcia", xp: 2540, streak: 8 },
    { name: "Sam Taylor", xp: 2320, streak: 15 },
    { name: "Li Wei", xp: 2190, streak: 7 },
    { name: "Jordan Smith", xp: 2080, streak: 9 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform performance and user engagement</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 
                    stat.changeType === 'negative' ? 'text-red-500' : 
                    'text-gray-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Skill Track Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trackCompletions.map((track) => (
                <div key={track.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{track.name}</span>
                    <span>{track.percentage}%</span>
                  </div>
                  <Progress value={track.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Most Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mostActiveUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-sm">{user.xp} XP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-neon-red" />
                    <span className="text-sm">{user.streak} day streak</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-muted-foreground text-sm">Jordan Smith joined 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">New mission completed</p>
                <p className="text-muted-foreground text-sm">Alex Johnson completed Advanced Functions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Badge awarded</p>
                <p className="text-muted-foreground text-sm">Maria Garcia earned JS Master badge</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
