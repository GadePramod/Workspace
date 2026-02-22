import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        
        {/* Header Section */}
        <div className="about-header">
          <h1 className="about-title">Empowering the Modern Workforce</h1>
          <p className="about-subtitle">
            At Working Space, we believe productivity is fueled by the environment you choose. 
            Our mission is to provide flexible, high-end workspaces across India's top tech hubs.
          </p>
        </div>

        {/* Vision Section */}
        <div className="vision-section">
          <div className="vision-content">
            <h2 className="vision-title">Our Vision</h2>
            <p className="vision-text">
              Founded in 2024, Working Space started with a simple idea: why should professionals be limited to rigid office leases or distracting coffee shops?
            </p>
            <p className="vision-text">
              We bridge the gap by offering hourly bookings for premium desks, conference rooms, and private suites. Whether you're a freelancer, a startup, or an enterprise team, we have the perfect spot for you.
            </p>
          </div>
          <div className="vision-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
              alt="Our workspace culture"
              className="vision-image"
            />
          </div>
        </div>

        {/* Quick Facts Section */}
        <div className="quick-facts-section">
          <h2 className="facts-title">Quick Facts</h2>
          <div className="facts-grid">
            <div className="fact-item">
              <div className="fact-number">10+</div>
              <div className="fact-label">Locations</div>
            </div>
            <div className="fact-item">
              <div className="fact-number">10k+</div>
              <div className="fact-label">Active Users</div>
            </div>
            <div className="fact-item">
              <div className="fact-number">98%</div>
              <div className="fact-label">Satisfaction</div>
            </div>
            <div className="fact-item">
              <div className="fact-number">24/7</div>
              <div className="fact-label">Support</div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="values-section">
          <h2 className="values-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3 className="value-heading">Flexibility First</h3>
              <p className="value-description">
                No long-term commitments. Book by the hour, day, or month — whatever works for your schedule.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3 className="value-heading">Premium Quality</h3>
              <p className="value-description">
                Every workspace is equipped with high-speed WiFi, ergonomic furniture, and modern amenities.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="value-heading">Community Driven</h3>
              <p className="value-description">
                Connect with like-minded professionals through networking events and collaborative spaces.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3 className="value-heading">Sustainability</h3>
              <p className="value-description">
                Eco-friendly practices with energy-efficient buildings and paperless operations.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="offerings-section">
          <div className="offerings-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
              alt="Modern workspace"
              className="offerings-image"
            />
          </div>
          <div className="offerings-content">
            <h2 className="offerings-title">What We Offer</h2>
            <ul className="offerings-list">
              <li className="offering-item">
                <span className="offering-icon">💼</span>
                <div className="offering-details">
                  <h4>Hot Desks</h4>
                  <p>Flexible seating in open collaborative areas</p>
                </div>
              </li>
              <li className="offering-item">
                <span className="offering-icon">🚪</span>
                <div className="offering-details">
                  <h4>Private Cabins</h4>
                  <p>Dedicated offices for focused work and privacy</p>
                </div>
              </li>
              <li className="offering-item">
                <span className="offering-icon">📊</span>
                <div className="offering-details">
                  <h4>Conference Rooms</h4>
                  <p>Fully equipped meeting spaces with AV technology</p>
                </div>
              </li>
              <li className="offering-item">
                <span className="offering-icon">☕</span>
                <div className="offering-details">
                  <h4>Lounge & Café</h4>
                  <p>Relaxation zones with complimentary refreshments</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2 className="testimonials-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Working Space transformed how our startup operates. The flexibility to scale up or down based on our team size is invaluable."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RS</div>
                <div className="author-info">
                  <h4>Rahul Sharma</h4>
                  <p>Founder, TechStartup Inc.</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "As a freelancer, I needed a professional environment for client meetings. Working Space delivers exactly that with their premium facilities."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PM</div>
                <div className="author-info">
                  <h4>Priya Menon</h4>
                  <p>Independent Consultant</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The community here is amazing. I've found collaborators and even investors through the networking events they organize."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AK</div>
                <div className="author-info">
                  <h4>Amit Kumar</h4>
                  <p>Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
     

      </div>
    </div>
  );
};

export default AboutUs;