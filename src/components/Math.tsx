import React from 'react';
import { motion } from 'motion/react';

interface MathTextProps {
  children: React.ReactNode;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ children, className = "" }) => {
  return (
    <span className={`math-font text-yellow-200/90 ${className}`}>
      {children}
    </span>
  );
};

export const MathBlock: React.FC<MathTextProps> = ({ children, className = "" }) => {
  return (
    <div className={`math-font text-2xl text-center my-6 text-yellow-100/90 leading-relaxed transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export const EquationPart = ({ children, active, label }: { children: React.ReactNode, active?: boolean, label?: string }) => (
  <span className="relative inline-block group">
    <span className={`transition-all duration-300 rounded px-1 ${active ? 'bg-yellow-400/20 text-yellow-400 scale-110 shadow-[0_0_15px_rgba(250,176,5,0.3)]' : ''}`}>
      {children}
    </span>
    {active && label && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-yellow-400 bg-black/80 px-2 py-1 rounded border border-yellow-400/30"
      >
        {label}
      </motion.div>
    )}
  </span>
);

export const Highlight = ({ children, color = "yellow" }: { children: React.ReactNode, color?: "yellow" | "blue" | "red" | "green" }) => {
  const colors = {
    yellow: "text-yellow-400 font-semibold",
    blue: "text-blue-400 font-semibold",
    red: "text-red-400 font-semibold",
    green: "text-green-400 font-semibold"
  };
  return <span className={colors[color]}>{children}</span>;
};
