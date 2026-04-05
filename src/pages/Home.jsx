// @ts-nocheck
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Utensils, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ShopCard from '../components/ShopCard';
import PlaceCard from '../components/PlaceCard';
import LiveReviewMarquee from '../components/LiveReviewMarquee';
import shops from '../data/shops.json';
import places from '../data/places.json';
import homeHero from '/home2.webp';


const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function Home() {
  // Logic to filter featured items
  const featuredShops = shops.filter(s => s.featured).slice(0, 3);
  const featuredPlaces = places.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
           src={homeHero}
            alt="Scenic view of Myanmar landscape"
            className="w-full h-full object-cover"
          />
       
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

       
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{ top: `${20 + i * 12}%`, left: `${10 + i * 15}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Discover Myanmar's Best
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white mb-4 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">SarMal</span>
            <span className="text-white/90"> & </span>
            <span className="text-blue-400">TwrMal</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          >
            Your Need, Our Lead
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <SearchBar large />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-white/60 text-sm"
          >
            <span className="flex items-center gap-1.5"><Utensils className="w-4 h-4" /> 50+ Restaurants</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> 30+ Places</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> 4.8 Avg Rating</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-3">Explore Categories</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Find the perfect restaurant or discover amazing places to visit.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Link to="/shops">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800" alt="Food and Dining" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-bold">Food Shops</h3>
                      <p className="text-white/70 text-sm">{shops.length} restaurants & cafés</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>Explore menus and find the best local eats</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link to="/places">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" alt="Hotels and Destinations" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-bold">Places & Hotels</h3>
                      <p className="text-white/70 text-sm">{places.length} destinations to explore</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>Landmarks, temples, and hidden gems</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Featured Shops List */}
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold font-display">Top Restaurants</h3>
                <p className="text-muted-foreground text-sm">Handpicked for the best dining experience</p>
              </div>
              <Link to="/shops" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredShops.map((shop, i) => (
                <ShopCard key={shop.id} shop={shop} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Featured Places List */}
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold font-display">Must-Visit Places</h3>
                <p className="text-muted-foreground text-sm">Unforgettable destinations awaiting you</p>
              </div>
              <Link to="/places" className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlaces.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Reviews Section */}
      <section className="py-16 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <motion.div {...fadeUp} className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-display">Live Reviews</h3>
              <p className="text-muted-foreground text-sm">Real stories from real travelers</p>
            </div>
            <Link to="/reviews" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        <LiveReviewMarquee />
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 sm:p-12 border border-primary/20 shadow-xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get personalized recommendations based on your location and interests.
          </p>
          <Link to="/recommendations">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
            >
              Get Recommendations
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}