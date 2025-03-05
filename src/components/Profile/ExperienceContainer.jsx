import React, { useState } from "react";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import LinkedInSyncModal from "./LinkedInSyncModal";
import Button from "../Button";
import "../../styles/Profile/Experience.css";
import openAILogo from "../../assets/images/open_ai_logo.png";

export default function ExperienceContainer() {
  const [educationItems, setEducationItems] = useState([
    {
      id: "1",
      logo: "https://via.placeholder.com/48",
      company: "Open AI",
      title: "Machine Learning Engineer",
      location: "Delhi",
      startDate: "Sep 2023",
      endDate: "Present",
      duration: "6 mon",
    },
  ]);

  const [experienceItems, setExperienceItems] = useState([
    {
      id: "1",
      logo: "https://via.placeholder.com/48",
      company: "Open AI",
      title: "Machine Learning Engineer",
      location: "Delhi",
      startDate: "Sep 2023",
      endDate: "Present",
      duration: "6 mon",
    },
  ]);

  // Education Modal states
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [currentEducationItem, setCurrentEducationItem] = useState(null);

  // Experience Modal states
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [currentExperienceItem, setCurrentExperienceItem] = useState(null);

  // LinkedIn Sync Modal state
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const handleAddEducation = () => {
    setCurrentEducationItem(null);
    setIsEducationModalOpen(true);
  };

  const handleEditEducation = (item) => {
    setCurrentEducationItem(item);
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = (educationData) => {
    if (currentEducationItem) {
      // Edit existing item
      setEducationItems(
        educationItems.map((item) =>
          item.id === educationData.id ? educationData : item
        )
      );
    } else {
      // Add new item
      setEducationItems([...educationItems, educationData]);
    }
  };

  const handleDeleteEducation = (id) => {
    setEducationItems(educationItems.filter((item) => item.id !== id));
  };

  const handleAddExperience = () => {
    setCurrentExperienceItem(null);
    setIsExperienceModalOpen(true);
  };

  const handleEditExperience = (item) => {
    setCurrentExperienceItem(item);
    setIsExperienceModalOpen(true);
  };

  const handleSaveExperience = (experienceData) => {
    if (currentExperienceItem) {
      // Edit existing item
      setExperienceItems(
        experienceItems.map((item) =>
          item.id === experienceData.id ? experienceData : item
        )
      );
    } else {
      // Add new item
      setExperienceItems([...experienceItems, experienceData]);
    }
  };

  const handleDeleteExperience = (id) => {
    setExperienceItems(experienceItems.filter((item) => item.id !== id));
  };

  const handleLinkedInSync = (linkedInUrl) => {
    console.log("LinkedIn URL to sync:", linkedInUrl);
    // Here you would typically make an API call to process the LinkedIn data
  };

  return (
    <div className="experience-container">
      <div className="sync-row">
        <Button
          onClick={() => setIsLinkedInModalOpen(true)}
        >
          Autofill with LinkedIn
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      <div className="experience-content">
        <div className="card-container">
          <h3>Education</h3>
          <div className="experience-list">
            {educationItems.map((item) => (
              <div key={item.id} className="experience-item">
                <div className="experience-logo">
                  <img src={openAILogo} alt={`${item.company} logo`} />
                </div>
                <div className="experience-details">
                  <h3>{item.company}</h3>
                  <p className="experience-title">
                    {item.title} {item.location ? `- ${item.location}` : ""}
                  </p>
                  <p className="experience-date">
                    {item.startDate} - {item.endDate} · {item.duration}
                  </p>
                </div>
                <button
                  className="edit-btn"
                  onClick={() => handleEditEducation(item)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            ))}
            <button className="add-item-btn" onClick={handleAddEducation}>
              <span>+</span> Add
            </button>
          </div>
        </div>

        <div className="card-container">
          <h3>Experience</h3>
          <div className="experience-list">
            {experienceItems.map((item) => (
              <div key={item.id} className="experience-item">
                <div className="experience-logo">
                  <img src={openAILogo} alt={`${item.company} logo`} />
                </div>
                <div className="experience-details">
                  <h3>{item.company}</h3>
                  <p className="experience-title">
                    {item.title} - {item.location}
                  </p>
                  <p className="experience-date">
                    {item.startDate} - {item.endDate} · {item.duration}
                  </p>
                </div>
                <button
                  className="edit-btn"
                  onClick={() => handleEditExperience(item)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            ))}
            <button className="add-item-btn" onClick={handleAddExperience}>
              <span>+</span> Add
            </button>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        onSave={handleSaveEducation}
        onDelete={handleDeleteEducation}
        initialData={currentEducationItem}
      />

      {/* Experience Modal */}
      <ExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        onSave={handleSaveExperience}
        onDelete={handleDeleteExperience}
        initialData={currentExperienceItem}
      />

      {/* LinkedIn Sync Modal */}
      <LinkedInSyncModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        onSync={handleLinkedInSync}
      />
    </div>
  );
}
