import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;