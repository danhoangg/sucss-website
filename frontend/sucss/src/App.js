import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import Docs from "./pages/Docs";
import DocPage from "./pages/DocPage";
import AboutPage from "./pages/AboutPage";
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
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/:doc" element={<DocPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
