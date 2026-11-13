import { useState } from 'react';
import { Monitor, Smartphone, Settings } from 'lucide-react';

export default function Works() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <section className="works" id="works">
      <div className="works-header">
        <h2 className="section-tagline">MY WORK</h2>
        <h3 className="works-title">What I've built</h3>
        <p className="works-subtitle">Select a category to explore my projects.</p>
      </div>

      <div className="works-grid">
        {/* Web Dev Card */}
        <div className="category-card" onClick={() => setActiveModal('web')}>
          <div className="category-icon"><Monitor size={24} /></div>
          <h4>Web Development</h4>
          <p>Full-stack platforms, SaaS, and interactive web apps.</p>
        </div>

        {/* App Dev Card */}
        <div className="category-card" onClick={() => setActiveModal('app')}>
          <div className="category-icon"><Smartphone size={24} /></div>
          <h4>App Development</h4>
          <p>Mobile and Desktop applications built for scale.</p>
        </div>

        {/* Python Card */}
        <div className="category-card" onClick={() => setActiveModal('python')}>
          <div className="category-icon"><Settings size={24} /></div>
          <h4>Python Automation</h4>
          <p>Bots, web scrapers, and workflow automations.</p>
        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="project-modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            
            {activeModal === 'web' && (
              <>
                <h3>Web Development Projects</h3>
                <div className="project-list">
                  <div className="project-item">
                    <div className="project-info">
                      <h4>DriveLux Automotive Rentals</h4>
                      <p>A car rental website built with React and Django.</p>
                      <div className="project-tags"><span>React</span><span>Django</span><span>PostgreSQL</span></div>
                    </div>
                    <a href="https://austin-00.github.io/DriveLux-Automotive-Rentals/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Project</a>
                  </div>
                  <div className="project-item">
                    <div className="project-info">
                      <h4>Construction Site Website</h4>
                      <p>A responsive website for a construction company, built with HTML, CSS, and JavaScript.</p>
                      <div className="project-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span></div>
                    </div>
                    <a href="https://austin-00.github.io/construction-site/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Project</a>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'python' && (
              <>
                <h3>Python Automation Projects</h3>
                <div className="project-list">
                  <div className="project-item">
                    <div className="project-info">
                      <h4>File Organizer</h4>
                      <p>Automated file management system that categorizes and organizes files based on their types and dates.</p>
                      <div className="project-tags"><span>Python</span><span>os</span><span>shutil</span></div>
                    </div>
                    <a href="https://github.com/austin-00/File-organizer" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Project</a>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'app' && (
              <>
                <h3>App Development Projects</h3>
                <div className="project-list">
                  <div className="project-item">
                    <div className="project-info">
                      <h4>Fitness Tracker</h4>
                      <p>Cross-platform mobile app for logging workouts and tracking progress.</p>
                      <div className="project-tags"><span>Flutter</span><span>Firebase</span></div>
                    </div>
                    <a href="#" className="btn btn-secondary">View Project</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}