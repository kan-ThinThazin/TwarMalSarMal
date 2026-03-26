import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ShopCard from '../components/ShopCard';
import SearchBar from '../components/SearchBar';
import shops from '../data/shops.json';

const categories = ['All', ...new Set(shops.map(s => s.category))];
const budgetLevels = [
  { label: 'All', value: 'all' },
  { label: '$ Budget', value: 'budget' },
  { label: '$$ Mid-Range', value: 'mid' },
  { label: '$$$ Luxury', value: 'luxury' },
];

export default function Shops() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [budget, setBudget] = useState('all');

  const filtered = useMemo(() => {
    return shops.filter(s => {
      const matchQuery = s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === 'All' || s.category === category;
      const matchBudget = budget === 'all' || s.budgetLevel === budget;
      return matchQuery && matchCat && matchBudget;
    });
  }, [query, category, budget]);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
              Food <span className="gradient-text">Shops</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore the best restaurants, cafés, and local eateries
            </p>
          </motion.div>

          <SearchBar />
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
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
            <SlidersHorizontal className="w-4 h-4" />
            <span>Budget:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {budgetLevels.map(b => (
              <button
                key={b.value}
                onClick={() => setBudget(b.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  budget === b.value
                    ? 'bg-accent text-accent-foreground shadow-md'
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

      {/* Results Grid */}
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
              {filtered.map((shop, i) => (
                <ShopCard key={shop.id} shop={shop} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-1">No shops found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}