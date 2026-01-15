import React, { forwardRef } from 'react';
import { projectData } from './ProjectData';
import './ProjectCard.css';
import {images} from './../../constants'

const ProjectCard = forwardRef(({ activeIndex, onScroll }, ref) => {
  // Log the current active index from the parent

  return (
    <div className="project-slider-container">
      <div className="project-grid" ref={ref} onScroll={onScroll}>
        {projectData.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={project.id || index} className="project-card">
              <div className="card-image-container">
                <img src={project.image} alt={project.title} className="card-img" />
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-socials">
                    <div className="social-box"><img src={images.globe} alt="" srcset="" /></div>
                    <div className="social-box"><img src={images.twitter} alt="" srcset="" /></div>
                  </div>
                </div>
                <p className="card-description">{project.description}</p>
                <div className="card-separator"></div>
                <div className="card-tags-frame">
                  {project.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="tag-box">
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
                
                {/* Applying classes based on isActive. 
                  Check the console to see if 'active-cta' is being applied 
                */}
                <a 
                  href={project.link} 
                  className={`card-cta ${isActive ? 'active-cta' : 'inactive-cta'}`}
                >
                  {project.cta}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ProjectCard;