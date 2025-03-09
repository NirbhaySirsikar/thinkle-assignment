import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import MyProfileContainer from "../components/Profile/MyProfileContainer";
import ExperienceContainer from "../components/Profile/ExperienceContainer";
import BookingsContainer from "../components/Profile/BookingsContainer";
import AccountContainer from "../components/Profile/AccountContainer";
import Button from "../components/Button";
import LinkedInSyncModal from "../components/Profile/LinkedInSyncModal";

const Profile = () => {
  const [tab, setTab] = useState("my_profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const handleLinkedInSync = (linkedInUrl) => {
    console.log("LinkedIn URL to sync:", linkedInUrl);
    // Here you would typically make an API call to process the LinkedIn data
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let title = "Edit User Profile";
  let description = "Manage your profile here";
  if (tab === "experience") {
    title = "Experience";
    description = "Add your experience here";
  } else if (tab === "bookings") {
    title = "Bookings";
    description = "Track your payments here";
  } else if (tab === "account") {
    title = "Account";
    description = "Manage your account here";
  } else {
    title = "Edit your profile";
    description = "Manage your profile here";
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="profile-tabs-row">
        <div className="profile-tabs">
          <button
            className={tab === "my_profile" ? "active" : ""}
            onClick={() => setTab("my_profile")}
          >
            My Profile
          </button>
          <button
            className={tab === "experience" ? "active" : ""}
            onClick={() => setTab("experience")}
          >
            Experience
          </button>
          <button
            className={tab === "bookings" ? "active" : ""}
            onClick={() => setTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={tab === "account" ? "active" : ""}
            onClick={() => setTab("account")}
          >
            Account
          </button>
        </div>
        {!isMobile && (
          <>
            {tab === "my_profile" && (
              <button
                className="tab-row-button"
                disabled={tab === "my_profile"}
              >
                Save Changes
              </button>
            )}
            {tab === "experience" && (
              <button
                onClick={() => setIsLinkedInModalOpen(true)}
                className="tab-row-button"
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
              </button>
            )}
          </>
        )}
      </div>

      <LinkedInSyncModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        onSync={handleLinkedInSync}
      />

      {tab === "my_profile" ? <MyProfileContainer /> : null}
      {tab === "experience" ? <ExperienceContainer /> : null}
      {tab === "bookings" ? <BookingsContainer /> : null}
      {tab === "account" ? <AccountContainer /> : null}
    </div>
  );
};

export default Profile;
