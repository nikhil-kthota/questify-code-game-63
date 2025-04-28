
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type XPProgressBarProps = {
  currentXP: number;
  levelXP: number;
  nextLevelXP: number;
  level: number;
};

const XPProgressBar = ({ currentXP, levelXP, nextLevelXP, level }: XPProgressBarProps) => {
  const levelProgress = Math.round(((currentXP - levelXP) / (nextLevelXP - levelXP)) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-neon-blue" />
          <span className="font-bold">Level {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentXP - levelXP}/{nextLevelXP - levelXP} XP
        </span>
      </div>
      
      <Progress value={levelProgress} className="h-2">
        <div 
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all"
          style={{ width: `${levelProgress}%` }}
        />
      </Progress>
    </div>
  );
};

export default XPProgressBar;
