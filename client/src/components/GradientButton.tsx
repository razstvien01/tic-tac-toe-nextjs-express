import Link from "next/link";
import { ReactNode } from "react";

type GradientButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
};

export default function GradientButton({ href, children, icon }: GradientButtonProps) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 pulse-glow"
    >
      {icon && <span className="w-6 h-6 group-hover:animate-pulse">{icon}</span>}
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
    </Link>
  );
}
