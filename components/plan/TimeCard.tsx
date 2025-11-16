"use client";

import { AnimatedCard } from "@/components/shared/AnimatedCard";

interface TimeCardProps {
  isExpanded: boolean;
  onToggle: () => void;
  value: number;
  onChange: (value: number) => void;
}

export function TimeCard({ isExpanded, onToggle, value, onChange }: TimeCardProps) {
  return (
    <AnimatedCard
      title="Time"
      isExpanded={isExpanded}
      onToggle={onToggle}
      placeholder="Add length"
    >
      <p className="text-md text-gray-600 mb-4">
        From a quick meal to a day trip around the city we've got you covered
      </p>
      <input
        type="range"
        min="0.5"
        max="12"
        step="0.5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FC7A4B] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#97AEEF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#97AEEF] [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, white 0%, #97AEEF ${(value / 12) * 100}%, #E2E8F0 ${(value / 12) * 100}%, #E2E8F0 100%)`,
          height: "8px",
          borderRadius: "9999px",
        }}
      />
      <div className="text-center mt-2">{value.toFixed(1)} hours</div>
    </AnimatedCard>
  );
}
