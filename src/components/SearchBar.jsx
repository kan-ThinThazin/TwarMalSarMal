import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Utensils, MapPin, X, TrendingUp } from 'lucide-react';
import shops from '../data/shops.json';
import places from '../data/places.json';

const trending = ['Shwedagon Pagoda', 'Mohinga', 'Inle Lake', 'Bagan Temples'];

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = query.length > 1 ? [
    ...shops.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).map(s => ({ ...s, resultType: 'shop' })),
    ...places.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).map(p => ({ ...p, resultType: 'place' })),
  ].slice(0, 6) : [];

  const handleSelect = (item) => {
    if (item.resultType === 'shop') navigate(`/shops/${item.id}`);
    else navigate(`/places/${item.id}`);
    setQuery('');
    setFocused(false);
  };

  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') { setFocused(false); setQuery(''); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        animate={{ scale: focused ? 1.02 : 1 }}
        className={`relative flex items-center gap-3 bg-card border border-border rounded-2xl shadow-lg shadow-black/5 transition-all ${
          focused ? 'ring-2 ring-primary/30 border-primary/50' : ''
        } ${large ? 'px-6 py-4' : 'px-4 py-3'}`}
      >
        <Search className={`text-muted-foreground ${large ? 'w-6 h-6' : 'w-5 h-5'}`} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search restaurants, hotels, places..."
          className={`flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60 ${
            large ? 'text-lg' : 'text-base'
          }`}
        />
        {query && (
          <button onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50"
          >
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((item, i) => (
                  <motion.button
                    key={`${item.resultType}-${item.id}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {item.resultType === 'shop' ? <Utensils className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {item.city} · {item.resultType === 'shop' ? item.category : item['type']}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">⭐ {item.rating}</div>
                  </motion.button>
                ))}
              </div>
            ) : query.length <= 1 ? (
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {trending.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="px-3 py-1.5 bg-muted rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}