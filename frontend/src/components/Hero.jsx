import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Code2, Smartphone, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['web', 'app', 'automate', 'test'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // The 3D flip animation variants
  const cardVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 200, damping: 20 }
    },
    exit: (direction) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6 }
    })
  };

  return (
    <section className="hero" id="home">
      {/* Left Column */}
      <div className="hero-content">
        <div className="hero-image-wrapper">
          <div className="hero-image">
            <img src={`${import.meta.env.BASE_URL}profile.png`} alt="Alan's Profile" />
          </div>
          <div className="status-badge">
            <span className="status-pulse"></span>
            Available for work
          </div>
        </div>

        <div className="intro">
          <p className="tagline">SOFTWARE ENGINEER</p>
          <h1>I build. I fix. <br /><span className="gradient-text">I automate.</span></h1>
          <p className="description">
            I help small businesses and individuals build, fix, and automate practical web and software
            solutions using modern programming and development technologies.
          </p>
        </div>

        <div className="focus-tags">
          <span>Full-Stack Dev</span>
          <span>Python Automation</span>
          <span>UI/UX Design</span>
        </div>

        <div className="cta">
          <a href="#contact" className="btn btn-primary">
            <Send size={18} style={{ marginRight: '8px' }} />
            Start a Project
          </a>
          <a href="#works" className="btn btn-secondary">View My Work</a>
        </div>
      </div>

      {/* Right Column: 3D Service Cards */}
      <div className="hero-visual" style={{ perspective: '1200px' }}>
        
        <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="workflow" style={{ position: 'relative', width: '100%', maxWidth: '380px', height: '380px', transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="popLayout">
            
            {/* CARD 1: WEB */}
            {activeStep === 0 && (
              <motion.div 
                key="web" 
                variants={cardVariants} initial="enter" animate="center" exit="exit" custom={1} 
                className="workflow-step active" 
                style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
              >
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <Code2 size={48} color="var(--accent)" />
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Web Development</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Modern, fast, and responsive websites and web applications built for scale.
                </p>
              </motion.div>
            )}

            {/* CARD 2: APP */}
            {activeStep === 1 && (
              <motion.div 
                key="app" 
                variants={cardVariants} initial="enter" animate="center" exit="exit" custom={1} 
                className="workflow-step active" 
                style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
              >
                <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                  <Smartphone size={48} color="var(--accent-light)" />
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--text-primary)' }}>App Development</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Cross-platform mobile and desktop applications with native-like performance.
                </p>
              </motion.div>
            )}

            {/* CARD 3: AUTOMATE */}
            {activeStep === 2 && (
              <motion.div 
                key="automate" 
                variants={cardVariants} initial="enter" animate="center" exit="exit" custom={1} 
                className="workflow-step active" 
                style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
              >
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <Zap size={48} color="var(--accent)" />
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Automation</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Python scripts and bots that save you time by handling repetitive tasks.
                </p>
              </motion.div>
            )}

            {/* CARD 4: BUG FIXING & TESTING */}
            {activeStep === 3 && (
              <motion.div 
                key="test" 
                variants={cardVariants} initial="enter" animate="center" exit="exit" custom={1} 
                className="workflow-step active" 
                style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
              >
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <ShieldCheck size={48} color="#ef4444" />
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Bug Fixing & QA</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Finding, fixing, and testing to ensure your code is robust and bug-free.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}