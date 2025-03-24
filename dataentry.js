import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: { textAlign: "center", color: "#333", marginBottom: "30px" },
  formSection: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "15px",
    paddingBottom: "5px",
    borderBottom: "1px solid #ddd",
  },
  inputGroup: { marginBottom: "15px" },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "vertical",
    minHeight: "100px",
  },
  fileInput: {
    marginTop: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginBottom: "10px",
  },
  addButton: { backgroundColor: "#28a745" },
  removeButton: { backgroundColor: "#dc3545" },
  projectCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    position: "relative",
  },
  removeItemButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
  submitButton: {
    display: "block",
    width: "200px",
    margin: "30px auto",
    padding: "15px",
    fontSize: "18px",
  },
  fileName: {
    marginLeft: "10px",
    fontStyle: "italic",
    color: "#666",
  },
};

const DataEntryPage = ({ onSubmit }) => {
 const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    bio: "",
    profilePicture: null,
    skills: "",
    interests: "",
    description: "",
  });

  const [projects, setProjects] = useState([
    { title: "", description: "", image: null, githubLink: "" },
  ]);

  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { name: "", url: "" },
  ]);

  const handleStudentInfoChange = (info) => {
    const { name, value } = info.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleProfilePictureUpload = (pic) => {
    setStudentInfo({ ...studentInfo, profilePicture: pic.target.files[0] });
  };

  const handleProjectChange = (index, proj) => {
    const { name, value } = proj.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

 
  const handleProjectImageUpload = (index, img) => {
    const newProjects = [...projects];
    newProjects[index].image = img.target.files[0];
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", image: null, githubLink: "" },
    ]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const newProjects = [...projects];
      newProjects.splice(index, 1);
      setProjects(newProjects);
    }
  };

  const handleSocialMediaChange = (index, soc) => {
    const { name, value } = soc.target;
    const newSocialMediaLinks = [...socialMediaLinks];
    newSocialMediaLinks[index][name] = value;
    setSocialMediaLinks(newSocialMediaLinks);
  };

  const addSocialMedia = () => {
    setSocialMediaLinks([...socialMediaLinks, { name: "", url: "" }]);
  };
  const removeSocialMedia = (index) => {
    if (socialMediaLinks.length > 1) {
      setSocialMediaLinks(socialMediaLinks.filter((_, i) => i !== index));
    }
  };
  
  const handleSubmit = (sub) => {
    sub.preventDefault();
    const portfolioData = {
      studentInfo: {
        ...studentInfo,
        skills: studentInfo.skills, 
      },
      projects: projects.filter(project => project.title),
      socialMediaLinks: socialMediaLinks.filter(social => social.name && social.url),
    };

   
    const prepareDataWithImages = async () => {
      if (studentInfo.profilePicture instanceof File) {
        portfolioData.studentInfo.profilePicture = await readFileAsDataURL(studentInfo.profilePicture);
      }
      let size=portfolioData.projects.length
      for (let i = 0; i <size ; i++) {
        if (portfolioData.projects[i].image instanceof File) {
          portfolioData.projects[i].image = await readFileAsDataURL(portfolioData.projects[i].image);
        }
      }

      onSubmit(portfolioData);
      navigate("/portfolio");
    };

    prepareDataWithImages();
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Portfolio Data Entry</h1>
      <form onSubmit={handleSubmit}>
        {}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name:</label>
            <input style={styles.input}  type="text" name="name" value={studentInfo.name} onChange={handleStudentInfoChange} required/>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Short Bio:</label>
            <textarea style={styles.textarea} name="bio" value={studentInfo.bio} onChange={handleStudentInfoChange} required/>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Profile Picture:</label>
            <input style={styles.fileInput} type="file" accept="image/*" onChange={handleProfilePictureUpload} />
            {studentInfo.profilePicture && (
              <span style={styles.fileName}>
                {studentInfo.profilePicture.name}
              </span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Skills (comma separated):</label>
            <input style={styles.input} type="text" name="skills" value={studentInfo.skills}  onChange={handleStudentInfoChange} required/>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Interests:</label>
            <input style={styles.input} type="text" name="interests" value={studentInfo.interests} onChange={handleStudentInfoChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Detailed Description:</label>
            <textarea style={styles.textarea} name="description" value={studentInfo.description} onChange={handleStudentInfoChange} required />
          </div>
        </div>

        {}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map((project, index) => (
            <div key={index} style={styles.projectCard}>
              
              <button type="button" style={styles.removeItemButton} onClick={() => removeProject(index)} title="Remove project">×</button>
              
               <div style={styles.inputGroup}>
                <label style={styles.label}>Project Title:</label>
                <input style={styles.input} type="text" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} required={index === 0} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Description:</label>
                <textarea style={styles.textarea} name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} required={index === 0}/>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Project Image:</label>
                <input style={styles.fileInput} type="file" accept="image/*" onChange={(e) => handleProjectImageUpload(index, e)}/>
                {project.image && (
                  <span style={styles.fileName}>
                    {project.image.name}
                  </span>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>GitHub Link:</label>
                <input style={styles.input} type="url" name="githubLink" value={project.githubLink} onChange={(e) => handleProjectChange(index, e)} required={index === 0}/>
          </div>
        </div>
      ))}
      <button type="button" style={{ ...styles.button, ...styles.addButton }} onClick={addProject}>Add Project</button>
    </div>
    <div style={styles.formSection}>
      <h2 style={styles.sectionTitle}>Social Media Links</h2>
      {socialMediaLinks.map((social, index) => (
        <div key={index} style={styles.projectCard}>
          <button type="button" style={styles.removeItemButton}  onClick={() => removeSocialMedia(index)}  title="Remove social link">  ×  </button>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Platform Name:</label>
            <input  style={styles.input}  type="text"  name="name" value={social.name}  onChange={(e) => handleSocialMediaChange(index, e)}  required={index === 0}  />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Profile URL:</label>
            <input  style={styles.input}  type="url" name="url"  value={social.url}  onChange={(e) => handleSocialMediaChange(index, e)}  required={index === 0}  />
          </div>
        </div>
      ))}
      <button  type="button"  style={{ ...styles.button, ...styles.addButton }}  onClick={addSocialMedia}>  Add Social Media  </button>
    </div>

   
    <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>  Generate Portfolio  </button>
  </form>
</div>
  );
};

export default DataEntryPage;
