import { useState } from 'react';
import { Star } from 'lucide-react';

const GOLD = '#C9973F';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
}

export default function StarRating({ value, onChange, size = 18 }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const interactive = Boolean(onChange);
  const displayValue = hovered ?? value;

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          style={{ lineHeight: 0 }}
        >
          <Star
            size={size}
            strokeWidth={1.75}
            fill={star <= displayValue ? GOLD : 'transparent'}
            style={{ color: star <= displayValue ? GOLD : 'rgba(0,0,0,0.2)' }}
          />
        </button>
      ))}
    </div>
  );
}
