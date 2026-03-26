import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import reviews from '../data/reviews.json';

export default function LiveReviewMarquee() {
  const doubled = [...reviews, ...reviews];

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((review, i) => (
          <div
            key={`${review.id}-${i}`}
            className="flex-shrink-0 w-72 bg-card border border-border rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{review.user}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }, (_, j) => (
                    <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="w-3 h-3" /> {review.likes}
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}