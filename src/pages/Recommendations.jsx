import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Utensils, Landmark, ArrowRight, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShopCard from '../components/ShopCard';
import PlaceCard from '../components/PlaceCard';
import cities from '../data/cities.json';
import shops from '../data/shops.json';
import places from '../data/places.json';

const budgetLevels = [
  { label: 'All Budgets', value: 'all' },
  { label: '$ Budget', value: 'budget' },
  { label: '$$ Mid-Range', value: 'mid' },
  { label: '$$$ Luxury', value: 'luxury' },
];

export default function Recommendations() {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [tab, setTab] = useState('food');
  const [budget, setBudget] = useState('all');

  const countries = Object.keys(cities);
  const selectedCountryCities = country ? cities[country]?.cities || [] : [];

  const filteredShops = useMemo(() => {
    return shops.filter(s => {
      const matchCity = s.city === city;
      const matchBudget = budget === 'all' || s.budgetLevel === budget;
      return matchCity && matchBudget;
    });
  }, [city, budget]);

  const filteredPlaces = useMemo(() => {
    return places.filter(p => {
      const matchCity = p.city === city;
      const matchBudget = budget === 'all' || p.budgetLevel === budget;
      return matchCity && matchBudget;
    });
  }, [city, budget]);

  const allMenuItems = useMemo(() => {
    return filteredShops.flatMap(shop =>
      shop.menu.map(item => ({ ...item, shopName: shop.name, shopId: shop.id }))
    ).filter(item => {
      if (budget === 'all') return true;
      if (budget === 'budget') return item.price < 3000;
      if (budget === 'mid') return item.price >= 3000 && item.price <= 12000;
      return item.price > 12000;
    });
  }, [filteredShops, budget]);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
        {/* Animated background dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-primary/5"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold font-display mb-3"
          >
            Get <span className="gradient-text">Recommendations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Choose your destination and discover the best food and places
          </motion.p>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>{s}</div>
                {s < 3 && <div className={`w-12 h-0.5 transition-all ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Country */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" /> Choose Country
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {countries.map((c, i) => (
                  <motion.button
                    key={c}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { setCountry(c); setStep(2); }}
                    className={`p-6 rounded-2xl border text-left transition-all hover:shadow-lg ${
                      country === c ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">{cities[c].flag}</span>
                    <h3 className="text-lg font-bold">{c}</h3>
                    <p className="text-sm text-muted-foreground">{cities[c].cities.length} cities</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Choose City */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Button variant="ghost" onClick={() => setStep(1)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Countries
              </Button>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-accent" /> Choose City in {country} {cities[country]?.flag}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCountryCities.map((c, i) => (
                  <motion.button
                    key={c.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { setCity(c.name); setStep(3); }}
                    className="relative h-48 rounded-2xl overflow-hidden group"
                  >
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <h3 className="text-white text-xl font-bold">{c.name}</h3>
                      <p className="text-white/70 text-sm mt-1">{c.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Button variant="ghost" onClick={() => setStep(2)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Cities
              </Button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">
                  Exploring <span className="gradient-text">{city}</span>
                </h2>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-1.5">
                    {budgetLevels.map(b => (
                      <button
                        key={b.value}
                        onClick={() => setBudget(b.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          budget === b.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setTab('food')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    tab === 'food' ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Utensils className="w-4 h-4" /> Food ({filteredShops.length})
                </button>
                <button
                  onClick={() => setTab('places')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    tab === 'places' ? 'bg-accent text-accent-foreground shadow-lg' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Landmark className="w-4 h-4" /> Visit Places ({filteredPlaces.length})
                </button>
              </div>

              <AnimatePresence mode="wait">
                {tab === 'food' && (
                  <motion.div key="food" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {filteredShops.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                          {filteredShops.map((shop, i) => (
                            <ShopCard key={shop.id} shop={shop} index={i} />
                          ))}
                        </div>

                        {allMenuItems.length > 0 && (
                          <div>
                            <h3 className="text-xl font-bold mb-4">Food Items in {city}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {allMenuItems.map((item, i) => (
                                <motion.div
                                  key={`${item.shopId}-${item.id}`}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl"
                                >
                                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">from {item.shopName}</p>
                                    <p className="text-xs font-semibold text-primary mt-0.5">{item.price.toLocaleString()} {item.currency}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-16">
                        <Utensils className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground">No food shops found in {city} for this budget</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {tab === 'places' && (
                  <motion.div key="places" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {filteredPlaces.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlaces.map((place, i) => (
                          <PlaceCard key={place.id} place={place} index={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground">No places found in {city} for this budget</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}