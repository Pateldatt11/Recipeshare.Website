// src/Pages/ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('Please fill all required fields.');
      return;
    }

    console.log('Contact Form Submitted:', formData);

    setStatus('Thank you! Your message has been sent. We will get back to you soon.');
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch</h1>
          <p>
            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          {/* Left - Contact Info + Map */}
          <div className="contact-info">
            <h2>Reach Out To Us</h2>
            
            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <h4>Our Location</h4>
                <p>Shyam Mandir Rd, Anand Park, Althan, Surat, Gujarat 395007</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1667795670714!2d72.7977735750348!3d21.145760080532977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05203d87284f1%3A0xc550f071f2d34a38!2sShyam%20Mandir%20Rd%2C%20Anand%20Park%2C%20Althan%2C%20Surat%2C%20Gujarat%20395007!5e0!3m2!1sen!2sin!4v1771686638764!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RecipeShare Location - Surat"
              ></iframe>
            </div>

            <div className="info-item">
              <span className="icon">📧</span>
              <div>
                <h4>Email Us</h4>
                <p>support@recipeshare.com</p>
                <p>hello@recipeshare.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
                <p>Mon – Fri: 8 AM – 11 PM</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="Twitter/X">🐦</a>
                <a href="#" aria-label="Facebook">👍</a>
                <a href="#" aria-label="YouTube">▶️</a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            
            {status && (
              <div className={`form-status ${status.includes('Thank') ? 'success' : 'error'}`}>
                {status}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Recipe Suggestion, Bug Report"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="btn primary-btn large">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;