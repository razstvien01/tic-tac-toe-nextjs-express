"use client";
import { User } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  playerIconColor: string;
  confirmationText: string;
};

export default function PlayerInput({
  label,
  value,
  onChange,
  playerIconColor,
  confirmationText,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        <User className="w-4 h-4 inline mr-2" />
        {label}
      </label>
      <input
        className="w-full p-4 bg-[var(--card)] border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-200"
        placeholder={`Enter ${label} name...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={20}
      />
      {value && (
        <div className={`mt-2 text-sm ${playerIconColor} bounce-in`}>
          ✓ {value} {confirmationText}
        </div>
      )}
    </div>
  );
}
