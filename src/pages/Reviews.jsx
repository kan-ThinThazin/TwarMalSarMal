import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, MessageCircle, Utensils, MapPin, ThumbsUp } from 'lucide-react';
import reviews from '../data/reviews.json';
import shops from '../data/shops.json';
import places from '../data/places.json';

export default function Reviews() {
  const [likedReviews, setLikedReviews] = useState({});
  const [filter, setFilter] = useState('all');

  const toggleLike = (id) => {
    setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = filter === 'all'
    ? reviews
    : reviews.filter(r => r.type === filter);

  const getRelatedLink = (review) => {
    if (review.type === 'shop') return `/shops/${review.relatedId}`;
    return `/places/${review.relatedId}`;
  };

  const getRelatedName = (review) => {
    if (review.type === 'shop') return shops.find(s => s.id === review.relatedId)?.name || 'Shop';
    return places.find(p => p.id === review.relatedId)?.name || 'Place';
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold font-display mb-3"
          >
            Live <span className="gradient-text">Reviews</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Real experiences from real travelers
          </motion.p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8">
          {[
            { label: 'All', value: 'all', icon: MessageCircle },
            { label: 'Food', value: 'shop', icon: Utensils },
            { label: 'Places', value: 'place', icon: MapPin },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <f.icon className="w-4 h-4" /> {f.label}
            </button>
          ))}
        </div>

        {/* Live indicator */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Live updates</span>
        </motion.div>

        <AnimatePresence>
          <div className="space-y-4">
            {filtered.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-sm">{review.user}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex">
                            {Array.from({ length: review.rating }, (_, j) => (
                              <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">· {review.date}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        review.type === 'shop'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-accent/10 text-accent'
                      }`}>
                        {review.type === 'shop' ? '🍜 Food' : '📍 Place'}
                      </span>
                    </div>

                    <p className="text-sm text-foreground mt-3 leading-relaxed">{review.text}</p>

                    <div className="flex items-center justify-between mt-4">
                      <Link
                        to={getRelatedLink(review)}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {review.type === 'shop' ? <Utensils className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {getRelatedName(review)} · {review.city}
                      </Link>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(review.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          likedReviews[review.id]
                            ? 'bg-red-50 text-red-500 dark:bg-red-950/30'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedReviews[review.id] ? 'fill-red-500 text-red-500' : ''}`} />
                        {review.likes + (likedReviews[review.id] ? 1 : 0)}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>
    </div>
  );
}