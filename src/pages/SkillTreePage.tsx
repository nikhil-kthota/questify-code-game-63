
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Star, FileText, BarChart } from "lucide-react";
import SkillTreeNode from "@/components/SkillTreeNode";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Type definitions for our skill tree
type SkillNodeStatus = "locked" | "unlocked" | "completed";

type SkillNode = {
  id: string;
  name: string;
  status: SkillNodeStatus;
  description: string;
  icon: JSX.Element;
  position: { x: number; y: number };
  connections: string[];
};

const SkillTreePage = () => {
  const navigate = useNavigate();
  // Mock data - in a real app, this would come from an API
  const [skills] = useState<SkillNode[]>([
    {
      id: "js-basics",
      name: "JS Basics",
      status: "completed",
      description: "Learn the fundamentals of JavaScript programming",
      icon: <Code className="h-6 w-6" />,
      position: { x: 50, y: 80 },
      connections: ["js-functions"]
    },
    {
      id: "js-functions",
      name: "Functions",
      status: "unlocked",
      description: "Master JavaScript functions and scope",
      icon: <FileText className="h-6 w-6" />,
      position: { x: 50, y: 40 },
      connections: ["js-arrays", "js-objects"]
    },
    {
      id: "js-arrays",
      name: "Arrays",
      status: "locked",
      description: "Working with JavaScript arrays and array methods",
      icon: <BarChart className="h-6 w-6" />,
      position: { x: 20, y: 20 },
      connections: ["js-advanced"]
    },
    {
      id: "js-objects",
      name: "Objects",
      status: "locked",
      description: "Understanding JavaScript objects and prototypes",
      icon: <Star className="h-6 w-6" />,
      position: { x: 80, y: 20 },
      connections: ["js-advanced"]
    },
    {
      id: "js-advanced",
      name: "Advanced JS",
      status: "locked",
      description: "Advanced JavaScript concepts and patterns",
      icon: <Code className="h-6 w-6" />,
      position: { x: 50, y: 0 },
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-vt323 mb-2">Skill Tree</h1>
        <p className="text-muted-foreground">Unlock new skills and progress through your learning journey</p>
      </div>

      <div className="relative bg-muted/30 rounded-xl min-h-[400px] p-6 border">
        {/* Render connections between nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {skills.map(skill => (
            skill.connections.map(targetId => {
              const target = skills.find(s => s.id === targetId);
              if (!target) return null;
              
              const startX = skill.position.x;
              const startY = skill.position.y;
              const endX = target.position.x;
              const endY = target.position.y;
              
              const isUnlocked = skill.status === 'completed' || skill.status === 'unlocked';
              
              return (
                <line
                  key={`${skill.id}-${target.id}`}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  className={`stroke-2 ${isUnlocked ? 'stroke-primary' : 'stroke-gray-300 dark:stroke-gray-700'}`}
                  strokeDasharray={!isUnlocked ? "5,5" : ""}
                />
              );
            })
          ))}
        </svg>
        
        {/* Render skill nodes */}
        <div className="relative w-full h-full z-10">
          {skills.map(skill => (
            <div 
              key={skill.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${skill.position.x}%`, 
                top: `${skill.position.y}%` 
              }}
            >
              <SkillTreeNode
                id={skill.id}
                name={skill.name}
                status={skill.status}
                icon={skill.icon}
                onClick={() => handleNodeClick(skill)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills list view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {skills.map(skill => (
          <Card 
            key={skill.id}
            className={`transition-all hover:scale-105 cursor-pointer ${
              skill.status === 'completed' ? 'border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''
            }`}
            onClick={() => handleNodeClick(skill)}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-2 rounded-lg ${
                skill.status === 'completed' ? 'bg-blue-500' :
                skill.status === 'unlocked' ? 'bg-primary' : 'bg-gray-300'
              }`}>
                {skill.icon}
              </div>
              <div>
                <h3 className="text-lg font-vt323">{skill.name}</h3>
                <p className={`text-sm ${
                  skill.status === 'locked' ? 'text-muted-foreground' : ''
                }`}>
                  {skill.status === 'completed' ? '✓ Completed' :
                   skill.status === 'unlocked' ? '🔓 Available' : '🔒 Locked'}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected skill details panel */}
      {selectedSkill && (
        <Card className="p-6 mt-4">
          <h3 className="text-xl font-vt323 mb-2">{selectedSkill.name}</h3>
          <p className="text-muted-foreground mb-4">{selectedSkill.description}</p>
          
          {selectedSkill.status === "locked" ? (
            <p className="text-sm text-muted-foreground italic">
              Complete previous skills to unlock this one
            </p>
          ) : (
            <div className="flex justify-end">
              <button 
                onClick={handleStartMission}
                className="questify-button-primary"
              >
                {selectedSkill.status === "completed" ? "Review" : "Start"}
              </button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SkillTreePage;
