
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  shineColor?: string[];
  className?: string;
}

export function ShineBorder({ 
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"], 
  className 
}: ShineBorderProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-inherit pointer-events-none",
        className
      )}
      style={{
        background: `linear-gradient(90deg, ${shineColor.join(", ")})`,
        padding: "2px",
      }}
    >
      <div 
        className="h-full w-full rounded-inherit bg-background"
        style={{
          background: "inherit",
        }}
      />
      <div
        className="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg, ${shineColor.join(", ")}, ${shineColor[0]})`,
          animation: "shine 2s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
