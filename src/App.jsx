import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DesignProvider, useDesign } from './context/DesignContext';

// V1 imports (unchanged)
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Websites from './pages/Websites';

// V2 imports
import V2Layout from './components/v2/V2Layout';
import V2Hero from './components/v2/V2Hero';
import V2About from './components/v2/V2About';
import V2Videos from './components/v2/V2Videos';
import V2Websites from './components/v2/V2Websites';
import V2Stack from './components/v2/V2Stack';
import V2Contact from './components/v2/V2Contact';
import V2Footer from './components/v2/V2Footer';

// Toggle button
import DesignToggle from './components/ui/DesignToggle';

const AppContent = () => {
  const { designVersion } = useDesign();

  if (designVersion === 'v2') {
    return (
      <V2Layout>
        <V2Hero />
        <V2About />
        <V2Videos />
        <V2Websites />
        <V2Stack />
        <V2Contact />
        <V2Footer />
      </V2Layout>
    );
  }

  // V1 — original unchanged layout
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/websites" element={<Websites />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <DesignProvider>
      {/* Always-visible floating toggle */}
      <DesignToggle />

      {/* Conditional layout based on design version */}
      <AppContent />
    </DesignProvider>
  );
}

export default App;

