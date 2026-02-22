import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WORKSPACES } from '../constants';
import WorkspaceCard from '../components/WorkspaceCard';
import './Home.css';

const CAROUSEL_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    title: 'Find the Perfect Space',
    highlight: 'Where Great Ideas Grow',
    subtitle: 'From private offices to creative hubs, book premium workspaces instantly. Hourly booking, zero commitment.'
  },
  {
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1600',
    title: 'Elite Meeting Rooms',
    highlight: 'Close Every Deal',
    subtitle: 'High-tech boardrooms designed for high-stakes decisions and seamless client presentations.'
  },
  {
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1600',
    title: 'Focused Deep Work',
    highlight: 'Maximize Productivity',
    subtitle: 'Quiet, ergonomic, and tech-ready individual desks for professionals who value focus.'
  }
];

const Home = () => {
  const featured = WORKSPACES.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  const features = [
    { 
      title: 'Instant Booking', 
      desc: 'Browse, select a slot, and book in under a minute.', 
      icon: '⚡' 
    },
    { 
      title: 'Flexible Hours', 
      desc: 'Only pay for the time you need. No monthly contracts.', 
      icon: '⏰' 
    },
    { 
      title: 'Premium Locations', 
      desc: 'Work from the heart of the city in high-end offices.', 
      icon: '🏢' 
    }
  ];

  return (
    <div className="home-container">
      
      {/* Hero Carousel Section */}
      <section className="carousel-section">
        {CAROUSEL_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'carousel-slide-active' : ''}`}
          >
            {/* Background Image */}
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="carousel-image"
            />
            
            {/* Gradient Overlay */}
            <div className="carousel-overlay" />
            
            {/* Content */}
            <div className="carousel-content-wrapper">
              <div className={`carousel-content ${index === currentSlide ? 'carousel-content-active' : ''}`}>
                <h1 className="carousel-title">
                  {slide.title} <br />
                  <span className="carousel-highlight">
                    {slide.highlight}
                  </span>
                </h1>
                <p className="carousel-subtitle">
                  {slide.subtitle}
                </p>
                <div className="carousel-buttons">
                  <Link 
                    to="/workspaces" 
                    className="btn-primary"
                  >
                    Browse Workspaces
                  </Link>
                  <a 
                    href="#features"
                    className="btn-secondary"
                  >
                    How it Works
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls - Prev Button */}
        <button 
          onClick={prevSlide}
          className="carousel-control carousel-control-prev"
          aria-label="Previous slide"
        >
          <svg className="carousel-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carousel Controls - Next Button */}
        <button 
          onClick={nextSlide}
          className="carousel-control carousel-control-next"
          aria-label="Next slide"
        >
          <svg className="carousel-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {CAROUSEL_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-indicator ${index === currentSlide ? 'carousel-indicator-active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-wrapper">
          <div className="features-header">
            <h2 className="features-title">Why Book With Us?</h2>
            <div className="features-divider"></div>
          </div>
          
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listing */}
      <section className="featured-section">
        <div className="featured-wrapper">
          <div className="featured-header">
            <div>
              <h2 className="featured-title">Featured Workspaces</h2>
              <p className="featured-subtitle">Hand-picked spaces with top-tier amenities.</p>
            </div>
            <Link to="/workspaces" className="see-all-link">
              See All 
              <svg className="see-all-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="featured-grid">
            {featured.map(ws => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background-circle"></div>
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to elevate your working experience?
          </h2>
          <Link 
            to="/workspaces" 
            className="cta-button"
          >
            Find a space now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;