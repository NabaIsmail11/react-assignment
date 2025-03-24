import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s',
      ':hover': {
        transform: 'translateY(-5px)'
      },
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img   src={project.image}   alt={project.title} style={{  width: '100%',  height: '100%',  objectFit: 'cover'}}/>
      </div>
      <div style={{ padding: '24px', flexGrow: 1 }}>
        <h3 style={{   marginTop: 0,  marginBottom: '16px',  fontSize: '20px',  color: '#333'}}>  {project.title}</h3>
        <p style={{   color: '#666',  marginBottom: '24px',  lineHeight: '1.5' }}>  {project.description}  </p>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#0366d6',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'background-color 0.3s',
            ':hover': {
              backgroundColor: '#0556b3'
            }
          }}
        >View on GitHub</a>
      </div>
    </div>
  );
};

export default ProjectCard;
