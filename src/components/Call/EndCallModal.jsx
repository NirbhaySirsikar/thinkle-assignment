import { useState } from "react";
import Modal from "../Modal";
import "../../styles/Call/EndCallModal.css";
import femaleAvatar from "../../assets/images/female-avatar.png";

const EndCallModal = ({ isOpen, onClose, onContinue, onEnd }) => {
  const [step, setStep] = useState(1);
  const [callQuality, setCallQuality] = useState(0);
  const [counselorRating, setCounselorRating] = useState(0);
  const [additionalComments, setAdditionalComments] = useState("");
  const counselorName = "Dipankar";

  const handleEndSession = () => {
    onEnd();
    // Handle end session logic here
    setStep(3); // Move to quality rating after confirming end
  };

  const handleContinueSession = () => {
    onContinue();
    onClose();
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit all data and close
      onClose();
      // Reset state for next time
      setStep(1);
      setCallQuality(0);
      setCounselorRating(0);
      setAdditionalComments("");
    }
  };

  const handleSubmit = () => {
    // Submit the feedback
    console.log({
      callQuality,
      counselorRating,
      additionalComments,
    });
    onClose();
    // Reset state for next time
    setStep(1);
    setCallQuality(0);
    setCounselorRating(0);
    setAdditionalComments("");
    window.location.href = "/";
  };

  const getRatingDescription = (rating) => {
    switch (rating) {
      case 5:
        return "Highly motivated, and actively participated";
      case 4:
        return "Well prepared, engaged, and receptive";
      case 3:
        return "Average engagement, room for improvement";
      case 2:
        return "Minimal effort, lacked preparation or focus";
      case 1:
        return "Disengaged, didn't participate meaningfully";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="confirm-end-session">
            <div className="session-info">
              <p>
                You have 10 mins left. End the call if everything's resolved, or
                continue the session.
              </p>
            </div>
            <div className="session-actions">
              <button className="end-session-btn" onClick={handleEndSession}>
                End Session
              </button>
              <button
                className="continue-session-btn"
                onClick={handleContinueSession}
              >
                Continue Session
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          // <div className="call-status-options">
          <div className="status-option">
            <div className="status-icon call-dropped-icon">
              <svg
                width="135"
                height="121"
                viewBox="0 0 135 121"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M90.3026 43.1183C80.7894 43.1183 71.1058 42.7319 62.0472 40.2087C53.1592 37.7423 44.9985 32.9573 37.7244 27.4222C32.9622 23.8192 28.6318 20.955 22.4488 21.3869C16.3948 21.7184 10.6084 23.9899 5.94568 27.8654C-1.91945 34.6849 -0.737404 47.4487 2.41092 56.4163C7.13909 69.9189 21.5282 79.2729 33.7578 85.3877C47.8854 92.4459 63.4111 96.5375 78.9709 98.9016C92.6098 100.97 110.136 102.482 121.956 93.5711C132.811 85.3877 135.788 66.7023 133.129 54.0863C132.484 50.3559 130.5 46.9893 127.548 44.6186C119.922 39.0494 108.545 42.766 99.9749 42.9592C96.7924 43.0274 93.5532 43.107 90.3026 43.1183Z"
                  fill="#404040"
                />
                <path
                  d="M67.0207 121.002C90.0641 121.002 108.744 119.837 108.744 118.4C108.744 116.962 90.0641 115.797 67.0207 115.797C43.9773 115.797 25.2969 116.962 25.2969 118.4C25.2969 119.837 43.9773 121.002 67.0207 121.002Z"
                  fill="#A9A9A9"
                />
                <path
                  d="M116.945 22.125V27.0237"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M114.484 24.5625H119.383"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M57.6172 1V5.89866"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M55.1797 3.45312H60.067"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.9297 85.8828V90.7815"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.4844 88.3281H24.383"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M99.394 70.534L100.917 82.5817C101.075 83.8383 100.728 85.1063 99.9524 86.1076C99.1769 87.109 98.036 87.762 96.7798 87.9236L44.4972 94.6294C43.2405 94.7872 41.9726 94.4403 40.9713 93.6648C39.9699 92.8893 39.3169 91.7484 39.1553 90.4923L37.6095 78.4445C37.4846 77.411 37.6094 76.3626 37.9732 75.3871L47.691 49.7005L46.8272 42.881C46.7953 42.6442 46.8107 42.4035 46.8725 42.1727C46.9342 41.942 47.0411 41.7257 47.187 41.5365C47.3328 41.3473 47.5148 41.1889 47.7222 41.0705C47.9297 40.9521 48.1586 40.8759 48.3957 40.8465L52.0441 40.3578C52.523 40.2998 53.0054 40.4332 53.3864 40.7291C53.7674 41.025 54.0161 41.4593 54.0786 41.9376L54.9537 48.7571L74.9575 46.1884L74.0823 39.369C74.0521 39.1316 74.069 38.8906 74.1321 38.6597C74.1952 38.4289 74.3032 38.2128 74.45 38.0238C74.5967 37.8348 74.7794 37.6766 74.9874 37.5583C75.1954 37.44 75.4247 37.364 75.6622 37.3345L79.2992 36.8571C79.7794 36.799 80.2632 36.9321 80.646 37.2277C81.0288 37.5233 81.2799 37.9577 81.3451 38.437L82.2089 45.2564H82.368L98.2801 67.6584C98.8786 68.5126 99.2609 69.4994 99.394 70.534Z"
                  fill="white"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.1484 50.7282C28.6955 52.4899 36.1628 50.3645 43.0278 45.625C44.96 51.6716 43.0278 56.3316 37.2653 58.6502C34.3141 59.7937 31.1977 60.4538 28.0363 60.6051C22.5466 60.8211 20.3303 57.9342 20.1484 50.7282Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M110.702 39.1172C102.883 42.9816 95.1199 42.7997 87.2775 39.9469C86.9252 46.289 89.9599 50.3239 96.1428 51.0967C99.2824 51.4649 102.461 51.3191 105.554 50.6648C110.941 49.5396 112.35 46.1299 110.702 39.1172Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M110.795 39.0217C102.839 43.2498 95.542 42.8974 88.177 40.0901C87.6655 39.8969 86.9495 39.4763 86.8699 39.0558C86.0402 34.9073 81.9031 33.7139 78.1978 33.5434C68.7308 33.1552 59.2663 34.3695 50.2039 37.135C46.6577 38.2716 42.9525 40.4311 43.2025 44.6478C43.2025 45.0797 42.6456 45.6593 42.191 45.9776C35.7807 50.5239 28.8135 52.7288 20.0391 50.6489C21.3689 45.6821 22.5964 40.863 24.0285 36.0893C24.2671 35.3392 25.381 34.7027 26.2334 34.2935C37.0986 28.9339 48.7654 25.3828 60.7741 23.7802C62.047 23.587 63.32 23.4278 64.593 23.2914C76.6249 21.8169 88.8165 22.3083 100.691 24.7463C101.6 24.9395 102.85 25.2691 103.259 25.9397C105.851 30.1905 108.26 34.5549 110.795 39.0217Z"
                  fill="white"
                  stroke="#7E7E7E"
                  stroke-width="1.13658"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M59.1073 58.091L53.4141 58.8203L54.1434 64.5135L59.8366 63.7842L59.1073 58.091Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M69.1073 56.8176L63.4141 57.5469L64.1434 63.2401L69.8366 62.5108L69.1073 56.8176Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M79.1385 55.5285L73.4453 56.2578L74.1746 61.951L79.8678 61.2217L79.1385 55.5285Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M60.326 67.7316L54.6328 68.4609L55.3621 74.1541L61.0553 73.4248L60.326 67.7316Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M70.3416 66.4426L64.6484 67.1719L65.3778 72.8651L71.0709 72.1358L70.3416 66.4426Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M80.3573 65.1535L74.6641 65.8828L75.3934 71.576L81.0866 70.8467L80.3573 65.1535Z"
                  fill="#5F5F5F"
                />
                <path
                  d="M66.317 104.532C66.9321 104.532 67.4308 104.034 67.4308 103.419C67.4308 102.803 66.9321 102.305 66.317 102.305C65.7018 102.305 65.2031 102.803 65.2031 103.419C65.2031 104.034 65.7018 104.532 66.317 104.532Z"
                  fill="#CFCFCF"
                />
                <path
                  d="M93.356 18.548C93.9712 18.548 94.4699 18.0493 94.4699 17.4342C94.4699 16.819 93.9712 16.3203 93.356 16.3203C92.7409 16.3203 92.2422 16.819 92.2422 17.4342C92.2422 18.0493 92.7409 18.548 93.356 18.548Z"
                  fill="#CFCFCF"
                />
                <path
                  d="M40.1685 19.0011C40.7837 19.0011 41.2824 18.5024 41.2824 17.8873C41.2824 17.2721 40.7837 16.7734 40.1685 16.7734C39.5534 16.7734 39.0547 17.2721 39.0547 17.8873C39.0547 18.5024 39.5534 19.0011 40.1685 19.0011Z"
                  fill="#CFCFCF"
                />
              </svg>
            </div>
            <h3>Call Dropped</h3>
            <p>
              Uh oh, something went wrong! The site may be experiencing a
              connection outage.
            </p>
            <div className="status-actions">
              <button className="contact-support-btn">Contact Support</button>
              <button className="rejoin-btn">Rejoin</button>
            </div>
          </div>
          //   {/* <div className="status-option">
          //     <div className="status-icon notification-icon"></div>
          //     <h3>Send Notification</h3>
          //     <p>A notification will be send on the user's device regarding this current booking.</p>
          //     <div className="status-actions">
          //       <button className="cancel-btn">Cancel</button>
          //       <button className="send-nudge-btn">Send Nudge</button>
          //     </div>
          //   </div>
          // </div> */}
        );
      case 3:
        return (
          <div className="call-quality-rating">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6">
                <path
                  d="M60.0673 19.0637C59.681 18.8251 59.2402 18.689 58.7866 18.6685C58.3329 18.648 57.8816 18.7436 57.4753 18.9463L50.6673 22.3517V21.333C50.6673 16.9223 47.078 13.333 42.6673 13.333H13.334C8.92332 13.333 5.33398 16.9223 5.33398 21.333V42.6663C5.33398 47.077 8.92332 50.6663 13.334 50.6663H42.6673C47.078 50.6663 50.6673 47.077 50.6673 42.6663V41.6477L57.4753 45.0503C57.8807 45.256 58.3323 45.3535 58.7864 45.3334C59.2405 45.3133 59.6817 45.1763 60.0673 44.9357C60.854 44.4477 61.334 43.5917 61.334 42.6663V21.333C61.334 20.4077 60.854 19.5517 60.0673 19.0637ZM18.6673 35.9997C18.1335 36.0136 17.6023 35.9206 17.1051 35.726C16.6078 35.5314 16.1545 35.2392 15.772 34.8667C15.3895 34.4941 15.0854 34.0488 14.8777 33.5568C14.67 33.0649 14.5629 32.5364 14.5627 32.0024C14.5625 31.4684 14.6693 30.9398 14.8766 30.4477C15.084 29.9556 15.3878 29.5101 15.7701 29.1373C16.1524 28.7645 16.6055 28.472 17.1026 28.2771C17.5997 28.0821 18.1308 27.9887 18.6647 28.0023C19.7073 28.0289 20.6983 28.4617 21.4265 29.2084C22.1547 29.9551 22.5624 30.9567 22.5627 31.9997C22.5631 33.0427 22.156 34.0446 21.4284 34.7918C20.7007 35.539 19.7099 35.9724 18.6673 35.9997Z"
                  fill="black"
                />
              </g>
            </svg>

            <h3>How was the quality of the call?</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${callQuality >= star ? "active" : ""}`}
                  onClick={() => setCallQuality(star)}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill={callQuality >= star ? "#ffc100" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.2586 28.3545L20.0004 28.1983L19.7419 28.354L12.8252 32.5207L12.8243 32.5212C11.938 33.0576 10.8533 32.2668 11.0869 31.2622L12.9202 23.3958L12.9886 23.102L12.7606 22.9044L6.64397 17.6044L6.64379 17.6043C5.8604 16.9261 6.28461 15.6453 7.30619 15.5641L7.30883 15.5638L15.3588 14.8805L15.659 14.855L15.7768 14.5778L18.9268 7.16109L18.9276 7.15914C19.3227 6.21779 20.677 6.21779 21.0722 7.15915L21.0728 7.16071L24.2228 14.594L24.3405 14.8717L24.6409 14.8972L32.6909 15.5805L32.6936 15.5807C33.7151 15.662 34.1394 16.9428 33.356 17.6209L33.3558 17.6211L27.2391 22.9211L27.0111 23.1186L27.0796 23.4124L28.9129 31.2789C28.9129 31.279 28.9129 31.279 28.9129 31.2791C29.1463 32.2836 28.0617 33.0743 27.1754 32.5379L27.1753 32.5378L20.2586 28.3545Z"
                      stroke={callQuality >= star ? "none" : "#A5A5A5"}
                    />
                  </svg>
                </span>
              ))}
            </div>
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        );
      case 4:
        return (
          <div className="counselor-rating">
            <img
              src={femaleAvatar}
              alt="counselor avatar"
              className="counselor-avatar"
            />
            <h3>How was your coaching session with {counselorName}?</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${counselorRating >= star ? "active" : ""}`}
                  onClick={() => setCounselorRating(star)}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill={counselorRating >= star ? "#ffc100" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.2586 28.3545L20.0004 28.1983L19.7419 28.354L12.8252 32.5207L12.8243 32.5212C11.938 33.0576 10.8533 32.2668 11.0869 31.2622L12.9202 23.3958L12.9886 23.102L12.7606 22.9044L6.64397 17.6044L6.64379 17.6043C5.8604 16.9261 6.28461 15.6453 7.30619 15.5641L7.30883 15.5638L15.3588 14.8805L15.659 14.855L15.7768 14.5778L18.9268 7.16109L18.9276 7.15914C19.3227 6.21779 20.677 6.21779 21.0722 7.15915L21.0728 7.16071L24.2228 14.594L24.3405 14.8717L24.6409 14.8972L32.6909 15.5805L32.6936 15.5807C33.7151 15.662 34.1394 16.9428 33.356 17.6209L33.3558 17.6211L27.2391 22.9211L27.0111 23.1186L27.0796 23.4124L28.9129 31.2789C28.9129 31.279 28.9129 31.279 28.9129 31.2791C29.1463 32.2836 28.0617 33.0743 27.1754 32.5379L27.1753 32.5378L20.2586 28.3545Z"
                      stroke={counselorRating >= star ? "none" : "#A5A5A5"}
                    />
                  </svg>
                </span>
              ))}
            </div>
            {counselorRating > 0 && (
              <div className="rating-description">
                {getRatingDescription(counselorRating)}
              </div>
            )}
            <div className="comments-section">
              <p>Add additional Comments</p>
              <textarea
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                placeholder="Write your review"
              ></textarea>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 1 ? "Are you sure you want to end the session?" : ""}
    >
      {renderStepContent()}
    </Modal>
  );
};

export default EndCallModal;
