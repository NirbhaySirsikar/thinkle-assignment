import React, { useState} from "react";
import "../styles/Profile.css";
import UploadContent from "../components/ContentLibrary/UploadContent";

const ContentLibrary = () => {
  const [tab, setTab] = useState("upload-content");

  let title = "Content Library";
  let description = "Let's do something productive today";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="profile-tabs">
        <button
          className={tab === "dashboard" ? "active" : ""}
          onClick={() => setTab("dashboard")}
        >
            Dashboard
        </button>
        <button
          className={tab === "upload-content" ? "active" : ""}
          onClick={() => setTab("upload-content")}
        >
          Upload Content
        </button>
        <button
          className={tab === "creator-submissions" ? "active" : ""}
          onClick={() => setTab("creator-submissions")}
        >
            Creator Submissions
        </button>
        <button
          className={tab === "analytics" ? "active" : ""}
          onClick={() => setTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {tab === "dashboard"? <h1>Dashboard</h1> : null}
      {tab === "upload-content"? <UploadContent/> : null}
      {tab === "creator-submissions"? <h1>Creator Submissions</h1> : null}
      {tab === "analytics"? <h1>Analytics</h1> : null}

    </div>
  );
};

export default ContentLibrary;