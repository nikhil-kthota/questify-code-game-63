
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Star, ScrollText, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Type definitions for our skill tree
type SkillNodeStatus = "locked" | "unlocked" | "completed";

type SkillNode = {
  id: string;
  name: string;
  status: SkillNodeStatus;
  description: string;
  icon: JSX.Element;
  level: number;
  connections: string[];
};

const SkillTreePage = () => {
  const navigate = useNavigate();
  // Mock data - in a real app, this would come from an API
  const [skills] = useState<SkillNode[]>([
    {
      id: "js-basics",
      name: "Arcane Fundamentals",
      status: "completed",
      description: "Master the basic elements of magical scripts",
      icon: <BookOpen className="h-6 w-6" />,
      level: 1,
      connections: ["js-functions"]
    },
    {
      id: "js-functions",
      name: "Spell Binding",
      status: "unlocked",
      description: "Create powerful incantations and control their scope",
      icon: <ScrollText className="h-6 w-6" />,
      level: 2,
      connections: ["js-arrays", "js-objects"]
    },
    {
      id: "js-arrays",
      name: "Magical Collections",
      status: "locked",
      description: "Harness the power of organizing magical elements",
      icon: <Star className="h-6 w-6" />,
      level: 3,
      connections: ["js-advanced"]
    },
    {
      id: "js-objects",
      name: "Arcane Structures",
      status: "locked",
      description: "Build complex magical constructs and hierarchies",
      icon: <Sparkles className="h-6 w-6" />,
      level: 3,
      connections: ["js-advanced"]
    },
    {
      id: "js-advanced",
      name: "Advanced Wizardry",
      status: "locked",
      description: "Master the highest forms of magical programming",
      icon: <Trophy className="h-6 w-6" />,
      level: 4,
      connections: []
    }
  ]);

  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  
  const handleNodeClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
  };

  const handleStartMission = () => {
    if (selectedSkill) {
      navigate(`/mission/${selectedSkill.id}`);
    }
  };

  // Group skills by level
  const skillsByLevel = skills.reduce((acc, skill) => {
    if (!acc[skill.level]) {
      acc[skill.level] = [];
    }
    acc[skill.level].push(skill);
    return acc;
  }, {} as Record<number, SkillNode[]>);

  // Get sorted levels
  const levels = Object.keys(skillsByLevel).map(Number).sort((a, b) => a - b);

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="glass-card p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-vt323 mb-2">Spell Paths</h1>
        <p className="text-lg">Master magical skills and progress through your arcane journey</p>
      </div>

      {/* Timeline-based Skill Tree */}
      <div className="glass-card p-8 relative">
        <div className="space-y-16">
          {levels.map((level) => (
            <div key={level} className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-mountain-purple text-white flex items-center justify-center font-vt323 text-xl neon-glow">
                  {level}
                </div>
                <h2 className="text-2xl font-vt323 text-sunset-pink">Level {level} Spells</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative">
                {level > 1 && (
                  <div className="absolute top-0 left-6 w-0.5 h-8 -mt-8 bg-mountain-purple/30"></div>
                )}
                {skillsByLevel[level].map((skill) => (
                  <Card 
                    key={skill.id} 
                    className={`relative transition-all hover:scale-105 cursor-pointer 
                      ${skill.status === 'completed' ? 'border-2 border-mountain-purple neon-glow' : 
                      skill.status === 'unlocked' ? 'border border-sunset-pink' : 
                      'border border-white/10 opacity-80'}
                    `}
                    onClick={() => handleNodeClick(skill)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className={`p-3 rounded-lg ${
                        skill.status === 'completed' ? 'bg-mountain-purple text-white' :
                        skill.status === 'unlocked' ? 'bg-sunset-pink text-white' : 
                        'bg-mountain-darkest text-white/50'
                      }`}>
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-vt323">{skill.name}</h3>
                        <p className={`text-sm ${
                          skill.status === 'locked' ? 'text-white/50' : ''
                        }`}>
                          {skill.status === 'completed' ? '✨ Mastered' :
                           skill.status === 'unlocked' ? '🔮 Ready to learn' : '🔒 Locked'}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80">{skill.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          
          {/* Vertical timeline lines connecting levels */}
          {levels.slice(0, -1).map((level, index) => (
            <div 
              key={`line-${level}`}
              className="absolute left-6 w-0.5 bg-mountain-purple/30"
              style={{ 
                top: `${16 * (index + 1) + 4}rem`, 
                height: '2rem'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Selected skill details panel */}
      {selectedSkill && (
        <Card className="game-panel p-6 mt-4">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${
              selectedSkill.status === 'completed' ? 'bg-mountain-purple text-white' :
              selectedSkill.status === 'unlocked' ? 'bg-sunset-pink text-white' : 
              'bg-mountain-darkest text-white/50'
            }`}>
              {selectedSkill.icon}
            </div>
            <div>
              <h3 className="text-xl font-vt323">{selectedSkill.name}</h3>
              <p className="text-sm text-white/70">Level {selectedSkill.level} Spell</p>
            </div>
          </div>
          
          <p className="text-white/80 mb-4">{selectedSkill.description}</p>
          
          {selectedSkill.status === "locked" ? (
            <p className="text-sm text-white/50 italic">
              Complete previous spells to unlock this powerful magic
            </p>
          ) : (
            <div className="flex justify-end">
              <Button 
                onClick={handleStartMission}
                className="bg-sunset-pink hover:bg-sunset-red text-white"
              >
                {selectedSkill.status === "completed" ? "Review Spell" : "Learn Spell"}
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SkillTreePage;
