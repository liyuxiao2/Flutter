"use client";

import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  placeholder?: string;
  children: ReactNode;
}

export function AnimatedCard({
  title,
  isExpanded,
  onToggle,
  placeholder,
  children,
}: AnimatedCardProps) {
  return (
    <Card className="shadow-sm rounded-2xl">
      <div className="w-full p-6">
        <div onClick={onToggle} className="w-full cursor-pointer">
          <div className="flex justify-between items-center">
            <h2 className={`font-serif ${isExpanded ? "text-3xl" : "text-2xl"}`}>
              {title}
            </h2>
            {!isExpanded && placeholder && (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-1">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
