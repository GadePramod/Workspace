import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WORKSPACES } from '../constants';
import './WorkspaceDetails.css';

const WorkspaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workspace = WORKSPACES.find(w => w.id === id);

  // Gallery state
  const [mainImage, setMainImage] = useState(workspace?.image || '');

  // Review states
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [isHoveringRating, setIsHoveringRating] = useState(0);

  useEffect(() => {
    if (workspace) {
      const allReviews = JSON.parse(localStorage.getItem('ws_reviews') || '[]');
      const workspaceReviews = allReviews.filter(r => r.workspaceId === workspace.id);
      setReviews(workspaceReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, [workspace]);

  if (!workspace) {
    return (
      <div className="workspace-not-found">
        <h2 className="not-found-title">Workspace Not Found</h2>
        <Link to="/workspaces" className="not-found-link">Back to listings</Link>
      </div>
    );
  }

  const galleryImages = [
    workspace.image,
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newRating || !newComment.trim() || !newName.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      workspaceId: workspace.id,
      userName: newName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString(),
    };

    const allReviews = JSON.parse(localStorage.getItem('ws_reviews') || '[]');
    const updatedAllReviews = [...allReviews, newReview];
    localStorage.setItem('ws_reviews', JSON.stringify(updatedAllReviews));

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setNewName('');
  };

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="workspace-details-container">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Main Content Grid */}
      <div className="details-grid">
        
        {/* Left: Image Gallery */}
        <div className="gallery-section">
          <div className="main-image-container">
            <img 
              src={mainImage} 
              alt={workspace.name} 
              className="main-image"
            />
            <div className="image-overlay" />
          </div>

          <div className="gallery-thumbnails">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`thumbnail ${mainImage === img ? 'thumbnail-active' : ''}`}
              >
                <img 
                  src={img} 
                  className="thumbnail-image"
                  alt={`Thumbnail ${idx + 1}`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="info-section">
          
          {/* Header */}
          <div className="info-header">
            <div className="header-badges">
              <span className="type-badge">
                {workspace.type}
              </span>
              {averageRating && (
                <div className="rating-badge">
                  <svg className="star-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="rating-value">{averageRating}</span>
                  <span className="review-count">({reviews.length})</span>
                </div>
              )}
            </div>

            <h1 className="workspace-title">
              {workspace.name}
            </h1>

            <p className="location-info">
              <div className="location-icon-box">
                <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="location-text">{workspace.location}</span>
            </p>
          </div>

          {/* Price Box */}
          <div className="price-box">
            <span className="price">₹{workspace.pricePerHour}</span>
            <span className="price-label">/ per hour</span>
          </div>

          {/* Description */}
          <div className="description-section">
            <h3 className="section-title">Description</h3>
            <p className="description-text">
              {workspace.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="amenities-section">
            <h3 className="section-title">What's included</h3>
            <div className="amenities-grid">
              {workspace.amenities.map(amenity => (
                <div key={amenity} className="amenity-item">
                  <div className="amenity-icon-box">
                    <svg className="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="amenity-text">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Button */}
          <div className="booking-button-wrapper">
            <Link 
              to={`/book/${workspace.id}`}
              className="booking-button"
            >
              <span>Check Availability & Book</span>
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-grid">
          
          {/* Reviews List */}
          <div className="reviews-list-container">
            <div className="reviews-header">
              <h2 className="reviews-title">Member Reviews</h2>
              <p className="reviews-subtitle">Real feedback from people who worked here.</p>
            </div>

            {reviews.length === 0 ? (
              <div className="no-reviews">
                <p className="no-reviews-text">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="review-user-info">
                        <div className="user-avatar">
                          {review.userName[0].toUpperCase()}
                        </div>
                        <div>
                          <h4 className="review-user-name">{review.userName}</h4>
                          <p className="review-date">
                            {new Date(review.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                          </p>
                        </div>
                      </div>
                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg
                            key={s}
                            className={`review-star ${s <= review.rating ? 'star-filled' : 'star-empty'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="review-form-container">
            <div className="review-form-card">
              <h3 className="form-title">Rate your stay</h3>
              <form onSubmit={handleReviewSubmit} className="review-form">
                
                {/* Rating Stars */}
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <div className="stars-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setIsHoveringRating(star)}
                        onMouseLeave={() => setIsHoveringRating(0)}
                        onClick={() => setNewRating(star)}
                        className="star-button"
                      >
                        <svg
                          className={`input-star ${
                            star <= (isHoveringRating || newRating)
                              ? 'star-selected'
                              : 'star-unselected'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-input"
                    required
                  />
                </div>

                {/* Comment Input */}
                <div className="form-group">
                  <label className="form-label">Your Feedback</label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="form-textarea"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!newRating || !newComment.trim() || !newName.trim()}
                  className={`submit-review-btn ${
                    !newRating || !newComment.trim() || !newName.trim()
                      ? 'submit-btn-disabled'
                      : 'submit-btn-active'
                  }`}
                >
                  Post Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkspaceDetails;