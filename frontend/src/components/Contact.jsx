import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch("https://portfolio-production-a709.up.railway.app/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFeedback(data.message || "Message sent successfully!");
        setFormData({ name: '', email: '', message: '', website: '' });
      } else {
        setStatus('error');
        setFeedback(data.error || "Failed to send message.");
      }
    } catch (err) {
      setStatus('error');
      setFeedback("Unable to connect to server.");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        
        <motion.div 
          className="contact-intro"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Get In Touch</h2>
          <p>Have a project in mind or want to discuss potential opportunities? Feel free to reach out!</p>
        </motion.div>

        <motion.div 
          className="contact-form"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            {/* Honeypot for bots */}
            <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
            
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && <p style={{ color: '#10b981', marginTop: '10px' }}>{feedback}</p>}
            {status === 'error' && <p style={{ color: '#ef4444', marginTop: '10px' }}>{feedback}</p>}
          </form>
        </motion.div>

      </div>
    </section>
  );
}