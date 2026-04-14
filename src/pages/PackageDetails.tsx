import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Users, Star, CheckCircle2, MapPin, Hotel, Car } from "lucide-react";
import { motion } from "motion/react";

export default function PackageDetails() {
  const { id } = useParams();
  const [packages, setPackages] = useState<any[]>([]);
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/packages?destinationId=${id}`)
      .then(res => res.json())
      .then(data => setPackages(data));

    fetch("/api/destinations")
      .then(res => res.json())
      .then(data => setDestination(data.find((d: any) => d.id === id)));
  }, [id]);

  if (!destination) return null;

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <div className="mb-12">
        <Link to="/destinations" className="text-primary font-bold text-xs uppercase tracking-widest mb-4 inline-block hover:underline">← Back to Destinations</Link>
        <h1 className="text-4xl font-bold text-text mb-2">Tour Packages for {destination.name}</h1>
        <p className="text-text-light">Choose the perfect itinerary for your adventure in {destination.region}.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all flex flex-col lg:flex-row"
          >
            <div className="lg:w-1/3 relative bg-stone-100">
              <img 
                src={destination.image} 
                alt={pkg.title} 
                className="w-full h-full object-cover min-h-[300px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg text-sm">
                PKR {pkg.price.toLocaleString()}
              </div>
            </div>

            <div className="p-10 lg:w-2/3 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-text mb-2">{pkg.title}</h2>
                  <div className="flex items-center gap-4 text-xs text-text-light font-medium uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pkg.duration}</span>
                    <span className="flex items-center gap-1 text-accent font-bold"><Star className="w-4 h-4 fill-current" /> {pkg.rating}</span>
                  </div>
                </div>
                <Link 
                  to={`/book/${pkg.id}`}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/10 text-sm uppercase tracking-widest"
                >
                  Book Now
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-text uppercase text-[10px] tracking-[0.2em] border-b border-border pb-2">What's Included</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-text-light">
                      <Hotel className="w-4 h-4 text-primary" /> {pkg.hotel}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-light">
                      <Car className="w-4 h-4 text-primary" /> {pkg.transport}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-text uppercase text-[10px] tracking-[0.2em] border-b border-border pb-2">Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {pkg.activities.map((act: string) => (
                      <span key={act} className="bg-bg text-text-light border border-border px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border flex items-center gap-6 text-[10px] uppercase tracking-widest text-text-light font-bold">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary" /> Verified Vendor</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary" /> Free Cancellation</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary" /> 24/7 Support</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
