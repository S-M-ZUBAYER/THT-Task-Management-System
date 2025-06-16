// /hook/useWebSocket.js
import { useEffect, useRef } from "react";
import { useUserData } from "./useUserData";
import { useNotificationStore } from "@/Zustand/useNotificationStore";
import notificationSound from "../assets/notification.mp3";

export const useWebSocket = () => {
  const socketRef = useRef(null);
  const { user } = useUserData();
  const { addMessage } = useNotificationStore();

  useEffect(() => {
    if (!user?.id || !user?.role) return;

    socketRef.current = new WebSocket("wss://grozziie.zjweiting.com:57683");

    socketRef.current.onopen = () => {
      socketRef.current.send(
        JSON.stringify({
          type: "register",
          userId: `${user.id}`,
          role: user.role,
        })
      );
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const sound = new Audio(notificationSound);
        sound.play();
        addMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [user?.id, user?.role, addMessage]);

  const sendMessage = (payload) => {
    console.log(payload);
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket is not connected.");
    }
  };

  return { sendMessage };
};
