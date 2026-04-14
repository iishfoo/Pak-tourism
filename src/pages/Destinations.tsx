import { useEffect, useState } from "react";
import { MapPin, Search, Filter } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Destinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/destinations")
      .then(res => res.json())
      .then(data => setDestinations(data));
  }, []);

  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <div className="mb-12">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Our Locations</h2>
        <h1 className="text-4xl font-bold text-text mb-4">Explore Destinations</h1>
        <p className="text-text-light max-w-2xl">From the snow-capped mountains of the north to the coastal beauty of the south, discover the diverse landscapes of Pakistan.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by city or region..." 
            className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-surface border border-border rounded-xl font-bold text-text-light hover:bg-bg transition-all text-sm uppercase tracking-widest">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
          >
            <div className="relative aspect-video overflow-hidden bg-stone-100">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {dest.region}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-text mb-3">{dest.name}</h3>
              <p className="text-text-light text-sm leading-relaxed mb-6 h-12 overflow-hidden line-clamp-2">{dest.description}</p>
              <Link 
                to={`/package/${dest.id}`} 
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm uppercase tracking-widest"
              >
                View Packages <MapPin className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
