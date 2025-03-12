import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, Mic, MicOff, VideoOff, Phone, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

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
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const props = location?.state?.user;

  const rtcProps = {
    appId: "d9c4779c659b4d7fa9dc8f13515cac14",
    channel:"test",
    token:
      "007eJxTYNj0kz/x3eGTH/PXeUUGLCzJkU53qX0w46SLwCbNNUqpKzsUGFIsk03MzS2TzUwtk0xSzNMSLVOSLdIMjU0NTZMTkw1N6qefT28IZGTY8q+flZEBAkF8FoaS1OISBgYAuQIhcA==",
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
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
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
    window.location.href = "/";
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative h-screen w-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-10">
        <div className="text-lg font-semibold">
          Counsellor: {props?.name || "Unknown"}
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" size={18} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Local video */}
      <div className="absolute inset-0 mt-16">
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
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-gray-800">
            Camera Off
          </div>
        )}
      </div>

      {/* Remote video */}
      {secondUserJoined && (
        <div className="absolute top-20 right-4 w-1/4 md:w-1/4 w-1/3 aspect-[3/4] rounded-lg overflow-hidden shadow-lg z-20 bg-gray-800">
          <div 
            ref={remoteVideoRef} 
            className="w-full h-full"
            style={{ 
              objectFit: 'cover',
              backgroundColor: '#1a1a1a',
              transform: 'scale(1.01)', // Prevents white edges
            }}
          ></div>
          {!remoteVideoTrack && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Video Off
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 mb-4 flex justify-center z-10">
        <div className="bg-gray-900 bg-opacity-60 rounded-full p-2 shadow-lg">
          <div className="flex space-x-3">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                audioEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
              }`}
            >
              {audioEnabled ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                videoEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
              }`}
            >
              {videoEnabled ? <Camera size={18} /> : <VideoOff size={18} />}
            </button>
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-500 text-white"
            >
              <Phone size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;