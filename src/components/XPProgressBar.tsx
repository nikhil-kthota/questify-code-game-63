
import { Sparkles } from "lucide-react";
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
          <Sparkles className="h-5 w-5 text-mountain-purple" />
          <span className="font-bold">Wizard Level {level}</span>
        </div>
        <span className="text-sm text-white/70">
          {currentXP - levelXP}/{nextLevelXP - levelXP} Mana
        </span>
      </div>
      
      <Progress value={levelProgress} className="h-3 bg-mountain-darkest">
        <div 
          className="h-full bg-gradient-to-r from-mountain-purple to-sunset-pink rounded-full transition-all"
          style={{ width: `${levelProgress}%` }}
        />
      </Progress>
    </div>
  );
};

export default XPProgressBar;
