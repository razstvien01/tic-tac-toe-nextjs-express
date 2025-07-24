import { Crown } from "lucide-react";

export default function RecentResults({ history }: { history: string[] }) {
  return (
    <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Crown className="w-5 h-5 text-yellow-400" />
        Recent Results
      </h3>

      {history.length > 0 ? (
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {history
            .slice(-5)
            .reverse()
            .map((result, index) => (
              <div
                key={index}
                className="text-sm p-2 bg-[var(--hover)] rounded-lg"
              >
                {result}
              </div>
            ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">
          No recent games played yet.
        </p>
      )}
    </div>
  );
}
