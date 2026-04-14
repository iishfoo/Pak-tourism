import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data
  const destinations = [
    { id: "hunza", name: "Hunza Valley", region: "Gilgit-Baltistan", image: "https://picsum.photos/seed/hunza/800/600", description: "The crown jewel of Pakistan's north." },
    { id: "skardu", name: "Skardu", region: "Gilgit-Baltistan", image: "https://picsum.photos/seed/skardu/800/600", description: "Gateway to the world's highest peaks." },
    { id: "swat", name: "Swat Valley", region: "KPK", image: "https://picsum.photos/seed/swat/800/600", description: "The Switzerland of the East." },
    { id: "murree", name: "Murree", region: "Punjab", image: "https://picsum.photos/seed/murree/800/600", description: "Queen of the Hills." },
  ];

  const packages = [
    { 
      id: "p1", 
      title: "Heavenly Hunza Expedition", 
      destinationId: "hunza", 
      duration: "5 Days", 
      price: 45000, 
      hotel: "Luxury Resort", 
      transport: "4x4 Prado", 
      activities: ["Attabad Lake", "Passu Cones", "Eagle's Nest"],
      rating: 4.8
    },
    { 
      id: "p2", 
      title: "Skardu Adventure Tour", 
      destinationId: "skardu", 
      duration: "7 Days", 
      price: 65000, 
      hotel: "Shangrila Resort", 
      transport: "Coaster/Hiace", 
      activities: ["Deosai Plains", "Lower Kachura Lake", "Cold Desert"],
      rating: 4.9
    },
    { 
      id: "p3", 
      title: "Swat Valley Serenity", 
      destinationId: "swat", 
      duration: "3 Days", 
      price: 25000, 
      hotel: "Standard Hotel", 
      transport: "Saloon Car", 
      activities: ["Malam Jabba", "Kalam Valley", "Mahodand Lake"],
      rating: 4.5
    }
  ];

  // API Routes
  app.get("/api/destinations", (req, res) => {
    res.json(destinations);
  });

  app.get("/api/packages", (req, res) => {
    const { destinationId } = req.query;
    if (destinationId) {
      return res.json(packages.filter(p => p.destinationId === destinationId));
    }
    res.json(packages);
  });

  app.post("/api/bookings", (req, res) => {
    const { packageId, userId, persons, date } = req.body;
    // In a real app, save to DB
    console.log("Booking received:", { packageId, userId, persons, date });
    res.status(201).json({ message: "Booking successful", bookingId: Math.random().toString(36).substr(2, 9) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
