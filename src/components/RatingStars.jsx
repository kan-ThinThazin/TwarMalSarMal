// @ts-nocheck
import { Star } from 'lucide-react';

/**
 * @param {Object} props
 * @param {number} props.rating
 * @param {"sm" | "md" | "lg"} [props.size]
 * @param {boolean} [props.interactive]
 * @param {(rating: number) => void} [props.onRate] <-- Made optional
 */
export default function RatingStars({ rating, size = 'sm', interactive = false, onRate = () => {} }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate(star)}
          className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
        >
          <Star
            className={`${sizeClass} ${
              star <= rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-muted-foreground/30'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}