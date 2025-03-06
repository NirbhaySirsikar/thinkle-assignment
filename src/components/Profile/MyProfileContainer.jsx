import React, { useState, useEffect } from "react";
import "../../styles/Profile/MyProfile.css";
import profileBanner from "../../assets/images/profile-banner.webp";
import femaleAvatar from "../../assets/images/female-avatar.png";
export default function MyProfileContainer() {
  const [aboutMe, setAboutMe] = useState("");
  const [profileHeader, setProfileHeader] = useState("");
  const [whyICoach, setWhyICoach] = useState("");
  const [languages, setLanguages] = useState([]);
  const [helpTopics, setHelpTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const addTag = (collection, setCollection, text) => {
    if (text.trim()) {
      const newTag = { id: Date.now().toString(), text: text.trim() };
      setCollection([...collection, newTag]);
      return true;
    }
    return false;
  };

  const removeTag = (collection, setCollection, id) => {
    setCollection(collection.filter((tag) => tag.id !== id));
  };

  const handleSaveChanges = () => {
    // Simulate API call
    if (Math.random() > 0.3) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const TagSection = ({ title, tags, onAddTag, onRemoveTag, placeholder }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddTag = () => {
      if (onAddTag(inputValue)) {
        setInputValue("");
      }
    };

    return (
      <div className="profile-section">
        <h3>{title}</h3>
        {tags.length > 0 && (
          <div className="tags-container">
            {tags.map((tag) => (
              <div key={tag.id} className="tag">
                <span>{tag.text}</span>
                <button
                  onClick={() => onRemoveTag(tag.id)}
                  className="tag-remove-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-x"
                  >
                    {" "}
                    <path d="M18 6 6 18" /> <path d="m6 6 12 12" />{" "}
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="add-tag-container">
          <input
            type="text"
            className="text-input"
            placeholder={placeholder || "Enter tag..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="add-btn" onClick={handleAddTag}>
            + Add
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-section user-info">
            <div className="user-banner">
              <img
                src={profileBanner}
                alt="Profile banner"
                className="banner-img"
              />
            </div>
            <div className="user-avatar">
              <img
                src={femaleAvatar}
                alt="profile avatar"
                className="banner-img"
              />
            </div>
            <div className="user-details">
              <h2>Dipankar Datta</h2>
              <p>This will be displayed on your profile</p>
              <div className="user-actions">
                <button className="action-btn">Change picture</button>
                <button className="action-btn secondary">Remove</button>
              </div>
            </div>
          </div>

          <div className="card-container">
            <h3>About Me</h3>
            <textarea
              placeholder="Write about yourself..."
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={6}
              className="text-input"
            />
          </div>

          <div className="card-container">
            <h3>Profile Header</h3>
            <input
              type="text"
              placeholder="e.g. Career Coach, MBA Coach etc."
              value={profileHeader}
              onChange={(e) => setProfileHeader(e.target.value)}
              className="text-input"
            />
          </div>
        </div>

        <div className="profile-right">
          <div className="card-container">
            <h3>Why do I coach?</h3>
            <textarea
              placeholder="Write why do you coach..."
              value={whyICoach}
              onChange={(e) => setWhyICoach(e.target.value)}
              rows={4}
              className="text-input"
            />
          </div>

          <TagSection
            title="What Can I help you with?"
            tags={helpTopics}
            onAddTag={(text) => addTag(helpTopics, setHelpTopics, text)}
            onRemoveTag={(id) => removeTag(helpTopics, setHelpTopics, id)}
          />

          <TagSection
            title="Set of questions you can ask"
            tags={questions}
            onAddTag={(text) => addTag(questions, setQuestions, text)}
            onRemoveTag={(id) => removeTag(questions, setQuestions, id)}
          />

          <TagSection
            title="Languages I speak"
            tags={languages}
            onAddTag={(text) => addTag(languages, setLanguages, text)}
            onRemoveTag={(id) => removeTag(languages, setLanguages, id)}
          />
        </div>
      </div>

      {showSuccess && (
        <div className="notification success">
          <Check size={18} />
          <span>Success</span>
        </div>
      )}

      {showError && (
        <div className="notification error">
          <X size={18} />
          <span>Error</span>
        </div>
      )}
    </>
  );
}
