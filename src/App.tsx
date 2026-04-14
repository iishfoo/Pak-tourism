/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import AITripPlanner from "./pages/AITripPlanner";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/book/:packageId" element={<Booking />} />
          <Route path="/ai-planner" element={<AITripPlanner />} />
        </Routes>
      </Layout>
    </Router>
  );
}
