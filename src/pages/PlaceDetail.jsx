// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, MapPin, Clock, Phone, Heart, 
  Bookmark, Check, Wifi, Waves, UtensilsCrossed, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import RatingStars from '../components/RatingStars';
import MapView from '../components/MapView';
import BookingModal from '../components/BookingModal';

// Mock data imports
import places from '../data/places.json';
import reviews from '../data/reviews.json';

const amenityIcons = { 
  Pool: Waves, 
  Spa: Sparkles, 
  Restaurant: UtensilsCrossed, 
  WiFi: Wifi 
};

export default function PlaceDetail() {
  const navigate = useNavigate();
  // Use useParams if you are using React Router properly, 
  // otherwise we keep your path splitting logic
  const pathParts = window.location.pathname.split('/');
  const id = parseInt(pathParts[pathParts.length - 1]);
  
  const place = (places || []).find(p => p.id === id);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Safety scroll to top when opening a new place
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!place) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <p className="text-muted-foreground mb-4">Place not found</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );

  const placeReviews = (reviews || []).filter(r => r.type === 'place' && r.relatedId === place.id);
  const isHotel = place.type === 'Hotel';

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src={place.coverImage}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Navigation Buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 rounded-full" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`backdrop-blur-md rounded-full transition-colors ${liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`} 
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`backdrop-blur-md rounded-full transition-colors ${saved ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`} 
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-white' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Place Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase">
            {place.type}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 drop-shadow-md">{place.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 
              {place.rating} ({place.reviews})
            </span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {place.city}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {place.openHours}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section>
              <h2 className="text-xl font-bold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{place.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {place.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Highlights */}
            {place.highlights?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Amenities */}
            {isHotel && place.amenities?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {place.amenities.map((a) => {
                    const Icon = amenityIcons[a] || Check;
                    return (
                      <div key={a} className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium">
                        <Icon className="w-4 h-4 text-primary" />
                        {a}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="mb-6 p-6 bg-card border rounded-2xl">
                <p className="text-sm font-bold mb-3">Rate your experience</p>
                <RatingStars rating={userRating} size="lg" interactive onRate={setUserRating} />
              </div>

              <div className="space-y-4">
                {placeReviews.length > 0 ? (
                  placeReviews.map(review => (
                    <div key={review.id} className="p-4 bg-card border border-border rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover border" />
                        <div className="flex-1">
                          <p className="font-bold text-sm">{review.user}</p>
                          <RatingStars rating={review.rating} />
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No reviews yet. Be the first!</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 bg-card border border-border rounded-2xl shadow-lg">
                <div className="mb-4">
                  {isHotel && place.pricePerNight ? (
                    <p className="text-3xl font-black">{place.pricePerNight} <span className="text-sm text-muted-foreground font-normal">/night</span></p>
                  ) : (
                    <p className="text-2xl font-bold">{place.entryFee || 'Free Entry'}</p>
                  )}
                </div>
                
                <Button className="w-full h-12 rounded-xl text-md font-bold" size="lg" onClick={() => setBookingOpen(true)}>
                  {isHotel ? 'Book a Room' : 'Plan a Visit'}
                </Button>

                <div className="mt-6 space-y-3 pt-6 border-t border-border text-sm font-medium">
                  <div className="flex items-center gap-3 text-muted-foreground"><Phone className="w-4 h-4" /> {place.phone}</div>
                  <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="w-4 h-4" /> {place.address}</div>
                  <div className="flex items-center gap-3 text-muted-foreground"><Clock className="w-4 h-4" /> {place.openHours}</div>
                </div>
              </div>

              {/* Map Preview */}
              <div className="rounded-2xl overflow-hidden border shadow-sm">
                <MapView lat={place.lat} lng={place.lng} name={place.name} address={place.address} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        open={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
        item={place} 
        type="place" 
      />
    </div>
  );
}