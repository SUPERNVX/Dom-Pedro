import {  } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './App.css';

function App() {
  useSmoothScroll();

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
