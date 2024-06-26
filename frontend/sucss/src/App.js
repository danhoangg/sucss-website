import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:year/:path" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
