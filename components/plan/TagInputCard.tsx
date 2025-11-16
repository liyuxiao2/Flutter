"use client";

import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StyledBadge } from "@/components/shared/StyledBadge";
import { Heart } from "lucide-react";

interface TagInputCardProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  placeholder: string;
  description: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  tags: string[];
  onAddTag: (e?: React.MouseEvent) => void;
  onRemoveTag: (tag: string) => void;
  cardPlaceholder?: string;
}

export function TagInputCard({
  title,
  isExpanded,
  onToggle,
  placeholder,
  description,
  inputValue,
  onInputChange,
  tags,
  onAddTag,
  onRemoveTag,
  cardPlaceholder,
}: TagInputCardProps) {
  return (
    <AnimatedCard
      title={title}
      isExpanded={isExpanded}
      onToggle={onToggle}
      placeholder={cardPlaceholder}
    >
      <p className="text-md text-gray-600 mb-2">{description}</p>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-full pr-12"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              onAddTag();
            }
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200"
          onClick={onAddTag}
        >
          <Heart className="h-4 w-4 text-[#FC7A4B]" />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <StyledBadge
              key={tag}
              variant="removable"
              onClick={() => onRemoveTag(tag)}
            >
              {tag} ×
            </StyledBadge>
          ))}
        </div>
      )}
    </AnimatedCard>
  );
}
