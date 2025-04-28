
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LearningContent, SkillTrack } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LearnPage = () => {
  const { toast } = useToast();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  // Fetch skill tracks
  const { data: skillTracks, isLoading: loadingTracks } = useQuery({
    queryKey: ['skill-tracks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skill_tracks')
        .select('*')
        .eq('active', true);
      
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

  // Fetch learning content
  const { data: learningContent, isLoading: loadingContent } = useQuery({
    queryKey: ['learning-content', selectedTrack],
    queryFn: async () => {
      const query = supabase
        .from('learning_content')
        .select('*');
      
      if (selectedTrack) {
        query.eq('track_id', selectedTrack);
      }
      
      const { data, error } = await query;
      
      if (error) {
        toast({
          title: 'Error loading learning content',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as LearningContent[];
    },
    enabled: true, // We'll fetch all content initially
  });

  // Set the first track as selected by default when data loads
  useEffect(() => {
    if (skillTracks && skillTracks.length > 0 && !selectedTrack) {
      setSelectedTrack(skillTracks[0].id);
    }
  }, [skillTracks, selectedTrack]);

  // Filter content by type
  const videos = learningContent?.filter(content => content.content_type === 'video') || [];
  const articles = learningContent?.filter(content => content.content_type === 'article') || [];
  const tutorials = learningContent?.filter(content => content.content_type === 'tutorial') || [];

  // Get content for the selected track
  const filteredContent = selectedTrack
    ? learningContent?.filter(content => content.track_id === selectedTrack)
    : learningContent;

  const renderContentItem = (content: LearningContent) => {
    let icon;
    switch (content.content_type) {
      case 'video':
        icon = <Video className="h-5 w-5 text-sunset-pink" />;
        break;
      case 'article':
        icon = <FileText className="h-5 w-5 text-neon-blue" />;
        break;
      default:
        icon = <BookOpen className="h-5 w-5 text-neon-green" />;
    }

    return (
      <Card key={content.id} className="hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-mountain-dark/80">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <div className="mr-2">{icon}</div>
            {content.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/70 mb-4">{content.description}</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full hover:bg-sunset-pink hover:text-white transition-colors"
            onClick={() => window.open(content.url, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Content
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="glass-card p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-vt323 mb-2">Level Up</h1>
        <p className="text-lg">Improve your skills with our curated learning resources</p>
      </div>

      {loadingTracks ? (
        <div className="text-center py-12">Loading skill tracks...</div>
      ) : (
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-sunset-pink animate-pulse-glow" />
            <h2 className="font-vt323 text-2xl">Magical Learning Paths</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {skillTracks?.map(track => (
              <Button
                key={track.id}
                variant={selectedTrack === track.id ? "default" : "outline"}
                className={`h-auto flex flex-col p-4 transition-all duration-300 ${
                  selectedTrack === track.id 
                    ? 'bg-mountain-purple text-white neon-glow' 
                    : 'hover:border-mountain-purple'
                }`}
                onClick={() => setSelectedTrack(track.id)}
              >
                <BookOpen className={`h-8 w-8 mb-2 ${selectedTrack === track.id ? 'animate-float' : ''}`} />
                <span className="text-sm font-medium">{track.name}</span>
              </Button>
            ))}
          </div>

          <Tabs defaultValue="all">
            <TabsList className="bg-mountain-darkest">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {loadingContent ? (
                <div className="text-center py-12">Loading content...</div>
              ) : filteredContent && filteredContent.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent.map(renderContentItem)}
                </div>
              ) : (
                <div className="text-center py-12 text-white/70">
                  No content available for this skill track yet.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="videos" className="mt-6">
              {loadingContent ? (
                <div className="text-center py-12">Loading videos...</div>
              ) : videos && videos.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.filter(v => !selectedTrack || v.track_id === selectedTrack).map(renderContentItem)}
                </div>
              ) : (
                <div className="text-center py-12 text-white/70">
                  No videos available for this skill track yet.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="articles" className="mt-6">
              {loadingContent ? (
                <div className="text-center py-12">Loading articles...</div>
              ) : articles && articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.filter(a => !selectedTrack || a.track_id === selectedTrack).map(renderContentItem)}
                </div>
              ) : (
                <div className="text-center py-12 text-white/70">
                  No articles available for this skill track yet.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-6">
              {loadingContent ? (
                <div className="text-center py-12">Loading tutorials...</div>
              ) : tutorials && tutorials.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.filter(t => !selectedTrack || t.track_id === selectedTrack).map(renderContentItem)}
                </div>
              ) : (
                <div className="text-center py-12 text-white/70">
                  No tutorials available for this skill track yet.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
