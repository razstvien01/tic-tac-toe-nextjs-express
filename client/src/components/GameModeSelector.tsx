"use client";
import { Sparkles } from "lucide-react";

type Props = {
  selected: string;
  onSelect: (mode: string) => void;
};

export default function GameModeSelector({ selected, onSelect }: Props) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-3">
        <Sparkles className="w-4 h-4 inline mr-2" />
        Game Mode
      </label>
      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => onSelect("classic")}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            selected === "classic"
              ? "border-purple-500 bg-purple-500/20 text-purple-300"
              : "border-gray-600 bg-[var(--card)] hover:border-purple-400"
          }`}
        >
          <div className="text-left">
            <div className="font-semibold">🎯 Classic Mode</div>
            <div className="text-sm text-gray-400">
              Traditional 3x3 grid gameplay
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
