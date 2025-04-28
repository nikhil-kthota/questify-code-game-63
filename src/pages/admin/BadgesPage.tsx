
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

const BadgesPage = () => {
  // Mock data - in a real app, this would come from API
  const [badges, setBadges] = useState([
    { 
      id: 1, 
      name: "First Steps", 
      description: "Complete your first mission", 
      icon: "🚀",
      criteria: "Complete 1 mission",
      issuedCount: 432
    },
    { 
      id: 2, 
      name: "Quick Learner", 
      description: "Complete 5 missions in a single day", 
      icon: "⚡",
      criteria: "Complete 5 missions in 24 hours",
      issuedCount: 187
    },
    { 
      id: 3, 
      name: "On Fire", 
      description: "Maintain a 5-day streak", 
      icon: "🔥",
      criteria: "Login and earn XP for 5 consecutive days",
      issuedCount: 156
    },
    { 
      id: 4, 
      name: "JavaScript Novice", 
      description: "Complete the JavaScript Basics track", 
      icon: "📜",
      criteria: "Complete all missions in JavaScript Basics track",
      issuedCount: 98
    },
    { 
      id: 5, 
      name: "Perfectionist", 
      description: "Score 100% on an advanced mission", 
      icon: "🏆",
      criteria: "Answer all questions correctly in an advanced mission",
      issuedCount: 42
    },
    { 
      id: 6, 
      name: "Coding Ninja", 
      description: "Solve 10 advanced problems", 
      icon: "🥷",
      criteria: "Complete 10 missions with advanced difficulty",
      issuedCount: 27
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Badges</h1>
          <p className="text-muted-foreground">Manage achievement badges and rewards</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Badge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Badge</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="badge-name">Badge Name</Label>
                <Input id="badge-name" placeholder="Enter badge name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-description">Description</Label>
                <Input id="badge-description" placeholder="Enter badge description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-criteria">Award Criteria</Label>
                <Textarea id="badge-criteria" placeholder="Explain how users can earn this badge" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-icon">Badge Icon</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-6 flex flex-col items-center justify-center gap-2">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    <p className="text-xs text-muted-foreground">SVG, PNG or JPG</p>
                  </div>
                  <div className="border rounded-md p-6 flex flex-col items-center justify-center gap-2">
                    <Label htmlFor="badge-emoji" className="text-sm text-center">Or select an emoji</Label>
                    <Input id="badge-emoji" placeholder="🏆" className="text-center text-2xl" />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Create Badge</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <Card key={badge.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{badge.icon}</div>
                <CardTitle>{badge.name}</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{badge.description}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Award Criteria</p>
                  <p className="text-sm text-muted-foreground">{badge.criteria}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Badges Issued</p>
                  <p className="text-sm text-muted-foreground">{badge.issuedCount} users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-dashed">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-dashed">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Badge
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Badge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="badge-name-alt">Badge Name</Label>
                    <Input id="badge-name-alt" placeholder="Enter badge name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="badge-description-alt">Description</Label>
                    <Input id="badge-description-alt" placeholder="Enter badge description" />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button>Create Badge</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BadgesPage;
