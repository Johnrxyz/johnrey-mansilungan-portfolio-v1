import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// V2 imports
import V2Layout from './components/v2/V2Layout';
import V2Hero from './components/v2/V2Hero';
import V2About from './components/v2/V2About';
import V2Videos from './components/v2/V2Videos';
import V2Websites from './components/v2/V2Websites';
import V2Stack from './components/v2/V2Stack';
import V2Testimonials from './components/v2/V2Testimonials';
import V2Contact from './components/v2/V2Contact';
import V2Footer from './components/v2/V2Footer';

function App() {
  return (
    <Router>
      <V2Layout>
        <V2Hero />
        <V2About />
        <V2Videos />
        <V2Websites />
        <V2Stack />
        <V2Testimonials />
        <V2Contact />
        <V2Footer />
      </V2Layout>
    </Router>
  );
}

export default App;

