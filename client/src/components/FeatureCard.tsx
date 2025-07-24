import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  colorClass: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  colorClass,
}: FeatureCardProps) {
  return (
    <div
      className={`bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover:border-${colorClass}-500 transition-all duration-300 hover:transform hover:scale-105`}
    >
      <div className={`w-8 h-8 text-${colorClass}-400 mx-auto mb-3`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
