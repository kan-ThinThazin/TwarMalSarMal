import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Phone, Heart, ShoppingBag, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RatingStars from '../components/RatingStars';
import MapView from '../components/MapView';
import BookingModal from '../components/BookingModal';
import shops from '../data/shops.json';
import reviews from '../data/reviews.json';

export default function ShopDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/');
  const id = parseInt(pathParts[pathParts.length - 1]);
  const shop = shops.find(s => s.id === id);
  const navigate = useNavigate();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);

  if (!shop) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <p className="text-muted-foreground">Shop not found</p>
    </div>
  );

  const shopReviews = reviews.filter(r => r.type === 'shop' && r.relatedId === shop.id);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src={shop.coverImage}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur text-white hover:bg-white/30 rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className={`backdrop-blur rounded-full ${liked ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`} onClick={() => setLiked(!liked)}>
              <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className={`backdrop-blur rounded-full ${saved ? 'bg-primary/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`} onClick={() => setSaved(!saved)}>
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-white' : ''}`} />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {shop.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-display">{shop.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {shop.rating} ({shop.reviews} reviews)</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {shop.city}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {shop.openHours}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-bold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{shop.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {shop.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </motion.section>

            {/* Recommended */}
            {shop.recommendedFood?.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" /> Recommended
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {shop.recommendedFood.map((food, i) => (
                    <div key={i} className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                      <p className="font-semibold text-sm">{food.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{food.reason}</p>
                      <p className="text-xs text-primary mt-1">from {shop.name}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Menu */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <div className="space-y-3">
                {shop.menu.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        {item.popular && <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full">Popular</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{item.price.toLocaleString()} <span className="text-xs text-muted-foreground">{item.currency}</span></p>
                      <Button size="sm" variant="outline" className="mt-1 h-7 text-xs rounded-full">
                        <ShoppingBag className="w-3 h-3 mr-1" /> Order
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="mb-4 p-4 bg-muted rounded-xl">
                <p className="text-sm font-medium mb-2">Rate this restaurant</p>
                <RatingStars rating={userRating} size="lg" interactive onRate={setUserRating} />
              </div>
              {shopReviews.length > 0 ? (
                <div className="space-y-3">
                  {shopReviews.map(review => (
                    <div key={review.id} className="p-4 bg-card border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{review.user}</p>
                          <RatingStars rating={review.rating} />
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{review.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
              )}
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24 space-y-6">
              <div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
                <h3 className="font-bold mb-4">Book a Table</h3>
                <Button className="w-full rounded-xl" size="lg" onClick={() => setBookingOpen(true)}>
                  Reserve Now
                </Button>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" /> {shop.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {shop.address}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" /> {shop.openHours}
                  </div>
                </div>
              </div>

              <MapView lat={shop.lat} lng={shop.lng} name={shop.name} address={shop.address} />
            </motion.div>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} item={shop} type="shop" />
    </div>
  );
}