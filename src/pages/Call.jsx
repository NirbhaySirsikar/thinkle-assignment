import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, Mic, MicOff, VideoOff, Phone, Clock, BellRing } from "lucide-react";
import { toast } from "react-hot-toast";
import femaleAvatar from "../assets/images/female-avatar.png";
import EndCallModal from "../components/Call/EndCallModal";
import NotificationModal from "../components/Call/NotificationModal";

const Call = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoCall, setVideoCall] = useState(true);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);
  const [joined, setJoined] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [secondUserJoined, setSecondUserJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 45 minutes in seconds

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const props = location?.state?.user;

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificatioModalOpen, setIsNotificationModalOpen] = useState(false)

  const handleOpenNotificationModal = () => {
    setIsNotificationModalOpen(true)
  }

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false)
  }

  const handleOnSendNotification = () => { }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleContinueSession = () => {
  }

  const rtcProps = {
    appId: "d9c4779c659b4d7fa9dc8f13515cac14",
    channel: "test",
    token:
      "007eJxTYAg5Wiqco7T9eXZTVs8BiX5/lTUbNzkwzrtvtX36jNSo+dcVGFIsk03MzS2TzUwtk0xSzNMSLVOSLdIMjU0NTZMTkw1NDmheTG8IZGSQ0ONhYIRCEJ+FoSS1uISBAQA9mh7P",
  };


  const agoraEngine = useRef(null);

  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      return true;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast.error("Please enable camera and microphone access to use this feature");
      return false;
    }
  };

  useEffect(() => {
    agoraEngine.current = AgoraRTC.createClient({
      mode: "rtc",
      codec: "h264",
    });

    checkPermissions();

    const init = async () => {
      try {
        agoraEngine.current.on("user-published", handleUserPublished);
        agoraEngine.current.on("user-unpublished", handleUserUnpublished);
        agoraEngine.current.on("user-joined", (user) => {
          console.log("User joined:", user.uid);
          setSecondUserJoined(true);
        });
        agoraEngine.current.on("user-left", (user) => {
          console.log("User left:", user.uid);
          setSecondUserJoined(false);
          setRemoteVideoTrack(null);
          setRemoteAudioTrack(null);
        });
        agoraEngine.current.on("connection-state-change", (curState, prevState) => {
          console.log("Connection state changed from", prevState, "to", curState);
        });

        await agoraEngine.current.join(
          rtcProps.appId,
          rtcProps.channel,
          rtcProps.token,
          null
        );

        const localAudio = await AgoraRTC.createMicrophoneAudioTrack();
        const localVideo = await AgoraRTC.createCameraVideoTrack({
          encoderConfig: {
            width: 1280,
            height: 720,
            frameRate: 30,
            bitrateMin: 600,
            bitrateMax: 2000,
          },
          optimizationMode: "detail"
        });

        setLocalAudioTrack(localAudio);
        setLocalVideoTrack(localVideo);

        if (localVideoRef.current) {
          localVideo.play(localVideoRef.current);
        }

        await agoraEngine.current.publish([localAudio, localVideo]);
        setJoined(true);

      } catch (error) {
        console.error("Error initializing Agora:", error);
      }
    };

    init();

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev < 45 * 60 ? prev + 1 : 0));
    }, 1000);

    return () => {
      if (localAudioTrack) localAudioTrack.close();
      if (localVideoTrack) localVideoTrack.close();
      agoraEngine.current?.removeAllListeners();
      agoraEngine.current?.leave();
      clearInterval(timer);
    };
  }, []);

  const handleUserPublished = async (user, mediaType) => {
    try {
      await agoraEngine.current.subscribe(user, mediaType);
      console.log("Successfully subscribed to", mediaType, "from user:", user.uid);

      if (mediaType === "video") {
        setRemoteVideoTrack(user.videoTrack);
        if (remoteVideoRef.current) {
          user.videoTrack.play(remoteVideoRef.current);
        }
      }

      if (mediaType === "audio") {
        setRemoteAudioTrack(user.audioTrack);
        user.audioTrack.play();
      }
    } catch (error) {
      console.error("Error handling user published:", error);
    }
  };

  const handleUserUnpublished = (user, mediaType) => {
    console.log("User unpublished:", user.uid, mediaType);
    if (mediaType === "video") {
      setRemoteVideoTrack(null);
    }
    if (mediaType === "audio") {
      setRemoteAudioTrack(null);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(!videoEnabled);
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    }
  };

  const endCall = () => {
    setVideoCall(false);
    if (localAudioTrack) localAudioTrack.close();
    if (localVideoTrack) localVideoTrack.close();
    agoraEngine.current?.leave();
    // window.location.href = "/";
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative h-[100dvh] w-[100dwh] bg-black overflow-hidden">
      <EndCallModal isOpen={isModalOpen} onClose={handleCloseModal} onContinue={handleContinueSession} onEnd={endCall} />
      <NotificationModal isOpen={isNotificatioModalOpen} onClose={handleCloseNotificationModal} onContinue={handleOnSendNotification} />

      {/* Local video */}
      <div className="absolute inset-4 md:inset-12 top-16 md:top-20 bottom-44 md:bottom-32 mt-16 rounded-2xl overflow-hidden">
        <div
          ref={localVideoRef}
          className="w-full h-full"
          style={{
            transform: 'scaleX(-1)',
            objectFit: 'contain',
            backgroundColor: '#1a1a1a'
          }}
        ></div>
        {!videoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-[#232323] rounded-2xl">
            <img
              src={femaleAvatar}
              alt="user avatar"
              className="size-20 md:size-36 bg-[#d9d9d9] rounded-full"
            />
          </div>
        )}
      </div>

      {/* Remote video */}
      {secondUserJoined && (
        <div className="absolute top-20 md:top-24 right-8 md:right-18 w-1/3 lg:w-1/5 aspect-[3/4] md:aspect-[3/2] rounded-lg overflow-hidden shadow-lg z-20 ">
          <div
            ref={remoteVideoRef}
            className="w-full h-full"
            style={{
              transform: 'scaleX(-1)',
              objectFit: 'contain',
              backgroundColor: '#121212'
            }}
          ></div>
          {!remoteVideoTrack && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-[#121212] rounded-2xl">
              <img
                src={femaleAvatar}
                alt="user avatar"
                className="size-16 xl:size-24 bg-[#d9d9d9] rounded-full"
              />
              <span className="max-sm:hidden absolute bottom-4 left-4 ">Divyanshu Gupta</span>
            </div>
          )}
        </div>
      )}


      {/* Controls */}
      <div className="absolute bottom-12 md:bottom-2 left-4 md:left-12 right-4 md:right-12 flex flex-col items-center justify-center z-10">
        <div className="w-full h-full text-white flex items-center gap-2 z-10 text-base md:text-lg font-semibold">
          <div className="">
            {/* Counsellor: {props?.name || "Unknown"} */}
            Dipankar Datta
          </div>
          <div>|</div>
          <span className="text-lg md:text-xl">{formatTime(timeLeft)}</span>
        </div>
        <div className="h-4"></div>
        <div className="flex gap-x-4">
          <button
            onClick={toggleVideo}
            className={`size-16 flex items-center justify-center rounded-full ${videoEnabled ? "bg-[#191919] text-white" : "bg-red-500 text-white"
              }`}
          >
            {videoEnabled ?
              <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.037 15.2161C23.8003 15.2159 23.5663 15.166 23.3501 15.0697C23.2998 15.0474 23.2518 15.0201 23.2069 14.9883L18.8363 11.9119C18.6147 11.7558 18.4338 11.5488 18.3089 11.3082C18.184 11.0677 18.1188 10.8006 18.1188 10.5295V6.3339C18.1188 6.06284 18.184 5.79576 18.3089 5.55519C18.4338 5.31461 18.6147 5.10759 18.8363 4.95156L23.2069 1.87512C23.2518 1.84333 23.2998 1.81607 23.3501 1.79374C23.6075 1.67928 23.8895 1.63097 24.1704 1.65318C24.4512 1.6754 24.7221 1.76744 24.9583 1.92095C25.1946 2.07446 25.3887 2.28457 25.5231 2.53219C25.6576 2.77981 25.728 3.05709 25.728 3.33883V13.5246C25.728 13.9731 25.5498 14.4032 25.2327 14.7203C24.9156 15.0374 24.4855 15.2155 24.037 15.2155V15.2161ZM13.6801 16.0409H3.95719C3.0045 16.0399 2.09112 15.661 1.41747 14.9874C0.743818 14.3137 0.364932 13.4004 0.363953 12.4477V4.41574C0.364932 3.46306 0.743818 2.54968 1.41747 1.87603C2.09112 1.20238 3.0045 0.823489 3.95719 0.82251H13.7054C14.6513 0.823629 15.5582 1.19989 16.227 1.86875C16.8959 2.53761 17.2722 3.44447 17.2733 4.39038V12.4477C17.2723 13.4004 16.8934 14.3137 16.2198 14.9874C15.5461 15.661 14.6327 16.0399 13.6801 16.0409Z" fill="white" />
              </svg>
              : <VideoOff size={22} />}
          </button>
          <button
            onClick={handleOpenModal}
            className="size-16 flex items-center justify-center rounded-full bg-red-500 text-white"
          >
            <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.9823 14.7818C31.7259 15.1818 31.3545 15.4888 30.9203 15.6597C30.4861 15.8306 30.011 15.8568 29.5616 15.7347L25.1656 14.5686C24.4102 14.3685 23.7581 13.8768 23.3437 13.1949C22.9293 12.5129 22.7843 11.6928 22.9386 10.9037L23.3404 8.85809C19.2464 7.30645 14.7522 7.3029 10.6559 8.84809L11.0465 10.9104C11.1981 11.7 11.0505 12.5196 10.634 13.2003C10.2176 13.8809 9.56405 14.3706 8.80813 14.5686L4.38631 15.723C3.9407 15.8404 3.47086 15.8128 3.04103 15.644C2.6112 15.4752 2.24236 15.1735 1.98497 14.7801C0.937677 13.0787 0.585401 11.0186 1.00512 9.0499C1.42484 7.08122 2.58244 5.36407 4.22493 4.27371C8.11382 2.00764 12.5045 0.818724 16.9703 0.822519C21.436 0.826314 25.8248 2.02269 29.7101 4.29536C31.3509 5.38169 32.51 7.0926 32.9355 9.05621C33.3609 11.0198 33.0184 13.0774 31.9823 14.7818Z" fill="white" />
            </svg>
          </button>
          {!secondUserJoined && (
            <button
              onClick={handleOpenNotificationModal}
              className={`size-16 flex items-center justify-center rounded-full bg-[#191919] text-white`}
            >
              <BellRing size={22} />
            </button>
          )}
          <button
            onClick={toggleAudio}
            className={`size-16 flex items-center justify-center rounded-full ${audioEnabled ? "bg-[#191919] text-white" : "bg-red-500 text-white"}`}
          >
            {audioEnabled ?
              <svg width="17" height="25" viewBox="0 0 17 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0822 12.8782C16.0822 12.4062 15.6996 12.0236 15.2276 12.0236C14.7556 12.0236 14.373 12.4062 14.373 12.8782C14.3725 16.2183 11.6644 18.9255 8.32431 18.925C4.98494 18.9245 2.27795 16.2175 2.27745 12.8782C2.27745 12.4062 1.89483 12.0236 1.42285 12.0236C0.950864 12.0236 0.568237 12.4062 0.568237 12.8782C0.572744 16.8296 3.54373 20.1475 7.47064 20.5867V22.8657H4.36273C3.89075 22.8657 3.50812 23.2483 3.50812 23.7203C3.50812 24.1923 3.89075 24.5749 4.36273 24.5749H12.2878C12.7598 24.5749 13.1424 24.1923 13.1424 23.7203C13.1424 23.2483 12.7598 22.8657 12.2878 22.8657H9.17986V20.5867C13.1067 20.1475 16.0777 16.8296 16.0822 12.8782Z" fill="white" />
                <path d="M8.32503 0.36377C5.69294 0.36377 3.55914 2.49751 3.55914 5.12965V12.8468C3.56226 15.4776 5.69422 17.6095 8.32503 17.6127C10.9558 17.6095 13.0877 15.4776 13.0909 12.8468V5.12965C13.0909 2.49751 10.9572 0.36377 8.32503 0.36377Z" fill="white" />
              </svg>
              : <MicOff size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Call;
