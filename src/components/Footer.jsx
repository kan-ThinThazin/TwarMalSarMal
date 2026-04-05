import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react'; 

export default function Footer() {
  // Safe Icon Picker helper
  const Icon = ({ name, ...props }) => {
    const LucideIcon = Icons[name];
    if (!LucideIcon) return null; 
    return <LucideIcon {...props} />;
  };

  return (
    <footer className="relative border-t border-slate-200 bg-white overflow-hidden">
     
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
            
                <img 
                  src="/TMSM-t.png" 
                  alt="Logo" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
           
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 leading-none">
                  <span className="gradient-text">SarMal</span>
                  <span className="text-foreground">&</span>
                  <span className="text-accent">TwrMal</span>
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Your Need,Our Lead</span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Discover the best of Myanmar. From street food to luxury escapes.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase text-slate-900 mb-6">Explore</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/shops" className="text-sm text-slate-600 hover:text-blue-600 flex items-center gap-2">
                <Icon name="Utensils" className="w-4 h-4" /> Food Shops
              </Link>
              <Link to="/places" className="text-sm text-slate-600 hover:text-blue-600 flex items-center gap-2">
                <Icon name="MapPin" className="w-4 h-4" /> Hotels
              </Link>
            </nav>
          </div>

          {/* Cities */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase text-slate-900 mb-6">Cities</h4>
            <div className="flex flex-wrap gap-2">
              {['Yangon', 'Mandalay', 'Bagan'].map(city => (
                <span key={city} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase text-slate-900 mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Icon name="Mail" className="w-4 h-4 text-blue-500" />
                <span>Genius@smtm.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Phone" className="w-4 h-4 text-blue-500" />
                <span>+95 9 123 456</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <p>© 2026 SarMal & TwrMal</p>
          <div className="flex items-center gap-1">
            Made with <Icon name="Heart" className="w-3 h-3 text-red-500 fill-red-500" /> in Myanmar
          </div>
        </div>
      </div>
    </footer>
  );
}