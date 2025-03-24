import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProjectCard from './projectcard';

const ProjectsSection = ({ projects = [] }) => {
  const [localProjects, setLocalProjects] = useState([]);

  useEffect(() => {
    setLocalProjects(projects.length > 0 ? projects : [
      {
        id: 'proj-1',
        title: 'Sample Project 1',
        description: 'This is a sample project description',
        image: 'https://via.placeholder.com/300x200?text=Project+1',
        githubLink: 'https://github.com'
      },
      {
        id: 'proj-2',
        title: 'Sample Project 2',
        description: 'Another sample project description',
        image: 'https://via.placeholder.com/300x200?text=Project+2',
        githubLink: 'https://github.com'
      }
    ]);
  }, [projects]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(localProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLocalProjects(items);
  };

  return (
    <section id="projects" style={{  padding: '64px 32px',  backgroundColor: '#f8f9fa',  minHeight: '100vh'}}>
    <h2 style={{   textAlign: 'center',   marginBottom: '48px',  fontSize: '40px',  color: '#333'}}>  My Projects</h2>
  
      
      {localProjects.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No projects to display</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{  display: 'flex',  flexWrap: 'wrap',  justifyContent: 'center',  gap: '32px',  padding: '16px' }}>
                {localProjects.map((project, index) => (
                  <Draggable key={project.id} draggableId={project.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          minWidth: '300px',
                          maxWidth: '350px'
                        }}
                      >
                        <ProjectCard project={project} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </section>
  );
};

export default ProjectsSection;