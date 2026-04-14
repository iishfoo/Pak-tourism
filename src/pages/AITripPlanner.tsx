import { useState } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Send, Loader2, MapPin, Calendar, Clock, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AITripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const generateItinerary = async () => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a detailed day-by-day travel itinerary for ${destination} in Pakistan for ${days} days with a ${budget} budget. Include specific places to visit, estimated costs, and travel tips.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    theme: { type: Type.STRING },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING },
                          activity: { type: Type.STRING },
                          location: { type: Type.STRING },
                          cost: { type: Type.STRING }
                        }
                      }
                    }
                  }
                }
              },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });

      if (response.text) {
        setItinerary(JSON.parse(response.text));
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">AI Assistant</h2>
        <h1 className="text-4xl font-bold text-text mb-4">AI Trip Planner</h1>
        <p className="text-text-light max-w-2xl mx-auto">
          Tell us where you want to go in Pakistan, and our AI will craft a personalized itinerary just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Input Side */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold text-text mb-6">Trip Preferences</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-light mb-2">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="e.g. Hunza, Lahore, Swat" 
                    className="w-full pl-12 pr-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-light mb-2">Duration (Days)</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                  <input 
                    type="number" 
                    min="1" 
                    max="14"
                    className="w-full pl-12 pr-4 py-4 bg-bg border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-light mb-2">Budget</label>
                <div className="grid grid-cols-3 gap-2">
                  {["low", "medium", "high"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                        budget === b ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-bg text-text-light border border-border hover:bg-border"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={generateItinerary}
                disabled={loading || !destination}
                className="w-full bg-primary text-white py-5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Plan</>}
              </button>
            </div>
          </div>
        </div>

        {/* Result Side */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!itinerary && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 bg-bg rounded-2xl border-2 border-dashed border-border"
              >
                <Compass className="w-16 h-16 text-border mb-6" />
                <h3 className="text-xl font-bold text-text-light">Your custom itinerary will appear here</h3>
                <p className="text-text-light text-sm mt-2">Fill in your preferences and click generate to start planning.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-text mt-8">Crafting your adventure...</h3>
                <p className="text-text-light text-sm mt-2 italic">Finding the best spots in {destination} for you.</p>
              </motion.div>
            )}

            {itinerary && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-primary text-white p-10 rounded-2xl shadow-xl">
                  <h2 className="text-3xl font-serif mb-4">{itinerary.title}</h2>
                  <p className="text-white/80 text-sm leading-relaxed font-light">{itinerary.summary}</p>
                </div>

                <div className="space-y-6">
                  {itinerary.days.map((day: any) => (
                    <div key={day.day} className="bg-surface p-8 rounded-2xl border border-border shadow-sm">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-bg text-primary rounded-xl flex items-center justify-center font-bold text-xl border border-border">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">Day {day.day}</h4>
                          <h3 className="text-xl font-bold text-text">{day.theme}</h3>
                        </div>
                      </div>
                      <div className="space-y-6 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                        {day.activities.map((act: any, idx: number) => (
                          <div key={idx} className="relative pl-12">
                            <div className="absolute left-5 top-2 w-2 h-2 rounded-full bg-primary ring-4 ring-surface" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-widest">
                                <Clock className="w-3 h-3" /> {act.time}
                              </span>
                              <span className="text-[9px] font-bold text-text-light uppercase tracking-widest bg-bg px-2 py-1 rounded border border-border">
                                {act.cost}
                              </span>
                            </div>
                            <h4 className="font-bold text-text text-sm">{act.activity}</h4>
                            <p className="text-[10px] text-text-light flex items-center gap-1 mt-1 uppercase tracking-widest font-medium">
                              <MapPin className="w-3 h-3" /> {act.location}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary-dark text-white p-10 rounded-2xl">
                  <h3 className="text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-accent">
                    <Compass className="w-4 h-4" /> Pro Travel Tips
                  </h3>
                  <ul className="space-y-4">
                    {itinerary.tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-xs text-white/60 leading-relaxed">
                        <span className="text-accent font-bold">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
