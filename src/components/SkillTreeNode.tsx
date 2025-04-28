
import { cn } from "@/lib/utils";

type SkillNodeStatus = "locked" | "unlocked" | "completed";

type SkillTreeNodeProps = {
  id: string;
  name: string;
  status: SkillNodeStatus;
  icon: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
};

const SkillTreeNode = ({ 
  id, 
  name, 
  status, 
  icon, 
  onClick,
  size = "md" 
}: SkillTreeNodeProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };

  const isClickable = status !== "locked";

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={isClickable ? onClick : undefined}
        disabled={!isClickable}
        className={cn(
          "skill-node",
          sizeClasses[size],
          status === "unlocked" && "skill-node-unlocked",
          status === "completed" && "skill-node-completed",
          status === "locked" && "skill-node-locked",
          isClickable && "cursor-pointer hover:scale-110 transition-transform"
        )}
        aria-label={`${name} skill ${status}`}
      >
        {icon}
      </button>
      <span className={cn(
        "mt-2 text-sm text-center",
        status === "locked" && "text-muted-foreground"
      )}>
        {name}
      </span>
    </div>
  );
};

export default SkillTreeNode;
