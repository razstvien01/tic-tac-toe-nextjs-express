import React from "react";

interface GameCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  note?: string;
  gradientFrom?: string;
  gradientTo?: string;
  borderColor?: string;
  textColor?: string;
  noteColor?: string;
}

export default function GameCard({
  title,
  value,
  subtitle,
  note,
  gradientFrom = "from-blue-500/20",
  gradientTo = "to-blue-600/20",
  borderColor = "border-blue-500/30",
  textColor = "text-blue-400",
  noteColor = "text-blue-300",
}: GameCardProps) {
  return (
    <div
      className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-6 rounded-2xl border ${borderColor} text-center`}
    >
      <div className={`text-lg font-semibold mb-2 ${textColor}`}>{title}</div>
      <div className={`text-4xl font-bold mb-1 ${textColor}`}>{value}</div>
      {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
      {note && <div className={`text-xs mt-1 ${noteColor}`}>{note}</div>}
    </div>
  );
}
