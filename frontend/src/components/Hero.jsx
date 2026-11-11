import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Layout, Server, Database, Settings, Zap, CheckCircle, AlertCircle } from 'lucide-react';

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['build', 'test', 'fix', 'automate'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants for the cards
  const cardVariants = {
    initial: { opacity: 0, scale: 0.8, rotateY: -30, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.8, rotateY: 30, filter: 'blur(10px)', transition: { duration: 0.5 } }
  };

  return (
    <section className="hero" id="home">
      {/* Left Column: Content */}
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

      {/* Right Column: Workflow Visual */}
      <div className="hero-visual">
        <div className="workflow" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div key="build" variants={cardVariants} initial="initial" animate="animate" exit="exit" className="workflow-step active" style={{ position: 'absolute', width: '100%' }}>
                <h2>BUILD</h2>
                <div className="build-node"><div className="node-header"><Layout size={14} /> <span>IDEA</span></div><span className="status-dot active"></span></div>
                <div className="connector-line"></div>
                <div className="build-node"><div className="node-header"><Layout size={14} /> <span>UI</span></div></div>
                <div className="connector-line"></div>
                <div className="build-node"><div className="node-header"><Server size={14} /> <span>API</span></div></div>
                <div className="connector-line"></div>
                <div className="build-node"><div className="node-header"><Database size={14} /> <span>DATABASE</span></div></div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div key="test" variants={cardVariants} initial="initial" animate="animate" exit="exit" className="workflow-step active" style={{ position: 'absolute', width: '100%' }}>
                <h2>TEST</h2>
                <div className="test-item"><div className="node-header"><CheckCircle size={14} /> <span>UNIT TESTS</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
                <div className="test-item"><div className="node-header"><CheckCircle size={14} /> <span>INTEGRATION</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
                <div className="test-item"><div className="node-header"><CheckCircle size={14} /> <span>VALIDATION</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div key="fix" variants={cardVariants} initial="initial" animate="animate" exit="exit" className="workflow-step active" style={{ position: 'absolute', width: '100%' }}>
                <h2>FIX</h2>
                <div className="fix-item fix-bug"><div className="node-header"><AlertCircle size={14} /> <span>BUG DETECTED</span></div><span className="pulse-alert"></span></div>
                <div className="connector-line"></div>
                <div className="fix-item fix-debug"><div className="node-header"><Settings size={14} /> <span>DEBUGGING...</span></div></div>
                <div className="connector-line"></div>
                <div className="fix-item fix-done"><div className="node-header"><CheckCircle size={14} /> <span>FIX APPLIED</span></div></div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div key="automate" variants={cardVariants} initial="initial" animate="animate" exit="exit" className="workflow-step active" style={{ position: 'absolute', width: '100%' }}>
                <h2>AUTOMATE</h2>
                <div className="automate-item"><div className="node-header"><Zap size={14} /> <span>TRIGGER</span></div><span className="zap-icon">⚡</span></div>
                <div className="connector-line"></div>
                <div className="automate-item"><div className="node-header"><Settings size={14} /> <span>PROCESS</span></div><div className="spinner-mini"></div></div>
                <div className="connector-line"></div>
                <div className="automate-item success-item"><div className="node-header"><CheckCircle size={14} /> <span>DONE</span></div></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}