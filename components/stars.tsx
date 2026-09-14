import { StarIcon } from "./icons";
import { toBn } from "@/lib/format";

export function Stars({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.35 && full < 5;
  return (
    <span className={`inline-flex items-center gap-0.5 text-deal ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && hasHalf;
        if (isHalf) return <StarIcon key={i} half width={size} height={size} />;
        return (
          <StarIcon
            key={i}
            width={size}
            height={size}
            className={isFull ? "" : "text-line"}
          />
        );
      })}
    </span>
  );
}

export function RatingLine({
  rating,
  count,
  className = "",
}: {
  rating: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-muted ${className}`}>
      <Stars rating={rating} />
      <span className="text-ink">{toBn(rating.toFixed(1))}</span>
      {typeof count === "number" ? <span>({toBn(count)} রিভিউ)</span> : null}
    </span>
  );
}
