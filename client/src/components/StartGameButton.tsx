"use client";
import { ArrowRight } from "lucide-react";

type Props = {
  onClick: () => void;
  isReady: boolean;
};

export default function StartGameButton({ onClick, isReady }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={!isReady}
      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
        isReady
          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105 pulse-glow"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
      }`}
    >
      {isReady ? (
        <>
          <span>Start Battle</span>
          <ArrowRight className="w-5 h-5" />
        </>
      ) : (
        <span>Enter Both Player Names</span>
      )}
    </button>
  );
}
