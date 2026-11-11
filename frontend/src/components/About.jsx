import { motion } from 'framer-motion';
import { Code, Server, Database, Settings } from 'lucide-react';

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="about" id="about">
      <div className="about-container">
        
        {/* Left Side: Bio */}
        <motion.div 
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="section-tagline">ABOUT ME</h2>
          <h3 className="about-title">Building digital solutions with precision.</h3>
          <div className="about-text">
            <p>
              I'm a software engineer specializing in building exceptional digital experiences.
              My journey in tech is driven by a simple philosophy: <strong>build it, test it, fix it, automate it.</strong>
            </p>
            <p>
              Whether it's a small business needing a custom web app, a project struggling with bugs,
              or a workflow that desperately needs automating, I focus on delivering clean, scalable, and reliable code.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Tech Stack */}
        <motion.div 
          className="about-skills"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="skills-title">TECH STACK</h3>
          <div className="skills-grid">
            <div className="skill-card" data-tooltip="3+ years of experience building React apps">
              <Code size={28} />
              <span>Frontend</span>
            </div>
            <div className="skill-card" data-tooltip="REST APIs, Node.js, and Python">
              <Server size={28} />
              <span>Backend</span>
            </div>
            <div className="skill-card" data-tooltip="PostgreSQL, MongoDB, and Redis">
              <Database size={28} />
              <span>Database</span>
            </div>
            <div className="skill-card" data-tooltip="Docker, AWS, and CI/CD pipelines">
              <Settings size={28} />
              <span>DevOps</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}