import { FaGithub, FaInstagram, FaYoutube, FaBriefcase } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Let's connect.</h2>
          <p>Building digital solutions, one line of code at a time.</p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/austin-00" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} /> GitHub
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaBriefcase size={20} /> Upwork
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaBriefcase size={20} /> Fiverr
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaBriefcase size={20} /> Freelancer
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} /> Instagram
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={20} /> YouTube
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Alan. All rights reserved.</p>
      </div>
    </footer>
  );
}