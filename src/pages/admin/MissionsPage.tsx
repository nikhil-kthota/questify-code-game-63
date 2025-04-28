
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

const MissionsPage = () => {
  // Mock data - in a real app, this would come from API
  const [missions, setMissions] = useState([
    { id: 1, name: "JavaScript Variables", description: "Learn about variables, constants, and data types", trackId: 1, difficulty: "beginner", questionCount: 8, published: true },
    { id: 2, name: "Functions & Scope", description: "Understanding functions and variable scope", trackId: 1, difficulty: "beginner", questionCount: 10, published: true },
    { id: 3, name: "Control Flow", description: "Conditionals, loops, and control structures", trackId: 1, difficulty: "beginner", questionCount: 12, published: true },
    { id: 4, name: "React Components", description: "Building React components and props", trackId: 2, difficulty: "intermediate", questionCount: 10, published: true },
    { id: 5, name: "React Hooks", description: "Using React hooks for state and effects", trackId: 2, difficulty: "intermediate", questionCount: 8, published: false },
    { id: 6, name: "Advanced React Patterns", description: "Compound components and context API", trackId: 2, difficulty: "advanced", questionCount: 15, published: false },
  ]);

  // Mock skill tracks
  const skillTracks = [
    { id: 1, name: "JavaScript Basics" },
    { id: 2, name: "React Fundamentals" },
    { id: 3, name: "CSS Mastery" },
    { id: 4, name: "Data Structures" },
    { id: 5, name: "Backend Development" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrackName = (trackId: number) => {
    const track = skillTracks.find(t => t.id === trackId);
    return track ? track.name : "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Missions</h1>
          <p className="text-muted-foreground">Manage learning missions and quizzes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Mission
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Mission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="mission-name">Mission Name</Label>
                <Input id="mission-name" placeholder="Enter mission name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-description">Description</Label>
                <Input id="mission-description" placeholder="Enter mission description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="track">Skill Track</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill track" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillTracks.map(track => (
                      <SelectItem key={track.id} value={track.id.toString()}>
                        {track.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Create Mission</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Missions</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="tracks">By Track</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6 space-y-6">
          {missions.map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-xl">{mission.name}</CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      mission.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {mission.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getTrackName(mission.trackId)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mission.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{mission.questionCount} questions</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Edit Questions</Button>
                    {mission.published ? (
                      <Button variant="outline">Unpublish</Button>
                    ) : (
                      <Button>Publish</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="published" className="mt-6 space-y-6">
          {missions.filter(m => m.published).map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-xl">{mission.name}</CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getTrackName(mission.trackId)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mission.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{mission.questionCount} questions</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Edit Questions</Button>
                    <Button variant="outline">Unpublish</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-6 space-y-6">
          {missions.filter(m => !m.published).map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-xl">{mission.name}</CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getTrackName(mission.trackId)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mission.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{mission.questionCount} questions</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Edit Questions</Button>
                    <Button>Publish</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="tracks" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 mb-6">
                <Label htmlFor="filter-track">Filter by Track</Label>
                <Select>
                  <SelectTrigger id="filter-track">
                    <SelectValue placeholder="Select a skill track" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillTracks.map(track => (
                      <SelectItem key={track.id} value={track.id.toString()}>
                        {track.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 space-y-6">
            {/* Sample filtered result */}
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Basics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {missions.filter(m => m.trackId === 1).map((mission) => (
                  <div key={mission.id} className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">{mission.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                          {mission.difficulty}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          mission.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {mission.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MissionsPage;
