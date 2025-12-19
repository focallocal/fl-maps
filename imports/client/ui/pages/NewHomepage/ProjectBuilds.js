// @ts-nocheck
import React from 'react';
import i18n from '/imports/both/i18n/en';

const ProjectBuilds = () => {
  const content = i18n.NewHomepage?.project_builds || {};
  const projects = content.projects || [];

  return (
    <section className="project-builds-section">
      <div className="section-header">
        <h2 className="section-title">{content.title || 'Current Project Builds'}</h2>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div 
              className="project-image" 
              style={{ 
                backgroundImage: `url(${project.image || '/images/home-images/placeholder.jpg'})` 
              }}
            />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-actions">
                <a href={project.see_more_url} className="action-btn see-more-btn">See More</a>
                <a href={project.tasks_url} className="action-btn tasks-btn">Tasks</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectBuilds;
