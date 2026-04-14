import { motion } from "motion/react";
import { ArrowRight, MapPin, Star, Shield, Clock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/destinations")
      .then(res => res.json())
      .then(data => setDestinations(data));
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] rounded-[2rem] overflow-hidden flex flex-col justify-end p-16 text-white shadow-2xl"
          style={{ 
            background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), repeating-linear-gradient(45deg, #006633, #004d26 200px)" 
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 leading-tight">
              Discover Northern Pakistan
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed font-light">
              The Ultimate 12-Day Hunza & Skardu Expedition. Experience the majesty of the Karakoram range with our expert guides.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/destinations" 
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-black/20"
              >
                Plan Your Trip <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/ai-planner" 
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold transition-all"
              >
                Try AI Planner
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-4">Explore Pakistan</h2>
            <h3 className="text-3xl font-bold text-text">Active Tour Packages</h3>
          </div>
          <Link to="/destinations" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-[200px] overflow-hidden bg-stone-100 flex items-center justify-center">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-light mb-2">
                  <MapPin className="w-3 h-3 text-primary" /> {dest.region}
                </div>
                <h3 className="text-xl font-bold text-text mb-4">{dest.name}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-xs text-text-light font-medium">Starting from</span>
                  <span className="text-lg font-bold text-primary">PKR 45,000</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Our Commitment</h2>
            <h3 className="text-3xl font-bold text-text">Why Travel With Pak Tourism?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Safe & Secure", desc: "Your safety is our priority. We work with verified vendors and provide 24/7 support." },
              { icon: Clock, title: "Flexible Planning", desc: "Customize your trips or choose from our pre-planned packages with flexible dates." },
              { icon: CreditCard, title: "Best Price Guarantee", desc: "No hidden fees. We offer competitive pricing for luxury and budget travelers." },
            ].map((feature, i) => (
              <div key={i} className="bg-bg p-10 rounded-2xl border border-border text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-border text-primary rounded-xl mb-6 shadow-sm">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text mb-4">{feature.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
