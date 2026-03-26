import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Building2, Landmark } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import SearchBar from '../components/SearchBar';
import places from '../data/places.json';

const types = ['All', 'Hotel', 'Attraction'];
const budgetLevels = [
  { label: 'All', value: 'all' },
  { label: '$ Budget', value: 'budget' },
  { label: '$$ Mid-Range', value: 'mid' },
  { label: '$$$ Luxury', value: 'luxury' },
];

export default function Places() {
  const [type, setType] = useState('All');
  const [budget, setBudget] = useState('all');

  const filtered = useMemo(() => {
    return places.filter(p => {
      const matchType = type === 'All' || p.type === type;
      const matchBudget = budget === 'all' || p.budgetLevel === budget;
      return matchType && matchBudget;
    });
  }, [type, budget]);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
              Places & <span className="text-accent">Hotels</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover amazing hotels, temples, landmarks, and hidden gems
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" /> Type:
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  type === t
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {t === 'Hotel' && <Building2 className="w-3.5 h-3.5" />}
                {t === 'Attraction' && <Landmark className="w-3.5 h-3.5" />}
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" /> Budget:
          </div>
          <div className="flex flex-wrap gap-2">
            {budgetLevels.map(b => (
              <button
                key={b.value}
                onClick={() => setBudget(b.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  budget === b.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </motion.div>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-1">No places found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}