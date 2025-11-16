"use client";

import { AnimatedCard } from "@/components/shared/AnimatedCard";

interface BudgetCardProps {
  isExpanded: boolean;
  onToggle: () => void;
  value: number;
  onChange: (value: number) => void;
}

export function BudgetCard({ isExpanded, onToggle, value, onChange }: BudgetCardProps) {
  return (
    <AnimatedCard
      title="Budget"
      isExpanded={isExpanded}
      onToggle={onToggle}
      placeholder="Add budget"
    >
      <p className="text-md text-gray-600 mb-4">Find the perfect date for any budget</p>
      <input
        type="range"
        min="0"
        max="500"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FC7A4B] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#97AEEF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#97AEEF] [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, #97AEEF ${(value / 500) * 100}%, #E2E8F0 ${(value / 500) * 100}%, #E2E8F0 100%)`,
          height: "8px",
          borderRadius: "9999px",
        }}
      />
      <div className="text-center mt-2">${value}</div>
    </AnimatedCard>
  );
}
