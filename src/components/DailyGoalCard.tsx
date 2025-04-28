
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
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-vt323">Today's Goal</h3>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-neon-red" />
          <span className="font-bold">{streakDays} day streak</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>{currentXP} XP</span>
          <span>{targetXP} XP</span>
        </div>
        <Progress value={progress} className="h-2">
          <div 
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>
      
      {progress < 100 ? (
        <p className="text-sm text-muted-foreground">
          Earn {targetXP - currentXP} more XP to complete your daily goal!
        </p>
      ) : (
        <p className="text-sm text-neon-green">
          Daily goal completed! Great job!
        </p>
      )}
    </div>
  );
};

export default DailyGoalCard;
