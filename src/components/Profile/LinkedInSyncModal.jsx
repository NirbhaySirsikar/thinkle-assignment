import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { CheckCheck, ArrowRight, ExternalLink } from 'lucide-react';

const LinkedInSyncModal = ({ isOpen, onClose, onSync }) => {
  const [step, setStep] = useState(1);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [method, setMethod] = useState('app');

  const handleNext = () => {
    if (step === 1 && linkedInUrl) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      // Simulate loading
      setTimeout(() => {
        setStep(4);
      }, 2000);
    }
  };

  const handleImport = () => {
    onSync(linkedInUrl);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sync your LinkedIn">
      {step === 1 && (
        <div className="linkedin-modal-content">
          <div className="linkedin-button-group">
            <button 
              className="linkedin-button primary"
              onClick={() => {}}
            >
              Import
            </button>
            <button 
              className="linkedin-button secondary"
              onClick={() => {}}
            >
              Find Link
            </button>
          </div>
          
          <label className="linkedin-input-label">Your LinkedIn URL</label>
          <input
            type="url"
            className="linkedin-input"
            placeholder="https://linkedin.com/in/john-doe"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
          />
          
          <p className="linkedin-disclaimer">
            The import may have missing data. Please double check and make any necessary edits.
          </p>

          <div className="flex justify-center mt-5">
            <Button 
              onClick={handleNext}
              disabled={!linkedInUrl}
            >
              Import my Profile <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="linkedin-modal-content">
          <div className="linkedin-methods">
            <div className="linkedin-method">
              <h3>Method 1: LinkedIn App</h3>
              <ol>
                <li>1. Open the LinkedIn App</li>
                <li>2. Go to your Profile</li>
                <li>3. Click the three dots (...)</li>
                <li>4. Select "Share via" & Copy the link</li>
              </ol>
              <button 
                className={`linkedin-button ${method === 'app' ? 'primary' : 'secondary'}`}
                onClick={() => setMethod('app')}
              >
                Use this method
              </button>
            </div>
            
            <div className="linkedin-method">
              <h3>Method 1: Search engine</h3>
              <ol>
                <li>1. Open a new tab in your browser</li>
                <li>2. Type in "[Your name][Your University] linkedin"</li>
                <li>3. Find your profile in search results</li>
                <li>4. Copy and paste the link</li>
              </ol>
              <button 
                className={`linkedin-button ${method === 'search' ? 'primary' : 'secondary'}`}
                onClick={() => setMethod('search')}
              >
                Use this method
              </button>
            </div>
          </div>

          <div className="linkedin-footer">
            <Button onClick={handleNext}>
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="linkedin-loading">
          <div className="linkedin-loader"></div>
          <h3 className="text-xl font-medium mt-4">Sit tight! We are fetching data.</h3>
        </div>
      )}

      {step === 4 && (
        <div className="linkedin-success">
          <div className="linkedin-success-icon">
            <CheckCheck size={30} />
          </div>
          <h3 className="text-xl font-medium">Done!</h3>
          <p className="text-gray-500 text-center mt-2">
            Note: Please double check all the fields<br />for 100% accuracy
          </p>
          <Button onClick={handleImport} className="mt-6">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default LinkedInSyncModal;