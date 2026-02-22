import React, { useState } from 'react';
import { WORKSPACES } from '../constants';
import WorkspaceCard from '../components/WorkspaceCard';
import './WorkspaceListing.css';

const WorkspaceListing = () => {
  const [filter, setFilter] = useState('All');

  const types = ['All', 'Desk', 'Meeting Room', 'Private Office'];

  const filteredWorkspaces = filter === 'All' 
    ? WORKSPACES 
    : WORKSPACES.filter(ws => ws.type === filter);

  return (
    <div className="workspace-listing-container">
      <div className="listing-wrapper">
        
        {/* Header */}
        <header className="listing-header">
          <h1 className="listing-title">Available Workspaces</h1>
          <p className="listing-subtitle">Discover spaces that fit your lifestyle and needs.</p>
        </header>

        {/* Filter Bar */}
        <div className="filter-bar">
          <span className="filter-label">Filter:</span>
          <div className="filter-buttons">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`filter-btn ${filter === t ? 'filter-btn-active' : 'filter-btn-inactive'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="workspaces-listing-grid">
          {filteredWorkspaces.length > 0 ? (
            filteredWorkspaces.map(ws => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">No workspaces found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceListing;