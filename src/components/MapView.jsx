// @ts-nocheck
import { motion } from 'framer-motion';
import { ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapView({ lat, lng, name, address, className = '' }) {
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl overflow-hidden border border-border ${className}`}
    >
      <div className="relative h-64 bg-muted">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${name}`}
        />
      </div>
      <div className="p-4 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{address}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs"
            onClick={() => window.open(googleMapsUrl, '_blank')}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1" /> View Map
          </Button>
          <Button
            size="sm"
            className="rounded-full text-xs"
            onClick={() => window.open(directionsUrl, '_blank')}
          >
            <Navigation className="w-3.5 h-3.5 mr-1" /> Directions
          </Button>
        </div>
      </div>
    </motion.div>
  );
}