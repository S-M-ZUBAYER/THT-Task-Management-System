import { useEffect, useRef, useCallback } from "react";
import { useUserData } from "./useUserData";
import { useNotificationStore } from "@/Zustand/useNotificationStore";
import notificationSound from "../assets/notification.mp3";
import { axiosApi } from "@/lib/axiosApi";

export const useWebSocket = () => {
  const socketRef = useRef(null);
  const { user } = useUserData();
  const { addMessage, setMessages } = useNotificationStore();

  const getNotifications = useCallback(async () => {
    try {
      const res = await axiosApi.get(`/notification/${user.id}`);
      if (res.data?.data?.length > 0) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [user.id, setMessages]);

  useEffect(() => {
    if (!user?.id || !user?.role) return;

    const socket = new WebSocket("wss://grozziie.zjweiting.com:57683");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");

      socket.send(
        JSON.stringify({
          type: "register",
          userId: `${user.id}`,
          role: user.role,
        })
      );

      getNotifications();
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const sound = new Audio(notificationSound);
        sound.play();
        console.log(event.data);

        addMessage(data);
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.warn("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, [user?.id, user?.role, getNotifications, addMessage, socketRef]);

  const sendMessage = (payload) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket not ready");
    }
  };

  return { sendMessage };
};
