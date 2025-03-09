import React, { useState } from "react";
import "../../styles/Profile/Booking.css";
import { PenLine, X } from "lucide-react";
import Button from "../Button";
import Modal from "../Modal";

const BookingsContainer = () => {
  const [offerFreeSession, setOfferFreeSession] = useState(true);
  const [coachOffline, setCoachOffline] = useState(false);
  const [sessionPrices, setSessionPrices] = useState({
    oneSession: "",
    twoSessions: "",
    fourSessions: "",
  });
  const [discounts, setDiscounts] = useState({
    firstSession: "",
    secondSession: "",
    fourthSession: "",
  });

  // State for the "Set Price" modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditField, setCurrentEditField] = useState("");
  const [tempPrice, setTempPrice] = useState("");

  // State for the "Are you sure?" confirmation modal
  const [showOfflineConfirmation, setShowOfflineConfirmation] = useState(false);

  // Toggle free session
  const handleToggleFreeSession = () => {
    setOfferFreeSession(!offerFreeSession);
  };

  // Toggle coach offline
  const handleToggleCoachOffline = () => {
    // If coach is currently online and user is trying to go offline,
    // show confirmation. If coach is already offline, just toggle off.
    if (!coachOffline) {
      setShowOfflineConfirmation(true);
    } else {
      setCoachOffline(false);
    }
  };

  // If user confirms "Yes, I am sure"
  const handleConfirmOffline = () => {
    setCoachOffline(true);
    setShowOfflineConfirmation(false);
  };

  // If user cancels
  const handleCancelOffline = () => {
    setShowOfflineConfirmation(false);
  };

  // Handle discount changes
  const handleDiscountChange = (field, value) => {
    setDiscounts({
      ...discounts,
      [field]: value,
    });
  };

  // Handle session price changes
  const handleSessionPriceChange = (field, value) => {
    setSessionPrices({
      ...sessionPrices,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes...");
    console.log("Session Prices:", sessionPrices);
    console.log("Discounts:", discounts);
    // API call to save changes, if needed
  };

  // Open the "Set Price" modal
  const openEditModal = (field) => {
    setCurrentEditField(field);
    setTempPrice(sessionPrices[field]);
    setIsModalOpen(true);
  };

  // Close the "Set Price" modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTempPrice("");
  };

  // Save the price from the "Set Price" modal
  const savePrice = () => {
    handleSessionPriceChange(currentEditField, tempPrice);
    closeModal();
  };

  return (
    <div className="bookings-content">
      {/* Left side */}
      <div className="bookings-left">
        <div className="card-container">
          <div className="bookings-header">
            <h3>Offer a Free Session</h3>
            <div
              className={`toggle-switch ${offerFreeSession ? "active" : ""}`}
              onClick={handleToggleFreeSession}
            >
              <div className="toggle-switch-slider"></div>
            </div>
          </div>
          <p className="bookings-description">
            Enable to provide a free 30-minute session for first time clients.
          </p>

          <div style={{ height: "2rem" }}></div>

          <div className="bookings-header">
            <h3>Coach Offline</h3>
            <div
              className={`toggle-switch ${coachOffline ? "active" : ""}`}
              onClick={handleToggleCoachOffline}
            >
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
              onChange={(e) =>
                handleDiscountChange("firstSession", e.target.value)
              }
              placeholder="Set discount % (e.g., 20%)"
            />
          </div>

          <div className="discount-section">
            <h4>2nd session</h4>
            <input
              type="text"
              className="discount-input"
              value={discounts.secondSession}
              onChange={(e) =>
                handleDiscountChange("secondSession", e.target.value)
              }
              placeholder="Set discount % (e.g., 20%)"
            />
          </div>

          <div className="discount-section">
            <h4>4th session</h4>
            <input
              type="text"
              className="discount-input"
              value={discounts.fourthSession}
              onChange={(e) =>
                handleDiscountChange("fourthSession", e.target.value)
              }
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

      {/* Right side */}
      <div className="bookings-right">
        <div className="card-container large">
          <h3>Create Session Packages</h3>
          <div className="session-packages">
            <div className="session-package">
              <h4>1 session</h4>
              <span>
                {sessionPrices.oneSession
                  ? `₹${sessionPrices.oneSession}`
                  : "Set Price"}
              </span>
              <button
                className="edit-button"
                onClick={() => openEditModal("oneSession")}
              >
                <PenLine strokeOpacity={0.5} size={18} />
              </button>
            </div>

            <div className="session-package">
              <h4>2 sessions</h4>
              <span>
                {sessionPrices.twoSessions
                  ? `₹${sessionPrices.twoSessions}`
                  : "Set Price"}
              </span>
              <button
                className="edit-button"
                onClick={() => openEditModal("twoSessions")}
              >
                <PenLine strokeOpacity={0.5} size={18} />
              </button>
            </div>

            <div className="session-package">
              <h4>4 sessions</h4>
              <span>
                {sessionPrices.fourSessions
                  ? `₹${sessionPrices.fourSessions}`
                  : "Set Price"}
              </span>
              <button
                className="edit-button"
                onClick={() => openEditModal("fourSessions")}
              >
                <PenLine strokeOpacity={0.5} size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================
          1) "Set Price" Modal
         ============================== */}
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
                type="number"
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

      {/* ==============================
          2) "Coach Offline" Confirmation Modal
         ============================== */}
      <Modal
        isOpen={showOfflineConfirmation}
        onClose={handleCancelOffline}  
        title="Are you sure?"                       
      >
          <p className="confirmation-text">
            Your profile will not be shown in the thinkle database as you made yourself offline.
          </p>

        <div className="modal-actions-group">
          <Button type="destructive" onClick={handleCancelOffline}>
            Cancel
          </Button>
            <Button type="primary" onClick={handleConfirmOffline}>
              Yes, I am sure
            </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingsContainer;
