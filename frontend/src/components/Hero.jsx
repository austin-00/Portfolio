import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2, Smartphone, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { id: 'web', title: 'Web Development', desc: 'Modern, fast, and responsive websites and web apps built for scale.', icon: <Code2 size={24} /> },
    { id: 'app', title: 'App Development', desc: 'Cross-platform mobile and desktop apps with native-like performance.', icon: <Smartphone size={24} /> },
    { id: 'auto', title: 'Automation', desc: 'Python scripts and bots that save you time handling repetitive tasks.', icon: <Zap size={24} /> },
    { id: 'test', title: 'Bug Fixing & QA', desc: 'Finding, fixing, and testing to ensure your code is robust and bug-free.', icon: <ShieldCheck size={24} /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [steps.length]);

  const cardVariants = {
    enter: { rotateY: 90, opacity: 0 },
    center: { rotateY: 0, opacity: 1, transition: { duration: 0.6, type: "spring", stiffness: 200, damping: 20 } },
    exit: { rotateY: -90, opacity: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="hero-wrapper">
      <div className="hero-frame">
        
        {/* NAVIGATION */}
        <nav className="hero-nav">
          <div className="nav-left">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="nav-logo" />
            <div className="nav-availability">
              <span className="dot-green"></span>
              Available for New Project
            </div>
          </div>
          
          <ul className="nav-menu">
            <li><a href="#works">Work <span>[ 40 ]</span></a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <a href="#contact" className="btn-talk">
            Let's Talk <ArrowUpRight size={16} />
          </a>
        </nav>

        {/* NEW WRAPPER FOR MOBILE SIDE-BY-SIDE LAYOUT */}
        <div className="hero-mobile-row">
          
          {/* CENTRAL PORTRAIT */}
          <motion.div className="portrait-container" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <img src={`${import.meta.env.BASE_URL}portrait.png`} alt="Alan" className="portrait-image" />
          </motion.div>

          {/* FLOATING TEXT */}
          <motion.div className="hero-text-left" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <h1>Software Engineer</h1>
            <p>Designing digital products that are clear, usable, and conversion-focused. I bridge the gap between design and engineering.</p>
            <a href="#contact" className="btn-collaborate">Let's collaborate <ArrowUpRight size={16} /></a>
          </motion.div>

        </div>

        {/* ANIMATED WORKFLOW CARD */}
        <div className="hero-card-right-wrapper">
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} variants={cardVariants} initial="enter" animate="center" exit="exit" className="hero-card-right">
              <div className="card-icon">{steps[activeStep].icon}</div>
              <h3>{steps[activeStep].title}</h3>
              <p>{steps[activeStep].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}