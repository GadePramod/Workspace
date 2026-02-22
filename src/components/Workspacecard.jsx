import React from 'react';
import { Link } from 'react-router-dom';
import './WorkspaceCard.css';

const WorkspaceCard = ({ workspace }) => {
  return (
    <div className="workspace-card">
      {/* Image Section */}
      <div className="workspace-image-container">
        <img
          src={workspace.image}
          alt={workspace.name}
          className="workspace-image"
        />
        <div className="workspace-badge-container">
          <span className="workspace-badge">
            {workspace.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="workspace-content">
        {/* Header */}
        <div className="workspace-header">
          <h3 className="workspace-title">
            {workspace.name}
          </h3>
          <span className="workspace-price">
            ₹{workspace.pricePerHour}
            <span className="workspace-price-unit">/hr</span>
          </span>
        </div>

        {/* Location */}
        <p className="workspace-location">
          <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {workspace.location}
        </p>

        {/* Amenities */}
        <div className="workspace-amenities">
          {workspace.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <Link
          to={`/workspace/${workspace.id}`}
          className="view-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceCard;