
import { cn } from "@/lib/utils";

interface DotPatternProps {
  glow?: boolean;
  className?: string;
}

export function DotPattern({ glow = false, className }: DotPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-30 pointer-events-none",
        glow && "animate-pulse-slow",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="20"
              r="1.5"
              fill="currentColor"
              className={cn(
                "text-primary/40",
                glow && "drop-shadow-[0_0_3px_hsl(var(--primary))]"
              )}
            />
          </pattern>
          {glow && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-pattern)"
          filter={glow ? "url(#glow)" : undefined}
        />
      </svg>
    </div>
  );
}
