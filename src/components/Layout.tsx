import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Map, Calendar, Sparkles, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Destinations", path: "/destinations", icon: Map },
    { name: "AI Planner", path: "/ai-planner", icon: Sparkles },
    { name: "My Bookings", path: "/dashboard", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <nav className="sticky top-0 z-50 bg-surface border-b border-border h-[70px] flex items-center">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Compass className="w-8 h-8 text-primary group-hover:rotate-45 transition-transform duration-500" />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tighter text-primary leading-none uppercase">Pak Tourism</span>
                <span className="text-[10px] font-light opacity-60 uppercase tracking-widest">System Architect</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm font-medium text-text-light hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <button className="bg-primary text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-primary-dark transition-all shadow-sm">
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-text-light">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-[70px] left-0 right-0 bg-surface border-b border-border overflow-hidden shadow-xl"
            >
              <div className="px-6 py-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-text-light hover:bg-bg rounded-lg"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
                <button className="w-full mt-4 bg-primary text-white py-4 rounded-lg font-semibold">
                  Login / Signup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>{children}</main>

      <footer className="bg-primary-dark text-white py-10 mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-6 h-6 text-accent" />
                <span className="text-xl font-extrabold uppercase tracking-tighter">Pak Tourism</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/70">
                Discover the hidden gems of Pakistan. From the majestic peaks of the Karakoram to the lush valleys of Swat, we bring you the best travel experiences.
              </p>
            </div>
            <div>
              <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/packages" className="hover:text-white transition-colors">Tour Packages</Link></li>
                <li><Link to="/ai-planner" className="hover:text-white transition-colors">AI Trip Planner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li>info@paktourism.com</li>
                <li>+92 300 1234567</li>
                <li>Islamabad, Pakistan</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
            <div className="flex gap-8">
              <div className="flex items-center gap-2">Total Bookings: <span className="text-accent font-bold">1,284</span></div>
              <div className="flex items-center gap-2">Active Vendors: <span className="text-accent font-bold">42</span></div>
              <div className="flex items-center gap-2">Monthly Revenue: <span className="text-accent font-bold">$142,500</span></div>
            </div>
            <div>© {new Date().getFullYear()} Pak Tourism. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
