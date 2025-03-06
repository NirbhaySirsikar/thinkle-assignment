import React, { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { CheckCheck, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

const LinkedInSyncModal = ({ isOpen, onClose, onSync }) => {
  const [tab, setTab] = useState("import");
  const [step, setStep] = useState(1);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [method, setMethod] = useState("app");

  const handleNext = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const handleImport = () => {
    onSync(linkedInUrl);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sync your LinkedIn">
      {step === 1 && (
        <>
          <div className="profile-tabs">
            <button
              className={tab === "import" ? "active" : ""}
              onClick={() => setTab("import")}
            >
              Import
            </button>
            <button
              className={tab === "find_link" ? "active" : ""}
              onClick={() => setTab("find_link")}
            >
              Find Link
            </button>
          </div>

          {tab === "import" ? (
            <div>
              <label className="linkedin-input-label">Your LinkedIn URL</label>
              <input
                type="url"
                className="linkedin-input"
                placeholder="https://linkedin.com/in/john-doe"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
              />

              <p className="linkedin-disclaimer">
                The import may have missing data. Please double check and make
                any necessary edits.
              </p>

              <div className="">
                <button
                  onClick={handleNext}
                  disabled={!linkedInUrl}
                  className="linkedin-import-button"
                >
                  Import my Profile <Sparkles size={16} fill="currentColor" />
                </button>
              </div>
            </div>
          ) : null}
          {tab === "find_link" ? (
            <div className="linkedin-modal-content">
              <div className="linkedin-methods">
                <div className="linkedin-method">
                  <h3>Method 1: LinkedIn App</h3>
                  <ol>
                    <li>Open the LinkedIn App</li>
                    <li>Go to your Profile</li>
                    <li>Click the three dots (...)</li>
                    <li>Select "Share via" & Copy the link</li>
                  </ol>
                </div>

                <div className="linkedin-method">
                  <h3>Method 2: Search engine</h3>
                  <ol>
                    <li>Open a new tab in your browser</li>
                    <li>Type in "[Your name][Your University] linkedin"</li>
                    <li>Find your profile in search results</li>
                    <li>Copy and paste the link</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}

      {step === 2 && (
        <div className="linkedin-loading">
          <div className="linkedin-loader"></div>
          <h3 className="text-xl font-medium mt-4">
            Sit tight! We are fetching data.
          </h3>
        </div>
      )}

      {step === 3 && (
        <div className="linkedin-success">
<svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.625 68.2571L28.6875 52.3164L33.1914 47.8125L44.625 59.2429L68.8022 35.0625L73.3125 39.5728L44.625 68.2571Z" fill="#00AE40"/>
<path d="M51 6.375C42.174 6.375 33.5462 8.99221 26.2077 13.8957C18.8692 18.7991 13.1495 25.7686 9.7719 33.9228C6.39434 42.0769 5.51061 51.0495 7.23248 59.7059C8.95434 68.3623 13.2045 76.3137 19.4454 82.5546C25.6863 88.7956 33.6377 93.0457 42.2941 94.7675C50.9505 96.4894 59.9231 95.6057 68.0773 92.2281C76.2314 88.8506 83.2009 83.1309 88.1044 75.7923C93.0078 68.4538 95.625 59.826 95.625 51C95.625 39.1647 90.9235 27.8142 82.5547 19.4454C74.1858 11.0765 62.8353 6.375 51 6.375ZM51 89.25C43.4349 89.25 36.0396 87.0067 29.7495 82.8037C23.4593 78.6007 18.5567 72.6269 15.6616 65.6376C12.7666 58.6484 12.0091 50.9576 13.485 43.5378C14.9609 36.118 18.6038 29.3025 23.9532 23.9532C29.3025 18.6038 36.118 14.9608 43.5378 13.485C50.9576 12.0091 58.6484 12.7666 65.6377 15.6616C72.6269 18.5567 78.6008 23.4593 82.8037 29.7494C87.0067 36.0396 89.25 43.4349 89.25 51C89.25 61.1445 85.2201 70.8736 78.0469 78.0468C70.8736 85.2201 61.1446 89.25 51 89.25Z" fill="#00AE40"/>
</svg>

          <h3 className="">Done!</h3>
          <p className="">
            Note: Please double check all the fields
            <br />
            for 100% accuracy
          </p>
        </div>
      )}
    </Modal>
  );
};

export default LinkedInSyncModal;
