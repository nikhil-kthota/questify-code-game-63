
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

const SkillTracksPage = () => {
  // Mock data - in a real app, this would come from API
  const [skillTracks, setSkillTracks] = useState([
    { id: 1, name: "JavaScript Basics", description: "Learn the fundamentals of JavaScript programming", missions: 12, published: true },
    { id: 2, name: "React Fundamentals", description: "Learn to build web applications with React", missions: 10, published: true },
    { id: 3, name: "CSS Mastery", description: "Advanced CSS techniques and layouts", missions: 8, published: true },
    { id: 4, name: "Data Structures", description: "Understanding data structures in JavaScript", missions: 15, published: true },
    { id: 5, name: "Backend Development", description: "Server-side programming and APIs", missions: 14, published: false },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Skill Tracks</h1>
          <p className="text-muted-foreground">Manage learning paths and skill tracks</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Track
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Skill Track</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Track Name</label>
                <Input id="name" placeholder="Enter skill track name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Input id="description" placeholder="Enter track description" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Create Track</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6">
        {skillTracks.map((track) => (
          <Card key={track.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">{track.name}</CardTitle>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    track.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {track.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-sm text-muted-foreground ml-3">
                    {track.missions} missions
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
              <p className="text-muted-foreground mb-4">{track.description}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline">View Missions</Button>
                {track.published ? (
                  <Button variant="outline">Unpublish</Button>
                ) : (
                  <Button>Publish</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillTracksPage;
