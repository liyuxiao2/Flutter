import { Badge } from "@/components/ui/badge";
import { badgeStyles } from "@/lib/styleConstants";
import { ReactNode } from "react";

interface StyledBadgeProps {
  variant?: "orange" | "blue" | "removable";
  children: ReactNode;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
}

export function StyledBadge({
  variant = "orange",
  children,
  onClick,
  onKeyDown,
  tabIndex
}: StyledBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={badgeStyles[variant]}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
    >
      {children}
    </Badge>
  );
}
