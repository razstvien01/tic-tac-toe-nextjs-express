import React from "react";

interface WinnerModalProps {
  winner: string | null;
  winnerName: string | null;
  onClose: () => void;
  onContinue: () => void;
  onStop: () => void;
  isSaving: boolean;
}

export default function WinnerModal({
  winner,
  winnerName,
  onClose,
  onContinue,
  onStop,
  isSaving,
}: WinnerModalProps) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-400 p-8 rounded-2xl max-w-md w-full animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-yellow-300 hover:text-white transition"
        >
          ✕
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4">{winner === "Draw" ? "🤝" : "🏆"}</div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {winner === "Draw" ? "It's a Draw!" : `${winnerName} Wins!`}
          </div>
          <div className="text-lg text-gray-200">
            {winner === "Draw"
              ? "Both players played well."
              : `Congratulations, ${winnerName}!`}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={onContinue}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Continue
            </button>
            <button
              onClick={onStop}
              disabled={isSaving}
              className={`px-6 py-3 rounded-lg font-semibold ${
                isSaving
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } text-white transition-all`}
            >
              {isSaving ? "Saving..." : "Stop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
