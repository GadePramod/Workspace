import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-grid">
          
          {/* Left Column - Contact Info */}
          <div className="contact-info-section">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-description">
              Have questions about our workspaces or hosting your own? Our team is here to help you find the right solution for your professional needs.
            </p>

            {/* Contact Items */}
            <div className="contact-items">
              
              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4 className="contact-item-title">Email Us</h4>
                  <p className="contact-item-text">pramodgade0202@gmail.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4 className="contact-item-title">Headquarters</h4>
                  <p className="contact-item-text"> Wipro- circle , Hyderabad, 500032</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-section">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon-container">
                  <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-text">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                
                {/* Name and Email Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-input form-select" required>
                    <option>General Inquiry</option>
                    <option>Corporate Booking</option>
                    <option>Support Issue</option>
                    <option>Partnership</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Tell us more..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;