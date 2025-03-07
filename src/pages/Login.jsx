import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      console.log("Reset password for:", email);
    } else {
      console.log("Login with:", email, password);
      navigate('/')
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-content">
        <div className="login-form-container">
          <div className="login-header">
            <h1 className="login-title">thinkle.</h1>
          </div>

          {isForgotPassword ? (
            <>
              <button
                className="back-button"
                onClick={toggleForgotPassword}
                aria-label="Go back to login"
              >
                <ArrowLeft size={24} />
              </button>
              <form onSubmit={handleSubmit} className="login-form">
                <h2 className="forgot-password-title">Forgot your password?</h2>
                <p className="forgot-password-subtitle">
                  To reset password please enter the email address associated
                  with your Thinkle account.
                </p>

                <div className="form-group">
                  <label htmlFor="forgot-email">Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Send OTP
                </button>

                <div className="contact-us">
                  <a href="#contact">Contact Us</a>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>

              <div className="forgot-password">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForgotPassword();
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="submit-button">
                Continue
              </button>

              <div className="social-section">
                <div className="social-divider">
                  <span className="divider-line"></span>
                  <span className="divider-text">Follow us on</span>
                  <span className="divider-line"></span>
                </div>

                <div className="social-icons">
                  <a href="#instagram" aria-label="Instagram">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.0002 14.7932C17.133 14.7932 14.7932 17.133 14.7932 20.0002C14.7932 22.8674 17.133 25.2072 20.0002 25.2072C22.8674 25.2072 25.2072 22.8674 25.2072 20.0002C25.2072 17.133 22.8674 14.7932 20.0002 14.7932ZM35.6174 20.0002C35.6174 17.8439 35.6369 15.7072 35.5158 13.5549C35.3947 11.0549 34.8244 8.83612 32.9963 7.008C31.1643 5.17597 28.9494 4.60956 26.4494 4.48847C24.2932 4.36737 22.1564 4.3869 20.0041 4.3869C17.8478 4.3869 15.7111 4.36737 13.5588 4.48847C11.0588 4.60956 8.84003 5.17987 7.0119 7.008C5.17987 8.84003 4.61347 11.0549 4.49237 13.5549C4.37128 15.7111 4.39081 17.8478 4.39081 20.0002C4.39081 22.1525 4.37128 24.2932 4.49237 26.4455C4.61347 28.9455 5.18378 31.1642 7.0119 32.9924C8.84394 34.8244 11.0588 35.3908 13.5588 35.5119C15.715 35.633 17.8517 35.6135 20.0041 35.6135C22.1603 35.6135 24.2971 35.633 26.4494 35.5119C28.9494 35.3908 31.1682 34.8205 32.9963 32.9924C34.8283 31.1603 35.3947 28.9455 35.5158 26.4455C35.6408 24.2932 35.6174 22.1564 35.6174 20.0002ZM20.0002 28.0119C15.5666 28.0119 11.9885 24.4338 11.9885 20.0002C11.9885 15.5666 15.5666 11.9885 20.0002 11.9885C24.4338 11.9885 28.0119 15.5666 28.0119 20.0002C28.0119 24.4338 24.4338 28.0119 20.0002 28.0119ZM28.34 13.5314C27.3049 13.5314 26.4689 12.6955 26.4689 11.6603C26.4689 10.6252 27.3049 9.78925 28.34 9.78925C29.3752 9.78925 30.2111 10.6252 30.2111 11.6603C30.2114 11.9061 30.1632 12.1496 30.0693 12.3767C29.9754 12.6039 29.8376 12.8103 29.6638 12.9841C29.49 13.1579 29.2836 13.2957 29.0564 13.3896C28.8293 13.4836 28.5858 13.5317 28.34 13.5314Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a href="#linkedin" aria-label="LinkedIn">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.6667 5C32.5507 5 33.3986 5.35119 34.0237 5.97631C34.6488 6.60143 35 7.44928 35 8.33333V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H8.33333C7.44928 35 6.60143 34.6488 5.97631 34.0237C5.35119 33.3986 5 32.5507 5 31.6667V8.33333C5 7.44928 5.35119 6.60143 5.97631 5.97631C6.60143 5.35119 7.44928 5 8.33333 5H31.6667ZM30.8333 30.8333V22C30.8333 20.559 30.2609 19.177 29.2419 18.1581C28.223 17.1391 26.841 16.5667 25.4 16.5667C23.9833 16.5667 22.3333 17.4333 21.5333 18.7333V16.8833H16.8833V30.8333H21.5333V22.6167C21.5333 21.3333 22.5667 20.2833 23.85 20.2833C24.4688 20.2833 25.0623 20.5292 25.4999 20.9668C25.9375 21.4043 26.1833 21.9978 26.1833 22.6167V30.8333H30.8333ZM11.4667 14.2667C12.2093 14.2667 12.9215 13.9717 13.4466 13.4466C13.9717 12.9215 14.2667 12.2093 14.2667 11.4667C14.2667 9.91667 13.0167 8.65 11.4667 8.65C10.7196 8.65 10.0032 8.94675 9.47498 9.47498C8.94675 10.0032 8.65 10.7196 8.65 11.4667C8.65 13.0167 9.91667 14.2667 11.4667 14.2667ZM13.7833 30.8333V16.8833H9.16667V30.8333H13.7833Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a href="#twitter" aria-label="Twitter">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_9_1514)">
                        <mask
                          id="mask0_9_1514"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="30"
                          height="30"
                        >
                          <path d="M0 0H30V30H0V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_9_1514)">
                          <path
                            d="M23.625 1.40576H28.2257L18.1757 12.9215L30 28.5943H20.7429L13.4871 19.0908L5.19429 28.5943H0.589286L11.3379 16.2729L0 1.4079H9.49286L16.0414 10.0929L23.625 1.40576ZM22.0071 25.8343H24.5571L8.1 4.02219H5.36571L22.0071 25.8343Z"
                            fill="black"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_9_1514">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="footer-links">
                <a href="#terms">Terms of Use</a>
                <span className="separator">|</span>
                <a href="#privacy">Privacy Policy</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
