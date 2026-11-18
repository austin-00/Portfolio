import { motion } from 'framer-motion';
import { Code, Server, Database, Settings } from 'lucide-react';

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const skills = [
    { icon: Code, label: "Frontend", tooltip: "3+ years of experience building React apps" },
    { icon: Server, label: "Backend", tooltip: "REST APIs, Node.js, and Python" },
    { icon: Database, label: "Database", tooltip: "PostgreSQL, MongoDB, and Redis" },
    { icon: Settings, label: "DevOps", tooltip: "Docker, AWS, and CI/CD pipelines" },
  ];

  return (
    <section className="about" id="about">
      <div className="about-wrapper">
        <div className="about-glass-wrapper">
          <div className="about-frame">
            <div className="about-grid">

              {/* COLUMN 1: BIO + STATS */}
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
                    My journey in tech is driven by a simple philosophy:{" "}
                    <strong>build it, test it, fix it, automate it.</strong>
                  </p>
                  <p>
                    Whether it's a small business needing a custom web app, a project struggling with bugs,
                    or a workflow that desperately needs automating, I focus on delivering clean, scalable,
                    and reliable code.
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

              {/* COLUMN 2: TECH STACK with staggered animation */}
              <motion.div
                className="about-skills"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideRight}
              >
                <h3 className="skills-title">TECH STACK</h3>
                <div className="skills-grid">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.label}
                      className="skill-card"
                      data-tooltip={skill.tooltip}
                      custom={i}
                      variants={cardVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <skill.icon size={28} />
                      <span>{skill.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}