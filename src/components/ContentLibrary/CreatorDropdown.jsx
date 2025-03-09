import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import femaleAvatar from "../../assets/images/female-avatar.png";

// Sample data for creators. Replace with your actual data or fetch from an API.
const creatorsData = [
  { id: "john", handle: "@dipankar12", name:"Dipankar Datta", avatar: femaleAvatar},
  { id: "jane", handle: "@divyanshu89", name:"Divyanshu Gupta", avatar: femaleAvatar},
  { id: "sam",  handle: "@mehta45", name:"Vishal Mehta", avatar: femaleAvatar},
];

const CreatorDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the currently selected creator object
  const selectedCreator = creatorsData.find((c) => c.id === value);

  const handleSelectCreator = (creatorId) => {
    onChange(creatorId);
    setIsOpen(false);
  };

  return (
    <div className="creator-dropdown-wrapper" ref={dropdownRef}>
      {/* The "display" area of the dropdown */}
      <div className="creator-dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedCreator ? (
          <>
            {/* <img
              src={selectedCreator.avatar}
              alt={selectedCreator.handle}
              className="creator-avatar"
            /> */}
            <span>{selectedCreator.handle}</span>
          </>
        ) : (
          <span className="creator-placeholder">@johndoe</span>
        )}
        <ChevronDown className="dropdown-chevron" size={16} />
      </div>

      {/* The dropdown list */}
      {isOpen && (
        <div className="creator-dropdown-list">
          {creatorsData.map((creator) => (
            <div
              key={creator.id}
              className="creator-dropdown-item"
              onClick={() => handleSelectCreator(creator.id)}
            >
              <img
                src={creator.avatar}
                alt={creator.handle}
                className="creator-avatar"
              />
            <div>
                <span>{creator.handle}</span>
                <span style={{opacity:"0.3"}}>{creator.name}</span>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorDropdown;
