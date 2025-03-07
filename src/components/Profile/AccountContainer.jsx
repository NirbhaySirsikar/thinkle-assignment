import React, { useState, useRef, useEffect } from "react";
import "../../styles/Profile/Account.css";
import Button from "../Button";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const AccountContainer = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    sex: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    phone: ""
  });

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const validatePhoneNumber = (phone) => {
    if (!phone) {
      return "Phone number is required";
    }
    if (!isPossiblePhoneNumber(phone)) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
    
    if (value) {
      const phoneError = validatePhoneNumber(value);
      setErrors({
        ...errors,
        phone: phoneError
      });
    } else {
      setErrors({
        ...errors,
        phone: ""
      });
    }
  };

  const handleSavePersonalInfo = () => {
    // Validate phone before saving
    const phoneError = validatePhoneNumber(formData.phone);
    
    if (phoneError) {
      setErrors({
        ...errors,
        phone: phoneError
      });
      return;
    }
    
    console.log("Saving personal info:", formData);
    // Here you would make an API call to save the data
  };

  const handleSaveSocialLinks = () => {
    console.log("Saving social links:", socialLinks);
    // Here you would make an API call to save the data
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="account-content">
      <div className="account-left">
        <div className="card-container">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="dipankar@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Contact information</label>
            <div className="phone-input-wrapper">
              <PhoneInput
                international
                defaultCountry="IN"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="custom-phone-input"
              />
              {errors.phone && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="date-sex-container">
            <div className="form-group date-group">
              <label>Date of Birth</label>
              <div className="date-picker-container">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group sex-group">
              <label>Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Delhi"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="save-button-container">
            <Button type="primary" onClick={handleSavePersonalInfo}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>


      <div className="account-right">
        <div className="card-container">
          <h3>Upload your Aadhar/Passport*</h3>

          <div className="file-upload-container">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden-file-input"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <div className="file-input-display">
              {selectedFile ? selectedFile.name : "File"}
            </div>
            <button className="upload-file-btn" onClick={handleFileUploadClick}>
              Upload File
            </button>
          </div>
        </div>

        <div className="card-container">
          <h3>Social Links</h3>

          <div className="social-links-container">
            <div className="form-group">
              <div className="social-input-wrapper">
                <div className="social-icon-wrapper linkedin">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9_732)">
                      <path
                        d="M18.125 0.4687H1.875C1.5063 0.464948 1.15117 0.607613 0.887529 0.865392C0.623892 1.12317 0.473283 1.47501 0.46875 1.8437V18.1593C0.474103 18.5275 0.625072 18.8785 0.88862 19.1356C1.15217 19.3927 1.50683 19.535 1.875 19.5312H18.125C18.4937 19.5341 18.8486 19.391 19.1121 19.133C19.3756 18.8751 19.5263 18.5233 19.5312 18.1546V1.83901C19.5247 1.4714 19.3733 1.12124 19.1099 0.864647C18.8466 0.608051 18.4927 0.465759 18.125 0.4687Z"
                        fill="#0076B2"
                      />
                      <path
                        d="M3.2875 7.61426H6.11719V16.7189H3.2875V7.61426ZM4.70313 3.08301C5.02768 3.08301 5.34494 3.17927 5.61477 3.35961C5.8846 3.53996 6.09489 3.79628 6.21901 4.09615C6.34314 4.39603 6.37554 4.72599 6.31211 5.04428C6.24868 5.36257 6.09227 5.6549 5.86267 5.88428C5.63307 6.11367 5.34059 6.2698 5.02224 6.33292C4.70388 6.39605 4.37396 6.36334 4.0742 6.23892C3.77444 6.11451 3.51832 5.90398 3.33824 5.63398C3.15815 5.36397 3.06219 5.04662 3.0625 4.72207C3.06291 4.28722 3.23595 3.87032 3.54358 3.56298C3.85121 3.25564 4.26828 3.08301 4.70313 3.08301ZM7.89219 7.61426H10.6047V8.86426H10.6422C11.0203 8.14863 11.9422 7.39395 13.3188 7.39395C16.1844 7.3877 16.7156 9.27363 16.7156 11.7189V16.7189H13.8859V12.2893C13.8859 11.2346 13.8672 9.87676 12.4156 9.87676C10.9641 9.87676 10.7172 11.0268 10.7172 12.2205V16.7189H7.89219V7.61426Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9_732">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <input
                  type="text"
                  name="linkedin"
                  value={socialLinks.linkedin}
                  onChange={handleSocialLinkChange}
                  placeholder="linkedin.com/in/username"
                  className="social-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="social-input-wrapper">
                <div className="social-icon-wrapper twitter">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9_737)">
                      <mask
                        id="mask0_9_737"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                      >
                        <path d="M0 0H20V20H0V0Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_9_737)">
                        <path
                          d="M15.75 0.937134H18.8171L12.1171 8.61428L20 19.0628H13.8286L8.99143 12.7271L3.46286 19.0628H0.392857L7.55857 10.8486L0 0.938562H6.32857L10.6943 6.72856L15.75 0.937134ZM14.6714 17.2228H16.3714L5.4 2.68142H3.57714L14.6714 17.2228Z"
                          fill="black"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_9_737">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <input
                  type="text"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                  placeholder="twitter.com/username"
                  className="social-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="social-input-wrapper">
                <div className="social-icon-wrapper instagram">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9_746)">
                      <path
                        d="M15.3125 0H4.6875C2.09867 0 0 2.09867 0 4.6875V15.3125C0 17.9013 2.09867 20 4.6875 20H15.3125C17.9013 20 20 17.9013 20 15.3125V4.6875C20 2.09867 17.9013 0 15.3125 0Z"
                        fill="url(#paint0_radial_9_746)"
                      />
                      <path
                        d="M15.3125 0H4.6875C2.09867 0 0 2.09867 0 4.6875V15.3125C0 17.9013 2.09867 20 4.6875 20H15.3125C17.9013 20 20 17.9013 20 15.3125V4.6875C20 2.09867 17.9013 0 15.3125 0Z"
                        fill="url(#paint1_radial_9_746)"
                      />
                      <path
                        d="M10.0007 2.1875C7.87898 2.1875 7.61266 2.1968 6.77938 2.23469C5.94766 2.27281 5.37992 2.40445 4.8832 2.59766C4.3693 2.79719 3.93344 3.06414 3.49922 3.49852C3.06461 3.93281 2.79766 4.36867 2.5975 4.88234C2.40375 5.37922 2.27195 5.94719 2.23453 6.77852C2.19727 7.61188 2.1875 7.87828 2.1875 10.0001C2.1875 12.1219 2.19688 12.3873 2.23469 13.2206C2.27297 14.0523 2.40461 14.6201 2.59766 15.1168C2.79734 15.6307 3.0643 16.0666 3.49867 16.5008C3.93281 16.9354 4.36867 17.203 4.88219 17.4025C5.3793 17.5957 5.94711 17.7273 6.77867 17.7655C7.61203 17.8034 7.87813 17.8127 9.99977 17.8127C12.1217 17.8127 12.3872 17.8034 13.2205 17.7655C14.0522 17.7273 14.6205 17.5957 15.1177 17.4025C15.6313 17.203 16.0666 16.9354 16.5006 16.5008C16.9352 16.0666 17.2021 15.6307 17.4023 15.117C17.5944 14.6201 17.7262 14.0522 17.7653 13.2208C17.8027 12.3875 17.8125 12.1219 17.8125 10.0001C17.8125 7.87828 17.8027 7.61203 17.7653 6.77867C17.7262 5.94695 17.5944 5.3793 17.4023 4.88258C17.2021 4.36867 16.9352 3.93281 16.5006 3.49852C16.0661 3.06398 15.6315 2.79703 15.1172 2.59773C14.6191 2.40445 14.0511 2.27273 13.2194 2.23469C12.386 2.1968 12.1207 2.1875 9.99828 2.1875H10.0007ZM9.29984 3.59539C9.50789 3.59508 9.74 3.59539 10.0007 3.59539C12.0867 3.59539 12.3339 3.60289 13.1577 3.64031C13.9194 3.67516 14.3328 3.80242 14.6082 3.90938C14.9728 4.05094 15.2327 4.22023 15.506 4.49375C15.7795 4.76719 15.9487 5.02758 16.0906 5.39219C16.1976 5.66719 16.325 6.08063 16.3597 6.84234C16.3971 7.66594 16.4052 7.91328 16.4052 9.99828C16.4052 12.0833 16.3971 12.3307 16.3597 13.1542C16.3248 13.9159 16.1976 14.3294 16.0906 14.6045C15.9491 14.9691 15.7795 15.2287 15.506 15.502C15.2326 15.7754 14.973 15.9446 14.6082 16.0863C14.3331 16.1937 13.9194 16.3206 13.1577 16.3555C12.3341 16.3929 12.0867 16.401 10.0007 16.401C7.91461 16.401 7.66734 16.3929 6.84383 16.3555C6.08211 16.3203 5.66867 16.193 5.39305 16.0861C5.02852 15.9445 4.76805 15.7752 4.49461 15.5018C4.22117 15.2284 4.05195 14.9686 3.91 14.6038C3.80305 14.3287 3.67562 13.9153 3.64094 13.1536C3.60352 12.33 3.59602 12.0827 3.59602 9.99633C3.59602 7.91 3.60352 7.66398 3.64094 6.84039C3.67578 6.07867 3.80305 5.66523 3.91 5.38984C4.05164 5.02523 4.22117 4.76484 4.49469 4.49141C4.7682 4.21797 5.02852 4.04867 5.39312 3.9068C5.66852 3.79938 6.08211 3.67242 6.84383 3.63742C7.56453 3.60484 7.84383 3.59508 9.29984 3.59344V3.59539ZM14.171 4.89258C13.6534 4.89258 13.2335 5.31211 13.2335 5.82977C13.2335 6.34734 13.6534 6.76727 14.171 6.76727C14.6886 6.76727 15.1085 6.34734 15.1085 5.82977C15.1085 5.31219 14.6886 4.89227 14.171 4.89227V4.89258ZM10.0007 5.98797C7.78508 5.98797 5.98867 7.78438 5.98867 10.0001C5.98867 12.2158 7.78508 14.0113 10.0007 14.0113C12.2164 14.0113 14.0122 12.2158 14.0122 10.0001C14.0122 7.78445 12.2163 5.98797 10.0005 5.98797H10.0007ZM10.0007 7.39586C11.4389 7.39586 12.6049 8.56172 12.6049 10.0001C12.6049 11.4383 11.4389 12.6043 10.0007 12.6043C8.5625 12.6043 7.39656 11.4383 7.39656 10.0001C7.39656 8.56172 8.56242 7.39586 10.0007 7.39586Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <radialGradient
                        id="paint0_radial_9_746"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(5.3125 21.5404) rotate(-90) scale(19.8215 18.4355)"
                      >
                        <stop stopColor="#FFDD55" />
                        <stop offset="0.1" stopColor="#FFDD55" />
                        <stop offset="0.5" stopColor="#FF543E" />
                        <stop offset="1" stopColor="#C837AB" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_9_746"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(-3.35008 1.4407) rotate(78.681) scale(8.86031 36.5225)"
                      >
                        <stop stopColor="#3771C8" />
                        <stop offset="0.128" stopColor="#3771C8" />
                        <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                      </radialGradient>
                      <clipPath id="clip0_9_746">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <input
                  type="text"
                  name="instagram"
                  value={socialLinks.instagram}
                  onChange={handleSocialLinkChange}
                  placeholder="instagram.com/username"
                  className="social-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="social-input-wrapper">
                <div className="social-icon-wrapper youtube">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9_753)">
                      <path
                        d="M19.4714 2.18361C19.3572 1.76155 19.1344 1.37678 18.8252 1.0676C18.5161 0.75842 18.1313 0.535625 17.7092 0.4214C16.1641 0 9.94546 0 9.94546 0C9.94546 0 3.7265 0.0127555 2.18137 0.434156C1.75931 0.548388 1.37454 0.771195 1.06537 1.08039C0.756205 1.38958 0.533432 1.77437 0.419237 2.19644C-0.0481295 4.94184 -0.22943 9.1252 0.43207 11.7608C0.546277 12.1828 0.769055 12.5676 1.07822 12.8768C1.38739 13.186 1.77215 13.4088 2.1942 13.523C3.73934 13.9444 9.95814 13.9444 9.95814 13.9444C9.95814 13.9444 16.1769 13.9444 17.7219 13.523C18.144 13.4088 18.5288 13.186 18.8379 12.8768C19.1471 12.5676 19.3699 12.1828 19.4841 11.7608C19.9771 9.01149 20.129 4.8307 19.4714 2.18361Z"
                        fill="#FF0000"
                      />
                      <path
                        d="M7.96875 9.96026L13.1276 6.9722L7.96875 3.98413V9.96026Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9_753">
                        <rect width="19.9111" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <input
                  type="text"
                  name="youtube"
                  value={socialLinks.youtube}
                  onChange={handleSocialLinkChange}
                  placeholder="youtube.com/c/username"
                  className="social-input"
                />
              </div>
            </div>
          </div>

          <div className="save-button-container">
            <Button type="primary" onClick={handleSaveSocialLinks}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContainer;
