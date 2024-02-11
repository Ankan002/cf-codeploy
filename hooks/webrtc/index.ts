import { useCallback, useEffect, useRef } from "react";
import { useStateCallback } from "./useStateCallback";
import { Socket } from "socket.io-client";

interface User {
  _id: string;
}

interface RTCConnections {
  [key: string]: RTCPeerConnection;
}

interface AudioElements {
  [key: string]: HTMLAudioElement;
}

export const useWebRTC = (roomId: string, user: User) => {
  const [clients, setClients] = useStateCallback([]); // array of all user
  const audioElements = useRef({} as AudioElements); // audio elements as map where userId is the key and maps to audio elements
  const socket = useRef<Socket | null>(null); // the socket connection
  const localMediaStream = useRef<MediaStream | null>(null);  // local media capture is stored in this reference
  const rtcConnections = useRef({} as RTCConnections); // socket ids mapped to rtc conn's
  const clientsRef = useRef<User[]>([]);

  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  const addNewClient = useCallback(
    (newClient: User, cb?: () => void) => {
      const alreadyExists = clientsRef.current.find((client) => client._id === newClient._id);
      if (!alreadyExists) {
        setClients((existingClients: any) => [...existingClients, newClient], cb);
      }
    },
    [clientsRef, setClients]
  );

  // initialize Socket
  useEffect(() => {
    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach(track => track.stop());
        socket.current?.emit("leave", {});
      }
    };
  }, []);

  // handleNewPeer
  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }: any) => {
      if (peerId in rtcConnections.current) {
        return console.warn("RTC connection already Exists", peerId);
      }
      const currentRTC = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });
      rtcConnections.current[peerId] = currentRTC;
      currentRTC.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current?.emit("relayIce", { peerId, icecandidate: event.candidate });
        }
      };

      currentRTC.ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser._id]) {
            audioElements.current[remoteUser._id].srcObject = remoteStream;
          } else {
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser._id]) {
                audioElements.current[remoteUser._id].srcObject = remoteStream;
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // add local track to remote connections
      localMediaStream.current?.getTracks().forEach(track => {
        currentRTC.addTrack(track, localMediaStream.current!);
      });

      // createOffer
      if (createOffer) {
        const offer = await currentRTC.createOffer();
        currentRTC.setLocalDescription(offer);
        socket.current?.emit("relaySDP", { peerId, SDP: offer });
      }
    };

    socket.current?.on("addPeer", handleNewPeer);

    return () => {
      socket.current?.off("addPeer");
    };
  }, [addNewClient]);

  // capture media
  useEffect(() => {
    const startCapture = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };
    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElements.current[user._id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current!;
        }

        socket.current?.emit("join", { roomId, user });
      });
    });
  }, [addNewClient, user, roomId]);

  // handling new ice candidate
  useEffect(() => {
    socket.current?.on("newIce", ({ peerId, icecandidate }: any) => {
      if (icecandidate) {
        rtcConnections.current[peerId]?.addIceCandidate(icecandidate);
      }
    });
    return () => { socket.current?.off("newIce"); };
  }, []);

  // handling new sdp info
  useEffect(() => {
    socket.current?.on("SDP", async ({ peerId, SDP }: any) => {
      const currentRTC = rtcConnections.current[peerId]; // can create a reference too, maybe refactor later
      currentRTC?.setRemoteDescription(new RTCSessionDescription(SDP));
      if (SDP.type === "offer") {
        const answer = await currentRTC?.createAnswer();
        currentRTC?.setLocalDescription(answer!);
        socket.current?.emit("relaySDP", { peerId, SDP: answer });
      }
    });

    return () => {
      socket.current?.off("SDP");
    };
  }, []);

  // handling remove peer
  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }: any) => {
      if (rtcConnections.current[peerId]) {
        rtcConnections.current[peerId]?.close();
      }
      delete rtcConnections.current[peerId];
      delete audioElements.current[userId];
      setClients((existingClients: any[]) => existingClients.filter((client: { _id: any; }) => client._id !== userId));
    };
    socket.current?.on("removePeer", handleRemovePeer);
    return () => {
      socket.current?.off("removePeer");
    };
  }, [setClients]);

  // handling mute
  useEffect(() => {
    const handleRemoteClientMute = ({ userId, muteState }: any) => {
      setClients((existingClients: any[]) =>
        existingClients.map((client: { _id: any; }) => client._id === userId ? { ...client, muted: muteState } : client)
      );
    };
    socket.current?.on("mute", handleRemoteClientMute);
  }, [setClients]);

  const handleMute = (userId: string, muteState: boolean) => {
    if(localMediaStream.current) {
    localMediaStream.current.getAudioTracks()[0].enabled = !muteState;
    socket.current?.emit("mute", { userId, muteState, roomId });
  };};

  const provideRef = (instance: HTMLAudioElement, userId: string) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef, socketRef: socket, handleMute };
};