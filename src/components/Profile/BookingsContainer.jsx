import React, { useState } from 'react';
import '../../styles/Profile/Booking.css';
import { PenLine, X } from 'lucide-react';
import Button from '../Button';
import Modal from '../Modal';

const BookingsContainer = () => {
  const [offerFreeSession, setOfferFreeSession] = useState(true);
  const [coachOffline, setCoachOffline] = useState(false);
  const [sessionPrices, setSessionPrices] = useState({
    oneSession: '',
    twoSessions: '',
    fourSessions: ''
  });
  const [discounts, setDiscounts] = useState({
    firstSession: '',
    secondSession: '',
    fourthSession: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditField, setCurrentEditField] = useState('');
  const [tempPrice, setTempPrice] = useState('');

  const handleToggleFreeSession = () => {
    setOfferFreeSession(!offerFreeSession);
  };

  const handleToggleCoachOffline = () => {
    setCoachOffline(!coachOffline);
  };

  const handleSessionPriceChange = (field, value) => {
    setSessionPrices({
      ...sessionPrices,
      [field]: value
    });
  };

  const handleDiscountChange = (field, value) => {
    setDiscounts({
      ...discounts,
      [field]: value
    });
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    console.log('Session Prices:', sessionPrices);
    console.log('Discounts:', discounts);
    // Here you would implement the API call to save the changes
  };

  const openEditModal = (field) => {
    setCurrentEditField(field);
    setTempPrice(sessionPrices[field]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTempPrice('');
  };

  const savePrice = () => {
    handleSessionPriceChange(currentEditField, tempPrice);
    closeModal();
  };

  return (
    <div className="bookings-content">
      <div className='bookings-left'>
      <div className="card-container">
        <div className="bookings-header">
          <h3>Offer a Free Session</h3>
          <div className={`toggle-switch ${offerFreeSession ? 'active' : ''}`} onClick={handleToggleFreeSession}>
            <div className="toggle-switch-slider"></div>
          </div>
        </div>
        <p className="bookings-description">
          Enable to provide a free 30-minute session for first time clients.
        </p>

        <div style={{height:"2rem"}}></div>

        <div className="bookings-header">
          <h3>Coach Offline</h3>
          <div className={`toggle-switch ${coachOffline ? 'active' : ''}`} onClick={handleToggleCoachOffline}>
            <div className="toggle-switch-slider"></div>
          </div>
        </div>
        <p className="bookings-description">
          It's great to take a break from coaching
        </p>
      </div>

      <div className="card-container large">
        <h3>Create a Discount for your sessions</h3>
        
        <div className="discount-section">
          <h4>1st session</h4>
          <input 
            type="text" 
            className="discount-input"
            value={discounts.firstSession}
            onChange={(e) => handleDiscountChange('firstSession', e.target.value)}
            placeholder="Set discount % (e.g., 20%)" 
          />
        </div>

        <div className="discount-section">
          <h4>2nd session</h4>
          <input 
            type="text" 
            className="discount-input"
            value={discounts.secondSession}
            onChange={(e) => handleDiscountChange('secondSession', e.target.value)}
            placeholder="Set discount % (e.g., 20%)" 
          />
        </div>

        <div className="discount-section">
          <h4>4th session</h4>
          <input 
            type="text" 
            className="discount-input"
            value={discounts.fourthSession}
            onChange={(e) => handleDiscountChange('fourthSession', e.target.value)}
            placeholder="Set discount % (e.g., 20%)" 
          />
        </div>

        <div className="save-button-container">
          <Button type="primary" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </div>
      </div>
      </div>
      <div className="bookings-right">
      <div className="card-container large">
        <h3>Create Session Packages</h3>
        <div className="session-packages">
          <div className="session-package">
            <h4>1 session</h4>
            <span>
              {sessionPrices.oneSession ? `₹${sessionPrices.oneSession}` : "Set Price"}
            </span>
            <button className="edit-button" onClick={() => openEditModal('oneSession')}>
              <PenLine strokeOpacity={0.5} size={18} />
            </button>
          </div>

          <div className="session-package">
            <h4>2 sessions</h4>
            <span>
              {sessionPrices.twoSessions ? `₹${sessionPrices.twoSessions}` : "Set Price"}
            </span>
            <button className="edit-button" onClick={() => openEditModal('twoSessions')}>
              <PenLine strokeOpacity={0.5} size={18} />
            </button>
          </div>

          <div className="session-package">
            <h4>4 sessions</h4>
            <span>
              {sessionPrices.fourSessions ? `₹${sessionPrices.fourSessions}` : "Set Price"}
            </span>
            <button className="edit-button" onClick={() => openEditModal('fourSessions')}>
              <PenLine strokeOpacity={0.5} size={18} />
            </button>
          </div>
        </div>
      </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Set Session price"
      >
        <div className="price-edit-modal">
          <div className="price-edit-form">
            <label>Price</label>
            <div className="price-input-container">
              <span className="rupee-symbol">₹</span>
              <input
                type="text"
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
                placeholder="0"
                className="price-modal-input"
              />
            </div>
            <div className="price-hint">Set Price</div>
          </div>
          <div className="price-modal-actions">
            <Button type="primary" onClick={savePrice}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingsContainer;