// src/App.tsx
import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Routes, Route } from "react-router-dom"; // 1. Import Routes and Route

// 2. Import all your page components
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { ContactPage } from "./pages/ContactPage";
import { AcademicsPage } from "./pages/AcademicsPage";

function App() {
  return (
    <Box>
      <Navbar />
      {/* 3. Define the routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
