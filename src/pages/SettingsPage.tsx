
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SettingsPage = () => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Mock user data - in a real app, this would come from API
  const [userData, setUserData] = useState({
    name: "Alex Player",
    email: "alex@example.com",
    username: "questmaster42",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    streakAlerts: true,
    newBadges: true,
    friendActivities: false,
    marketingEmails: false,
  });
  
  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    showOnLeaderboard: true,
    showProfile: true,
    shareProgress: true,
    allowDataCollection: true,
  });

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    });
  };

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  const handleUpdatePassword = () => {
    // Password validation would go here
    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both new passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userData.currentPassword || !userData.newPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      
      // Reset password fields
      setUserData({
        ...userData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Notification preferences saved",
        description: "Your notification settings have been updated.",
      });
    }, 1000);
  };

  const handleSavePrivacy = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Privacy settings saved",
        description: "Your privacy settings have been updated.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-16 md:pb-0 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-vt323 mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleUserDataChange}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={userData.currentPassword}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={userData.newPassword}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleUserDataChange}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleUpdatePassword} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive reminders to complete your daily goals</p>
                </div>
                <Switch
                  checked={notificationSettings.dailyReminders}
                  onCheckedChange={() => handleNotificationChange('dailyReminders')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Streak Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when your streak is at risk</p>
                </div>
                <Switch
                  checked={notificationSettings.streakAlerts}
                  onCheckedChange={() => handleNotificationChange('streakAlerts')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Badge Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified when you earn a new badge</p>
                </div>
                <Switch
                  checked={notificationSettings.newBadges}
                  onCheckedChange={() => handleNotificationChange('newBadges')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Friend Activities</p>
                  <p className="text-sm text-muted-foreground">Get notified about your friends' progress</p>
                </div>
                <Switch
                  checked={notificationSettings.friendActivities}
                  onCheckedChange={() => handleNotificationChange('friendActivities')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Receive news and special offers</p>
                </div>
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={() => handleNotificationChange('marketingEmails')}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleSaveNotifications} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage how your information is displayed and used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show on Leaderboards</p>
                  <p className="text-sm text-muted-foreground">Allow your name and progress to appear on leaderboards</p>
                </div>
                <Switch
                  checked={privacySettings.showOnLeaderboard}
                  onCheckedChange={() => handlePrivacyChange('showOnLeaderboard')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">Allow other users to view your profile</p>
                </div>
                <Switch
                  checked={privacySettings.showProfile}
                  onCheckedChange={() => handlePrivacyChange('showProfile')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share Progress</p>
                  <p className="text-sm text-muted-foreground">Allow sharing your learning achievements on social media</p>
                </div>
                <Switch
                  checked={privacySettings.shareProgress}
                  onCheckedChange={() => handlePrivacyChange('shareProgress')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Collection</p>
                  <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve the learning experience</p>
                </div>
                <Switch
                  checked={privacySettings.allowDataCollection}
                  onCheckedChange={() => handlePrivacyChange('allowDataCollection')}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleSavePrivacy} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
