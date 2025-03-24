import React from "react";
import HeroSection from "../components/hero";
import AboutMe from "../components/about";
import ProjectsSection from "../components/project";
import ContactSection from '../components/contact';
import Footer from '../components/footer';
import { ThemeContext } from "../context/themecontext";
const PortfolioPage = ({ data = {} }) => {
  const { 
    studentInfo = {}, 
    projects = [], 
    socialMediaLinks = [] 
  } = data;

  const skills = typeof studentInfo.skills === 'string' 
    ? studentInfo.skills.split(',').map(skill => skill.trim())
    : Array.isArray(studentInfo.skills)
    ? studentInfo.skills
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeroSection 
        studentName={studentInfo.name || 'Your Name'} 
        bio={studentInfo.bio || 'A short bio about yourself'} 
      />
      <AboutMe
        profilePicture={studentInfo.profilePicture || ''}
        skills={skills}
        description={studentInfo.description || 'More about you...'}
      />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer socialLinks={socialMediaLinks} />
    </div>
  );
};

export default PortfolioPage;