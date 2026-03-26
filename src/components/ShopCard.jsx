import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';

export default function ShopCard({ shop, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/shops/${shop.id}`}>
        <motion.div
          whileHover={{ y: -6 }}
          className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {shop.featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
              >
                Featured
              </motion.span>
            )}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{shop.name}</h3>
                <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {shop.city}
                </p>
              </div>
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur rounded-full text-white text-xs font-medium">
                {shop.priceRange}
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {shop.category}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{shop.rating}</span>
                <span className="text-muted-foreground text-xs">({shop.reviews})</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{shop.description}</p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {shop.openHours}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}