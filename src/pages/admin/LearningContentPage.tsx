import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LearningContent, SkillTrack } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Trash, Video, FileText, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { select, insert, update, remove } from "@/services/supabaseService";

interface ExtendedLearningContent extends LearningContent {
  skill_tracks?: {
    name: string;
  };
}

const LearningContentPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content_type: "video",
    url: "",
    track_id: "",
  });

  // Fetch all learning content
  const { data: learningContent, isLoading: loadingContent } = useQuery({
    queryKey: ['admin-learning-content'],
    queryFn: async () => {
      const { data, error } = await select<ExtendedLearningContent>('learning_content')
        .select('*, skill_tracks(name)');
      
      if (error) {
        toast({
          title: 'Error loading learning content',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as ExtendedLearningContent[];
    },
  });

  // Fetch skill tracks
  const { data: skillTracks, isLoading: loadingTracks } = useQuery({
    queryKey: ['admin-skill-tracks'],
    queryFn: async () => {
      const { data, error } = await select<SkillTrack>('skill_tracks');
      
      if (error) {
        toast({
          title: 'Error loading skill tracks',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as SkillTrack[];
    },
  });

  // Create or update learning content
  const mutation = useMutation({
    mutationFn: async (data: Partial<LearningContent>) => {
      let response;
      
      if (currentContent) {
        // Update
        response = await update<LearningContent>('learning_content', data)
          .eq('id', currentContent.id)
          .select();
      } else {
        // Create
        response = await insert<LearningContent>('learning_content', [data])
          .select();
      }
      
      const { error } = response;
      if (error) throw error;
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-learning-content'] });
      toast({
        title: currentContent ? 'Content updated' : 'Content added',
        description: currentContent ? 'Learning content has been updated successfully' : 'New learning content has been added',
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete learning content
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await remove('learning_content')
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-learning-content'] });
      toast({
        title: 'Content deleted',
        description: 'Learning content has been deleted successfully',
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const openEditDialog = (content: LearningContent) => {
    setCurrentContent(content);
    setFormData({
      title: content.title,
      description: content.description || "",
      content_type: content.content_type,
      url: content.url || "",
      track_id: content.track_id || "",
    });
    setIsOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  const confirmDelete = (content: LearningContent) => {
    setCurrentContent(content);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (currentContent) {
      deleteMutation.mutate(currentContent.id);
    }
  };

  const resetForm = () => {
    setCurrentContent(null);
    setFormData({
      title: "",
      description: "",
      content_type: "video",
      url: "",
      track_id: "",
    });
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-sunset-pink" />;
      case 'article':
        return <FileText className="h-5 w-5 text-neon-blue" />;
      default:
        return <BookOpen className="h-5 w-5 text-neon-green" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Learning Content</h1>
          <p className="text-muted-foreground">Manage educational resources for users</p>
        </div>
        <Button onClick={openAddDialog} className="bg-sunset-pink hover:bg-sunset-red text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Content
        </Button>
      </div>

      {loadingContent ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading content...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent?.map((content) => (
            <Card key={content.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-mountain-dark flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getContentTypeIcon(content.content_type)}
                    <span className="truncate max-w-[200px]">{content.title}</span>
                  </CardTitle>
                  <CardDescription className="truncate max-w-[250px]">
                    {content.description}
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {content.skill_tracks?.name || "No Track"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <a 
                    href={content.url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    View Resource
                  </a>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => openEditDialog(content)}
                      className="hover:bg-mountain-purple/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => confirmDelete(content)}
                      className="hover:bg-sunset-red/20"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {learningContent?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No learning content added yet.</p>
          <Button onClick={openAddDialog} className="mt-4 bg-sunset-pink hover:bg-sunset-red text-white">
            <Plus className="mr-2 h-4 w-4" /> Add First Content
          </Button>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentContent ? "Edit Content" : "Add New Learning Content"}</DialogTitle>
            <DialogDescription>
              {currentContent ? "Update the details below to edit this learning resource." : "Fill in the details to add a new learning resource."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter content title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter content description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content_type">Content Type</Label>
                <Select
                  value={formData.content_type}
                  onValueChange={(value) => handleSelectChange("content_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="track_id">Skill Track</Label>
                <Select
                  value={formData.track_id}
                  onValueChange={(value) => handleSelectChange("track_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillTracks?.map(track => (
                      <SelectItem key={track.id} value={track.id}>{track.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">Resource URL</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://example.com/resource"
                type="url"
                required
              />
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : currentContent ? "Update Content" : "Add Content"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentContent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningContentPage;
