import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import MyProfileContainer from "../components/Profile/MyProfileContainer";
import ExperienceContainer from "../components/Profile/ExperienceContainer";
import BookingsContainer from "../components/Profile/BookingsContainer";
import AccountContainer from "../components/Profile/AccountContainer";

const Profile = () => {
  const [tab, setTab] = useState("my_profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <h1>Edit User Profile</h1>
          <p>Track your payments here</p>
        </div>
      </div>

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

      {tab === "my_profile"? <MyProfileContainer /> : null}
      {tab === "experience"? <ExperienceContainer /> : null}
      {tab === "bookings"? <BookingsContainer /> : null}
      {tab === "account"? <AccountContainer /> : null}

    </div>
  );
};

export default Profile;
