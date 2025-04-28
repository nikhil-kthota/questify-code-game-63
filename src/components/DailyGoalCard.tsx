
import { CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type DailyGoalCardProps = {
  currentXP: number;
  targetXP: number;
  streakDays: number;
};

const DailyGoalCard = ({ currentXP, targetXP, streakDays }: DailyGoalCardProps) => {
  const progress = Math.round((currentXP / targetXP) * 100);

  return (
    <div className="game-panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-vt323 text-sunset-pink">Today's Quest</h3>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-sunset-red" />
          <span className="font-bold">{streakDays} day spell streak</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>{currentXP} Mana</span>
          <span>{targetXP} Mana</span>
        </div>
        <Progress value={progress} className="h-3 bg-mountain-darkest">
          <div 
            className="h-full bg-gradient-to-r from-mountain-purple to-sunset-pink rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>
      
      {progress < 100 ? (
        <p className="text-sm text-white/70">
          Gather {targetXP - currentXP} more Mana to complete your daily quest!
        </p>
      ) : (
        <p className="text-sm text-neon-green">
          Daily quest completed! Your magic grows stronger!
        </p>
      )}
    </div>
  );
};

export default DailyGoalCard;
