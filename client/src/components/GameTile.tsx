interface GameTileProps {
  value: string;
  index: number;
  onClick: (index: number) => void;
  highlight?: boolean;
}

export default function GameTile({
  value,
  index,
  onClick,
  highlight,
}: GameTileProps) {
  return (
    <div
      onClick={() => onClick(index)}
      className={`aspect-square w-full flex items-center justify-center text-5xl font-bold rounded-2xl cursor-pointer transition-all duration-200 ${
        value
          ? highlight
            ? "bg-yellow-500/30 border-3 border-yellow-400 shadow-lg shadow-yellow-400/50 winner-celebration"
            : value === "X"
            ? "bg-blue-500/30 border-3 border-blue-400 shadow-lg shadow-blue-400/30"
            : "bg-green-500/30 border-3 border-green-400 shadow-lg shadow-green-400/30"
          : "bg-[var(--hover)] hover:bg-[var(--primary)] hover:scale-105 border-3 border-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-400/20"
      } ${value ? "bounce-in" : ""}`}
    >
      {value && (
        <span
          className={`${
            value === "X" ? "text-blue-400" : "text-green-400"
          } drop-shadow-lg`}
        >
          {value}
        </span>
      )}
    </div>
  );
}
