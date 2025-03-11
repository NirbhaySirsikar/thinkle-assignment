import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, Mic, MicOff, VideoOff, Phone } from "lucide-react";
import { toast } from "react-hot-toast";
import femaleAvatar from "../assets/images/female-avatar.png";

// A simple utility for conditionally joining class names.
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Call = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const counselor = location?.state?.user;
  const counselorName = counselor?.name || "Counsellor";

  // Agora and call state variables
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0); // count-up timer in seconds
  const [secondUserJoined, setSecondUserJoined] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const agoraEngine = useRef(null);

  // Agora configuration: update these with your own Agora app credentials if needed.
  const rtcProps = {
    appId: "d9c4779c659b4d7fa9dc8f13515cac14",
    channel: "test",
    token:
      "007eJxTYNj0kz/x3eGTH/PXeUUGLCzJkU53qX0w46SLwCbNNUqpKzsUGFIsk03MzS2TzUwtk0xSzNMSLVOSLdIMjU0NTZMTkw1N6qefT28IZGTY8q+flZEBAkF8FoaS1OISBgYAuQIhcA==",
  };

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
    let timerInterval;
    const initAgora = async () => {
      await checkPermissions();
      agoraEngine.current = AgoraRTC.createClient({
        mode: "rtc",
        codec: "h264",
      });

      // Setup Agora event listeners
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

      try {
        await agoraEngine.current.join(
          rtcProps.appId,
          rtcProps.channel,
          rtcProps.token,
          null
        );

        // Create local audio and video tracks
        const localAudio = await AgoraRTC.createMicrophoneAudioTrack();
        const localVideo = await AgoraRTC.createCameraVideoTrack({
          encoderConfig: {
            width: 1280,
            height: 720,
            frameRate: 30,
            bitrateMin: 600,
            bitrateMax: 2000,
          },
          optimizationMode: "detail",
        });

        setLocalAudioTrack(localAudio);
        setLocalVideoTrack(localVideo);

        if (localVideoRef.current) {
          localVideo.play(localVideoRef.current);
        }

        await agoraEngine.current.publish([localAudio, localVideo]);
      } catch (error) {
        console.error("Error initializing Agora:", error);
        toast.error("Failed to join the call.");
      }
    };

    initAgora();

    // Start call duration timer (count-up)
    timerInterval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      if (localAudioTrack) localAudioTrack.close();
      if (localVideoTrack) localVideoTrack.close();
      agoraEngine.current?.removeAllListeners();
      agoraEngine.current?.leave();
      clearInterval(timerInterval);
    };
  }, []);

  const handleUserPublished = async (user, mediaType) => {
    try {
      await agoraEngine.current.subscribe(user, mediaType);
      console.log("Subscribed to", mediaType, "from user:", user.uid);

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
      console.error("Error in handleUserPublished:", error);
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
    if (localAudioTrack) localAudioTrack.close();
    if (localVideoTrack) localVideoTrack.close();
    agoraEngine.current?.leave();
    window.location.href = "/";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Local video area */}
      <div className="absolute inset-0">
        <div
          ref={localVideoRef}
          className="w-full h-full"
          style={{
            transform: "scaleX(-1)",
            objectFit: "contain",
            backgroundColor: "black",
          }}
        >
          {!videoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                <img
                  src={femaleAvatar}
                  alt="Local user"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Remote video thumbnail */}
      {secondUserJoined && (
        <div className="absolute top-4 right-4 w-1/4 md:w-1/4 aspect-[3/4] rounded-lg overflow-hidden shadow-lg z-20 bg-neutral-900">
          <div
            ref={remoteVideoRef}
            className="w-full h-full"
            style={{
              objectFit: "cover",
              backgroundColor: "#1a1a1a",
              transform: "scale(1.01)",
            }}
          >
            {!remoteVideoTrack && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src={femaleAvatar}
                  alt={counselorName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="text-white text-sm font-medium mt-2">
                  {counselorName}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom bar showing counselor name and call duration */}
      <div className="absolute bottom-24 left-4 flex items-center gap-x-4 text-white">
        <span className="text-lg font-medium">{counselorName}</span>
        <span className="text-lg">|</span>
        <span className="text-lg">{formatTime(callDuration)}</span>
      </div>

      {/* Call controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-x-4">
        <button
          onClick={toggleVideo}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            videoEnabled ? "bg-neutral-800" : "bg-red-600"
          )}
          aria-label={videoEnabled ? "Turn off camera" : "Turn on camera"}
        >
          {videoEnabled ? (
            <Camera className="text-white" size={20} />
          ) : (
            <VideoOff className="text-white" size={20} />
          )}
        </button>
        <button
          onClick={endCall}
          className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center"
          aria-label="End call"
        >
          <Phone className="text-white" size={20} />
        </button>
        <button
          onClick={toggleAudio}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            audioEnabled ? "bg-neutral-800" : "bg-red-600"
          )}
          aria-label={audioEnabled ? "Mute microphone" : "Unmute microphone"}
        >
          {audioEnabled ? (
            <Mic className="text-white" size={20} />
          ) : (
            <MicOff className="text-white" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Call;
