import React, { useState } from "react";
import "../../styles/ContentLibrary/UploadContent.css";
import { ChevronDown } from "lucide-react";
import Modal from "../Modal";
import Button from "../Button";

const UploadContent = () => {
  const [contentType, setContentType] = useState("video");
  const [videoTitle, setVideoTitle] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [contentId, setContentId] = useState("");
  const [category, setCategory] = useState("");
  const [videoType, setVideoType] = useState("");
  const [section, setSection] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [contentStatus, setContentStatus] = useState("complete");

  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const getContentType = ()=>{
    return contentType.charAt(0).toUpperCase() + contentType.slice(1);
  }

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setThumbnail(e.dataTransfer.files[0]);
    }
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideo(e.dataTransfer.files[0]);
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    alert("Content saved successfully.");
  };

  const handleClear = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClear = () => {
    setVideoTitle("");
    setCreatorId("");
    setContentId("");
    setCategory("");
    setVideoType("");
    setSection("");
    setThumbnail(null);
    setVideo(null);
    setDescription("");
    setContentStatus("complete");
    setShowClearConfirmation(false);
  };

  const handleCancelClear = () => {
    setShowClearConfirmation(false);
  };
  return (
    <div className="card-container" style={{ marginTop: "2.5rem" }}>
      {/* 1) Content Type Radios */}
      <div className="form-section">
        <h2 className="form-section-title">Type of content*</h2>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="video"
              name="content-type"
              value="video"
              checked={contentType === "video"}
              onChange={() => setContentType("video")}
              className="radio-input"
            />
            <label htmlFor="video">Video</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="template"
              name="content-type"
              value="template"
              checked={contentType === "template"}
              onChange={() => setContentType("template")}
              className="radio-input"
            />
            <label htmlFor="template">Template</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="blog"
              name="content-type"
              value="blog"
              checked={contentType === "blog"}
              onChange={() => setContentType("blog")}
              className="radio-input"
            />
            <label htmlFor="blog">Blog/Article</label>
          </div>
        </div>
      </div>

      {/* 2) Video Information */}
      <div className="form-section">
        <h2 className="form-section-title">{getContentType()} Information</h2>

        <div className="form-row">
          {/* Video Title */}
          <div className="form-col">
            <label htmlFor="video-title" className="form-label">
              {getContentType()} Title*
            </label>
            <input
              id="video-title"
              placeholder="Add your video title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Creator ID (dropdown) */}
          <div className="form-col">
            <label htmlFor="creator-id" className="form-label">
              Creator ID*
            </label>
            <div className="select-wrapper">
              <select
                id="creator-id"
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}
                className="form-select"
              >
                <option value="" disabled>
                  @johndoe
                </option>
                <option value="john">@johndoe</option>
                <option value="jane">@janedoe</option>
                <option value="sam">@samsmith</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          {/* Content ID */}
          <div className="form-col">
            <label htmlFor="content-id" className="form-label">
              Content ID*
            </label>
            <input
              id="content-id"
              placeholder="#123456"
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          {/* Category (dropdown) */}
          <div className="form-col">
            <label htmlFor="category" className="form-label">
              Select Category*
            </label>
            <div className="select-wrapper">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="" disabled>
                  Education, technology, etc
                </option>
                <option value="education">Education</option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="business">Business</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          {/* Type of Video (dropdown) */}
          <div className="form-col">
            <label htmlFor="video-type" className="form-label">
              Type of {getContentType()}*
            </label>
            <div className="select-wrapper">
              <select
                id="video-type"
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
                className="form-select"
              >
                <option value="" disabled>
                  Free, Plus
                </option>
                <option value="free">Free</option>
                <option value="plus">Plus</option>
                <option value="premium">Premium</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          {/* Section (dropdown) */}
          <div className="form-col">
            <label htmlFor="section" className="form-label">
              Section*
            </label>
            <div className="select-wrapper">
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="form-select"
              >
                <option value="" disabled>
                  Select Section
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* 3) Upload Content */}
      <div className="form-section">
        <h2 className="form-section-title">Upload Content</h2>
        <div className="form-row">
          {/* Thumbnail */}
          <div className="form-col">
            <label className="form-label">Choose Thumbnail Image*</label>
            <div
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleThumbnailDrop}
              onClick={() =>
                document.getElementById("thumbnail-input")?.click()
              }
            >
              {thumbnail ? (
                <div>
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        d="M2.66406 16.5013C2.66406 10.216 2.66406 7.0733 4.61606 5.11997C6.57073 3.16797 9.71206 3.16797 15.9974 3.16797C22.2827 3.16797 25.4254 3.16797 27.3774 5.11997C29.3307 7.07464 29.3307 10.216 29.3307 16.5013C29.3307 22.7866 29.3307 25.9293 27.3774 27.8813C25.4267 29.8346 22.2827 29.8346 15.9974 29.8346C9.71206 29.8346 6.5694 29.8346 4.61606 27.8813C2.66406 25.9306 2.66406 22.7866 2.66406 16.5013Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M21.3307 13.8333C22.8035 13.8333 23.9974 12.6394 23.9974 11.1667C23.9974 9.69391 22.8035 8.5 21.3307 8.5C19.858 8.5 18.6641 9.69391 18.6641 11.1667C18.6641 12.6394 19.858 13.8333 21.3307 13.8333Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M2.66406 17.1672L5.00006 15.1232C5.58558 14.6113 6.34372 14.341 7.12102 14.3669C7.89833 14.3929 8.63672 14.7133 9.18673 15.2632L14.9067 20.9832C15.3506 21.427 15.9368 21.7 16.5621 21.7541C17.1875 21.8082 17.8118 21.6401 18.3254 21.2792L18.7241 20.9992C19.4649 20.4789 20.3602 20.2253 21.2638 20.2798C22.1674 20.3343 23.0258 20.6936 23.6987 21.2992L27.9974 25.1672"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                  <p className="dropzone-text">{thumbnail.name}</p>
                  <p className="dropzone-hint">
                    ({(thumbnail.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                </div>
              ) : (
                <div>
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        d="M2.66406 16.5013C2.66406 10.216 2.66406 7.0733 4.61606 5.11997C6.57073 3.16797 9.71206 3.16797 15.9974 3.16797C22.2827 3.16797 25.4254 3.16797 27.3774 5.11997C29.3307 7.07464 29.3307 10.216 29.3307 16.5013C29.3307 22.7866 29.3307 25.9293 27.3774 27.8813C25.4267 29.8346 22.2827 29.8346 15.9974 29.8346C9.71206 29.8346 6.5694 29.8346 4.61606 27.8813C2.66406 25.9306 2.66406 22.7866 2.66406 16.5013Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M21.3307 13.8333C22.8035 13.8333 23.9974 12.6394 23.9974 11.1667C23.9974 9.69391 22.8035 8.5 21.3307 8.5C19.858 8.5 18.6641 9.69391 18.6641 11.1667C18.6641 12.6394 19.858 13.8333 21.3307 13.8333Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M2.66406 17.1672L5.00006 15.1232C5.58558 14.6113 6.34372 14.341 7.12102 14.3669C7.89833 14.3929 8.63672 14.7133 9.18673 15.2632L14.9067 20.9832C15.3506 21.427 15.9368 21.7 16.5621 21.7541C17.1875 21.8082 17.8118 21.6401 18.3254 21.2792L18.7241 20.9992C19.4649 20.4789 20.3602 20.2253 21.2638 20.2798C22.1674 20.3343 23.0258 20.6936 23.6987 21.2992L27.9974 25.1672"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>

                  <p className="dropzone-text">Drop featured image or browse</p>
                  <p className="dropzone-hint">Max: 2 MB</p>
                </div>
              )}
              <input
                id="thumbnail-input"
                type="file"
                className="hidden"
                style={{ display: "none" }}
                onChange={handleThumbnailChange}
              />
            </div>
          </div>

          {/* Video */}
          <div className="form-col">
            <label className="form-label">Upload Video*</label>
            <div
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleVideoDrop}
              onClick={() => document.getElementById("video-input")?.click()}
            >
              {video ? (
                <div>
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 28.5C17.5759 28.5 19.1363 28.1896 20.5922 27.5866C22.0481 26.9835 23.371 26.0996 24.4853 24.9853C25.5996 23.871 26.4835 22.5481 27.0866 21.0922C27.6896 19.6363 28 18.0759 28 16.5C28 14.9241 27.6896 13.3637 27.0866 11.9078C26.4835 10.4519 25.5996 9.12902 24.4853 8.01472C23.371 6.90042 22.0481 6.0165 20.5922 5.41345C19.1363 4.81039 17.5759 4.5 16 4.5C12.8174 4.5 9.76516 5.76428 7.51472 8.01472C5.26428 10.2652 4 13.3174 4 16.5C4 19.6826 5.26428 22.7348 7.51472 24.9853C9.76516 27.2357 12.8174 28.5 16 28.5ZM14.3773 11.1533L21.9027 15.3347C22.1104 15.4502 22.2835 15.6191 22.404 15.824C22.5245 16.0289 22.5881 16.2623 22.5881 16.5C22.5881 16.7377 22.5245 16.9711 22.404 17.176C22.2835 17.3809 22.1104 17.5498 21.9027 17.6653L14.3773 21.8467C14.1337 21.9821 13.8588 22.0515 13.5801 22.0481C13.3013 22.0446 13.0283 21.9683 12.7881 21.8269C12.5479 21.6854 12.3488 21.4836 12.2105 21.2416C12.0723 20.9995 11.9997 20.7254 12 20.4467V12.5533C11.9997 12.2746 12.0723 12.0005 12.2105 11.7585C12.3488 11.5164 12.5479 11.3146 12.7881 11.1731C13.0283 11.0317 13.3013 10.9554 13.5801 10.9519C13.8588 10.9485 14.1337 11.0179 14.3773 11.1533Z"
                        fill="black"
                      />
                    </g>
                  </svg>

                  <p className="dropzone-text">{video.name}</p>
                  <p className="dropzone-hint">
                    ({(video.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                </div>
              ) : (
                <div>
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 28.5C17.5759 28.5 19.1363 28.1896 20.5922 27.5866C22.0481 26.9835 23.371 26.0996 24.4853 24.9853C25.5996 23.871 26.4835 22.5481 27.0866 21.0922C27.6896 19.6363 28 18.0759 28 16.5C28 14.9241 27.6896 13.3637 27.0866 11.9078C26.4835 10.4519 25.5996 9.12902 24.4853 8.01472C23.371 6.90042 22.0481 6.0165 20.5922 5.41345C19.1363 4.81039 17.5759 4.5 16 4.5C12.8174 4.5 9.76516 5.76428 7.51472 8.01472C5.26428 10.2652 4 13.3174 4 16.5C4 19.6826 5.26428 22.7348 7.51472 24.9853C9.76516 27.2357 12.8174 28.5 16 28.5ZM14.3773 11.1533L21.9027 15.3347C22.1104 15.4502 22.2835 15.6191 22.404 15.824C22.5245 16.0289 22.5881 16.2623 22.5881 16.5C22.5881 16.7377 22.5245 16.9711 22.404 17.176C22.2835 17.3809 22.1104 17.5498 21.9027 17.6653L14.3773 21.8467C14.1337 21.9821 13.8588 22.0515 13.5801 22.0481C13.3013 22.0446 13.0283 21.9683 12.7881 21.8269C12.5479 21.6854 12.3488 21.4836 12.2105 21.2416C12.0723 20.9995 11.9997 20.7254 12 20.4467V12.5533C11.9997 12.2746 12.0723 12.0005 12.2105 11.7585C12.3488 11.5164 12.5479 11.3146 12.7881 11.1731C13.0283 11.0317 13.3013 10.9554 13.5801 10.9519C13.8588 10.9485 14.1337 11.0179 14.3773 11.1533Z"
                        fill="black"
                      />
                    </g>
                  </svg>
                  <p className="dropzone-text">Upload a Video</p>
                  <p className="dropzone-hint">Max: 120 MB</p>
                </div>
              )}
              <input
                id="video-input"
                type="file"
                className="hidden"
                style={{ display: "none" }}
                onChange={handleVideoChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4) Video Description */}
      <div className="form-section">
        <label htmlFor="description" className="form-label">
          Add {getContentType()} Description*
        </label>
        <textarea
          id="description"
          placeholder="Enter text or type '/' for commands"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
        />
      </div>

      {/* 5) Content Status + Buttons */}
      <div className="bottom-section">
        <div className="form-section">
          <label className="form-label">Mark the content</label>
          <div className="radio-group">
            <div className="radio-item">
              <input
                type="radio"
                id="complete"
                name="content-status"
                value="complete"
                checked={contentStatus === "complete"}
                onChange={() => setContentStatus("complete")}
                className="radio-input"
              />
              <label htmlFor="complete">Complete</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="incomplete"
                name="content-status"
                value="incomplete"
                checked={contentStatus === "incomplete"}
                onChange={() => setContentStatus("incomplete")}
                className="radio-input"
              />
              <label htmlFor="incomplete">Incomplete</label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="button button-danger" onClick={handleClear}>
            Clear
          </button>
          <button className="button button-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      <Modal
        isOpen={showClearConfirmation}
        onClose={handleCancelClear}  
        title="Are you sure?"                       
      >
          <p className="confirmation-text">
Are you sure you want to Clear this content? Your progress will not be saved
          </p>

        <div className="modal-actions-group">
          <Button type="destructive" onClick={handleCancelClear}>
            No
          </Button>
            <Button type="primary" onClick={handleConfirmClear}>
              Yes
            </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UploadContent;
