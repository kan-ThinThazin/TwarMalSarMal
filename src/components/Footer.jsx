import { Link } from 'react-router-dom';
import { Utensils, MapPin, Star, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-display">
                <span className="gradient-text">SarMal</span>&<span className="text-accent">TwarMal</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover the best food, places, and experiences. Your ultimate city guide for every adventure.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <div className="space-y-2">
              <Link to="/shops" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Food Shops
              </Link>
              <Link to="/places" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="w-3.5 h-3.5" /> Places & Hotels
              </Link>
              <Link to="/recommendations" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Star className="w-3.5 h-3.5" /> Recommendations
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Cities</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Yangon</p><p>Mandalay</p><p>Bagan</p><p>Inle Lake</p><p>Ngapali</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Teamgenius@SarMalTwarMal.com</p>
              <p>+95 9 123 456 789</p>
              <p>Yangon, Myanmar</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 SarMal&TwarMal . All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" /> for food lovers</p>
        </div>
      </div>
    </footer>
  );
}