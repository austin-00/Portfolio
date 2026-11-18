import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const projects = [
    `${import.meta.env.BASE_URL}drivelux.png`,
    `${import.meta.env.BASE_URL}construction.png`,
    `${import.meta.env.BASE_URL}fileorganizer.png`,
    `${import.meta.env.BASE_URL}fitness.png`,
  ];

  return (
    <div className="hero-wrapper">
      <div className="hero-glass-wrapper">
        <div className="hero-frame">
          <div className="hero-grid">

            {/* COLUMN 1: TEXT */}
            <motion.div
              className="hero-text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1>Software Engineer</h1>
              <p>
                Designing digital products that are clear, usable, and
                conversion-focused. I bridge the gap between design and
                engineering.
              </p>
              <a href="#contact" className="btn-collaborate">
                Let's collaborate <ArrowUpRight size={16} />
              </a>
            </motion.div>

            {/* COLUMN 2: PORTRAIT + MOVING SCREENSHOT TRAIN */}
            <div className="portrait-container">
              
              {/* Continuous horizontal scrolling train behind the portrait */}
              <div className="project-train-wrapper">
                <div className="project-train">
                  {[...projects, ...projects].map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Project Screenshot"
                      className="project-train-image"
                    />
                  ))}
                </div>
              </div>

              {/* Portrait image */}
              <div className="portrait-image-wrapper">
                <motion.div
                  className="portrait-motion-wrapper"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}portrait.png`}
                    alt="Alan"
                    className="portrait-image"
                  />
                </motion.div>
              </div>
            </div>

            {/* COLUMN 3: EMPTY SPACER */}
            <div className="hero-right-spacer"></div>

          </div>

          {/* Availability Badge - Bottom Right of Hero Wrapper */}
          <motion.div
            className="hero-status-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="dot-green"></span>
            Available for New Project
          </motion.div>

        </div>
      </div>
    </div>
  );
}