import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Building2, Landmark } from 'lucide-react';

export default function PlaceCard({ place, index = 0 }) {
  const isHotel = place.type === 'Hotel';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/places/${place.id}`}>
        <motion.div
          whileHover={{ y: -6 }}
          className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {place.featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full"
              >
                Top Pick
              </motion.span>
            )}
            <div className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-medium flex items-center gap-1">
              {isHotel ? <Building2 className="w-3 h-3" /> : <Landmark className="w-3 h-3" />}
              {place.type}
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold text-lg leading-tight">{place.name}</h3>
              <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {place.city}, {place.country}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1.5 flex-wrap">
                {place.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{place.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
            {isHotel && place.pricePerNight && (
              <p className="mt-2 text-sm font-semibold text-primary">{place.pricePerNight} <span className="text-muted-foreground font-normal text-xs">/night</span></p>
            )}
            {!isHotel && place.entryFee && (
              <p className="mt-2 text-sm font-semibold text-accent">Entry: {place.entryFee}</p>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}