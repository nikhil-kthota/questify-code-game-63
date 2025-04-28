
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SettingsPage = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock settings - in a real app, these would come from API
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Questify",
    defaultXPGoal: "100",
    maxDailyMissions: "5",
    leaderboardReset: "weekly",
  });
  
  const [apiSettings, setApiSettings] = useState({
    youtubeApiKey: "•••••••••••••••••••••••",
    lessonApiEndpoint: "https://api.lessons.example.com/v1",
    motivationalQuotesEnabled: true,
    videoLessonsEnabled: true,
    openAIEnabled: false,
  });
  
  const [difficultySettings, setDifficultySettings] = useState({
    beginnerCorrectThreshold: "70",
    intermediateCorrectThreshold: "80", 
    advancedCorrectThreshold: "90",
    difficultyAutoAdjust: true,
    maxConsecutiveFailsBeforeLoweringDifficulty: "3",
    minConsecutiveSuccessesBeforeRaisingDifficulty: "2",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminderEnabled: true,
    streakReminderEnabled: true,
    newBadgeNotificationEnabled: true,
    adminNotificationsEnabled: true,
    emailNotificationsEnabled: true,
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleApiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiSettings({
      ...apiSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficultySettings({
      ...difficultySettings,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSetting = (settingGroup: string, settingKey: string) => {
    if (settingGroup === "api") {
      setApiSettings({
        ...apiSettings,
        [settingKey]: !apiSettings[settingKey as keyof typeof apiSettings],
      });
    } else if (settingGroup === "difficulty") {
      setDifficultySettings({
        ...difficultySettings,
        [settingKey]: !difficultySettings[settingKey as keyof typeof difficultySettings],
      });
    } else if (settingGroup === "notification") {
      setNotificationSettings({
        ...notificationSettings,
        [settingKey]: !notificationSettings[settingKey as keyof typeof notificationSettings],
      });
    }
  };

  const handleSaveSettings = (settingType: string) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      
      toast({
        title: "Settings saved",
        description: `${settingType} settings have been updated successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and behavior</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic platform settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  name="platformName"
                  value={generalSettings.platformName}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultXPGoal">Default Daily XP Goal</Label>
                <Input
                  id="defaultXPGoal"
                  name="defaultXPGoal"
                  type="number"
                  value={generalSettings.defaultXPGoal}
                  onChange={handleGeneralChange}
                />
                <p className="text-sm text-muted-foreground">Target XP for daily goals</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDailyMissions">Max Daily Missions</Label>
                <Input
                  id="maxDailyMissions"
                  name="maxDailyMissions"
                  type="number"
                  value={generalSettings.maxDailyMissions}
                  onChange={handleGeneralChange}
                />
                <p className="text-sm text-muted-foreground">Maximum missions a user can complete per day</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaderboardReset">Leaderboard Reset Frequency</Label>
                <Select 
                  value={generalSettings.leaderboardReset}
                  onValueChange={(value) => setGeneralSettings({...generalSettings, leaderboardReset: value})}
                >
                  <SelectTrigger id="leaderboardReset">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">How often the leaderboard resets</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("General")} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Integration Settings</CardTitle>
              <CardDescription>
                Configure external API integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtubeApiKey">YouTube API Key</Label>
                <Input
                  id="youtubeApiKey"
                  name="youtubeApiKey"
                  type="password"
                  value={apiSettings.youtubeApiKey}
                  onChange={handleApiChange}
                />
                <p className="text-sm text-muted-foreground">Used for fetching lesson videos</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lessonApiEndpoint">Lesson API Endpoint</Label>
                <Input
                  id="lessonApiEndpoint"
                  name="lessonApiEndpoint"
                  value={apiSettings.lessonApiEndpoint}
                  onChange={handleApiChange}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="motivationalQuotes">Motivational Quotes</Label>
                    <p className="text-sm text-muted-foreground">Enable motivational quotes in the app</p>
                  </div>
                  <Switch
                    id="motivationalQuotes"
                    checked={apiSettings.motivationalQuotesEnabled}
                    onCheckedChange={() => toggleSetting("api", "motivationalQuotesEnabled")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="videoLessons">Video Lessons</Label>
                    <p className="text-sm text-muted-foreground">Enable video lessons for complex topics</p>
                  </div>
                  <Switch
                    id="videoLessons"
                    checked={apiSettings.videoLessonsEnabled}
                    onCheckedChange={() => toggleSetting("api", "videoLessonsEnabled")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="openAI">OpenAI Integration</Label>
                    <p className="text-sm text-muted-foreground">Use AI for generating custom feedback</p>
                  </div>
                  <Switch
                    id="openAI"
                    checked={apiSettings.openAIEnabled}
                    onCheckedChange={() => toggleSetting("api", "openAIEnabled")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("API")} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="difficulty" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Difficulty Settings</CardTitle>
              <CardDescription>
                Configure how mission difficulty adapts to user performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="beginnerCorrectThreshold">Beginner Threshold (%)</Label>
                  <Input
                    id="beginnerCorrectThreshold"
                    name="beginnerCorrectThreshold"
                    type="number"
                    value={difficultySettings.beginnerCorrectThreshold}
                    onChange={handleDifficultyChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intermediateCorrectThreshold">Intermediate Threshold (%)</Label>
                  <Input
                    id="intermediateCorrectThreshold"
                    name="intermediateCorrectThreshold"
                    type="number"
                    value={difficultySettings.intermediateCorrectThreshold}
                    onChange={handleDifficultyChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advancedCorrectThreshold">Advanced Threshold (%)</Label>
                  <Input
                    id="advancedCorrectThreshold"
                    name="advancedCorrectThreshold"
                    type="number"
                    value={difficultySettings.advancedCorrectThreshold}
                    onChange={handleDifficultyChange}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="difficultyAutoAdjust">Auto-adjust Difficulty</Label>
                  <p className="text-sm text-muted-foreground">Automatically adjust difficulty based on user performance</p>
                </div>
                <Switch
                  id="difficultyAutoAdjust"
                  checked={difficultySettings.difficultyAutoAdjust}
                  onCheckedChange={() => toggleSetting("difficulty", "difficultyAutoAdjust")}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxConsecutiveFailsBeforeLoweringDifficulty">Max Consecutive Fails</Label>
                  <Input
                    id="maxConsecutiveFailsBeforeLoweringDifficulty"
                    name="maxConsecutiveFailsBeforeLoweringDifficulty"
                    type="number"
                    value={difficultySettings.maxConsecutiveFailsBeforeLoweringDifficulty}
                    onChange={handleDifficultyChange}
                    min="1"
                  />
                  <p className="text-sm text-muted-foreground">Failures before lowering difficulty</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minConsecutiveSuccessesBeforeRaisingDifficulty">Min Consecutive Successes</Label>
                  <Input
                    id="minConsecutiveSuccessesBeforeRaisingDifficulty"
                    name="minConsecutiveSuccessesBeforeRaisingDifficulty"
                    type="number"
                    value={difficultySettings.minConsecutiveSuccessesBeforeRaisingDifficulty}
                    onChange={handleDifficultyChange}
                    min="1"
                  />
                  <p className="text-sm text-muted-foreground">Successes before raising difficulty</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("Difficulty")} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure platform notifications and reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dailyReminder">Daily Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send daily goal reminders</p>
                </div>
                <Switch
                  id="dailyReminder"
                  checked={notificationSettings.dailyReminderEnabled}
                  onCheckedChange={() => toggleSetting("notification", "dailyReminderEnabled")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="streakReminder">Streak Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders when streak is at risk</p>
                </div>
                <Switch
                  id="streakReminder"
                  checked={notificationSettings.streakReminderEnabled}
                  onCheckedChange={() => toggleSetting("notification", "streakReminderEnabled")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newBadgeNotification">Badge Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify users when they earn new badges</p>
                </div>
                <Switch
                  id="newBadgeNotification"
                  checked={notificationSettings.newBadgeNotificationEnabled}
                  onCheckedChange={() => toggleSetting("notification", "newBadgeNotificationEnabled")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adminNotifications">Admin Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify admins about important events</p>
                </div>
                <Switch
                  id="adminNotifications"
                  checked={notificationSettings.adminNotificationsEnabled}
                  onCheckedChange={() => toggleSetting("notification", "adminNotificationsEnabled")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotificationsEnabled}
                  onCheckedChange={() => toggleSetting("notification", "emailNotificationsEnabled")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("Notification")} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
