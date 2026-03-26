// @ts-nocheck
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Check, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function BookingModal({ open, onClose, item, type = 'shop' }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ date: '', time: '', guests: 1, name: '', phone: '' });

  const handleSubmit = () => {
    setStep(3);
    toast.success('Booking confirmed!');
    setTimeout(() => { onClose(); setStep(1); setForm({ date: '', time: '', guests: 1, name: '', phone: '' }); }, 2000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="relative h-32 overflow-hidden">
            <img src={item?.coverImage || item?.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur rounded-full hover:bg-white/30">
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-3 left-4">
              <h3 className="text-white font-bold text-lg">{item?.name}</h3>
              <p className="text-white/80 text-xs">{type === 'shop' ? 'Table Reservation' : 'Book Now'}</p>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Time</label>
                    <Input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Guests</label>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                        className="px-3 py-2 hover:bg-muted transition-colors text-sm"
                      >−</button>
                      <span className="px-4 py-2 font-semibold text-sm">{form.guests}</span>
                      <button
                        onClick={() => setForm({ ...form, guests: form.guests + 1 })}
                        className="px-3 py-2 hover:bg-muted transition-colors text-sm"
                      >+</button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!form.date || !form.time}
                  className="w-full rounded-xl"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+95 9 xxx xxx xxx" />
                </div>
                <div className="p-3 bg-muted rounded-xl text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{form.date}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{form.time}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span className="font-medium">{form.guests}</span></div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl">Back</Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.phone}
                    className="flex-1 rounded-xl"
                  >
                    <CreditCard className="w-4 h-4 mr-1.5" /> Confirm
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-bold">Booking Confirmed!</h3>
                <p className="text-sm text-muted-foreground mt-1">You'll receive a confirmation soon.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}