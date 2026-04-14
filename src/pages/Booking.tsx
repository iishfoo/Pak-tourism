import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Users, CreditCard, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Booking() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    persons: 1,
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => setPkg(data.find((p: any) => p.id === packageId)));
  }, [packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, packageId }),
    });
    if (res.ok) {
      setStep(3);
    }
  };

  if (!pkg) return null;

  const totalPrice = pkg.price * formData.persons;

  return (
    <div className="max-w-4xl mx-auto px-10 py-12">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 max-w-md mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all text-xs ${
              step >= s ? "bg-primary text-white" : "bg-border text-text-light"
            }`}>
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 3 && <div className={`w-20 h-0.5 mx-2 rounded ${step > s ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Form Side */}
          <div className="md:col-span-3 p-10 lg:p-14">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-3xl font-bold text-text mb-8">Booking Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-light mb-2">Travel Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                        <input 
                          type="date" 
                          className="w-full pl-12 pr-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-light mb-2">Number of Persons</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                        <select 
                          className="w-full pl-12 pr-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all appearance-none text-sm"
                          value={formData.persons}
                          onChange={(e) => setFormData({...formData, persons: parseInt(e.target.value)})}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Persons'}</option>)}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!formData.date}
                      className="w-full bg-primary text-white py-5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-text mb-8">Contact Information</h2>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full px-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full px-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-bg text-text-light py-5 rounded-xl font-bold hover:bg-border transition-all uppercase tracking-widest text-xs"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-primary text-white py-5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 uppercase tracking-widest text-sm"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-bold text-text mb-4">Booking Confirmed!</h2>
                  <p className="text-text-light mb-10">Your adventure to {pkg.title} is ready. We've sent a confirmation email with all the details.</p>
                  <button 
                    onClick={() => navigate("/")}
                    className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all uppercase tracking-widest text-sm"
                  >
                    Back to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Side */}
          <div className="md:col-span-2 bg-bg p-10 lg:p-14 border-l border-border">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-light mb-8">Order Summary</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-stone-200">
                  <img src="https://picsum.photos/seed/tour/200/200" alt="Tour" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-text leading-tight text-sm">{pkg.title}</h4>
                  <p className="text-[10px] text-text-light mt-1 uppercase tracking-widest">{pkg.duration}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between text-xs">
                  <span className="text-text-light">Price per person</span>
                  <span className="font-bold text-text">PKR {pkg.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-light">Persons</span>
                  <span className="font-bold text-text">x {formData.persons}</span>
                </div>
                <div className="flex justify-between text-base pt-4 border-t border-border">
                  <span className="font-bold text-text">Total</span>
                  <span className="font-black text-primary">PKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-10">
                <div className="flex items-center gap-2 text-[10px] text-text-light mb-4 uppercase tracking-widest font-bold">
                  <CreditCard className="w-3 h-3" /> Secure Payment
                </div>
                <div className="bg-surface p-4 rounded-xl border border-border">
                  <p className="text-[10px] text-text-light leading-relaxed">
                    By confirming, you agree to our terms of service and cancellation policy. A 20% deposit is required to secure your booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
